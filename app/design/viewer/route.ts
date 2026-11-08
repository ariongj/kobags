import { referenceStudioDocument } from '@/lib/reference-studio-document';
import { requestStudioEnabled } from '@/lib/studio-request';

export async function GET(request: Request) {
  if (!(await requestStudioEnabled())) return Response.redirect(new URL('/products', request.url), 307);
  const preview = new URL(request.url).searchParams.get('preview') === '1';
  return new Response(referenceStudioDocument.replace('<html lang="en">', `<html lang="en"${preview ? ' data-embed="preview"' : ''}>`), {
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'private, no-store', 'X-Robots-Tag': 'noindex, nofollow' },
  });
}
