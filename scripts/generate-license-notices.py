"""Inventory the locked dependencies and preserve available upstream notices.

Run after the supported dependency installer. This does not grant rights to
Kobags brand/media assets and does not claim that package metadata is legal review.
"""
from pathlib import Path
from collections import Counter
from datetime import datetime, timezone
import hashlib
import json
import os
import re

ROOT = Path(__file__).resolve().parents[1]
LOCK = ROOT / "package-lock.json"
EXTRA = ROOT / "vendor/dependency-licenses/sources.json"
LICENSE_NAME = re.compile(r"^(licen[cs]e|copying|notice|copyright)([.-]|$)", re.I)
extra = json.loads(EXTRA.read_text()) if EXTRA.exists() else {}
lock = json.loads(LOCK.read_text())
notices = {}
entries = []


def add_notice(path, source=None):
    raw = path.read_bytes()
    digest = hashlib.sha256(raw).hexdigest()
    key = str(path.relative_to(ROOT))
    notice = notices.setdefault(digest, {"text": raw.decode("utf-8", errors="replace"), "sources": []})
    ref = source or key
    if ref not in notice["sources"]:
        notice["sources"].append(ref)
    return digest


for location, locked in sorted(lock["packages"].items()):
    if not location:
        continue
    directory = ROOT / location
    package_file = directory / "package.json"
    installed = package_file.is_file()
    package = json.loads(package_file.read_text()) if installed else {}
    name = package.get("name") or locked.get("name") or location.rsplit("node_modules/", 1)[-1]
    version = locked["version"]
    if installed and package.get("version") != version:
        raise SystemExit(f"Installed version differs from lock: {name}")
    item = {"name": name, "version": version, "license": locked.get("license", "UNKNOWN"), "location": location,
            "developmentOnly": bool(locked.get("dev")), "installed": installed,
            "repository": package.get("repository"), "noticeHashes": [], "rootNotice": False}
    if installed:
        for current, dirs, files in os.walk(directory):
            dirs[:] = [d for d in dirs if d != "node_modules"]
            for filename in files:
                if not LICENSE_NAME.match(filename):
                    continue
                path = Path(current) / filename
                if path.stat().st_size > 2_000_000 or path.suffix in [".js", ".map", ".ts"]:
                    continue
                item["noticeHashes"].append(add_notice(path))
                if path.parent == directory:
                    item["rootNotice"] = True
        upstream = extra.get(name + "@" + version)
        if upstream and upstream.get("status") in ["source-notice", "source-notice-review"]:
            source = ROOT / upstream["file"]
            if hashlib.sha256(source.read_bytes()).hexdigest() != upstream["sha256"]:
                raise SystemExit(f"Changed upstream notice: {name}")
            item["noticeHashes"].append(add_notice(source, upstream["source"]))
            item["upstreamNotice"] = upstream["source"]
            item["upstreamNoticeBasis"] = upstream.get("sourceBasis", "Exact source commit identified by the published package.")
            item["rootNotice"] = upstream["status"] == "source-notice"
            if upstream.get("reviewRequired"):
                item["noticeReview"] = upstream["reviewRequired"]
        # A few publishers place their complete notice in the initial source comment.
        if name == "esrecurse" and (directory / "esrecurse.js").is_file():
            header = (directory / "esrecurse.js").read_text().split("*/", 1)[0] + "*/"
            if "Redistribution and use" in header:
                digest = hashlib.sha256(header.encode()).hexdigest()
                notices[digest] = {"text": header, "sources": [location + "/esrecurse.js (initial license comment)"]}
                item["noticeHashes"].append(digest)
                item["rootNotice"] = True
        item["noticeHashes"] = sorted(set(item["noticeHashes"]))
        # Native sharp/libvips packages bundle libraries under additional terms.
        # Their repository's Apache license alone does not cover those libraries.
        if name.startswith("@img/sharp-libvips-") and (directory / "README.md").exists():
            item["noticeHashes"].append(add_notice(directory / "README.md"))
            item["additionalTerms"] = "The preserved package README lists LGPL and other bundled native-library licenses; its Apache wrapper notice is not the whole license set. Native binaries are not included in the website/handoff artifacts."
    entries.append(item)

for path in [ROOT / "vendor/shadcn-tailwind-4.13.0.LICENSE.md", ROOT / "build/sites-vite-plugin.LICENSE"]:
    if path.exists():
        add_notice(path)

installed_entries = [e for e in entries if e["installed"]]
missing = [e["name"] + "@" + e["version"] for e in installed_entries if not e["rootNotice"]]
report = {"generatedAt": datetime.now(timezone.utc).isoformat(), "packageLockSha256": hashlib.sha256(LOCK.read_bytes()).hexdigest(),
          "scope": "Declared licenses for every locked package; full notices supplied by installed packages or separately preserved exact-source notices. Optional packages absent on this OS are inventoried, not redistributed.",
          "lockedPackageRecords": len(entries), "installedPackageRecords": len(installed_entries),
          "declaredLicenseCounts": dict(sorted(Counter(e["license"] for e in entries).items())),
          "installedPackagesWithoutRootNotice": sorted(set(missing)), "packages": entries}
(ROOT / "docs/dependency-license-inventory.json").write_text(json.dumps(report, indent=2) + "\n")
lines = ["KOBAGS WEBSITE — THIRD-PARTY SOFTWARE NOTICES", "",
         "Generated from package-lock.json and installed publisher license files.",
         "Includes development tools as well as application dependencies; listing does not imply every package is served to visitors.",
         "Individual terms and copyright notices follow. Kobags identity, photographs, videos and product scans are separate proprietary assets.", "", "DEPENDENCY INDEX", ""]
for e in installed_entries:
    lines.append(f"{e['name']}@{e['version']} — declared license: {e['license']}")
    if e["noticeHashes"]:
        lines.append("Notices: " + ", ".join(h[:16] for h in e["noticeHashes"]))
    if e.get("upstreamNoticeBasis"):
        lines.append("Notice provenance: " + e["upstreamNoticeBasis"])
    if e.get("additionalTerms"):
        lines.append(e["additionalTerms"])
    if e.get("noticeReview"):
        lines.append("Notice review: " + e["noticeReview"])
    if not e["rootNotice"]:
        lines.append("Publisher package has no standalone root license text; declaration retained. See source repository/maintainer for complete terms.")
        lines.append("Repository: " + json.dumps(e["repository"]))
    lines.append("")
for digest, notice in sorted(notices.items()):
    lines.extend(["=" * 78, "NOTICE " + digest[:16], *notice["sources"], "", notice["text"].rstrip(), ""])
(ROOT / "public/documents/third-party-notices.txt").write_text("\n".join(lines), encoding="utf-8")
print(json.dumps({"locked": len(entries), "installed": len(installed_entries), "uniqueNotices": len(notices), "missingRootNotice": len(set(missing))}))
