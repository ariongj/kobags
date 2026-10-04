"use client";
import { useState } from 'react';
import Link from 'next/link';

async function submit(endpoint:string,data:Record<string,unknown>) {
  const r=await fetch('/api/cms/'+endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
  const result=await r.json() as {error?:string};
  if(!r.ok)throw new Error(result.error||'Unable to sign in. Please try again.');
}
export function CmsAccess({loading,error,onSignedIn}:{loading:boolean;error:string;onSignedIn:()=>Promise<void>}) {
  const [busy,setBusy]=useState(false),[problem,setProblem]=useState(''),[show,setShow]=useState(false);
  const invitation=typeof window!=='undefined'?new URLSearchParams(location.search).get('invite')||'':'';
  return <main className="cms-shell cms-access"><div className="cms-access-card">
    <span className="cms-wordmark">KOBAGS <small>CMS</small></span>
    <h1>{invitation?'Set your password.':'Welcome back.'}</h1>
    <p>{invitation?'Activate your staff account with the email address on your invitation.':'Sign in to manage your website and customer inquiries.'}</p>
    {loading?<p role="status">Loading access…</p>:<form className="cms-login-form" onSubmit={async e=>{
      e.preventDefault();const f=new FormData(e.currentTarget);setProblem('');
      if(invitation&&f.get('password')!==f.get('confirm')){setProblem('The passwords do not match.');return;}
      setBusy(true);try{await submit(invitation?'claim':'login',{email:f.get('email'),password:f.get('password'),invite:invitation});if(invitation)history.replaceState(null,'','/cms');await onSignedIn();}catch(c){setProblem(c instanceof Error?c.message:'Unable to sign in.');}finally{setBusy(false);}
    }}>
      {(problem||error)&&<p className="cms-alert" role="alert">{problem||error}</p>}
      <label>Email address<input name="email" type="email" autoComplete="username" required maxLength={150} spellCheck={false} autoCapitalize="none"/></label>
      <label>Password<input name="password" type={show?'text':'password'} autoComplete={invitation?'new-password':'current-password'} minLength={invitation?14:undefined} maxLength={128} required/></label>
      {invitation&&<><small>Use at least 14 characters. A few unrelated words work well.</small><label>Confirm password<input name="confirm" type={show?'text':'password'} autoComplete="new-password" required maxLength={128}/></label></>}
      <button type="button" className="cms-text-button" aria-pressed={show} onClick={()=>setShow(!show)}>{show?'Hide password':'Show password'}</button>
      <button disabled={busy} type="submit">{busy?'Signing in…':invitation?'Activate account':'Sign in'}</button>
      {!invitation&&<small>Need access or a password reset? Contact your website administrator.</small>}
    </form>}
    <Link href="/">Back to the website</Link>
  </div></main>;
}
export function CmsAccount({email,onSignedOut}:{email:string;onSignedOut:()=>Promise<void>}) {
  const [busy,setBusy]=useState(false),[error,setError]=useState('');
  return <section className="cms-card cms-password-card"><h2>Your password</h2><p>{email}</p><form className="cms-login-form" onSubmit={async e=>{
    e.preventDefault();const f=new FormData(e.currentTarget);setError('');
    if(f.get('password')!==f.get('confirm')){setError('The new passwords do not match.');return;}
    setBusy(true);try{await submit('password',{currentPassword:f.get('current'),password:f.get('password')});await onSignedOut();}catch(c){setError(c instanceof Error?c.message:'Unable to change password.');}finally{setBusy(false);}
  }}>
    {error&&<p role="alert" className="cms-alert">{error}</p>}
    <input type="text" name="username" autoComplete="username" value={email} readOnly hidden/>
    <label>Current password<input name="current" type="password" autoComplete="current-password" required maxLength={128}/></label>
    <label>New password<input name="password" type="password" autoComplete="new-password" required minLength={14} maxLength={128}/></label>
    <label>Confirm new password<input name="confirm" type="password" autoComplete="new-password" required minLength={14} maxLength={128}/></label>
    <small>At least 14 characters. Changing your password signs out all sessions.</small>
    <button disabled={busy}>Change password and sign out</button>
  </form></section>;
}
