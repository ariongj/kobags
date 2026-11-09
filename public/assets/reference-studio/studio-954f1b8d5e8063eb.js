/*! QR Code Generator for JavaScript: Copyright (c) 2009 Kazuhiko Arase. MIT license. Full notices: /documents/third-party-notices.txt */
var af=Object.create;var Oh=Object.defineProperty;var of=Object.getOwnPropertyDescriptor;var lf=Object.getOwnPropertyNames;var cf=Object.getPrototypeOf,hf=Object.prototype.hasOwnProperty;var uf=(n,t)=>()=>{try{return t||n((t={exports:{}}).exports,t),t.exports}catch(e){throw t=0,e}};var df=(n,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of lf(t))!hf.call(n,s)&&s!==e&&Oh(n,s,{get:()=>t[s],enumerable:!(i=of(t,s))||i.enumerable});return n};var ff=(n,t,e)=>(e=n!=null?af(cf(n)):{},df(t||!n||!n.__esModule?Oh(e,"default",{value:n,enumerable:!0}):e,n));var zh=uf((Fh,kh)=>{var Bh=(function(){var n=function(w,M){var y=236,C=17,b=w,S=e[M],E=null,T=0,m=null,v=[],R={},L=function(U,F){T=b*4+17,E=(function(N){for(var Y=new Array(N),W=0;W<N;W+=1){Y[W]=new Array(N);for(var nt=0;nt<N;nt+=1)Y[W][nt]=null}return Y})(T),I(0,0),I(T-7,0),I(0,T-7),q(),B(),tt(U,F),b>=7&&z(U),m==null&&(m=Et(b,S,v)),ot(m,F)},I=function(U,F){for(var N=-1;N<=7;N+=1)if(!(U+N<=-1||T<=U+N))for(var Y=-1;Y<=7;Y+=1)F+Y<=-1||T<=F+Y||(0<=N&&N<=6&&(Y==0||Y==6)||0<=Y&&Y<=6&&(N==0||N==6)||2<=N&&N<=4&&2<=Y&&Y<=4?E[U+N][F+Y]=!0:E[U+N][F+Y]=!1)},k=function(){for(var U=0,F=0,N=0;N<8;N+=1){L(!0,N);var Y=s.getLostPoint(R);(N==0||U>Y)&&(U=Y,F=N)}return F},B=function(){for(var U=8;U<T-8;U+=1)E[U][6]==null&&(E[U][6]=U%2==0);for(var F=8;F<T-8;F+=1)E[6][F]==null&&(E[6][F]=F%2==0)},q=function(){for(var U=s.getPatternPosition(b),F=0;F<U.length;F+=1)for(var N=0;N<U.length;N+=1){var Y=U[F],W=U[N];if(E[Y][W]==null)for(var nt=-2;nt<=2;nt+=1)for(var ct=-2;ct<=2;ct+=1)nt==-2||nt==2||ct==-2||ct==2||nt==0&&ct==0?E[Y+nt][W+ct]=!0:E[Y+nt][W+ct]=!1}},z=function(U){for(var F=s.getBCHTypeNumber(b),N=0;N<18;N+=1){var Y=!U&&(F>>N&1)==1;E[Math.floor(N/3)][N%3+T-8-3]=Y}for(var N=0;N<18;N+=1){var Y=!U&&(F>>N&1)==1;E[N%3+T-8-3][Math.floor(N/3)]=Y}},tt=function(U,F){for(var N=S<<3|F,Y=s.getBCHTypeInfo(N),W=0;W<15;W+=1){var nt=!U&&(Y>>W&1)==1;W<6?E[W][8]=nt:W<8?E[W+1][8]=nt:E[T-15+W][8]=nt}for(var W=0;W<15;W+=1){var nt=!U&&(Y>>W&1)==1;W<8?E[8][T-W-1]=nt:W<9?E[8][15-W-1+1]=nt:E[8][15-W-1]=nt}E[T-8][8]=!U},ot=function(U,F){for(var N=-1,Y=T-1,W=7,nt=0,ct=s.getMaskFunction(F),at=T-1;at>0;at-=2)for(at==6&&(at-=1);;){for(var O=0;O<2;O+=1)if(E[Y][at-O]==null){var Tt=!1;nt<U.length&&(Tt=(U[nt]>>>W&1)==1);var ht=ct(Y,at-O);ht&&(Tt=!Tt),E[Y][at-O]=Tt,W-=1,W==-1&&(nt+=1,W=7)}if(Y+=N,Y<0||T<=Y){Y-=N,N=-N;break}}},ut=function(U,F){for(var N=0,Y=0,W=0,nt=new Array(F.length),ct=new Array(F.length),at=0;at<F.length;at+=1){var O=F[at].dataCount,Tt=F[at].totalCount-O;Y=Math.max(Y,O),W=Math.max(W,Tt),nt[at]=new Array(O);for(var ht=0;ht<nt[at].length;ht+=1)nt[at][ht]=255&U.getBuffer()[ht+N];N+=O;var Ct=s.getErrorCorrectPolynomial(Tt),mt=a(nt[at],Ct.getLength()-1),Dt=mt.mod(Ct);ct[at]=new Array(Ct.getLength()-1);for(var ht=0;ht<ct[at].length;ht+=1){var Rt=ht+Dt.getLength()-ct[at].length;ct[at][ht]=Rt>=0?Dt.getAt(Rt):0}}for(var D=0,ht=0;ht<F.length;ht+=1)D+=F[ht].totalCount;for(var x=new Array(D),V=0,ht=0;ht<Y;ht+=1)for(var at=0;at<F.length;at+=1)ht<nt[at].length&&(x[V]=nt[at][ht],V+=1);for(var ht=0;ht<W;ht+=1)for(var at=0;at<F.length;at+=1)ht<ct[at].length&&(x[V]=ct[at][ht],V+=1);return x},Et=function(U,F,N){for(var Y=o.getRSBlocks(U,F),W=l(),nt=0;nt<N.length;nt+=1){var ct=N[nt];W.put(ct.getMode(),4),W.put(ct.getLength(),s.getLengthInBits(ct.getMode(),U)),ct.write(W)}for(var at=0,nt=0;nt<Y.length;nt+=1)at+=Y[nt].dataCount;if(W.getLengthInBits()>at*8)throw"code length overflow. ("+W.getLengthInBits()+">"+at*8+")";for(W.getLengthInBits()+4<=at*8&&W.put(0,4);W.getLengthInBits()%8!=0;)W.putBit(!1);for(;!(W.getLengthInBits()>=at*8||(W.put(y,8),W.getLengthInBits()>=at*8));)W.put(C,8);return ut(W,Y)};R.addData=function(U,F){F=F||"Byte";var N=null;switch(F){case"Numeric":N=c(U);break;case"Alphanumeric":N=h(U);break;case"Byte":N=u(U);break;case"Kanji":N=f(U);break;default:throw"mode:"+F}v.push(N),m=null},R.isDark=function(U,F){if(U<0||T<=U||F<0||T<=F)throw U+","+F;return E[U][F]},R.getModuleCount=function(){return T},R.make=function(){if(b<1){for(var U=1;U<40;U++){for(var F=o.getRSBlocks(U,S),N=l(),Y=0;Y<v.length;Y++){var W=v[Y];N.put(W.getMode(),4),N.put(W.getLength(),s.getLengthInBits(W.getMode(),U)),W.write(N)}for(var nt=0,Y=0;Y<F.length;Y++)nt+=F[Y].dataCount;if(N.getLengthInBits()<=nt*8)break}b=U}L(!1,k())},R.createTableTag=function(U,F){U=U||2,F=typeof F>"u"?U*4:F;var N="";N+='<table style="',N+=" border-width: 0px; border-style: none;",N+=" border-collapse: collapse;",N+=" padding: 0px; margin: "+F+"px;",N+='">',N+="<tbody>";for(var Y=0;Y<R.getModuleCount();Y+=1){N+="<tr>";for(var W=0;W<R.getModuleCount();W+=1)N+='<td style="',N+=" border-width: 0px; border-style: none;",N+=" border-collapse: collapse;",N+=" padding: 0px; margin: 0px;",N+=" width: "+U+"px;",N+=" height: "+U+"px;",N+=" background-color: ",N+=R.isDark(Y,W)?"#000000":"#ffffff",N+=";",N+='"/>';N+="</tr>"}return N+="</tbody>",N+="</table>",N},R.createSvgTag=function(U,F,N,Y){var W={};typeof arguments[0]=="object"&&(W=arguments[0],U=W.cellSize,F=W.margin,N=W.alt,Y=W.title),U=U||2,F=typeof F>"u"?U*4:F,N=typeof N=="string"?{text:N}:N||{},N.text=N.text||null,N.id=N.text?N.id||"qrcode-description":null,Y=typeof Y=="string"?{text:Y}:Y||{},Y.text=Y.text||null,Y.id=Y.text?Y.id||"qrcode-title":null;var nt=R.getModuleCount()*U+F*2,ct,at,O,Tt,ht="",Ct;for(Ct="l"+U+",0 0,"+U+" -"+U+",0 0,-"+U+"z ",ht+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',ht+=W.scalable?"":' width="'+nt+'px" height="'+nt+'px"',ht+=' viewBox="0 0 '+nt+" "+nt+'" ',ht+=' preserveAspectRatio="xMinYMin meet"',ht+=Y.text||N.text?' role="img" aria-labelledby="'+J([Y.id,N.id].join(" ").trim())+'"':"",ht+=">",ht+=Y.text?'<title id="'+J(Y.id)+'">'+J(Y.text)+"</title>":"",ht+=N.text?'<description id="'+J(N.id)+'">'+J(N.text)+"</description>":"",ht+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',ht+='<path d="',O=0;O<R.getModuleCount();O+=1)for(Tt=O*U+F,ct=0;ct<R.getModuleCount();ct+=1)R.isDark(O,ct)&&(at=ct*U+F,ht+="M"+at+","+Tt+Ct);return ht+='" stroke="transparent" fill="black"/>',ht+="</svg>",ht},R.createDataURL=function(U,F){U=U||2,F=typeof F>"u"?U*4:F;var N=R.getModuleCount()*U+F*2,Y=F,W=N-F;return g(N,N,function(nt,ct){if(Y<=nt&&nt<W&&Y<=ct&&ct<W){var at=Math.floor((nt-Y)/U),O=Math.floor((ct-Y)/U);return R.isDark(O,at)?0:1}else return 1})},R.createImgTag=function(U,F,N){U=U||2,F=typeof F>"u"?U*4:F;var Y=R.getModuleCount()*U+F*2,W="";return W+="<img",W+=' src="',W+=R.createDataURL(U,F),W+='"',W+=' width="',W+=Y,W+='"',W+=' height="',W+=Y,W+='"',N&&(W+=' alt="',W+=J(N),W+='"'),W+="/>",W};var J=function(U){for(var F="",N=0;N<U.length;N+=1){var Y=U.charAt(N);switch(Y){case"<":F+="&lt;";break;case">":F+="&gt;";break;case"&":F+="&amp;";break;case'"':F+="&quot;";break;default:F+=Y;break}}return F},H=function(U){var F=1;U=typeof U>"u"?F*2:U;var N=R.getModuleCount()*F+U*2,Y=U,W=N-U,nt,ct,at,O,Tt,ht={"\u2588\u2588":"\u2588","\u2588 ":"\u2580"," \u2588":"\u2584","  ":" "},Ct={"\u2588\u2588":"\u2580","\u2588 ":"\u2580"," \u2588":" ","  ":" "},mt="";for(nt=0;nt<N;nt+=2){for(at=Math.floor((nt-Y)/F),O=Math.floor((nt+1-Y)/F),ct=0;ct<N;ct+=1)Tt="\u2588",Y<=ct&&ct<W&&Y<=nt&&nt<W&&R.isDark(at,Math.floor((ct-Y)/F))&&(Tt=" "),Y<=ct&&ct<W&&Y<=nt+1&&nt+1<W&&R.isDark(O,Math.floor((ct-Y)/F))?Tt+=" ":Tt+="\u2588",mt+=U<1&&nt+1>=W?Ct[Tt]:ht[Tt];mt+=`
`}return N%2&&U>0?mt.substring(0,mt.length-N-1)+Array(N+1).join("\u2580"):mt.substring(0,mt.length-1)};return R.createASCII=function(U,F){if(U=U||1,U<2)return H(F);U-=1,F=typeof F>"u"?U*2:F;var N=R.getModuleCount()*U+F*2,Y=F,W=N-F,nt,ct,at,O,Tt=Array(U+1).join("\u2588\u2588"),ht=Array(U+1).join("  "),Ct="",mt="";for(nt=0;nt<N;nt+=1){for(at=Math.floor((nt-Y)/U),mt="",ct=0;ct<N;ct+=1)O=1,Y<=ct&&ct<W&&Y<=nt&&nt<W&&R.isDark(at,Math.floor((ct-Y)/U))&&(O=0),mt+=O?Tt:ht;for(at=0;at<U;at+=1)Ct+=mt+`
`}return Ct.substring(0,Ct.length-1)},R.renderTo2dContext=function(U,F){F=F||2;for(var N=R.getModuleCount(),Y=0;Y<N;Y++)for(var W=0;W<N;W++)U.fillStyle=R.isDark(Y,W)?"black":"white",U.fillRect(Y*F,W*F,F,F)},R};n.stringToBytesFuncs={default:function(w){for(var M=[],y=0;y<w.length;y+=1){var C=w.charCodeAt(y);M.push(C&255)}return M}},n.stringToBytes=n.stringToBytesFuncs.default,n.createStringToBytes=function(w,M){var y=(function(){for(var b=_(w),S=function(){var B=b.read();if(B==-1)throw"eof";return B},E=0,T={};;){var m=b.read();if(m==-1)break;var v=S(),R=S(),L=S(),I=String.fromCharCode(m<<8|v),k=R<<8|L;T[I]=k,E+=1}if(E!=M)throw E+" != "+M;return T})(),C=63;return function(b){for(var S=[],E=0;E<b.length;E+=1){var T=b.charCodeAt(E);if(T<128)S.push(T);else{var m=y[b.charAt(E)];typeof m=="number"?(m&255)==m?S.push(m):(S.push(m>>>8),S.push(m&255)):S.push(C)}}return S}};var t={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},e={L:1,M:0,Q:3,H:2},i={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},s=(function(){var w=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],M=1335,y=7973,C=21522,b={},S=function(E){for(var T=0;E!=0;)T+=1,E>>>=1;return T};return b.getBCHTypeInfo=function(E){for(var T=E<<10;S(T)-S(M)>=0;)T^=M<<S(T)-S(M);return(E<<10|T)^C},b.getBCHTypeNumber=function(E){for(var T=E<<12;S(T)-S(y)>=0;)T^=y<<S(T)-S(y);return E<<12|T},b.getPatternPosition=function(E){return w[E-1]},b.getMaskFunction=function(E){switch(E){case i.PATTERN000:return function(T,m){return(T+m)%2==0};case i.PATTERN001:return function(T,m){return T%2==0};case i.PATTERN010:return function(T,m){return m%3==0};case i.PATTERN011:return function(T,m){return(T+m)%3==0};case i.PATTERN100:return function(T,m){return(Math.floor(T/2)+Math.floor(m/3))%2==0};case i.PATTERN101:return function(T,m){return T*m%2+T*m%3==0};case i.PATTERN110:return function(T,m){return(T*m%2+T*m%3)%2==0};case i.PATTERN111:return function(T,m){return(T*m%3+(T+m)%2)%2==0};default:throw"bad maskPattern:"+E}},b.getErrorCorrectPolynomial=function(E){for(var T=a([1],0),m=0;m<E;m+=1)T=T.multiply(a([1,r.gexp(m)],0));return T},b.getLengthInBits=function(E,T){if(1<=T&&T<10)switch(E){case t.MODE_NUMBER:return 10;case t.MODE_ALPHA_NUM:return 9;case t.MODE_8BIT_BYTE:return 8;case t.MODE_KANJI:return 8;default:throw"mode:"+E}else if(T<27)switch(E){case t.MODE_NUMBER:return 12;case t.MODE_ALPHA_NUM:return 11;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 10;default:throw"mode:"+E}else if(T<41)switch(E){case t.MODE_NUMBER:return 14;case t.MODE_ALPHA_NUM:return 13;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 12;default:throw"mode:"+E}else throw"type:"+T},b.getLostPoint=function(E){for(var T=E.getModuleCount(),m=0,v=0;v<T;v+=1)for(var R=0;R<T;R+=1){for(var L=0,I=E.isDark(v,R),k=-1;k<=1;k+=1)if(!(v+k<0||T<=v+k))for(var B=-1;B<=1;B+=1)R+B<0||T<=R+B||k==0&&B==0||I==E.isDark(v+k,R+B)&&(L+=1);L>5&&(m+=3+L-5)}for(var v=0;v<T-1;v+=1)for(var R=0;R<T-1;R+=1){var q=0;E.isDark(v,R)&&(q+=1),E.isDark(v+1,R)&&(q+=1),E.isDark(v,R+1)&&(q+=1),E.isDark(v+1,R+1)&&(q+=1),(q==0||q==4)&&(m+=3)}for(var v=0;v<T;v+=1)for(var R=0;R<T-6;R+=1)E.isDark(v,R)&&!E.isDark(v,R+1)&&E.isDark(v,R+2)&&E.isDark(v,R+3)&&E.isDark(v,R+4)&&!E.isDark(v,R+5)&&E.isDark(v,R+6)&&(m+=40);for(var R=0;R<T;R+=1)for(var v=0;v<T-6;v+=1)E.isDark(v,R)&&!E.isDark(v+1,R)&&E.isDark(v+2,R)&&E.isDark(v+3,R)&&E.isDark(v+4,R)&&!E.isDark(v+5,R)&&E.isDark(v+6,R)&&(m+=40);for(var z=0,R=0;R<T;R+=1)for(var v=0;v<T;v+=1)E.isDark(v,R)&&(z+=1);var tt=Math.abs(100*z/T/T-50)/5;return m+=tt*10,m},b})(),r=(function(){for(var w=new Array(256),M=new Array(256),y=0;y<8;y+=1)w[y]=1<<y;for(var y=8;y<256;y+=1)w[y]=w[y-4]^w[y-5]^w[y-6]^w[y-8];for(var y=0;y<255;y+=1)M[w[y]]=y;var C={};return C.glog=function(b){if(b<1)throw"glog("+b+")";return M[b]},C.gexp=function(b){for(;b<0;)b+=255;for(;b>=256;)b-=255;return w[b]},C})();function a(w,M){if(typeof w.length>"u")throw w.length+"/"+M;var y=(function(){for(var b=0;b<w.length&&w[b]==0;)b+=1;for(var S=new Array(w.length-b+M),E=0;E<w.length-b;E+=1)S[E]=w[E+b];return S})(),C={};return C.getAt=function(b){return y[b]},C.getLength=function(){return y.length},C.multiply=function(b){for(var S=new Array(C.getLength()+b.getLength()-1),E=0;E<C.getLength();E+=1)for(var T=0;T<b.getLength();T+=1)S[E+T]^=r.gexp(r.glog(C.getAt(E))+r.glog(b.getAt(T)));return a(S,0)},C.mod=function(b){if(C.getLength()-b.getLength()<0)return C;for(var S=r.glog(C.getAt(0))-r.glog(b.getAt(0)),E=new Array(C.getLength()),T=0;T<C.getLength();T+=1)E[T]=C.getAt(T);for(var T=0;T<b.getLength();T+=1)E[T]^=r.gexp(r.glog(b.getAt(T))+S);return a(E,0).mod(b)},C}var o=(function(){var w=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],M=function(b,S){var E={};return E.totalCount=b,E.dataCount=S,E},y={},C=function(b,S){switch(S){case e.L:return w[(b-1)*4+0];case e.M:return w[(b-1)*4+1];case e.Q:return w[(b-1)*4+2];case e.H:return w[(b-1)*4+3];default:return}};return y.getRSBlocks=function(b,S){var E=C(b,S);if(typeof E>"u")throw"bad rs block @ typeNumber:"+b+"/errorCorrectionLevel:"+S;for(var T=E.length/3,m=[],v=0;v<T;v+=1)for(var R=E[v*3+0],L=E[v*3+1],I=E[v*3+2],k=0;k<R;k+=1)m.push(M(L,I));return m},y})(),l=function(){var w=[],M=0,y={};return y.getBuffer=function(){return w},y.getAt=function(C){var b=Math.floor(C/8);return(w[b]>>>7-C%8&1)==1},y.put=function(C,b){for(var S=0;S<b;S+=1)y.putBit((C>>>b-S-1&1)==1)},y.getLengthInBits=function(){return M},y.putBit=function(C){var b=Math.floor(M/8);w.length<=b&&w.push(0),C&&(w[b]|=128>>>M%8),M+=1},y},c=function(w){var M=t.MODE_NUMBER,y=w,C={};C.getMode=function(){return M},C.getLength=function(E){return y.length},C.write=function(E){for(var T=y,m=0;m+2<T.length;)E.put(b(T.substring(m,m+3)),10),m+=3;m<T.length&&(T.length-m==1?E.put(b(T.substring(m,m+1)),4):T.length-m==2&&E.put(b(T.substring(m,m+2)),7))};var b=function(E){for(var T=0,m=0;m<E.length;m+=1)T=T*10+S(E.charAt(m));return T},S=function(E){if("0"<=E&&E<="9")return E.charCodeAt(0)-48;throw"illegal char :"+E};return C},h=function(w){var M=t.MODE_ALPHA_NUM,y=w,C={};C.getMode=function(){return M},C.getLength=function(S){return y.length},C.write=function(S){for(var E=y,T=0;T+1<E.length;)S.put(b(E.charAt(T))*45+b(E.charAt(T+1)),11),T+=2;T<E.length&&S.put(b(E.charAt(T)),6)};var b=function(S){if("0"<=S&&S<="9")return S.charCodeAt(0)-48;if("A"<=S&&S<="Z")return S.charCodeAt(0)-65+10;switch(S){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+S}};return C},u=function(w){var M=t.MODE_8BIT_BYTE,y=w,C=n.stringToBytes(w),b={};return b.getMode=function(){return M},b.getLength=function(S){return C.length},b.write=function(S){for(var E=0;E<C.length;E+=1)S.put(C[E],8)},b},f=function(w){var M=t.MODE_KANJI,y=w,C=n.stringToBytesFuncs.SJIS;if(!C)throw"sjis not supported.";(function(E,T){var m=C(E);if(m.length!=2||(m[0]<<8|m[1])!=T)throw"sjis not supported."})("\u53CB",38726);var b=C(w),S={};return S.getMode=function(){return M},S.getLength=function(E){return~~(b.length/2)},S.write=function(E){for(var T=b,m=0;m+1<T.length;){var v=(255&T[m])<<8|255&T[m+1];if(33088<=v&&v<=40956)v-=33088;else if(57408<=v&&v<=60351)v-=49472;else throw"illegal char at "+(m+1)+"/"+v;v=(v>>>8&255)*192+(v&255),E.put(v,13),m+=2}if(m<T.length)throw"illegal char at "+(m+1)},S},d=function(){var w=[],M={};return M.writeByte=function(y){w.push(y&255)},M.writeShort=function(y){M.writeByte(y),M.writeByte(y>>>8)},M.writeBytes=function(y,C,b){C=C||0,b=b||y.length;for(var S=0;S<b;S+=1)M.writeByte(y[S+C])},M.writeString=function(y){for(var C=0;C<y.length;C+=1)M.writeByte(y.charCodeAt(C))},M.toByteArray=function(){return w},M.toString=function(){var y="";y+="[";for(var C=0;C<w.length;C+=1)C>0&&(y+=","),y+=w[C];return y+="]",y},M},A=function(){var w=0,M=0,y=0,C="",b={},S=function(T){C+=String.fromCharCode(E(T&63))},E=function(T){if(!(T<0)){if(T<26)return 65+T;if(T<52)return 97+(T-26);if(T<62)return 48+(T-52);if(T==62)return 43;if(T==63)return 47}throw"n:"+T};return b.writeByte=function(T){for(w=w<<8|T&255,M+=8,y+=1;M>=6;)S(w>>>M-6),M-=6},b.flush=function(){if(M>0&&(S(w<<6-M),w=0,M=0),y%3!=0)for(var T=3-y%3,m=0;m<T;m+=1)C+="="},b.toString=function(){return C},b},_=function(w){var M=w,y=0,C=0,b=0,S={};S.read=function(){for(;b<8;){if(y>=M.length){if(b==0)return-1;throw"unexpected end of file./"+b}var T=M.charAt(y);if(y+=1,T=="=")return b=0,-1;if(T.match(/^\s$/))continue;C=C<<6|E(T.charCodeAt(0)),b+=6}var m=C>>>b-8&255;return b-=8,m};var E=function(T){if(65<=T&&T<=90)return T-65;if(97<=T&&T<=122)return T-97+26;if(48<=T&&T<=57)return T-48+52;if(T==43)return 62;if(T==47)return 63;throw"c:"+T};return S},p=function(w,M){var y=w,C=M,b=new Array(w*M),S={};S.setPixel=function(v,R,L){b[R*y+v]=L},S.write=function(v){v.writeString("GIF87a"),v.writeShort(y),v.writeShort(C),v.writeByte(128),v.writeByte(0),v.writeByte(0),v.writeByte(0),v.writeByte(0),v.writeByte(0),v.writeByte(255),v.writeByte(255),v.writeByte(255),v.writeString(","),v.writeShort(0),v.writeShort(0),v.writeShort(y),v.writeShort(C),v.writeByte(0);var R=2,L=T(R);v.writeByte(R);for(var I=0;L.length-I>255;)v.writeByte(255),v.writeBytes(L,I,255),I+=255;v.writeByte(L.length-I),v.writeBytes(L,I,L.length-I),v.writeByte(0),v.writeString(";")};var E=function(v){var R=v,L=0,I=0,k={};return k.write=function(B,q){if(B>>>q)throw"length over";for(;L+q>=8;)R.writeByte(255&(B<<L|I)),q-=8-L,B>>>=8-L,I=0,L=0;I=B<<L|I,L=L+q},k.flush=function(){L>0&&R.writeByte(I)},k},T=function(v){for(var R=1<<v,L=(1<<v)+1,I=v+1,k=m(),B=0;B<R;B+=1)k.add(String.fromCharCode(B));k.add(String.fromCharCode(R)),k.add(String.fromCharCode(L));var q=d(),z=E(q);z.write(R,I);var tt=0,ot=String.fromCharCode(b[tt]);for(tt+=1;tt<b.length;){var ut=String.fromCharCode(b[tt]);tt+=1,k.contains(ot+ut)?ot=ot+ut:(z.write(k.indexOf(ot),I),k.size()<4095&&(k.size()==1<<I&&(I+=1),k.add(ot+ut)),ot=ut)}return z.write(k.indexOf(ot),I),z.write(L,I),z.flush(),q.toByteArray()},m=function(){var v={},R=0,L={};return L.add=function(I){if(L.contains(I))throw"dup key:"+I;v[I]=R,R+=1},L.size=function(){return R},L.indexOf=function(I){return v[I]},L.contains=function(I){return typeof v[I]<"u"},L};return S},g=function(w,M,y){for(var C=p(w,M),b=0;b<M;b+=1)for(var S=0;S<w;S+=1)C.setPixel(S,b,y(S,b));var E=d();C.write(E);for(var T=A(),m=E.toByteArray(),v=0;v<m.length;v+=1)T.writeByte(m[v]);return T.flush(),"data:image/gif;base64,"+T};return n})();(function(){Bh.stringToBytesFuncs["UTF-8"]=function(n){function t(e){for(var i=[],s=0;s<e.length;s++){var r=e.charCodeAt(s);r<128?i.push(r):r<2048?i.push(192|r>>6,128|r&63):r<55296||r>=57344?i.push(224|r>>12,128|r>>6&63,128|r&63):(s++,r=65536+((r&1023)<<10|e.charCodeAt(s)&1023),i.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63))}return i}return t(n)}})();(function(n){typeof define=="function"&&define.amd?define([],n):typeof Fh=="object"&&(kh.exports=n())})(function(){return Bh})});var Pd=ff(zh());/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */var Yi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Ki={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},pf=0,Hh=1,mf=2;var Ba=1,gf=2,Jn=3,zn=0,ke=1,Je=2,_e=0,bs=1,Vh=2,Gh=3,Wh=4,Tc=5,Mn=100,Af=101,vf=102,xf=103,yf=104,zs=200,_f=201,Mf=202,bf=203,al=204,ol=205,Fa=206,wf=207,ka=208,Sf=209,Ef=210,Tf=211,Cf=212,Rf=213,Pf=214,ll=0,cl=1,hl=2,Ts=3,ul=4,dl=5,fl=6,pl=7,Wu=0,If=1,Df=2,Ai=0,Cc=1,Rc=2,Pc=3,Ic=4,Uf=5,Dc=6,br=7;var qu=300,Cs=301,Rs=302,ml=303,gl=304,za=306,fn=1e3,$n=1001,Al=1002,Fe=1003,Lf=1004;var zr=1005;var In=1006,To=1007;var Vi=1008;var Dn=1009,Xu=1010,Yu=1011,pr=1012,Uc=1013,Gi=1014,ti=1015,bn=1016,Lc=1017,Nc=1018,vi=1020,Ku=35902,ju=1021,Zu=1022,dn=1023,Qu=1024,Ju=1025,ws=1026,xi=1027,$u=1028,Oc=1029,td=1030,Bc=1031;var Fc=1033,ca=33776,ha=33777,ua=33778,da=33779,vl=35840,xl=35841,yl=35842,_l=35843,Ml=36196,bl=37492,wl=37496,Sl=37808,El=37809,Tl=37810,Cl=37811,Rl=37812,Pl=37813,Il=37814,Dl=37815,Ul=37816,Ll=37817,Nl=37818,Ol=37819,Bl=37820,Fl=37821,fa=36492,kl=36494,zl=36495,ed=36283,Hl=36284,Vl=36285,Gl=36286;var ma=2300,Wl=2301,Co=2302,qh=2400,Xh=2401,Yh=2402;var Nf=3200,kc=3201;var zc=0,Of=1,gi="",Ze="srgb",_i="srgb-linear",Hc="display-p3",Ha="display-p3-linear",ga="linear",he="srgb",Aa="rec709",va="p3";var os=7680;var Kh=519,Bf=512,Ff=513,kf=514,nd=515,zf=516,Hf=517,Vf=518,Gf=519,jh=35044;var Zh="300 es",ei=2e3,xa=2001,ii=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let i=this._listeners[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},He=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Qh=1234567,cr=Math.PI/180,mr=180/Math.PI;function Hs(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(He[n&255]+He[n>>8&255]+He[n>>16&255]+He[n>>24&255]+"-"+He[t&255]+He[t>>8&255]+"-"+He[t>>16&15|64]+He[t>>24&255]+"-"+He[e&63|128]+He[e>>8&255]+"-"+He[e>>16&255]+He[e>>24&255]+He[i&255]+He[i>>8&255]+He[i>>16&255]+He[i>>24&255]).toLowerCase()}function Ee(n,t,e){return Math.max(t,Math.min(e,n))}function Vc(n,t){return(n%t+t)%t}function Wf(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function qf(n,t,e){return n!==t?(e-n)/(t-n):0}function hr(n,t,e){return(1-e)*n+e*t}function Xf(n,t,e,i){return hr(n,t,1-Math.exp(-e*i))}function Yf(n,t=1){return t-Math.abs(Vc(n,t*2)-t)}function Kf(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function jf(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function Zf(n,t){return n+Math.floor(Math.random()*(t-n+1))}function Qf(n,t){return n+Math.random()*(t-n)}function Jf(n){return n*(.5-Math.random())}function $f(n){n!==void 0&&(Qh=n);let t=Qh+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function tp(n){return n*cr}function ep(n){return n*mr}function np(n){return(n&n-1)===0&&n!==0}function ip(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function sp(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function rp(n,t,e,i,s){let r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+i)/2),h=a((t+i)/2),u=r((t-i)/2),f=a((t-i)/2),d=r((i-t)/2),A=a((i-t)/2);switch(s){case"XYX":n.set(o*h,l*u,l*f,o*c);break;case"YZY":n.set(l*f,o*h,l*u,o*c);break;case"ZXZ":n.set(l*u,l*f,o*h,o*c);break;case"XZX":n.set(o*h,l*A,l*d,o*c);break;case"YXY":n.set(l*d,o*h,l*A,o*c);break;case"ZYZ":n.set(l*A,l*d,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function _s(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Ke(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var wr={DEG2RAD:cr,RAD2DEG:mr,generateUUID:Hs,clamp:Ee,euclideanModulo:Vc,mapLinear:Wf,inverseLerp:qf,lerp:hr,damp:Xf,pingpong:Yf,smoothstep:Kf,smootherstep:jf,randInt:Zf,randFloat:Qf,randFloatSpread:Jf,seededRandom:$f,degToRad:tp,radToDeg:ep,isPowerOfTwo:np,ceilPowerOfTwo:ip,floorPowerOfTwo:sp,setQuaternionFromProperEuler:rp,normalize:Ke,denormalize:_s},At=class n{constructor(t=0,e=0){n.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Ee(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Wt=class n{constructor(t,e,i,s,r,a,o,l,c){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c)}set(t,e,i,s,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],u=i[7],f=i[2],d=i[5],A=i[8],_=s[0],p=s[3],g=s[6],w=s[1],M=s[4],y=s[7],C=s[2],b=s[5],S=s[8];return r[0]=a*_+o*w+l*C,r[3]=a*p+o*M+l*b,r[6]=a*g+o*y+l*S,r[1]=c*_+h*w+u*C,r[4]=c*p+h*M+u*b,r[7]=c*g+h*y+u*S,r[2]=f*_+d*w+A*C,r[5]=f*p+d*M+A*b,r[8]=f*g+d*y+A*S,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-i*r*h+i*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,f=o*l-h*r,d=c*r-a*l,A=e*u+i*f+s*d;if(A===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/A;return t[0]=u*_,t[1]=(s*c-h*i)*_,t[2]=(o*i-s*a)*_,t[3]=f*_,t[4]=(h*e-s*l)*_,t[5]=(s*r-o*e)*_,t[6]=d*_,t[7]=(i*l-c*e)*_,t[8]=(a*e-i*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Ro.makeScale(t,e)),this}rotate(t){return this.premultiply(Ro.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ro.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Ro=new Wt;function id(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function ya(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function ap(){let n=ya("canvas");return n.style.display="block",n}var Jh={};function pa(n){n in Jh||(Jh[n]=!0,console.warn(n))}function op(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function lp(n){let t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function cp(n){let t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var $h=new Wt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),tu=new Wt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ir={[_i]:{transfer:ga,primaries:Aa,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n,fromReference:n=>n},[Ze]:{transfer:he,primaries:Aa,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Ha]:{transfer:ga,primaries:va,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.applyMatrix3(tu),fromReference:n=>n.applyMatrix3($h)},[Hc]:{transfer:he,primaries:va,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.convertSRGBToLinear().applyMatrix3(tu),fromReference:n=>n.applyMatrix3($h).convertLinearToSRGB()}},hp=new Set([_i,Ha]),Jt={enabled:!0,_workingColorSpace:_i,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!hp.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,t,e){if(this.enabled===!1||t===e||!t||!e)return n;let i=ir[t].toReference,s=ir[e].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,t){return this.convert(n,this._workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this._workingColorSpace)},getPrimaries:function(n){return ir[n].primaries},getTransfer:function(n){return n===gi?ga:ir[n].transfer},getLuminanceCoefficients:function(n,t=this._workingColorSpace){return n.fromArray(ir[t].luminanceCoefficients)}};function Ss(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Po(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var ls,ql=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ls===void 0&&(ls=ya("canvas")),ls.width=t.width,ls.height=t.height;let i=ls.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=ls}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=ya("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ss(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Ss(e[i]/255)*255):e[i]=Ss(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},up=0,Ps=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:up++}),this.uuid=Hs(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Io(s[a].image)):r.push(Io(s[a]))}else r=Io(s);i.url=r}return e||(t.images[this.uuid]=i),i}};function Io(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?ql.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var dp=0,sn=class n extends ii{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=$n,s=$n,r=In,a=Vi,o=dn,l=Dn,c=n.DEFAULT_ANISOTROPY,h=gi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:dp++}),this.uuid=Hs(),this.name="",this.source=new Ps(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new At(0,0),this.repeat=new At(1,1),this.center=new At(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Wt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==qu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case fn:t.x=t.x-Math.floor(t.x);break;case $n:t.x=t.x<0?0:1;break;case Al:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case fn:t.y=t.y-Math.floor(t.y);break;case $n:t.y=t.y<0?0:1;break;case Al:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};sn.DEFAULT_IMAGE=null;sn.DEFAULT_MAPPING=qu;sn.DEFAULT_ANISOTROPY=1;var xe=class n{constructor(t=0,e=0,i=0,s=1){n.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r,l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],A=l[9],_=l[2],p=l[6],g=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(A-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(A+p)<.1&&Math.abs(c+d+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let M=(c+1)/2,y=(d+1)/2,C=(g+1)/2,b=(h+f)/4,S=(u+_)/4,E=(A+p)/4;return M>y&&M>C?M<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(M),s=b/i,r=S/i):y>C?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=b/s,r=E/s):C<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),i=S/r,s=E/r),this.set(i,s,r,e),this}let w=Math.sqrt((p-A)*(p-A)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(w)<.001&&(w=1),this.x=(p-A)/w,this.y=(u-_)/w,this.z=(f-h)/w,this.w=Math.acos((c+d+g-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Xl=class extends ii{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new xe(0,0,t,e),this.scissorTest=!1,this.viewport=new xe(0,0,t,e);let s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:In,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);let r=new sn(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];let a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new Ps(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ge=class extends Xl{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},_a=class extends sn{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Fe,this.minFilter=Fe,this.wrapR=$n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Yl=class extends sn{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Fe,this.minFilter=Fe,this.wrapR=$n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Un=class{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let l=i[s+0],c=i[s+1],h=i[s+2],u=i[s+3],f=r[a+0],d=r[a+1],A=r[a+2],_=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=f,t[e+1]=d,t[e+2]=A,t[e+3]=_;return}if(u!==_||l!==f||c!==d||h!==A){let p=1-o,g=l*f+c*d+h*A+u*_,w=g>=0?1:-1,M=1-g*g;if(M>Number.EPSILON){let C=Math.sqrt(M),b=Math.atan2(C,g*w);p=Math.sin(p*b)/C,o=Math.sin(o*b)/C}let y=o*w;if(l=l*p+f*y,c=c*p+d*y,h=h*p+A*y,u=u*p+_*y,p===1-o){let C=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=C,c*=C,h*=C,u*=C}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,a){let o=i[s],l=i[s+1],c=i[s+2],h=i[s+3],u=r[a],f=r[a+1],d=r[a+2],A=r[a+3];return t[e]=o*A+h*u+l*d-c*f,t[e+1]=l*A+h*f+c*u-o*d,t[e+2]=c*A+h*d+o*f-l*u,t[e+3]=h*A-o*u-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(s/2),u=o(r/2),f=l(i/2),d=l(s/2),A=l(r/2);switch(a){case"XYZ":this._x=f*h*u+c*d*A,this._y=c*d*u-f*h*A,this._z=c*h*A+f*d*u,this._w=c*h*u-f*d*A;break;case"YXZ":this._x=f*h*u+c*d*A,this._y=c*d*u-f*h*A,this._z=c*h*A-f*d*u,this._w=c*h*u+f*d*A;break;case"ZXY":this._x=f*h*u-c*d*A,this._y=c*d*u+f*h*A,this._z=c*h*A+f*d*u,this._w=c*h*u-f*d*A;break;case"ZYX":this._x=f*h*u-c*d*A,this._y=c*d*u+f*h*A,this._z=c*h*A-f*d*u,this._w=c*h*u+f*d*A;break;case"YZX":this._x=f*h*u+c*d*A,this._y=c*d*u+f*h*A,this._z=c*h*A-f*d*u,this._w=c*h*u-f*d*A;break;case"XZY":this._x=f*h*u-c*d*A,this._y=c*d*u-f*h*A,this._z=c*h*A+f*d*u,this._w=c*h*u+f*d*A;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=i+o+u;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(a-s)*d}else if(i>o&&i>u){let d=2*Math.sqrt(1+i-o-u);this._w=(h-l)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+c)/d}else if(o>u){let d=2*Math.sqrt(1+o-i-u);this._w=(r-c)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(l+h)/d}else{let d=2*Math.sqrt(1+u-i-o);this._w=(a-s)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ee(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-s*o,this._w=a*h-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let i=this._x,s=this._y,r=this._z,a=this._w,o=a*t._w+i*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;let l=1-o*o;if(l<=Number.EPSILON){let d=1-e;return this._w=d*a+e*this._w,this._x=d*i+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=a*u+this._w*f,this._x=i*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},G=class n{constructor(t=0,e=0,i=0){n.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(eu.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(eu.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*i),h=2*(o*e-r*s),u=2*(r*i-a*e);return this.x=e+l*c+a*u-o*h,this.y=i+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Do.copy(this).projectOnVector(t),this.sub(Do)}reflect(t){return this.sub(Do.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Ee(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Do=new G,eu=new Un,Hn=class{constructor(t=new G(1/0,1/0,1/0),e=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Tn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Tn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=Tn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Tn):Tn.fromBufferAttribute(r,a),Tn.applyMatrix4(t.matrixWorld),this.expandByPoint(Tn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Hr.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Hr.copy(i.boundingBox)),Hr.applyMatrix4(t.matrixWorld),this.union(Hr)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Tn),Tn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(sr),Vr.subVectors(this.max,sr),cs.subVectors(t.a,sr),hs.subVectors(t.b,sr),us.subVectors(t.c,sr),hi.subVectors(hs,cs),ui.subVectors(us,hs),Ui.subVectors(cs,us);let e=[0,-hi.z,hi.y,0,-ui.z,ui.y,0,-Ui.z,Ui.y,hi.z,0,-hi.x,ui.z,0,-ui.x,Ui.z,0,-Ui.x,-hi.y,hi.x,0,-ui.y,ui.x,0,-Ui.y,Ui.x,0];return!Uo(e,cs,hs,us,Vr)||(e=[1,0,0,0,1,0,0,0,1],!Uo(e,cs,hs,us,Vr))?!1:(Gr.crossVectors(hi,ui),e=[Gr.x,Gr.y,Gr.z],Uo(e,cs,hs,us,Vr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Tn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Tn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Yn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Yn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Yn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Yn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Yn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Yn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Yn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Yn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Yn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Yn=[new G,new G,new G,new G,new G,new G,new G,new G],Tn=new G,Hr=new Hn,cs=new G,hs=new G,us=new G,hi=new G,ui=new G,Ui=new G,sr=new G,Vr=new G,Gr=new G,Li=new G;function Uo(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Li.fromArray(n,r);let o=s.x*Math.abs(Li.x)+s.y*Math.abs(Li.y)+s.z*Math.abs(Li.z),l=t.dot(Li),c=e.dot(Li),h=i.dot(Li);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var fp=new Hn,rr=new G,Lo=new G,gr=class{constructor(t=new G,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):fp.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;rr.subVectors(t,this.center);let e=rr.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(rr,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Lo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(rr.copy(t.center).add(Lo)),this.expandByPoint(rr.copy(t.center).sub(Lo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Kn=new G,No=new G,Wr=new G,di=new G,Oo=new G,qr=new G,Bo=new G,Is=class{constructor(t=new G,e=new G(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Kn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Kn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Kn.copy(this.origin).addScaledVector(this.direction,e),Kn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){No.copy(t).add(e).multiplyScalar(.5),Wr.copy(e).sub(t).normalize(),di.copy(this.origin).sub(No);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Wr),o=di.dot(this.direction),l=-di.dot(Wr),c=di.lengthSq(),h=Math.abs(1-a*a),u,f,d,A;if(h>0)if(u=a*l-o,f=a*o-l,A=r*h,u>=0)if(f>=-A)if(f<=A){let _=1/h;u*=_,f*=_,d=u*(u+a*f+2*o)+f*(a*u+f+2*l)+c}else f=r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;else f<=-A?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c):f<=A?(u=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(No).addScaledVector(Wr,f),d}intersectSphere(t,e){Kn.subVectors(t.center,this.origin);let i=Kn.dot(this.direction),s=Kn.dot(Kn)-i*i,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(i=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(i=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Kn)!==null}intersectTriangle(t,e,i,s,r){Oo.subVectors(e,t),qr.subVectors(i,t),Bo.crossVectors(Oo,qr);let a=this.direction.dot(Bo),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;di.subVectors(this.origin,t);let l=o*this.direction.dot(qr.crossVectors(di,qr));if(l<0)return null;let c=o*this.direction.dot(Oo.cross(di));if(c<0||l+c>a)return null;let h=-o*di.dot(Bo);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ae=class n{constructor(t,e,i,s,r,a,o,l,c,h,u,f,d,A,_,p){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c,h,u,f,d,A,_,p)}set(t,e,i,s,r,a,o,l,c,h,u,f,d,A,_,p){let g=this.elements;return g[0]=t,g[4]=e,g[8]=i,g[12]=s,g[1]=r,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=h,g[10]=u,g[14]=f,g[3]=d,g[7]=A,g[11]=_,g[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,i=t.elements,s=1/ds.setFromMatrixColumn(t,0).length(),r=1/ds.setFromMatrixColumn(t,1).length(),a=1/ds.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let f=a*h,d=a*u,A=o*h,_=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=d+A*c,e[5]=f-_*c,e[9]=-o*l,e[2]=_-f*c,e[6]=A+d*c,e[10]=a*l}else if(t.order==="YXZ"){let f=l*h,d=l*u,A=c*h,_=c*u;e[0]=f+_*o,e[4]=A*o-d,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=d*o-A,e[6]=_+f*o,e[10]=a*l}else if(t.order==="ZXY"){let f=l*h,d=l*u,A=c*h,_=c*u;e[0]=f-_*o,e[4]=-a*u,e[8]=A+d*o,e[1]=d+A*o,e[5]=a*h,e[9]=_-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let f=a*h,d=a*u,A=o*h,_=o*u;e[0]=l*h,e[4]=A*c-d,e[8]=f*c+_,e[1]=l*u,e[5]=_*c+f,e[9]=d*c-A,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let f=a*l,d=a*c,A=o*l,_=o*c;e[0]=l*h,e[4]=_-f*u,e[8]=A*u+d,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=d*u+A,e[10]=f-_*u}else if(t.order==="XZY"){let f=a*l,d=a*c,A=o*l,_=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+_,e[5]=a*h,e[9]=d*u-A,e[2]=A*u-d,e[6]=o*h,e[10]=_*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(pp,t,mp)}lookAt(t,e,i){let s=this.elements;return hn.subVectors(t,e),hn.lengthSq()===0&&(hn.z=1),hn.normalize(),fi.crossVectors(i,hn),fi.lengthSq()===0&&(Math.abs(i.z)===1?hn.x+=1e-4:hn.z+=1e-4,hn.normalize(),fi.crossVectors(i,hn)),fi.normalize(),Xr.crossVectors(hn,fi),s[0]=fi.x,s[4]=Xr.x,s[8]=hn.x,s[1]=fi.y,s[5]=Xr.y,s[9]=hn.y,s[2]=fi.z,s[6]=Xr.z,s[10]=hn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],u=i[5],f=i[9],d=i[13],A=i[2],_=i[6],p=i[10],g=i[14],w=i[3],M=i[7],y=i[11],C=i[15],b=s[0],S=s[4],E=s[8],T=s[12],m=s[1],v=s[5],R=s[9],L=s[13],I=s[2],k=s[6],B=s[10],q=s[14],z=s[3],tt=s[7],ot=s[11],ut=s[15];return r[0]=a*b+o*m+l*I+c*z,r[4]=a*S+o*v+l*k+c*tt,r[8]=a*E+o*R+l*B+c*ot,r[12]=a*T+o*L+l*q+c*ut,r[1]=h*b+u*m+f*I+d*z,r[5]=h*S+u*v+f*k+d*tt,r[9]=h*E+u*R+f*B+d*ot,r[13]=h*T+u*L+f*q+d*ut,r[2]=A*b+_*m+p*I+g*z,r[6]=A*S+_*v+p*k+g*tt,r[10]=A*E+_*R+p*B+g*ot,r[14]=A*T+_*L+p*q+g*ut,r[3]=w*b+M*m+y*I+C*z,r[7]=w*S+M*v+y*k+C*tt,r[11]=w*E+M*R+y*B+C*ot,r[15]=w*T+M*L+y*q+C*ut,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],d=t[14],A=t[3],_=t[7],p=t[11],g=t[15];return A*(+r*l*u-s*c*u-r*o*f+i*c*f+s*o*d-i*l*d)+_*(+e*l*d-e*c*f+r*a*f-s*a*d+s*c*h-r*l*h)+p*(+e*c*u-e*o*d-r*a*u+i*a*d+r*o*h-i*c*h)+g*(-s*o*h-e*l*u+e*o*f+s*a*u-i*a*f+i*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],d=t[11],A=t[12],_=t[13],p=t[14],g=t[15],w=u*p*c-_*f*c+_*l*d-o*p*d-u*l*g+o*f*g,M=A*f*c-h*p*c-A*l*d+a*p*d+h*l*g-a*f*g,y=h*_*c-A*u*c+A*o*d-a*_*d-h*o*g+a*u*g,C=A*u*l-h*_*l-A*o*f+a*_*f+h*o*p-a*u*p,b=e*w+i*M+s*y+r*C;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let S=1/b;return t[0]=w*S,t[1]=(_*f*r-u*p*r-_*s*d+i*p*d+u*s*g-i*f*g)*S,t[2]=(o*p*r-_*l*r+_*s*c-i*p*c-o*s*g+i*l*g)*S,t[3]=(u*l*r-o*f*r-u*s*c+i*f*c+o*s*d-i*l*d)*S,t[4]=M*S,t[5]=(h*p*r-A*f*r+A*s*d-e*p*d-h*s*g+e*f*g)*S,t[6]=(A*l*r-a*p*r-A*s*c+e*p*c+a*s*g-e*l*g)*S,t[7]=(a*f*r-h*l*r+h*s*c-e*f*c-a*s*d+e*l*d)*S,t[8]=y*S,t[9]=(A*u*r-h*_*r-A*i*d+e*_*d+h*i*g-e*u*g)*S,t[10]=(a*_*r-A*o*r+A*i*c-e*_*c-a*i*g+e*o*g)*S,t[11]=(h*o*r-a*u*r-h*i*c+e*u*c+a*i*d-e*o*d)*S,t[12]=C*S,t[13]=(h*_*s-A*u*s+A*i*f-e*_*f-h*i*p+e*u*p)*S,t[14]=(A*o*s-a*_*s-A*i*l+e*_*l+a*i*p-e*o*p)*S,t[15]=(a*u*s-h*o*s+h*i*l-e*u*l-a*i*f+e*o*f)*S,this}scale(t){let e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+i,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,f=r*c,d=r*h,A=r*u,_=a*h,p=a*u,g=o*u,w=l*c,M=l*h,y=l*u,C=i.x,b=i.y,S=i.z;return s[0]=(1-(_+g))*C,s[1]=(d+y)*C,s[2]=(A-M)*C,s[3]=0,s[4]=(d-y)*b,s[5]=(1-(f+g))*b,s[6]=(p+w)*b,s[7]=0,s[8]=(A+M)*S,s[9]=(p-w)*S,s[10]=(1-(f+_))*S,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){let s=this.elements,r=ds.set(s[0],s[1],s[2]).length(),a=ds.set(s[4],s[5],s[6]).length(),o=ds.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Cn.copy(this);let c=1/r,h=1/a,u=1/o;return Cn.elements[0]*=c,Cn.elements[1]*=c,Cn.elements[2]*=c,Cn.elements[4]*=h,Cn.elements[5]*=h,Cn.elements[6]*=h,Cn.elements[8]*=u,Cn.elements[9]*=u,Cn.elements[10]*=u,e.setFromRotationMatrix(Cn),i.x=r,i.y=a,i.z=o,this}makePerspective(t,e,i,s,r,a,o=ei){let l=this.elements,c=2*r/(e-t),h=2*r/(i-s),u=(e+t)/(e-t),f=(i+s)/(i-s),d,A;if(o===ei)d=-(a+r)/(a-r),A=-2*a*r/(a-r);else if(o===xa)d=-a/(a-r),A=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=A,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=ei){let l=this.elements,c=1/(e-t),h=1/(i-s),u=1/(a-r),f=(e+t)*c,d=(i+s)*h,A,_;if(o===ei)A=(a+r)*u,_=-2*u;else if(o===xa)A=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=_,l[14]=-A,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}},ds=new G,Cn=new ae,pp=new G(0,0,0),mp=new G(1,1,1),fi=new G,Xr=new G,hn=new G,nu=new ae,iu=new Un,Vn=class n{constructor(t=0,e=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(Ee(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ee(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ee(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ee(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ee(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Ee(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return nu.makeRotationFromQuaternion(t),this.setFromRotationMatrix(nu,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return iu.setFromEuler(this),this.setFromQuaternion(iu,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Vn.DEFAULT_ORDER="XYZ";var Ar=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},gp=0,su=new G,fs=new Un,jn=new ae,Yr=new G,ar=new G,Ap=new G,vp=new Un,ru=new G(1,0,0),au=new G(0,1,0),ou=new G(0,0,1),lu={type:"added"},xp={type:"removed"},ps={type:"childadded",child:null},Fo={type:"childremoved",child:null},rn=class n extends ii{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:gp++}),this.uuid=Hs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new G,e=new Vn,i=new Un,s=new G(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ae},normalMatrix:{value:new Wt}}),this.matrix=new ae,this.matrixWorld=new ae,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ar,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return fs.setFromAxisAngle(t,e),this.quaternion.multiply(fs),this}rotateOnWorldAxis(t,e){return fs.setFromAxisAngle(t,e),this.quaternion.premultiply(fs),this}rotateX(t){return this.rotateOnAxis(ru,t)}rotateY(t){return this.rotateOnAxis(au,t)}rotateZ(t){return this.rotateOnAxis(ou,t)}translateOnAxis(t,e){return su.copy(t).applyQuaternion(this.quaternion),this.position.add(su.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ru,t)}translateY(t){return this.translateOnAxis(au,t)}translateZ(t){return this.translateOnAxis(ou,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(jn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Yr.copy(t):Yr.set(t,e,i);let s=this.parent;this.updateWorldMatrix(!0,!1),ar.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?jn.lookAt(ar,Yr,this.up):jn.lookAt(Yr,ar,this.up),this.quaternion.setFromRotationMatrix(jn),s&&(jn.extractRotation(s.matrixWorld),fs.setFromRotationMatrix(jn),this.quaternion.premultiply(fs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(lu),ps.child=t,this.dispatchEvent(ps),ps.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(xp),Fo.child=t,this.dispatchEvent(Fo),Fo.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),jn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),jn.multiply(t.parent.matrixWorld)),t.applyMatrix4(jn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(lu),ps.child=t,this.dispatchEvent(ps),ps.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ar,t,Ap),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ar,vp,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),f=a(t.skeletons),d=a(t.animations),A=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),d.length>0&&(i.animations=d),A.length>0&&(i.nodes=A)}return i.object=s,i;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}};rn.DEFAULT_UP=new G(0,1,0);rn.DEFAULT_MATRIX_AUTO_UPDATE=!0;rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Rn=new G,Zn=new G,ko=new G,Qn=new G,ms=new G,gs=new G,cu=new G,zo=new G,Ho=new G,Vo=new G,Go=new xe,Wo=new xe,qo=new xe,zi=class n{constructor(t=new G,e=new G,i=new G){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Rn.subVectors(t,e),s.cross(Rn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){Rn.subVectors(s,e),Zn.subVectors(i,e),ko.subVectors(t,e);let a=Rn.dot(Rn),o=Rn.dot(Zn),l=Rn.dot(ko),c=Zn.dot(Zn),h=Zn.dot(ko),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;let f=1/u,d=(c*l-o*h)*f,A=(a*h-o*l)*f;return r.set(1-d-A,A,d)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Qn)===null?!1:Qn.x>=0&&Qn.y>=0&&Qn.x+Qn.y<=1}static getInterpolation(t,e,i,s,r,a,o,l){return this.getBarycoord(t,e,i,s,Qn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Qn.x),l.addScaledVector(a,Qn.y),l.addScaledVector(o,Qn.z),l)}static getInterpolatedAttribute(t,e,i,s,r,a){return Go.setScalar(0),Wo.setScalar(0),qo.setScalar(0),Go.fromBufferAttribute(t,e),Wo.fromBufferAttribute(t,i),qo.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Go,r.x),a.addScaledVector(Wo,r.y),a.addScaledVector(qo,r.z),a}static isFrontFacing(t,e,i,s){return Rn.subVectors(i,e),Zn.subVectors(t,e),Rn.cross(Zn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Rn.subVectors(this.c,this.b),Zn.subVectors(this.a,this.b),Rn.cross(Zn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,s=this.b,r=this.c,a,o;ms.subVectors(s,i),gs.subVectors(r,i),zo.subVectors(t,i);let l=ms.dot(zo),c=gs.dot(zo);if(l<=0&&c<=0)return e.copy(i);Ho.subVectors(t,s);let h=ms.dot(Ho),u=gs.dot(Ho);if(h>=0&&u<=h)return e.copy(s);let f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(i).addScaledVector(ms,a);Vo.subVectors(t,r);let d=ms.dot(Vo),A=gs.dot(Vo);if(A>=0&&d<=A)return e.copy(r);let _=d*c-l*A;if(_<=0&&c>=0&&A<=0)return o=c/(c-A),e.copy(i).addScaledVector(gs,o);let p=h*A-d*u;if(p<=0&&u-h>=0&&d-A>=0)return cu.subVectors(r,s),o=(u-h)/(u-h+(d-A)),e.copy(s).addScaledVector(cu,o);let g=1/(p+_+f);return a=_*g,o=f*g,e.copy(i).addScaledVector(ms,a).addScaledVector(gs,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},sd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},pi={h:0,s:0,l:0},Kr={h:0,s:0,l:0};function Xo(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var Ot=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ze){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Jt.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=Jt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Jt.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=Jt.workingColorSpace){if(t=Vc(t,1),e=Ee(e,0,1),i=Ee(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=Xo(a,r,t+1/3),this.g=Xo(a,r,t),this.b=Xo(a,r,t-1/3)}return Jt.toWorkingColorSpace(this,s),this}setStyle(t,e=Ze){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ze){let i=sd[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ss(t.r),this.g=Ss(t.g),this.b=Ss(t.b),this}copyLinearToSRGB(t){return this.r=Po(t.r),this.g=Po(t.g),this.b=Po(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ze){return Jt.fromWorkingColorSpace(Ve.copy(this),t),Math.round(Ee(Ve.r*255,0,255))*65536+Math.round(Ee(Ve.g*255,0,255))*256+Math.round(Ee(Ve.b*255,0,255))}getHexString(t=Ze){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Jt.workingColorSpace){Jt.fromWorkingColorSpace(Ve.copy(this),e);let i=Ve.r,s=Ve.g,r=Ve.b,a=Math.max(i,s,r),o=Math.min(i,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case i:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-i)/u+2;break;case r:l=(i-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Jt.workingColorSpace){return Jt.fromWorkingColorSpace(Ve.copy(this),e),t.r=Ve.r,t.g=Ve.g,t.b=Ve.b,t}getStyle(t=Ze){Jt.fromWorkingColorSpace(Ve.copy(this),t);let e=Ve.r,i=Ve.g,s=Ve.b;return t!==Ze?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(pi),this.setHSL(pi.h+t,pi.s+e,pi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(pi),t.getHSL(Kr);let i=hr(pi.h,Kr.h,e),s=hr(pi.s,Kr.s,e),r=hr(pi.l,Kr.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ve=new Ot;Ot.NAMES=sd;var yp=0,si=class extends ii{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:yp++}),this.uuid=Hs(),this.name="",this.type="Material",this.blending=bs,this.side=zn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=al,this.blendDst=ol,this.blendEquation=Mn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ot(0,0,0),this.blendAlpha=0,this.depthFunc=Ts,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Kh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=os,this.stencilZFail=os,this.stencilZPass=os,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==bs&&(i.blending=this.blending),this.side!==zn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==al&&(i.blendSrc=this.blendSrc),this.blendDst!==ol&&(i.blendDst=this.blendDst),this.blendEquation!==Mn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ts&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Kh&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==os&&(i.stencilFail=this.stencilFail),this.stencilZFail!==os&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==os&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Gn=class extends si{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.combine=Wu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var we=new G,jr=new At,Te=class{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=jh,this.updateRanges=[],this.gpuType=ti,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)jr.fromBufferAttribute(this,e),jr.applyMatrix3(t),this.setXY(e,jr.x,jr.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)we.fromBufferAttribute(this,e),we.applyMatrix3(t),this.setXYZ(e,we.x,we.y,we.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)we.fromBufferAttribute(this,e),we.applyMatrix4(t),this.setXYZ(e,we.x,we.y,we.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)we.fromBufferAttribute(this,e),we.applyNormalMatrix(t),this.setXYZ(e,we.x,we.y,we.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)we.fromBufferAttribute(this,e),we.transformDirection(t),this.setXYZ(e,we.x,we.y,we.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=_s(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Ke(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=_s(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ke(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=_s(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ke(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=_s(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ke(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=_s(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ke(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Ke(e,this.array),i=Ke(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=Ke(e,this.array),i=Ke(i,this.array),s=Ke(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=Ke(e,this.array),i=Ke(i,this.array),s=Ke(s,this.array),r=Ke(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==jh&&(t.usage=this.usage),t}};var Ma=class extends Te{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var ba=class extends Te{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var me=class extends Te{constructor(t,e,i){super(new Float32Array(t),e,i)}},_p=0,_n=new ae,Yo=new rn,As=new G,un=new Hn,or=new Hn,De=new G,ue=class n extends ii{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:_p++}),this.uuid=Hs(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(id(t)?ba:Ma)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Wt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return _n.makeRotationFromQuaternion(t),this.applyMatrix4(_n),this}rotateX(t){return _n.makeRotationX(t),this.applyMatrix4(_n),this}rotateY(t){return _n.makeRotationY(t),this.applyMatrix4(_n),this}rotateZ(t){return _n.makeRotationZ(t),this.applyMatrix4(_n),this}translate(t,e,i){return _n.makeTranslation(t,e,i),this.applyMatrix4(_n),this}scale(t,e,i){return _n.makeScale(t,e,i),this.applyMatrix4(_n),this}lookAt(t){return Yo.lookAt(t),Yo.updateMatrix(),this.applyMatrix4(Yo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(As).negate(),this.translate(As.x,As.y,As.z),this}setFromPoints(t){let e=[];for(let i=0,s=t.length;i<s;i++){let r=t[i];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new me(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Hn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){let r=e[i];un.setFromBufferAttribute(r),this.morphTargetsRelative?(De.addVectors(this.boundingBox.min,un.min),this.boundingBox.expandByPoint(De),De.addVectors(this.boundingBox.max,un.max),this.boundingBox.expandByPoint(De)):(this.boundingBox.expandByPoint(un.min),this.boundingBox.expandByPoint(un.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new gr);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new G,1/0);return}if(t){let i=this.boundingSphere.center;if(un.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];or.setFromBufferAttribute(o),this.morphTargetsRelative?(De.addVectors(un.min,or.min),un.expandByPoint(De),De.addVectors(un.max,or.max),un.expandByPoint(De)):(un.expandByPoint(or.min),un.expandByPoint(or.max))}un.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)De.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(De));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)De.fromBufferAttribute(o,c),l&&(As.fromBufferAttribute(t,c),De.add(As)),s=Math.max(s,i.distanceToSquared(De))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Te(new Float32Array(4*i.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let E=0;E<i.count;E++)o[E]=new G,l[E]=new G;let c=new G,h=new G,u=new G,f=new At,d=new At,A=new At,_=new G,p=new G;function g(E,T,m){c.fromBufferAttribute(i,E),h.fromBufferAttribute(i,T),u.fromBufferAttribute(i,m),f.fromBufferAttribute(r,E),d.fromBufferAttribute(r,T),A.fromBufferAttribute(r,m),h.sub(c),u.sub(c),d.sub(f),A.sub(f);let v=1/(d.x*A.y-A.x*d.y);isFinite(v)&&(_.copy(h).multiplyScalar(A.y).addScaledVector(u,-d.y).multiplyScalar(v),p.copy(u).multiplyScalar(d.x).addScaledVector(h,-A.x).multiplyScalar(v),o[E].add(_),o[T].add(_),o[m].add(_),l[E].add(p),l[T].add(p),l[m].add(p))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let E=0,T=w.length;E<T;++E){let m=w[E],v=m.start,R=m.count;for(let L=v,I=v+R;L<I;L+=3)g(t.getX(L+0),t.getX(L+1),t.getX(L+2))}let M=new G,y=new G,C=new G,b=new G;function S(E){C.fromBufferAttribute(s,E),b.copy(C);let T=o[E];M.copy(T),M.sub(C.multiplyScalar(C.dot(T))).normalize(),y.crossVectors(b,T);let v=y.dot(l[E])<0?-1:1;a.setXYZW(E,M.x,M.y,M.z,v)}for(let E=0,T=w.length;E<T;++E){let m=w[E],v=m.start,R=m.count;for(let L=v,I=v+R;L<I;L+=3)S(t.getX(L+0)),S(t.getX(L+1)),S(t.getX(L+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Te(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,d=i.count;f<d;f++)i.setXYZ(f,0,0,0);let s=new G,r=new G,a=new G,o=new G,l=new G,c=new G,h=new G,u=new G;if(t)for(let f=0,d=t.count;f<d;f+=3){let A=t.getX(f+0),_=t.getX(f+1),p=t.getX(f+2);s.fromBufferAttribute(e,A),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,p),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(i,A),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,p),o.add(h),l.add(h),c.add(h),i.setXYZ(A,o.x,o.y,o.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)De.fromBufferAttribute(t,e),De.normalize(),t.setXYZ(e,De.x,De.y,De.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,u=o.normalized,f=new c.constructor(l.length*h),d=0,A=0;for(let _=0,p=l.length;_<p;_++){o.isInterleavedBufferAttribute?d=l[_]*o.data.stride+o.offset:d=l[_]*h;for(let g=0;g<h;g++)f[A++]=c[d++]}return new Te(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,i);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){let f=c[h],d=t(f,i);l.push(d)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){let d=c[u];h.push(d.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone(e));let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],u=r[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},hu=new ae,Ni=new Is,Zr=new gr,uu=new G,Qr=new G,Jr=new G,$r=new G,Ko=new G,ta=new G,du=new G,ea=new G,le=class extends rn{constructor(t=new ue,e=new Gn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){ta.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],u=r[l];h!==0&&(Ko.fromBufferAttribute(u,t),a?ta.addScaledVector(Ko,h):ta.addScaledVector(Ko.sub(e),h))}e.add(ta)}return e}raycast(t,e){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Zr.copy(i.boundingSphere),Zr.applyMatrix4(r),Ni.copy(t.ray).recast(t.near),!(Zr.containsPoint(Ni.origin)===!1&&(Ni.intersectSphere(Zr,uu)===null||Ni.origin.distanceToSquared(uu)>(t.far-t.near)**2))&&(hu.copy(r).invert(),Ni.copy(t.ray).applyMatrix4(hu),!(i.boundingBox!==null&&Ni.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Ni)))}_computeIntersections(t,e,i){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let A=0,_=f.length;A<_;A++){let p=f[A],g=a[p.materialIndex],w=Math.max(p.start,d.start),M=Math.min(o.count,Math.min(p.start+p.count,d.start+d.count));for(let y=w,C=M;y<C;y+=3){let b=o.getX(y),S=o.getX(y+1),E=o.getX(y+2);s=na(this,g,t,i,c,h,u,b,S,E),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let A=Math.max(0,d.start),_=Math.min(o.count,d.start+d.count);for(let p=A,g=_;p<g;p+=3){let w=o.getX(p),M=o.getX(p+1),y=o.getX(p+2);s=na(this,a,t,i,c,h,u,w,M,y),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let A=0,_=f.length;A<_;A++){let p=f[A],g=a[p.materialIndex],w=Math.max(p.start,d.start),M=Math.min(l.count,Math.min(p.start+p.count,d.start+d.count));for(let y=w,C=M;y<C;y+=3){let b=y,S=y+1,E=y+2;s=na(this,g,t,i,c,h,u,b,S,E),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let A=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let p=A,g=_;p<g;p+=3){let w=p,M=p+1,y=p+2;s=na(this,a,t,i,c,h,u,w,M,y),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}};function Mp(n,t,e,i,s,r,a,o){let l;if(t.side===ke?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,t.side===zn,o),l===null)return null;ea.copy(o),ea.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(ea);return c<e.near||c>e.far?null:{distance:c,point:ea.clone(),object:n}}function na(n,t,e,i,s,r,a,o,l,c){n.getVertexPosition(o,Qr),n.getVertexPosition(l,Jr),n.getVertexPosition(c,$r);let h=Mp(n,t,e,i,Qr,Jr,$r,du);if(h){let u=new G;zi.getBarycoord(du,Qr,Jr,$r,u),s&&(h.uv=zi.getInterpolatedAttribute(s,o,l,c,u,new At)),r&&(h.uv1=zi.getInterpolatedAttribute(r,o,l,c,u,new At)),a&&(h.normal=zi.getInterpolatedAttribute(a,o,l,c,u,new G),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let f={a:o,b:l,c,normal:new G,materialIndex:0};zi.getNormal(Qr,Jr,$r,f.normal),h.face=f,h.barycoord=u}return h}var Wi=class n extends ue{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],u=[],f=0,d=0;A("z","y","x",-1,-1,i,e,t,a,r,0),A("z","y","x",1,-1,i,e,-t,a,r,1),A("x","z","y",1,1,t,i,e,s,a,2),A("x","z","y",1,-1,t,i,-e,s,a,3),A("x","y","z",1,-1,t,e,i,s,r,4),A("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new me(c,3)),this.setAttribute("normal",new me(h,3)),this.setAttribute("uv",new me(u,2));function A(_,p,g,w,M,y,C,b,S,E,T){let m=y/S,v=C/E,R=y/2,L=C/2,I=b/2,k=S+1,B=E+1,q=0,z=0,tt=new G;for(let ot=0;ot<B;ot++){let ut=ot*v-L;for(let Et=0;Et<k;Et++){let J=Et*m-R;tt[_]=J*w,tt[p]=ut*M,tt[g]=I,c.push(tt.x,tt.y,tt.z),tt[_]=0,tt[p]=0,tt[g]=b>0?1:-1,h.push(tt.x,tt.y,tt.z),u.push(Et/S),u.push(1-ot/E),q+=1}}for(let ot=0;ot<E;ot++)for(let ut=0;ut<S;ut++){let Et=f+ut+k*ot,J=f+ut+k*(ot+1),H=f+(ut+1)+k*(ot+1),U=f+(ut+1)+k*ot;l.push(Et,J,U),l.push(J,H,U),z+=6}o.addGroup(d,z,T),d+=z,f+=q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Ds(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function je(n){let t={};for(let e=0;e<n.length;e++){let i=Ds(n[e]);for(let s in i)t[s]=i[s]}return t}function bp(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function rd(n){let t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Jt.workingColorSpace}var On={clone:Ds,merge:je},wp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Sp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Se=class extends si{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=wp,this.fragmentShader=Sp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ds(t.uniforms),this.uniformsGroups=bp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}},wa=class extends rn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ae,this.projectionMatrix=new ae,this.projectionMatrixInverse=new ae,this.coordinateSystem=ei}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},mi=new G,fu=new At,pu=new At,Qe=class extends wa{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=mr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(cr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return mr*2*Math.atan(Math.tan(cr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){mi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(mi.x,mi.y).multiplyScalar(-t/mi.z),mi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(mi.x,mi.y).multiplyScalar(-t/mi.z)}getViewSize(t,e){return this.getViewBounds(t,fu,pu),e.subVectors(pu,fu)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(cr*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},vs=-90,xs=1,Kl=class extends rn{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Qe(vs,xs,t,e);s.layers=this.layers,this.add(s);let r=new Qe(vs,xs,t,e);r.layers=this.layers,this.add(r);let a=new Qe(vs,xs,t,e);a.layers=this.layers,this.add(a);let o=new Qe(vs,xs,t,e);o.layers=this.layers,this.add(o);let l=new Qe(vs,xs,t,e);l.layers=this.layers,this.add(l);let c=new Qe(vs,xs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===ei)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===xa)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),A=t.xr.enabled;t.xr.enabled=!1;let _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,a),t.setRenderTarget(i,2,s),t.render(e,o),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,s),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=A,i.texture.needsPMREMUpdate=!0}},Sa=class extends sn{constructor(t,e,i,s,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Cs,super(t,e,i,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},jl=class extends Ge{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Sa(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:In}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Wi(5,5,5),r=new Se({name:"CubemapFromEquirect",uniforms:Ds(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:ke,blending:_e});r.uniforms.tEquirect.value=e;let a=new le(s,r),o=e.minFilter;return e.minFilter===Vi&&(e.minFilter=In),new Kl(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,i,s){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}},jo=new G,Ep=new G,Tp=new Wt,Pn=class{constructor(t=new G(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let s=jo.subVectors(i,e).cross(Ep.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let i=t.delta(jo),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||Tp.getNormalMatrix(t),s=this.coplanarPoint(jo).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Oi=new gr,ia=new G,vr=class{constructor(t=new Pn,e=new Pn,i=new Pn,s=new Pn,r=new Pn,a=new Pn){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=ei){let i=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],u=s[6],f=s[7],d=s[8],A=s[9],_=s[10],p=s[11],g=s[12],w=s[13],M=s[14],y=s[15];if(i[0].setComponents(l-r,f-c,p-d,y-g).normalize(),i[1].setComponents(l+r,f+c,p+d,y+g).normalize(),i[2].setComponents(l+a,f+h,p+A,y+w).normalize(),i[3].setComponents(l-a,f-h,p-A,y-w).normalize(),i[4].setComponents(l-o,f-u,p-_,y-M).normalize(),e===ei)i[5].setComponents(l+o,f+u,p+_,y+M).normalize();else if(e===xa)i[5].setComponents(o,u,_,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Oi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Oi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Oi)}intersectsSprite(t){return Oi.center.set(0,0,0),Oi.radius=.7071067811865476,Oi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Oi)}intersectsSphere(t){let e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let s=e[i];if(ia.x=s.normal.x>0?t.max.x:t.min.x,ia.y=s.normal.y>0?t.max.y:t.min.y,ia.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(ia)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function ad(){let n=null,t=!1,e=null,i=null;function s(r,a){e(r,a),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Cp(n){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,u=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,h),o.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,l,c){let h=l.array,u=l.updateRanges;if(n.bindBuffer(c,o),u.length===0)n.bufferSubData(c,0,h);else{u.sort((d,A)=>d.start-A.start);let f=0;for(let d=1;d<u.length;d++){let A=u[f],_=u[d];_.start<=A.start+A.count+1?A.count=Math.max(A.count,_.start+_.count-A.start):(++f,u[f]=_)}u.length=f+1;for(let d=0,A=u.length;d<A;d++){let _=u[d];n.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(n.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Wn=class n extends ue{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(i),l=Math.floor(s),c=o+1,h=l+1,u=t/o,f=e/l,d=[],A=[],_=[],p=[];for(let g=0;g<h;g++){let w=g*f-a;for(let M=0;M<c;M++){let y=M*u-r;A.push(y,-w,0),_.push(0,0,1),p.push(M/o),p.push(1-g/l)}}for(let g=0;g<l;g++)for(let w=0;w<o;w++){let M=w+c*g,y=w+c*(g+1),C=w+1+c*(g+1),b=w+1+c*g;d.push(M,y,b),d.push(y,C,b)}this.setIndex(d),this.setAttribute("position",new me(A,3)),this.setAttribute("normal",new me(_,3)),this.setAttribute("uv",new me(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}},Rp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Pp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Ip=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Dp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Up=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Lp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Np=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Op=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Bp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Fp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,kp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,zp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Hp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Vp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Gp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Wp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,qp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Xp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Yp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Kp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,jp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Zp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Qp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Jp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,$p=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,tm=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,em=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,nm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,im=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,sm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,rm="gl_FragColor = linearToOutputTexel( gl_FragColor );",am=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,om=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,lm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,cm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,hm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,um=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,dm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,pm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,mm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Am=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,vm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,xm=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ym=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,_m=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Mm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,bm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,wm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Sm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Em=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Tm=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Cm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Rm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Pm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Im=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Dm=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Um=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Lm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Nm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Om=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Bm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Fm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,km=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,zm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Hm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Vm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Gm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Wm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,qm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Ym=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Km=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Qm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Jm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,$m=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,tg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,eg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ng=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ig=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,sg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,rg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ag=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,og=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,lg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,cg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,hg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,ug=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,dg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,fg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,pg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,mg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,gg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ag=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,vg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,xg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,yg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,_g=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Mg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,bg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,wg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Sg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Eg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Tg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Cg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Rg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ig=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ug=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Ng=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Og=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Bg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Fg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,kg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Hg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Vg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Gg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Yg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,jg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Zg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,$g=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,t0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,e0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,n0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,i0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,s0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,r0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,a0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,o0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Gt={alphahash_fragment:Rp,alphahash_pars_fragment:Pp,alphamap_fragment:Ip,alphamap_pars_fragment:Dp,alphatest_fragment:Up,alphatest_pars_fragment:Lp,aomap_fragment:Np,aomap_pars_fragment:Op,batching_pars_vertex:Bp,batching_vertex:Fp,begin_vertex:kp,beginnormal_vertex:zp,bsdfs:Hp,iridescence_fragment:Vp,bumpmap_pars_fragment:Gp,clipping_planes_fragment:Wp,clipping_planes_pars_fragment:qp,clipping_planes_pars_vertex:Xp,clipping_planes_vertex:Yp,color_fragment:Kp,color_pars_fragment:jp,color_pars_vertex:Zp,color_vertex:Qp,common:Jp,cube_uv_reflection_fragment:$p,defaultnormal_vertex:tm,displacementmap_pars_vertex:em,displacementmap_vertex:nm,emissivemap_fragment:im,emissivemap_pars_fragment:sm,colorspace_fragment:rm,colorspace_pars_fragment:am,envmap_fragment:om,envmap_common_pars_fragment:lm,envmap_pars_fragment:cm,envmap_pars_vertex:hm,envmap_physical_pars_fragment:_m,envmap_vertex:um,fog_vertex:dm,fog_pars_vertex:fm,fog_fragment:pm,fog_pars_fragment:mm,gradientmap_pars_fragment:gm,lightmap_pars_fragment:Am,lights_lambert_fragment:vm,lights_lambert_pars_fragment:xm,lights_pars_begin:ym,lights_toon_fragment:Mm,lights_toon_pars_fragment:bm,lights_phong_fragment:wm,lights_phong_pars_fragment:Sm,lights_physical_fragment:Em,lights_physical_pars_fragment:Tm,lights_fragment_begin:Cm,lights_fragment_maps:Rm,lights_fragment_end:Pm,logdepthbuf_fragment:Im,logdepthbuf_pars_fragment:Dm,logdepthbuf_pars_vertex:Um,logdepthbuf_vertex:Lm,map_fragment:Nm,map_pars_fragment:Om,map_particle_fragment:Bm,map_particle_pars_fragment:Fm,metalnessmap_fragment:km,metalnessmap_pars_fragment:zm,morphinstance_vertex:Hm,morphcolor_vertex:Vm,morphnormal_vertex:Gm,morphtarget_pars_vertex:Wm,morphtarget_vertex:qm,normal_fragment_begin:Xm,normal_fragment_maps:Ym,normal_pars_fragment:Km,normal_pars_vertex:jm,normal_vertex:Zm,normalmap_pars_fragment:Qm,clearcoat_normal_fragment_begin:Jm,clearcoat_normal_fragment_maps:$m,clearcoat_pars_fragment:tg,iridescence_pars_fragment:eg,opaque_fragment:ng,packing:ig,premultiplied_alpha_fragment:sg,project_vertex:rg,dithering_fragment:ag,dithering_pars_fragment:og,roughnessmap_fragment:lg,roughnessmap_pars_fragment:cg,shadowmap_pars_fragment:hg,shadowmap_pars_vertex:ug,shadowmap_vertex:dg,shadowmask_pars_fragment:fg,skinbase_vertex:pg,skinning_pars_vertex:mg,skinning_vertex:gg,skinnormal_vertex:Ag,specularmap_fragment:vg,specularmap_pars_fragment:xg,tonemapping_fragment:yg,tonemapping_pars_fragment:_g,transmission_fragment:Mg,transmission_pars_fragment:bg,uv_pars_fragment:wg,uv_pars_vertex:Sg,uv_vertex:Eg,worldpos_vertex:Tg,background_vert:Cg,background_frag:Rg,backgroundCube_vert:Pg,backgroundCube_frag:Ig,cube_vert:Dg,cube_frag:Ug,depth_vert:Lg,depth_frag:Ng,distanceRGBA_vert:Og,distanceRGBA_frag:Bg,equirect_vert:Fg,equirect_frag:kg,linedashed_vert:zg,linedashed_frag:Hg,meshbasic_vert:Vg,meshbasic_frag:Gg,meshlambert_vert:Wg,meshlambert_frag:qg,meshmatcap_vert:Xg,meshmatcap_frag:Yg,meshnormal_vert:Kg,meshnormal_frag:jg,meshphong_vert:Zg,meshphong_frag:Qg,meshphysical_vert:Jg,meshphysical_frag:$g,meshtoon_vert:t0,meshtoon_frag:e0,points_vert:n0,points_frag:i0,shadow_vert:s0,shadow_frag:r0,sprite_vert:a0,sprite_frag:o0},vt={common:{diffuse:{value:new Ot(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Wt}},envmap:{envMap:{value:null},envMapRotation:{value:new Wt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Wt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Wt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Wt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Wt},normalScale:{value:new At(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Wt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Wt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Wt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Wt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ot(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ot(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0},uvTransform:{value:new Wt}},sprite:{diffuse:{value:new Ot(16777215)},opacity:{value:1},center:{value:new At(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}}},kn={basic:{uniforms:je([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.fog]),vertexShader:Gt.meshbasic_vert,fragmentShader:Gt.meshbasic_frag},lambert:{uniforms:je([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,vt.lights,{emissive:{value:new Ot(0)}}]),vertexShader:Gt.meshlambert_vert,fragmentShader:Gt.meshlambert_frag},phong:{uniforms:je([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,vt.lights,{emissive:{value:new Ot(0)},specular:{value:new Ot(1118481)},shininess:{value:30}}]),vertexShader:Gt.meshphong_vert,fragmentShader:Gt.meshphong_frag},standard:{uniforms:je([vt.common,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.roughnessmap,vt.metalnessmap,vt.fog,vt.lights,{emissive:{value:new Ot(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag},toon:{uniforms:je([vt.common,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.gradientmap,vt.fog,vt.lights,{emissive:{value:new Ot(0)}}]),vertexShader:Gt.meshtoon_vert,fragmentShader:Gt.meshtoon_frag},matcap:{uniforms:je([vt.common,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,{matcap:{value:null}}]),vertexShader:Gt.meshmatcap_vert,fragmentShader:Gt.meshmatcap_frag},points:{uniforms:je([vt.points,vt.fog]),vertexShader:Gt.points_vert,fragmentShader:Gt.points_frag},dashed:{uniforms:je([vt.common,vt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Gt.linedashed_vert,fragmentShader:Gt.linedashed_frag},depth:{uniforms:je([vt.common,vt.displacementmap]),vertexShader:Gt.depth_vert,fragmentShader:Gt.depth_frag},normal:{uniforms:je([vt.common,vt.bumpmap,vt.normalmap,vt.displacementmap,{opacity:{value:1}}]),vertexShader:Gt.meshnormal_vert,fragmentShader:Gt.meshnormal_frag},sprite:{uniforms:je([vt.sprite,vt.fog]),vertexShader:Gt.sprite_vert,fragmentShader:Gt.sprite_frag},background:{uniforms:{uvTransform:{value:new Wt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Gt.background_vert,fragmentShader:Gt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Wt}},vertexShader:Gt.backgroundCube_vert,fragmentShader:Gt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Gt.cube_vert,fragmentShader:Gt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Gt.equirect_vert,fragmentShader:Gt.equirect_frag},distanceRGBA:{uniforms:je([vt.common,vt.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Gt.distanceRGBA_vert,fragmentShader:Gt.distanceRGBA_frag},shadow:{uniforms:je([vt.lights,vt.fog,{color:{value:new Ot(0)},opacity:{value:1}}]),vertexShader:Gt.shadow_vert,fragmentShader:Gt.shadow_frag}};kn.physical={uniforms:je([kn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Wt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Wt},clearcoatNormalScale:{value:new At(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Wt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Wt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Wt},sheen:{value:0},sheenColor:{value:new Ot(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Wt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Wt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Wt},transmissionSamplerSize:{value:new At},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Wt},attenuationDistance:{value:0},attenuationColor:{value:new Ot(0)},specularColor:{value:new Ot(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Wt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Wt},anisotropyVector:{value:new At},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Wt}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag};var sa={r:0,b:0,g:0},Bi=new Vn,l0=new ae;function c0(n,t,e,i,s,r,a){let o=new Ot(0),l=r===!0?0:1,c,h,u=null,f=0,d=null;function A(w){let M=w.isScene===!0?w.background:null;return M&&M.isTexture&&(M=(w.backgroundBlurriness>0?e:t).get(M)),M}function _(w){let M=!1,y=A(w);y===null?g(o,l):y&&y.isColor&&(g(y,1),M=!0);let C=n.xr.getEnvironmentBlendMode();C==="additive"?i.buffers.color.setClear(0,0,0,1,a):C==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||M)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function p(w,M){let y=A(M);y&&(y.isCubeTexture||y.mapping===za)?(h===void 0&&(h=new le(new Wi(1,1,1),new Se({name:"BackgroundCubeMaterial",uniforms:Ds(kn.backgroundCube.uniforms),vertexShader:kn.backgroundCube.vertexShader,fragmentShader:kn.backgroundCube.fragmentShader,side:ke,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,b,S){this.matrixWorld.copyPosition(S.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Bi.copy(M.backgroundRotation),Bi.x*=-1,Bi.y*=-1,Bi.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Bi.y*=-1,Bi.z*=-1),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(l0.makeRotationFromEuler(Bi)),h.material.toneMapped=Jt.getTransfer(y.colorSpace)!==he,(u!==y||f!==y.version||d!==n.toneMapping)&&(h.material.needsUpdate=!0,u=y,f=y.version,d=n.toneMapping),h.layers.enableAll(),w.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new le(new Wn(2,2),new Se({name:"BackgroundMaterial",uniforms:Ds(kn.background.uniforms),vertexShader:kn.background.vertexShader,fragmentShader:kn.background.fragmentShader,side:zn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=Jt.getTransfer(y.colorSpace)!==he,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||f!==y.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,u=y,f=y.version,d=n.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function g(w,M){w.getRGB(sa,rd(n)),i.buffers.color.setClear(sa.r,sa.g,sa.b,M,a)}return{getClearColor:function(){return o},setClearColor:function(w,M=1){o.set(w),l=M,g(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,g(o,l)},render:_,addToRenderList:p}}function h0(n,t){let e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null),r=s,a=!1;function o(m,v,R,L,I){let k=!1,B=u(L,R,v);r!==B&&(r=B,c(r.object)),k=d(m,L,R,I),k&&A(m,L,R,I),I!==null&&t.update(I,n.ELEMENT_ARRAY_BUFFER),(k||a)&&(a=!1,y(m,v,R,L),I!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(I).buffer))}function l(){return n.createVertexArray()}function c(m){return n.bindVertexArray(m)}function h(m){return n.deleteVertexArray(m)}function u(m,v,R){let L=R.wireframe===!0,I=i[m.id];I===void 0&&(I={},i[m.id]=I);let k=I[v.id];k===void 0&&(k={},I[v.id]=k);let B=k[L];return B===void 0&&(B=f(l()),k[L]=B),B}function f(m){let v=[],R=[],L=[];for(let I=0;I<e;I++)v[I]=0,R[I]=0,L[I]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:v,enabledAttributes:R,attributeDivisors:L,object:m,attributes:{},index:null}}function d(m,v,R,L){let I=r.attributes,k=v.attributes,B=0,q=R.getAttributes();for(let z in q)if(q[z].location>=0){let ot=I[z],ut=k[z];if(ut===void 0&&(z==="instanceMatrix"&&m.instanceMatrix&&(ut=m.instanceMatrix),z==="instanceColor"&&m.instanceColor&&(ut=m.instanceColor)),ot===void 0||ot.attribute!==ut||ut&&ot.data!==ut.data)return!0;B++}return r.attributesNum!==B||r.index!==L}function A(m,v,R,L){let I={},k=v.attributes,B=0,q=R.getAttributes();for(let z in q)if(q[z].location>=0){let ot=k[z];ot===void 0&&(z==="instanceMatrix"&&m.instanceMatrix&&(ot=m.instanceMatrix),z==="instanceColor"&&m.instanceColor&&(ot=m.instanceColor));let ut={};ut.attribute=ot,ot&&ot.data&&(ut.data=ot.data),I[z]=ut,B++}r.attributes=I,r.attributesNum=B,r.index=L}function _(){let m=r.newAttributes;for(let v=0,R=m.length;v<R;v++)m[v]=0}function p(m){g(m,0)}function g(m,v){let R=r.newAttributes,L=r.enabledAttributes,I=r.attributeDivisors;R[m]=1,L[m]===0&&(n.enableVertexAttribArray(m),L[m]=1),I[m]!==v&&(n.vertexAttribDivisor(m,v),I[m]=v)}function w(){let m=r.newAttributes,v=r.enabledAttributes;for(let R=0,L=v.length;R<L;R++)v[R]!==m[R]&&(n.disableVertexAttribArray(R),v[R]=0)}function M(m,v,R,L,I,k,B){B===!0?n.vertexAttribIPointer(m,v,R,I,k):n.vertexAttribPointer(m,v,R,L,I,k)}function y(m,v,R,L){_();let I=L.attributes,k=R.getAttributes(),B=v.defaultAttributeValues;for(let q in k){let z=k[q];if(z.location>=0){let tt=I[q];if(tt===void 0&&(q==="instanceMatrix"&&m.instanceMatrix&&(tt=m.instanceMatrix),q==="instanceColor"&&m.instanceColor&&(tt=m.instanceColor)),tt!==void 0){let ot=tt.normalized,ut=tt.itemSize,Et=t.get(tt);if(Et===void 0)continue;let J=Et.buffer,H=Et.type,U=Et.bytesPerElement,F=H===n.INT||H===n.UNSIGNED_INT||tt.gpuType===Uc;if(tt.isInterleavedBufferAttribute){let N=tt.data,Y=N.stride,W=tt.offset;if(N.isInstancedInterleavedBuffer){for(let nt=0;nt<z.locationSize;nt++)g(z.location+nt,N.meshPerAttribute);m.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=N.meshPerAttribute*N.count)}else for(let nt=0;nt<z.locationSize;nt++)p(z.location+nt);n.bindBuffer(n.ARRAY_BUFFER,J);for(let nt=0;nt<z.locationSize;nt++)M(z.location+nt,ut/z.locationSize,H,ot,Y*U,(W+ut/z.locationSize*nt)*U,F)}else{if(tt.isInstancedBufferAttribute){for(let N=0;N<z.locationSize;N++)g(z.location+N,tt.meshPerAttribute);m.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let N=0;N<z.locationSize;N++)p(z.location+N);n.bindBuffer(n.ARRAY_BUFFER,J);for(let N=0;N<z.locationSize;N++)M(z.location+N,ut/z.locationSize,H,ot,ut*U,ut/z.locationSize*N*U,F)}}else if(B!==void 0){let ot=B[q];if(ot!==void 0)switch(ot.length){case 2:n.vertexAttrib2fv(z.location,ot);break;case 3:n.vertexAttrib3fv(z.location,ot);break;case 4:n.vertexAttrib4fv(z.location,ot);break;default:n.vertexAttrib1fv(z.location,ot)}}}}w()}function C(){E();for(let m in i){let v=i[m];for(let R in v){let L=v[R];for(let I in L)h(L[I].object),delete L[I];delete v[R]}delete i[m]}}function b(m){if(i[m.id]===void 0)return;let v=i[m.id];for(let R in v){let L=v[R];for(let I in L)h(L[I].object),delete L[I];delete v[R]}delete i[m.id]}function S(m){for(let v in i){let R=i[v];if(R[m.id]===void 0)continue;let L=R[m.id];for(let I in L)h(L[I].object),delete L[I];delete R[m.id]}}function E(){T(),a=!0,r!==s&&(r=s,c(r.object))}function T(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:E,resetDefaultState:T,dispose:C,releaseStatesOfGeometry:b,releaseStatesOfProgram:S,initAttributes:_,enableAttribute:p,disableUnusedAttributes:w}}function u0(n,t,e){let i;function s(c){i=c}function r(c,h){n.drawArrays(i,c,h),e.update(h,i,1)}function a(c,h,u){u!==0&&(n.drawArraysInstanced(i,c,h,u),e.update(h,i,u))}function o(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let d=0;for(let A=0;A<u;A++)d+=h[A];e.update(d,i,1)}function l(c,h,u,f){if(u===0)return;let d=t.get("WEBGL_multi_draw");if(d===null)for(let A=0;A<c.length;A++)a(c[A],h[A],f[A]);else{d.multiDrawArraysInstancedWEBGL(i,c,0,h,0,f,0,u);let A=0;for(let _=0;_<u;_++)A+=h[_];for(let _=0;_<f.length;_++)e.update(A,i,f[_])}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function d0(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let S=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(S.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(S){return!(S!==dn&&i.convert(S)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(S){let E=S===bn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(S!==Dn&&i.convert(S)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&S!==ti&&!E)}function l(S){if(S==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";S="mediump"}return S==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control");if(f===!0){let S=t.get("EXT_clip_control");S.clipControlEXT(S.LOWER_LEFT_EXT,S.ZERO_TO_ONE_EXT)}let d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),A=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),w=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),M=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=A>0,b=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:A,maxTextureSize:_,maxCubemapSize:p,maxAttributes:g,maxVertexUniforms:w,maxVaryings:M,maxFragmentUniforms:y,vertexTextures:C,maxSamples:b}}function f0(n){let t=this,e=null,i=0,s=!1,r=!1,a=new Pn,o=new Wt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let d=u.length!==0||f||i!==0||s;return s=f,i=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){let A=u.clippingPlanes,_=u.clipIntersection,p=u.clipShadows,g=n.get(u);if(!s||A===null||A.length===0||r&&!p)r?h(null):c();else{let w=r?0:i,M=w*4,y=g.clippingState||null;l.value=y,y=h(A,f,M,d);for(let C=0;C!==M;++C)y[C]=e[C];g.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,f,d,A){let _=u!==null?u.length:0,p=null;if(_!==0){if(p=l.value,A!==!0||p===null){let g=d+_*4,w=f.matrixWorldInverse;o.getNormalMatrix(w),(p===null||p.length<g)&&(p=new Float32Array(g));for(let M=0,y=d;M!==_;++M,y+=4)a.copy(u[M]).applyMatrix4(w,o),a.normal.toArray(p,y),p[y+3]=a.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}function p0(n){let t=new WeakMap;function e(a,o){return o===ml?a.mapping=Cs:o===gl&&(a.mapping=Rs),a}function i(a){if(a&&a.isTexture){let o=a.mapping;if(o===ml||o===gl)if(t.has(a)){let l=t.get(a).texture;return e(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new jl(l.height);return c.fromEquirectangularTexture(n,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}var Us=class extends wa{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,a=i+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Ms=4,mu=[.125,.215,.35,.446,.526,.582],Hi=20,Zo=new Us,gu=new Ot,Qo=null,Jo=0,$o=0,tl=!1,ki=(1+Math.sqrt(5))/2,ys=1/ki,Au=[new G(-ki,ys,0),new G(ki,ys,0),new G(-ys,0,ki),new G(ys,0,ki),new G(0,ki,-ys),new G(0,ki,ys),new G(-1,1,-1),new G(1,1,-1),new G(-1,1,1),new G(1,1,1)],Ls=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){Qo=this._renderer.getRenderTarget(),Jo=this._renderer.getActiveCubeFace(),$o=this._renderer.getActiveMipmapLevel(),tl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=xu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Qo,Jo,$o),this._renderer.xr.enabled=tl,t.scissorTest=!1,ra(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Cs||t.mapping===Rs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Qo=this._renderer.getRenderTarget(),Jo=this._renderer.getActiveCubeFace(),$o=this._renderer.getActiveMipmapLevel(),tl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:In,minFilter:In,generateMipmaps:!1,type:bn,format:dn,colorSpace:_i,depthBuffer:!1},s=vu(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=vu(t,e,i);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=m0(r)),this._blurMaterial=g0(r,t,e)}return s}_compileMaterial(t){let e=new le(this._lodPlanes[0],t);this._renderer.compile(e,Zo)}_sceneToCubeUV(t,e,i,s){let o=new Qe(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(gu),h.toneMapping=Ai,h.autoClear=!1;let d=new Gn({name:"PMREM.Background",side:ke,depthWrite:!1,depthTest:!1}),A=new le(new Wi,d),_=!1,p=t.background;p?p.isColor&&(d.color.copy(p),t.background=null,_=!0):(d.color.copy(gu),_=!0);for(let g=0;g<6;g++){let w=g%3;w===0?(o.up.set(0,l[g],0),o.lookAt(c[g],0,0)):w===1?(o.up.set(0,0,l[g]),o.lookAt(0,c[g],0)):(o.up.set(0,l[g],0),o.lookAt(0,0,c[g]));let M=this._cubeSize;ra(s,w*M,g>2?M:0,M,M),h.setRenderTarget(s),_&&h.render(A,o),h.render(t,o)}A.geometry.dispose(),A.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=p}_textureToCubeUV(t,e){let i=this._renderer,s=t.mapping===Cs||t.mapping===Rs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=yu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=xu());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new le(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;ra(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,Zo)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Au[(s-r-1)%Au.length];this._blur(t,r-1,r,a,o)}e.autoClear=i}_blur(t,e,i,s,r){let a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,s,"latitudinal",r),this._halfBlur(a,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new le(this._lodPlanes[s],c),f=c.uniforms,d=this._sizeLods[i]-1,A=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Hi-1),_=r/A,p=isFinite(r)?1+Math.floor(h*_):Hi;p>Hi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Hi}`);let g=[],w=0;for(let S=0;S<Hi;++S){let E=S/_,T=Math.exp(-E*E/2);g.push(T),S===0?w+=T:S<p&&(w+=2*T)}for(let S=0;S<g.length;S++)g[S]=g[S]/w;f.envMap.value=t.texture,f.samples.value=p,f.weights.value=g,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);let{_lodMax:M}=this;f.dTheta.value=A,f.mipInt.value=M-i;let y=this._sizeLods[s],C=3*y*(s>M-Ms?s-M+Ms:0),b=4*(this._cubeSize-y);ra(e,C,b,3*y,2*y),l.setRenderTarget(e),l.render(u,Zo)}};function m0(n){let t=[],e=[],i=[],s=n,r=n-Ms+1+mu.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);e.push(o);let l=1/o;a>n-Ms?l=mu[a-n+Ms-1]:a===0&&(l=0),i.push(l);let c=1/(o-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,A=6,_=3,p=2,g=1,w=new Float32Array(_*A*d),M=new Float32Array(p*A*d),y=new Float32Array(g*A*d);for(let b=0;b<d;b++){let S=b%3*2/3-1,E=b>2?0:-1,T=[S,E,0,S+2/3,E,0,S+2/3,E+1,0,S,E,0,S+2/3,E+1,0,S,E+1,0];w.set(T,_*A*b),M.set(f,p*A*b);let m=[b,b,b,b,b,b];y.set(m,g*A*b)}let C=new ue;C.setAttribute("position",new Te(w,_)),C.setAttribute("uv",new Te(M,p)),C.setAttribute("faceIndex",new Te(y,g)),t.push(C),s>Ms&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function vu(n,t,e){let i=new Ge(n,t,e);return i.texture.mapping=za,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ra(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function g0(n,t,e){let i=new Float32Array(Hi),s=new G(0,1,0);return new Se({name:"SphericalGaussianBlur",defines:{n:Hi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Gc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:_e,depthTest:!1,depthWrite:!1})}function xu(){return new Se({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Gc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:_e,depthTest:!1,depthWrite:!1})}function yu(){return new Se({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Gc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:_e,depthTest:!1,depthWrite:!1})}function Gc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function A0(n){let t=new WeakMap,e=null;function i(o){if(o&&o.isTexture){let l=o.mapping,c=l===ml||l===gl,h=l===Cs||l===Rs;if(c||h){let u=t.get(o),f=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new Ls(n)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{let d=o.image;return c&&d&&d.height>0||h&&d&&s(d)?(e===null&&(e=new Ls(n)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0,c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){let l=o.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:a}}function v0(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let s=e(i);return s===null&&pa("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function x0(n,t,e,i){let s={},r=new WeakMap;function a(u){let f=u.target;f.index!==null&&t.remove(f.index);for(let A in f.attributes)t.remove(f.attributes[A]);for(let A in f.morphAttributes){let _=f.morphAttributes[A];for(let p=0,g=_.length;p<g;p++)t.remove(_[p])}f.removeEventListener("dispose",a),delete s[f.id];let d=r.get(f);d&&(t.remove(d),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(u,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,e.memory.geometries++),f}function l(u){let f=u.attributes;for(let A in f)t.update(f[A],n.ARRAY_BUFFER);let d=u.morphAttributes;for(let A in d){let _=d[A];for(let p=0,g=_.length;p<g;p++)t.update(_[p],n.ARRAY_BUFFER)}}function c(u){let f=[],d=u.index,A=u.attributes.position,_=0;if(d!==null){let w=d.array;_=d.version;for(let M=0,y=w.length;M<y;M+=3){let C=w[M+0],b=w[M+1],S=w[M+2];f.push(C,b,b,S,S,C)}}else if(A!==void 0){let w=A.array;_=A.version;for(let M=0,y=w.length/3-1;M<y;M+=3){let C=M+0,b=M+1,S=M+2;f.push(C,b,b,S,S,C)}}else return;let p=new(id(f)?ba:Ma)(f,1);p.version=_;let g=r.get(u);g&&t.remove(g),r.set(u,p)}function h(u){let f=r.get(u);if(f){let d=u.index;d!==null&&f.version<d.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function y0(n,t,e){let i;function s(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,d){n.drawElements(i,d,r,f*a),e.update(d,i,1)}function c(f,d,A){A!==0&&(n.drawElementsInstanced(i,d,r,f*a,A),e.update(d,i,A))}function h(f,d,A){if(A===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,f,0,A);let p=0;for(let g=0;g<A;g++)p+=d[g];e.update(p,i,1)}function u(f,d,A,_){if(A===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<f.length;g++)c(f[g]/a,d[g],_[g]);else{p.multiDrawElementsInstancedWEBGL(i,d,0,r,f,0,_,0,A);let g=0;for(let w=0;w<A;w++)g+=d[w];for(let w=0;w<_.length;w++)e.update(g,i,_[w])}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function _0(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function M0(n,t,e){let i=new WeakMap,s=new xe;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,f=i.get(o);if(f===void 0||f.count!==u){let T=function(){S.dispose(),i.delete(o),o.removeEventListener("dispose",T)};f!==void 0&&f.texture.dispose();let d=o.morphAttributes.position!==void 0,A=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],w=o.morphAttributes.color||[],M=0;d===!0&&(M=1),A===!0&&(M=2),_===!0&&(M=3);let y=o.attributes.position.count*M,C=1;y>t.maxTextureSize&&(C=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let b=new Float32Array(y*C*4*u),S=new _a(b,y,C,u);S.type=ti,S.needsUpdate=!0;let E=M*4;for(let m=0;m<u;m++){let v=p[m],R=g[m],L=w[m],I=y*C*4*m;for(let k=0;k<v.count;k++){let B=k*E;d===!0&&(s.fromBufferAttribute(v,k),b[I+B+0]=s.x,b[I+B+1]=s.y,b[I+B+2]=s.z,b[I+B+3]=0),A===!0&&(s.fromBufferAttribute(R,k),b[I+B+4]=s.x,b[I+B+5]=s.y,b[I+B+6]=s.z,b[I+B+7]=0),_===!0&&(s.fromBufferAttribute(L,k),b[I+B+8]=s.x,b[I+B+9]=s.y,b[I+B+10]=s.z,b[I+B+11]=L.itemSize===4?s.w:1)}}f={count:u,texture:S,size:new At(y,C)},i.set(o,f),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let d=0;for(let _=0;_<c.length;_++)d+=c[_];let A=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(n,"morphTargetBaseInfluence",A),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function b0(n,t,e,i){let s=new WeakMap;function r(l){let c=i.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return u}function a(){s=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}var Ns=class extends sn{constructor(t,e,i,s,r,a,o,l,c,h=ws){if(h!==ws&&h!==xi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===ws&&(i=Gi),i===void 0&&h===xi&&(i=vi),super(null,s,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Fe,this.minFilter=l!==void 0?l:Fe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},od=new sn,_u=new Ns(1,1),ld=new _a,cd=new Yl,hd=new Sa,Mu=[],bu=[],wu=new Float32Array(16),Su=new Float32Array(9),Eu=new Float32Array(4);function Vs(n,t,e){let i=n[0];if(i<=0||i>0)return n;let s=t*e,r=Mu[s];if(r===void 0&&(r=new Float32Array(s),Mu[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function Ce(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Re(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Va(n,t){let e=bu[t];e===void 0&&(e=new Int32Array(t),bu[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function w0(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function S0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;n.uniform2fv(this.addr,t),Re(e,t)}}function E0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ce(e,t))return;n.uniform3fv(this.addr,t),Re(e,t)}}function T0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;n.uniform4fv(this.addr,t),Re(e,t)}}function C0(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ce(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Re(e,t)}else{if(Ce(e,i))return;Eu.set(i),n.uniformMatrix2fv(this.addr,!1,Eu),Re(e,i)}}function R0(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ce(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Re(e,t)}else{if(Ce(e,i))return;Su.set(i),n.uniformMatrix3fv(this.addr,!1,Su),Re(e,i)}}function P0(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ce(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Re(e,t)}else{if(Ce(e,i))return;wu.set(i),n.uniformMatrix4fv(this.addr,!1,wu),Re(e,i)}}function I0(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function D0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;n.uniform2iv(this.addr,t),Re(e,t)}}function U0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;n.uniform3iv(this.addr,t),Re(e,t)}}function L0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;n.uniform4iv(this.addr,t),Re(e,t)}}function N0(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function O0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;n.uniform2uiv(this.addr,t),Re(e,t)}}function B0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;n.uniform3uiv(this.addr,t),Re(e,t)}}function F0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;n.uniform4uiv(this.addr,t),Re(e,t)}}function k0(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(_u.compareFunction=nd,r=_u):r=od,e.setTexture2D(t||r,s)}function z0(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||cd,s)}function H0(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||hd,s)}function V0(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||ld,s)}function G0(n){switch(n){case 5126:return w0;case 35664:return S0;case 35665:return E0;case 35666:return T0;case 35674:return C0;case 35675:return R0;case 35676:return P0;case 5124:case 35670:return I0;case 35667:case 35671:return D0;case 35668:case 35672:return U0;case 35669:case 35673:return L0;case 5125:return N0;case 36294:return O0;case 36295:return B0;case 36296:return F0;case 35678:case 36198:case 36298:case 36306:case 35682:return k0;case 35679:case 36299:case 36307:return z0;case 35680:case 36300:case 36308:case 36293:return H0;case 36289:case 36303:case 36311:case 36292:return V0}}function W0(n,t){n.uniform1fv(this.addr,t)}function q0(n,t){let e=Vs(t,this.size,2);n.uniform2fv(this.addr,e)}function X0(n,t){let e=Vs(t,this.size,3);n.uniform3fv(this.addr,e)}function Y0(n,t){let e=Vs(t,this.size,4);n.uniform4fv(this.addr,e)}function K0(n,t){let e=Vs(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function j0(n,t){let e=Vs(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function Z0(n,t){let e=Vs(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function Q0(n,t){n.uniform1iv(this.addr,t)}function J0(n,t){n.uniform2iv(this.addr,t)}function $0(n,t){n.uniform3iv(this.addr,t)}function tA(n,t){n.uniform4iv(this.addr,t)}function eA(n,t){n.uniform1uiv(this.addr,t)}function nA(n,t){n.uniform2uiv(this.addr,t)}function iA(n,t){n.uniform3uiv(this.addr,t)}function sA(n,t){n.uniform4uiv(this.addr,t)}function rA(n,t,e){let i=this.cache,s=t.length,r=Va(e,s);Ce(i,r)||(n.uniform1iv(this.addr,r),Re(i,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||od,r[a])}function aA(n,t,e){let i=this.cache,s=t.length,r=Va(e,s);Ce(i,r)||(n.uniform1iv(this.addr,r),Re(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||cd,r[a])}function oA(n,t,e){let i=this.cache,s=t.length,r=Va(e,s);Ce(i,r)||(n.uniform1iv(this.addr,r),Re(i,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||hd,r[a])}function lA(n,t,e){let i=this.cache,s=t.length,r=Va(e,s);Ce(i,r)||(n.uniform1iv(this.addr,r),Re(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||ld,r[a])}function cA(n){switch(n){case 5126:return W0;case 35664:return q0;case 35665:return X0;case 35666:return Y0;case 35674:return K0;case 35675:return j0;case 35676:return Z0;case 5124:case 35670:return Q0;case 35667:case 35671:return J0;case 35668:case 35672:return $0;case 35669:case 35673:return tA;case 5125:return eA;case 36294:return nA;case 36295:return iA;case 36296:return sA;case 35678:case 36198:case 36298:case 36306:case 35682:return rA;case 35679:case 36299:case 36307:return aA;case 35680:case 36300:case 36308:case 36293:return oA;case 36289:case 36303:case 36311:case 36292:return lA}}var Zl=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=G0(e.type)}},Ql=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=cA(e.type)}},Jl=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],i)}}},el=/(\w+)(\])?(\[|\.)?/g;function Tu(n,t){n.seq.push(t),n.map[t.id]=t}function hA(n,t,e){let i=n.name,s=i.length;for(el.lastIndex=0;;){let r=el.exec(i),a=el.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Tu(e,c===void 0?new Zl(o,n,t):new Ql(o,n,t));break}else{let u=e.map[o];u===void 0&&(u=new Jl(o),Tu(e,u)),e=u}}}var Es=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);hA(r,a,this)}}setValue(t,e,i,s){let r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){let s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let i=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&i.push(a)}return i}};function Cu(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var uA=37297,dA=0;function fA(n,t){let e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}function pA(n){let t=Jt.getPrimaries(Jt.workingColorSpace),e=Jt.getPrimaries(n),i;switch(t===e?i="":t===va&&e===Aa?i="LinearDisplayP3ToLinearSRGB":t===Aa&&e===va&&(i="LinearSRGBToLinearDisplayP3"),n){case _i:case Ha:return[i,"LinearTransferOETF"];case Ze:case Hc:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Ru(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+fA(n.getShaderSource(t),a)}else return s}function mA(n,t){let e=pA(t);return`vec4 ${n}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function gA(n,t){let e;switch(t){case Cc:e="Linear";break;case Rc:e="Reinhard";break;case Pc:e="Cineon";break;case Ic:e="ACESFilmic";break;case Dc:e="AgX";break;case br:e="Neutral";break;case Uf:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var aa=new G;function AA(){Jt.getLuminanceCoefficients(aa);let n=aa.x.toFixed(4),t=aa.y.toFixed(4),e=aa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function vA(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(lr).join(`
`)}function xA(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function yA(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(t,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function lr(n){return n!==""}function Pu(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Iu(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var _A=/^[ \t]*#include +<([\w\d./]+)>/gm;function $l(n){return n.replace(_A,bA)}var MA=new Map;function bA(n,t){let e=Gt[t];if(e===void 0){let i=MA.get(t);if(i!==void 0)e=Gt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return $l(e)}var wA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Du(n){return n.replace(wA,SA)}function SA(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Uu(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function EA(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Ba?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===gf?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Jn&&(t="SHADOWMAP_TYPE_VSM"),t}function TA(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Cs:case Rs:t="ENVMAP_TYPE_CUBE";break;case za:t="ENVMAP_TYPE_CUBE_UV";break}return t}function CA(n){let t="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===Rs&&(t="ENVMAP_MODE_REFRACTION"),t}function RA(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Wu:t="ENVMAP_BLENDING_MULTIPLY";break;case If:t="ENVMAP_BLENDING_MIX";break;case Df:t="ENVMAP_BLENDING_ADD";break}return t}function PA(n){let t=n.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function IA(n,t,e,i){let s=n.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=EA(e),c=TA(e),h=CA(e),u=RA(e),f=PA(e),d=vA(e),A=xA(r),_=s.createProgram(),p,g,w=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,A].filter(lr).join(`
`),p.length>0&&(p+=`
`),g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,A].filter(lr).join(`
`),g.length>0&&(g+=`
`)):(p=[Uu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,A,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(lr).join(`
`),g=[Uu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,A,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ai?"#define TONE_MAPPING":"",e.toneMapping!==Ai?Gt.tonemapping_pars_fragment:"",e.toneMapping!==Ai?gA("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Gt.colorspace_pars_fragment,mA("linearToOutputTexel",e.outputColorSpace),AA(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(lr).join(`
`)),a=$l(a),a=Pu(a,e),a=Iu(a,e),o=$l(o),o=Pu(o,e),o=Iu(o,e),a=Du(a),o=Du(o),e.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,p=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,g=["#define varying in",e.glslVersion===Zh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Zh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let M=w+p+a,y=w+g+o,C=Cu(s,s.VERTEX_SHADER,M),b=Cu(s,s.FRAGMENT_SHADER,y);s.attachShader(_,C),s.attachShader(_,b),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function S(v){if(n.debug.checkShaderErrors){let R=s.getProgramInfoLog(_).trim(),L=s.getShaderInfoLog(C).trim(),I=s.getShaderInfoLog(b).trim(),k=!0,B=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(k=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,C,b);else{let q=Ru(s,C,"vertex"),z=Ru(s,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+v.name+`
Material Type: `+v.type+`

Program Info Log: `+R+`
`+q+`
`+z)}else R!==""?console.warn("THREE.WebGLProgram: Program Info Log:",R):(L===""||I==="")&&(B=!1);B&&(v.diagnostics={runnable:k,programLog:R,vertexShader:{log:L,prefix:p},fragmentShader:{log:I,prefix:g}})}s.deleteShader(C),s.deleteShader(b),E=new Es(s,_),T=yA(s,_)}let E;this.getUniforms=function(){return E===void 0&&S(this),E};let T;this.getAttributes=function(){return T===void 0&&S(this),T};let m=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return m===!1&&(m=s.getProgramParameter(_,uA)),m},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=dA++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=b,this}var DA=0,tc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new ec(t),e.set(t,i)),i}},ec=class{constructor(t){this.id=DA++,this.code=t,this.usedTimes=0}};function UA(n,t,e,i,s,r,a){let o=new Ar,l=new tc,c=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.reverseDepthBuffer,d=s.vertexTextures,A=s.precision,_={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(m){return c.add(m),m===0?"uv":`uv${m}`}function g(m,v,R,L,I){let k=L.fog,B=I.geometry,q=m.isMeshStandardMaterial?L.environment:null,z=(m.isMeshStandardMaterial?e:t).get(m.envMap||q),tt=z&&z.mapping===za?z.image.height:null,ot=_[m.type];m.precision!==null&&(A=s.getMaxPrecision(m.precision),A!==m.precision&&console.warn("THREE.WebGLProgram.getParameters:",m.precision,"not supported, using",A,"instead."));let ut=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Et=ut!==void 0?ut.length:0,J=0;B.morphAttributes.position!==void 0&&(J=1),B.morphAttributes.normal!==void 0&&(J=2),B.morphAttributes.color!==void 0&&(J=3);let H,U,F,N;if(ot){let nn=kn[ot];H=nn.vertexShader,U=nn.fragmentShader}else H=m.vertexShader,U=m.fragmentShader,l.update(m),F=l.getVertexShaderID(m),N=l.getFragmentShaderID(m);let Y=n.getRenderTarget(),W=I.isInstancedMesh===!0,nt=I.isBatchedMesh===!0,ct=!!m.map,at=!!m.matcap,O=!!z,Tt=!!m.aoMap,ht=!!m.lightMap,Ct=!!m.bumpMap,mt=!!m.normalMap,Dt=!!m.displacementMap,Rt=!!m.emissiveMap,D=!!m.metalnessMap,x=!!m.roughnessMap,V=m.anisotropy>0,Q=m.clearcoat>0,st=m.dispersion>0,it=m.iridescence>0,gt=m.sheen>0,pt=m.transmission>0,yt=V&&!!m.anisotropyMap,Xt=Q&&!!m.clearcoatMap,dt=Q&&!!m.clearcoatNormalMap,_t=Q&&!!m.clearcoatRoughnessMap,Ft=it&&!!m.iridescenceMap,kt=it&&!!m.iridescenceThicknessMap,St=gt&&!!m.sheenColorMap,Yt=gt&&!!m.sheenRoughnessMap,Vt=!!m.specularMap,Qt=!!m.specularColorMap,X=!!m.specularIntensityMap,xt=pt&&!!m.transmissionMap,rt=pt&&!!m.thicknessMap,lt=!!m.gradientMap,Mt=!!m.alphaMap,wt=m.alphaTest>0,Zt=!!m.alphaHash,be=!!m.extensions,en=Ai;m.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(en=n.toneMapping);let $t={shaderID:ot,shaderType:m.type,shaderName:m.name,vertexShader:H,fragmentShader:U,defines:m.defines,customVertexShaderID:F,customFragmentShaderID:N,isRawShaderMaterial:m.isRawShaderMaterial===!0,glslVersion:m.glslVersion,precision:A,batching:nt,batchingColor:nt&&I._colorsTexture!==null,instancing:W,instancingColor:W&&I.instanceColor!==null,instancingMorph:W&&I.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:Y===null?n.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:_i,alphaToCoverage:!!m.alphaToCoverage,map:ct,matcap:at,envMap:O,envMapMode:O&&z.mapping,envMapCubeUVHeight:tt,aoMap:Tt,lightMap:ht,bumpMap:Ct,normalMap:mt,displacementMap:d&&Dt,emissiveMap:Rt,normalMapObjectSpace:mt&&m.normalMapType===Of,normalMapTangentSpace:mt&&m.normalMapType===zc,metalnessMap:D,roughnessMap:x,anisotropy:V,anisotropyMap:yt,clearcoat:Q,clearcoatMap:Xt,clearcoatNormalMap:dt,clearcoatRoughnessMap:_t,dispersion:st,iridescence:it,iridescenceMap:Ft,iridescenceThicknessMap:kt,sheen:gt,sheenColorMap:St,sheenRoughnessMap:Yt,specularMap:Vt,specularColorMap:Qt,specularIntensityMap:X,transmission:pt,transmissionMap:xt,thicknessMap:rt,gradientMap:lt,opaque:m.transparent===!1&&m.blending===bs&&m.alphaToCoverage===!1,alphaMap:Mt,alphaTest:wt,alphaHash:Zt,combine:m.combine,mapUv:ct&&p(m.map.channel),aoMapUv:Tt&&p(m.aoMap.channel),lightMapUv:ht&&p(m.lightMap.channel),bumpMapUv:Ct&&p(m.bumpMap.channel),normalMapUv:mt&&p(m.normalMap.channel),displacementMapUv:Dt&&p(m.displacementMap.channel),emissiveMapUv:Rt&&p(m.emissiveMap.channel),metalnessMapUv:D&&p(m.metalnessMap.channel),roughnessMapUv:x&&p(m.roughnessMap.channel),anisotropyMapUv:yt&&p(m.anisotropyMap.channel),clearcoatMapUv:Xt&&p(m.clearcoatMap.channel),clearcoatNormalMapUv:dt&&p(m.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_t&&p(m.clearcoatRoughnessMap.channel),iridescenceMapUv:Ft&&p(m.iridescenceMap.channel),iridescenceThicknessMapUv:kt&&p(m.iridescenceThicknessMap.channel),sheenColorMapUv:St&&p(m.sheenColorMap.channel),sheenRoughnessMapUv:Yt&&p(m.sheenRoughnessMap.channel),specularMapUv:Vt&&p(m.specularMap.channel),specularColorMapUv:Qt&&p(m.specularColorMap.channel),specularIntensityMapUv:X&&p(m.specularIntensityMap.channel),transmissionMapUv:xt&&p(m.transmissionMap.channel),thicknessMapUv:rt&&p(m.thicknessMap.channel),alphaMapUv:Mt&&p(m.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(mt||V),vertexColors:m.vertexColors,vertexAlphas:m.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!B.attributes.uv&&(ct||Mt),fog:!!k,useFog:m.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:m.flatShading===!0,sizeAttenuation:m.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:f,skinning:I.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:Et,morphTextureStride:J,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:m.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:en,decodeVideoTexture:ct&&m.map.isVideoTexture===!0&&Jt.getTransfer(m.map.colorSpace)===he,premultipliedAlpha:m.premultipliedAlpha,doubleSided:m.side===Je,flipSided:m.side===ke,useDepthPacking:m.depthPacking>=0,depthPacking:m.depthPacking||0,index0AttributeName:m.index0AttributeName,extensionClipCullDistance:be&&m.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(be&&m.extensions.multiDraw===!0||nt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:m.customProgramCacheKey()};return $t.vertexUv1s=c.has(1),$t.vertexUv2s=c.has(2),$t.vertexUv3s=c.has(3),c.clear(),$t}function w(m){let v=[];if(m.shaderID?v.push(m.shaderID):(v.push(m.customVertexShaderID),v.push(m.customFragmentShaderID)),m.defines!==void 0)for(let R in m.defines)v.push(R),v.push(m.defines[R]);return m.isRawShaderMaterial===!1&&(M(v,m),y(v,m),v.push(n.outputColorSpace)),v.push(m.customProgramCacheKey),v.join()}function M(m,v){m.push(v.precision),m.push(v.outputColorSpace),m.push(v.envMapMode),m.push(v.envMapCubeUVHeight),m.push(v.mapUv),m.push(v.alphaMapUv),m.push(v.lightMapUv),m.push(v.aoMapUv),m.push(v.bumpMapUv),m.push(v.normalMapUv),m.push(v.displacementMapUv),m.push(v.emissiveMapUv),m.push(v.metalnessMapUv),m.push(v.roughnessMapUv),m.push(v.anisotropyMapUv),m.push(v.clearcoatMapUv),m.push(v.clearcoatNormalMapUv),m.push(v.clearcoatRoughnessMapUv),m.push(v.iridescenceMapUv),m.push(v.iridescenceThicknessMapUv),m.push(v.sheenColorMapUv),m.push(v.sheenRoughnessMapUv),m.push(v.specularMapUv),m.push(v.specularColorMapUv),m.push(v.specularIntensityMapUv),m.push(v.transmissionMapUv),m.push(v.thicknessMapUv),m.push(v.combine),m.push(v.fogExp2),m.push(v.sizeAttenuation),m.push(v.morphTargetsCount),m.push(v.morphAttributeCount),m.push(v.numDirLights),m.push(v.numPointLights),m.push(v.numSpotLights),m.push(v.numSpotLightMaps),m.push(v.numHemiLights),m.push(v.numRectAreaLights),m.push(v.numDirLightShadows),m.push(v.numPointLightShadows),m.push(v.numSpotLightShadows),m.push(v.numSpotLightShadowsWithMaps),m.push(v.numLightProbes),m.push(v.shadowMapType),m.push(v.toneMapping),m.push(v.numClippingPlanes),m.push(v.numClipIntersection),m.push(v.depthPacking)}function y(m,v){o.disableAll(),v.supportsVertexTextures&&o.enable(0),v.instancing&&o.enable(1),v.instancingColor&&o.enable(2),v.instancingMorph&&o.enable(3),v.matcap&&o.enable(4),v.envMap&&o.enable(5),v.normalMapObjectSpace&&o.enable(6),v.normalMapTangentSpace&&o.enable(7),v.clearcoat&&o.enable(8),v.iridescence&&o.enable(9),v.alphaTest&&o.enable(10),v.vertexColors&&o.enable(11),v.vertexAlphas&&o.enable(12),v.vertexUv1s&&o.enable(13),v.vertexUv2s&&o.enable(14),v.vertexUv3s&&o.enable(15),v.vertexTangents&&o.enable(16),v.anisotropy&&o.enable(17),v.alphaHash&&o.enable(18),v.batching&&o.enable(19),v.dispersion&&o.enable(20),v.batchingColor&&o.enable(21),m.push(o.mask),o.disableAll(),v.fog&&o.enable(0),v.useFog&&o.enable(1),v.flatShading&&o.enable(2),v.logarithmicDepthBuffer&&o.enable(3),v.reverseDepthBuffer&&o.enable(4),v.skinning&&o.enable(5),v.morphTargets&&o.enable(6),v.morphNormals&&o.enable(7),v.morphColors&&o.enable(8),v.premultipliedAlpha&&o.enable(9),v.shadowMapEnabled&&o.enable(10),v.doubleSided&&o.enable(11),v.flipSided&&o.enable(12),v.useDepthPacking&&o.enable(13),v.dithering&&o.enable(14),v.transmission&&o.enable(15),v.sheen&&o.enable(16),v.opaque&&o.enable(17),v.pointsUvs&&o.enable(18),v.decodeVideoTexture&&o.enable(19),v.alphaToCoverage&&o.enable(20),m.push(o.mask)}function C(m){let v=_[m.type],R;if(v){let L=kn[v];R=On.clone(L.uniforms)}else R=m.uniforms;return R}function b(m,v){let R;for(let L=0,I=h.length;L<I;L++){let k=h[L];if(k.cacheKey===v){R=k,++R.usedTimes;break}}return R===void 0&&(R=new IA(n,v,m,r),h.push(R)),R}function S(m){if(--m.usedTimes===0){let v=h.indexOf(m);h[v]=h[h.length-1],h.pop(),m.destroy()}}function E(m){l.remove(m)}function T(){l.dispose()}return{getParameters:g,getProgramCacheKey:w,getUniforms:C,acquireProgram:b,releaseProgram:S,releaseShaderCache:E,programs:h,dispose:T}}function LA(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function NA(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Lu(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Nu(){let n=[],t=0,e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(u,f,d,A,_,p){let g=n[t];return g===void 0?(g={id:u.id,object:u,geometry:f,material:d,groupOrder:A,renderOrder:u.renderOrder,z:_,group:p},n[t]=g):(g.id=u.id,g.object=u,g.geometry=f,g.material=d,g.groupOrder=A,g.renderOrder=u.renderOrder,g.z=_,g.group=p),t++,g}function o(u,f,d,A,_,p){let g=a(u,f,d,A,_,p);d.transmission>0?i.push(g):d.transparent===!0?s.push(g):e.push(g)}function l(u,f,d,A,_,p){let g=a(u,f,d,A,_,p);d.transmission>0?i.unshift(g):d.transparent===!0?s.unshift(g):e.unshift(g)}function c(u,f){e.length>1&&e.sort(u||NA),i.length>1&&i.sort(f||Lu),s.length>1&&s.sort(f||Lu)}function h(){for(let u=t,f=n.length;u<f;u++){let d=n[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function OA(){let n=new WeakMap;function t(i,s){let r=n.get(i),a;return r===void 0?(a=new Nu,n.set(i,[a])):s>=r.length?(a=new Nu,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function BA(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new G,color:new Ot};break;case"SpotLight":e={position:new G,direction:new G,color:new Ot,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new G,color:new Ot,distance:0,decay:0};break;case"HemisphereLight":e={direction:new G,skyColor:new Ot,groundColor:new Ot};break;case"RectAreaLight":e={color:new Ot,position:new G,halfWidth:new G,halfHeight:new G};break}return n[t.id]=e,e}}}function FA(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var kA=0;function zA(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function HA(n){let t=new BA,e=FA(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new G);let s=new G,r=new ae,a=new ae;function o(c){let h=0,u=0,f=0;for(let T=0;T<9;T++)i.probe[T].set(0,0,0);let d=0,A=0,_=0,p=0,g=0,w=0,M=0,y=0,C=0,b=0,S=0;c.sort(zA);for(let T=0,m=c.length;T<m;T++){let v=c[T],R=v.color,L=v.intensity,I=v.distance,k=v.shadow&&v.shadow.map?v.shadow.map.texture:null;if(v.isAmbientLight)h+=R.r*L,u+=R.g*L,f+=R.b*L;else if(v.isLightProbe){for(let B=0;B<9;B++)i.probe[B].addScaledVector(v.sh.coefficients[B],L);S++}else if(v.isDirectionalLight){let B=t.get(v);if(B.color.copy(v.color).multiplyScalar(v.intensity),v.castShadow){let q=v.shadow,z=e.get(v);z.shadowIntensity=q.intensity,z.shadowBias=q.bias,z.shadowNormalBias=q.normalBias,z.shadowRadius=q.radius,z.shadowMapSize=q.mapSize,i.directionalShadow[d]=z,i.directionalShadowMap[d]=k,i.directionalShadowMatrix[d]=v.shadow.matrix,w++}i.directional[d]=B,d++}else if(v.isSpotLight){let B=t.get(v);B.position.setFromMatrixPosition(v.matrixWorld),B.color.copy(R).multiplyScalar(L),B.distance=I,B.coneCos=Math.cos(v.angle),B.penumbraCos=Math.cos(v.angle*(1-v.penumbra)),B.decay=v.decay,i.spot[_]=B;let q=v.shadow;if(v.map&&(i.spotLightMap[C]=v.map,C++,q.updateMatrices(v),v.castShadow&&b++),i.spotLightMatrix[_]=q.matrix,v.castShadow){let z=e.get(v);z.shadowIntensity=q.intensity,z.shadowBias=q.bias,z.shadowNormalBias=q.normalBias,z.shadowRadius=q.radius,z.shadowMapSize=q.mapSize,i.spotShadow[_]=z,i.spotShadowMap[_]=k,y++}_++}else if(v.isRectAreaLight){let B=t.get(v);B.color.copy(R).multiplyScalar(L),B.halfWidth.set(v.width*.5,0,0),B.halfHeight.set(0,v.height*.5,0),i.rectArea[p]=B,p++}else if(v.isPointLight){let B=t.get(v);if(B.color.copy(v.color).multiplyScalar(v.intensity),B.distance=v.distance,B.decay=v.decay,v.castShadow){let q=v.shadow,z=e.get(v);z.shadowIntensity=q.intensity,z.shadowBias=q.bias,z.shadowNormalBias=q.normalBias,z.shadowRadius=q.radius,z.shadowMapSize=q.mapSize,z.shadowCameraNear=q.camera.near,z.shadowCameraFar=q.camera.far,i.pointShadow[A]=z,i.pointShadowMap[A]=k,i.pointShadowMatrix[A]=v.shadow.matrix,M++}i.point[A]=B,A++}else if(v.isHemisphereLight){let B=t.get(v);B.skyColor.copy(v.color).multiplyScalar(L),B.groundColor.copy(v.groundColor).multiplyScalar(L),i.hemi[g]=B,g++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=vt.LTC_FLOAT_1,i.rectAreaLTC2=vt.LTC_FLOAT_2):(i.rectAreaLTC1=vt.LTC_HALF_1,i.rectAreaLTC2=vt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=f;let E=i.hash;(E.directionalLength!==d||E.pointLength!==A||E.spotLength!==_||E.rectAreaLength!==p||E.hemiLength!==g||E.numDirectionalShadows!==w||E.numPointShadows!==M||E.numSpotShadows!==y||E.numSpotMaps!==C||E.numLightProbes!==S)&&(i.directional.length=d,i.spot.length=_,i.rectArea.length=p,i.point.length=A,i.hemi.length=g,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=w,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=y+C-b,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=S,E.directionalLength=d,E.pointLength=A,E.spotLength=_,E.rectAreaLength=p,E.hemiLength=g,E.numDirectionalShadows=w,E.numPointShadows=M,E.numSpotShadows=y,E.numSpotMaps=C,E.numLightProbes=S,i.version=kA++)}function l(c,h){let u=0,f=0,d=0,A=0,_=0,p=h.matrixWorldInverse;for(let g=0,w=c.length;g<w;g++){let M=c[g];if(M.isDirectionalLight){let y=i.directional[u];y.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(p),u++}else if(M.isSpotLight){let y=i.spot[d];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(p),y.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(p),d++}else if(M.isRectAreaLight){let y=i.rectArea[A];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(p),a.identity(),r.copy(M.matrixWorld),r.premultiply(p),a.extractRotation(r),y.halfWidth.set(M.width*.5,0,0),y.halfHeight.set(0,M.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),A++}else if(M.isPointLight){let y=i.point[f];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(p),f++}else if(M.isHemisphereLight){let y=i.hemi[_];y.direction.setFromMatrixPosition(M.matrixWorld),y.direction.transformDirection(p),_++}}}return{setup:o,setupView:l,state:i}}function Ou(n){let t=new HA(n),e=[],i=[];function s(h){c.camera=h,e.length=0,i.length=0}function r(h){e.push(h)}function a(h){i.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}let c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function VA(n){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new Ou(n),t.set(s,[o])):r>=a.length?(o=new Ou(n),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}var xr=class extends si{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Nf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},nc=class extends si{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},GA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,WA=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function qA(n,t,e){let i=new vr,s=new At,r=new At,a=new xe,o=new xr({depthPacking:kc}),l=new nc,c={},h=e.maxTextureSize,u={[zn]:ke,[ke]:zn,[Je]:Je},f=new Se({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new At},radius:{value:4}},vertexShader:GA,fragmentShader:WA}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let A=new ue;A.setAttribute("position",new Te(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new le(A,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ba;let g=this.type;this.render=function(b,S,E){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||b.length===0)return;let T=n.getRenderTarget(),m=n.getActiveCubeFace(),v=n.getActiveMipmapLevel(),R=n.state;R.setBlending(_e),R.buffers.color.setClear(1,1,1,1),R.buffers.depth.setTest(!0),R.setScissorTest(!1);let L=g!==Jn&&this.type===Jn,I=g===Jn&&this.type!==Jn;for(let k=0,B=b.length;k<B;k++){let q=b[k],z=q.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);let tt=z.getFrameExtents();if(s.multiply(tt),r.copy(z.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/tt.x),s.x=r.x*tt.x,z.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/tt.y),s.y=r.y*tt.y,z.mapSize.y=r.y)),z.map===null||L===!0||I===!0){let ut=this.type!==Jn?{minFilter:Fe,magFilter:Fe}:{};z.map!==null&&z.map.dispose(),z.map=new Ge(s.x,s.y,ut),z.map.texture.name=q.name+".shadowMap",z.camera.updateProjectionMatrix()}n.setRenderTarget(z.map),n.clear();let ot=z.getViewportCount();for(let ut=0;ut<ot;ut++){let Et=z.getViewport(ut);a.set(r.x*Et.x,r.y*Et.y,r.x*Et.z,r.y*Et.w),R.viewport(a),z.updateMatrices(q,ut),i=z.getFrustum(),y(S,E,z.camera,q,this.type)}z.isPointLightShadow!==!0&&this.type===Jn&&w(z,E),z.needsUpdate=!1}g=this.type,p.needsUpdate=!1,n.setRenderTarget(T,m,v)};function w(b,S){let E=t.update(_);f.defines.VSM_SAMPLES!==b.blurSamples&&(f.defines.VSM_SAMPLES=b.blurSamples,d.defines.VSM_SAMPLES=b.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Ge(s.x,s.y)),f.uniforms.shadow_pass.value=b.map.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(S,null,E,f,_,null),d.uniforms.shadow_pass.value=b.mapPass.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(S,null,E,d,_,null)}function M(b,S,E,T){let m=null,v=E.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(v!==void 0)m=v;else if(m=E.isPointLight===!0?l:o,n.localClippingEnabled&&S.clipShadows===!0&&Array.isArray(S.clippingPlanes)&&S.clippingPlanes.length!==0||S.displacementMap&&S.displacementScale!==0||S.alphaMap&&S.alphaTest>0||S.map&&S.alphaTest>0){let R=m.uuid,L=S.uuid,I=c[R];I===void 0&&(I={},c[R]=I);let k=I[L];k===void 0&&(k=m.clone(),I[L]=k,S.addEventListener("dispose",C)),m=k}if(m.visible=S.visible,m.wireframe=S.wireframe,T===Jn?m.side=S.shadowSide!==null?S.shadowSide:S.side:m.side=S.shadowSide!==null?S.shadowSide:u[S.side],m.alphaMap=S.alphaMap,m.alphaTest=S.alphaTest,m.map=S.map,m.clipShadows=S.clipShadows,m.clippingPlanes=S.clippingPlanes,m.clipIntersection=S.clipIntersection,m.displacementMap=S.displacementMap,m.displacementScale=S.displacementScale,m.displacementBias=S.displacementBias,m.wireframeLinewidth=S.wireframeLinewidth,m.linewidth=S.linewidth,E.isPointLight===!0&&m.isMeshDistanceMaterial===!0){let R=n.properties.get(m);R.light=E}return m}function y(b,S,E,T,m){if(b.visible===!1)return;if(b.layers.test(S.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&m===Jn)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,b.matrixWorld);let L=t.update(b),I=b.material;if(Array.isArray(I)){let k=L.groups;for(let B=0,q=k.length;B<q;B++){let z=k[B],tt=I[z.materialIndex];if(tt&&tt.visible){let ot=M(b,tt,T,m);b.onBeforeShadow(n,b,S,E,L,ot,z),n.renderBufferDirect(E,null,L,ot,b,z),b.onAfterShadow(n,b,S,E,L,ot,z)}}}else if(I.visible){let k=M(b,I,T,m);b.onBeforeShadow(n,b,S,E,L,k,null),n.renderBufferDirect(E,null,L,k,b,null),b.onAfterShadow(n,b,S,E,L,k,null)}}let R=b.children;for(let L=0,I=R.length;L<I;L++)y(R[L],S,E,T,m)}function C(b){b.target.removeEventListener("dispose",C);for(let E in c){let T=c[E],m=b.target.uuid;m in T&&(T[m].dispose(),delete T[m])}}}var XA={[ll]:cl,[hl]:fl,[ul]:pl,[Ts]:dl,[cl]:ll,[fl]:hl,[pl]:ul,[dl]:Ts};function YA(n){function t(){let X=!1,xt=new xe,rt=null,lt=new xe(0,0,0,0);return{setMask:function(Mt){rt!==Mt&&!X&&(n.colorMask(Mt,Mt,Mt,Mt),rt=Mt)},setLocked:function(Mt){X=Mt},setClear:function(Mt,wt,Zt,be,en){en===!0&&(Mt*=be,wt*=be,Zt*=be),xt.set(Mt,wt,Zt,be),lt.equals(xt)===!1&&(n.clearColor(Mt,wt,Zt,be),lt.copy(xt))},reset:function(){X=!1,rt=null,lt.set(-1,0,0,0)}}}function e(){let X=!1,xt=!1,rt=null,lt=null,Mt=null;return{setReversed:function(wt){xt=wt},setTest:function(wt){wt?F(n.DEPTH_TEST):N(n.DEPTH_TEST)},setMask:function(wt){rt!==wt&&!X&&(n.depthMask(wt),rt=wt)},setFunc:function(wt){if(xt&&(wt=XA[wt]),lt!==wt){switch(wt){case ll:n.depthFunc(n.NEVER);break;case cl:n.depthFunc(n.ALWAYS);break;case hl:n.depthFunc(n.LESS);break;case Ts:n.depthFunc(n.LEQUAL);break;case ul:n.depthFunc(n.EQUAL);break;case dl:n.depthFunc(n.GEQUAL);break;case fl:n.depthFunc(n.GREATER);break;case pl:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}lt=wt}},setLocked:function(wt){X=wt},setClear:function(wt){Mt!==wt&&(n.clearDepth(wt),Mt=wt)},reset:function(){X=!1,rt=null,lt=null,Mt=null}}}function i(){let X=!1,xt=null,rt=null,lt=null,Mt=null,wt=null,Zt=null,be=null,en=null;return{setTest:function($t){X||($t?F(n.STENCIL_TEST):N(n.STENCIL_TEST))},setMask:function($t){xt!==$t&&!X&&(n.stencilMask($t),xt=$t)},setFunc:function($t,nn,Xn){(rt!==$t||lt!==nn||Mt!==Xn)&&(n.stencilFunc($t,nn,Xn),rt=$t,lt=nn,Mt=Xn)},setOp:function($t,nn,Xn){(wt!==$t||Zt!==nn||be!==Xn)&&(n.stencilOp($t,nn,Xn),wt=$t,Zt=nn,be=Xn)},setLocked:function($t){X=$t},setClear:function($t){en!==$t&&(n.clearStencil($t),en=$t)},reset:function(){X=!1,xt=null,rt=null,lt=null,Mt=null,wt=null,Zt=null,be=null,en=null}}}let s=new t,r=new e,a=new i,o=new WeakMap,l=new WeakMap,c={},h={},u=new WeakMap,f=[],d=null,A=!1,_=null,p=null,g=null,w=null,M=null,y=null,C=null,b=new Ot(0,0,0),S=0,E=!1,T=null,m=null,v=null,R=null,L=null,I=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),k=!1,B=0,q=n.getParameter(n.VERSION);q.indexOf("WebGL")!==-1?(B=parseFloat(/^WebGL (\d)/.exec(q)[1]),k=B>=1):q.indexOf("OpenGL ES")!==-1&&(B=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),k=B>=2);let z=null,tt={},ot=n.getParameter(n.SCISSOR_BOX),ut=n.getParameter(n.VIEWPORT),Et=new xe().fromArray(ot),J=new xe().fromArray(ut);function H(X,xt,rt,lt){let Mt=new Uint8Array(4),wt=n.createTexture();n.bindTexture(X,wt),n.texParameteri(X,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(X,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Zt=0;Zt<rt;Zt++)X===n.TEXTURE_3D||X===n.TEXTURE_2D_ARRAY?n.texImage3D(xt,0,n.RGBA,1,1,lt,0,n.RGBA,n.UNSIGNED_BYTE,Mt):n.texImage2D(xt+Zt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Mt);return wt}let U={};U[n.TEXTURE_2D]=H(n.TEXTURE_2D,n.TEXTURE_2D,1),U[n.TEXTURE_CUBE_MAP]=H(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),U[n.TEXTURE_2D_ARRAY]=H(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),U[n.TEXTURE_3D]=H(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),a.setClear(0),F(n.DEPTH_TEST),r.setFunc(Ts),ht(!1),Ct(Hh),F(n.CULL_FACE),O(_e);function F(X){c[X]!==!0&&(n.enable(X),c[X]=!0)}function N(X){c[X]!==!1&&(n.disable(X),c[X]=!1)}function Y(X,xt){return h[X]!==xt?(n.bindFramebuffer(X,xt),h[X]=xt,X===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=xt),X===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=xt),!0):!1}function W(X,xt){let rt=f,lt=!1;if(X){rt=u.get(xt),rt===void 0&&(rt=[],u.set(xt,rt));let Mt=X.textures;if(rt.length!==Mt.length||rt[0]!==n.COLOR_ATTACHMENT0){for(let wt=0,Zt=Mt.length;wt<Zt;wt++)rt[wt]=n.COLOR_ATTACHMENT0+wt;rt.length=Mt.length,lt=!0}}else rt[0]!==n.BACK&&(rt[0]=n.BACK,lt=!0);lt&&n.drawBuffers(rt)}function nt(X){return d!==X?(n.useProgram(X),d=X,!0):!1}let ct={[Mn]:n.FUNC_ADD,[Af]:n.FUNC_SUBTRACT,[vf]:n.FUNC_REVERSE_SUBTRACT};ct[xf]=n.MIN,ct[yf]=n.MAX;let at={[zs]:n.ZERO,[_f]:n.ONE,[Mf]:n.SRC_COLOR,[al]:n.SRC_ALPHA,[Ef]:n.SRC_ALPHA_SATURATE,[ka]:n.DST_COLOR,[Fa]:n.DST_ALPHA,[bf]:n.ONE_MINUS_SRC_COLOR,[ol]:n.ONE_MINUS_SRC_ALPHA,[Sf]:n.ONE_MINUS_DST_COLOR,[wf]:n.ONE_MINUS_DST_ALPHA,[Tf]:n.CONSTANT_COLOR,[Cf]:n.ONE_MINUS_CONSTANT_COLOR,[Rf]:n.CONSTANT_ALPHA,[Pf]:n.ONE_MINUS_CONSTANT_ALPHA};function O(X,xt,rt,lt,Mt,wt,Zt,be,en,$t){if(X===_e){A===!0&&(N(n.BLEND),A=!1);return}if(A===!1&&(F(n.BLEND),A=!0),X!==Tc){if(X!==_||$t!==E){if((p!==Mn||M!==Mn)&&(n.blendEquation(n.FUNC_ADD),p=Mn,M=Mn),$t)switch(X){case bs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Vh:n.blendFunc(n.ONE,n.ONE);break;case Gh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Wh:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",X);break}else switch(X){case bs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Vh:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Gh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Wh:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",X);break}g=null,w=null,y=null,C=null,b.set(0,0,0),S=0,_=X,E=$t}return}Mt=Mt||xt,wt=wt||rt,Zt=Zt||lt,(xt!==p||Mt!==M)&&(n.blendEquationSeparate(ct[xt],ct[Mt]),p=xt,M=Mt),(rt!==g||lt!==w||wt!==y||Zt!==C)&&(n.blendFuncSeparate(at[rt],at[lt],at[wt],at[Zt]),g=rt,w=lt,y=wt,C=Zt),(be.equals(b)===!1||en!==S)&&(n.blendColor(be.r,be.g,be.b,en),b.copy(be),S=en),_=X,E=!1}function Tt(X,xt){X.side===Je?N(n.CULL_FACE):F(n.CULL_FACE);let rt=X.side===ke;xt&&(rt=!rt),ht(rt),X.blending===bs&&X.transparent===!1?O(_e):O(X.blending,X.blendEquation,X.blendSrc,X.blendDst,X.blendEquationAlpha,X.blendSrcAlpha,X.blendDstAlpha,X.blendColor,X.blendAlpha,X.premultipliedAlpha),r.setFunc(X.depthFunc),r.setTest(X.depthTest),r.setMask(X.depthWrite),s.setMask(X.colorWrite);let lt=X.stencilWrite;a.setTest(lt),lt&&(a.setMask(X.stencilWriteMask),a.setFunc(X.stencilFunc,X.stencilRef,X.stencilFuncMask),a.setOp(X.stencilFail,X.stencilZFail,X.stencilZPass)),Dt(X.polygonOffset,X.polygonOffsetFactor,X.polygonOffsetUnits),X.alphaToCoverage===!0?F(n.SAMPLE_ALPHA_TO_COVERAGE):N(n.SAMPLE_ALPHA_TO_COVERAGE)}function ht(X){T!==X&&(X?n.frontFace(n.CW):n.frontFace(n.CCW),T=X)}function Ct(X){X!==pf?(F(n.CULL_FACE),X!==m&&(X===Hh?n.cullFace(n.BACK):X===mf?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):N(n.CULL_FACE),m=X}function mt(X){X!==v&&(k&&n.lineWidth(X),v=X)}function Dt(X,xt,rt){X?(F(n.POLYGON_OFFSET_FILL),(R!==xt||L!==rt)&&(n.polygonOffset(xt,rt),R=xt,L=rt)):N(n.POLYGON_OFFSET_FILL)}function Rt(X){X?F(n.SCISSOR_TEST):N(n.SCISSOR_TEST)}function D(X){X===void 0&&(X=n.TEXTURE0+I-1),z!==X&&(n.activeTexture(X),z=X)}function x(X,xt,rt){rt===void 0&&(z===null?rt=n.TEXTURE0+I-1:rt=z);let lt=tt[rt];lt===void 0&&(lt={type:void 0,texture:void 0},tt[rt]=lt),(lt.type!==X||lt.texture!==xt)&&(z!==rt&&(n.activeTexture(rt),z=rt),n.bindTexture(X,xt||U[X]),lt.type=X,lt.texture=xt)}function V(){let X=tt[z];X!==void 0&&X.type!==void 0&&(n.bindTexture(X.type,null),X.type=void 0,X.texture=void 0)}function Q(){try{n.compressedTexImage2D.apply(n,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function st(){try{n.compressedTexImage3D.apply(n,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function it(){try{n.texSubImage2D.apply(n,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function gt(){try{n.texSubImage3D.apply(n,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function pt(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function yt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Xt(){try{n.texStorage2D.apply(n,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function dt(){try{n.texStorage3D.apply(n,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function _t(){try{n.texImage2D.apply(n,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Ft(){try{n.texImage3D.apply(n,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function kt(X){Et.equals(X)===!1&&(n.scissor(X.x,X.y,X.z,X.w),Et.copy(X))}function St(X){J.equals(X)===!1&&(n.viewport(X.x,X.y,X.z,X.w),J.copy(X))}function Yt(X,xt){let rt=l.get(xt);rt===void 0&&(rt=new WeakMap,l.set(xt,rt));let lt=rt.get(X);lt===void 0&&(lt=n.getUniformBlockIndex(xt,X.name),rt.set(X,lt))}function Vt(X,xt){let lt=l.get(xt).get(X);o.get(xt)!==lt&&(n.uniformBlockBinding(xt,lt,X.__bindingPointIndex),o.set(xt,lt))}function Qt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),c={},z=null,tt={},h={},u=new WeakMap,f=[],d=null,A=!1,_=null,p=null,g=null,w=null,M=null,y=null,C=null,b=new Ot(0,0,0),S=0,E=!1,T=null,m=null,v=null,R=null,L=null,Et.set(0,0,n.canvas.width,n.canvas.height),J.set(0,0,n.canvas.width,n.canvas.height),s.reset(),r.reset(),a.reset()}return{buffers:{color:s,depth:r,stencil:a},enable:F,disable:N,bindFramebuffer:Y,drawBuffers:W,useProgram:nt,setBlending:O,setMaterial:Tt,setFlipSided:ht,setCullFace:Ct,setLineWidth:mt,setPolygonOffset:Dt,setScissorTest:Rt,activeTexture:D,bindTexture:x,unbindTexture:V,compressedTexImage2D:Q,compressedTexImage3D:st,texImage2D:_t,texImage3D:Ft,updateUBOMapping:Yt,uniformBlockBinding:Vt,texStorage2D:Xt,texStorage3D:dt,texSubImage2D:it,texSubImage3D:gt,compressedTexSubImage2D:pt,compressedTexSubImage3D:yt,scissor:kt,viewport:St,reset:Qt}}function Bu(n,t,e,i){let s=KA(i);switch(e){case ju:return n*t;case Qu:return n*t;case Ju:return n*t*2;case $u:return n*t/s.components*s.byteLength;case Oc:return n*t/s.components*s.byteLength;case td:return n*t*2/s.components*s.byteLength;case Bc:return n*t*2/s.components*s.byteLength;case Zu:return n*t*3/s.components*s.byteLength;case dn:return n*t*4/s.components*s.byteLength;case Fc:return n*t*4/s.components*s.byteLength;case ca:case ha:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case ua:case da:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case xl:case _l:return Math.max(n,16)*Math.max(t,8)/4;case vl:case yl:return Math.max(n,8)*Math.max(t,8)/2;case Ml:case bl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case wl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Sl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case El:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Tl:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Cl:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Rl:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Pl:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Il:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Dl:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Ul:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Ll:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Nl:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Ol:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Bl:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Fl:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case fa:case kl:case zl:return Math.ceil(n/4)*Math.ceil(t/4)*16;case ed:case Hl:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Vl:case Gl:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function KA(n){switch(n){case Dn:case Xu:return{byteLength:1,components:1};case pr:case Yu:case bn:return{byteLength:2,components:1};case Lc:case Nc:return{byteLength:2,components:4};case Gi:case Uc:case ti:return{byteLength:4,components:1};case Ku:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function jA(n,t,e,i,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new At,h=new WeakMap,u,f=new WeakMap,d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function A(D,x){return d?new OffscreenCanvas(D,x):ya("canvas")}function _(D,x,V){let Q=1,st=Rt(D);if((st.width>V||st.height>V)&&(Q=V/Math.max(st.width,st.height)),Q<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){let it=Math.floor(Q*st.width),gt=Math.floor(Q*st.height);u===void 0&&(u=A(it,gt));let pt=x?A(it,gt):u;return pt.width=it,pt.height=gt,pt.getContext("2d").drawImage(D,0,0,it,gt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+st.width+"x"+st.height+") to ("+it+"x"+gt+")."),pt}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+st.width+"x"+st.height+")."),D;return D}function p(D){return D.generateMipmaps&&D.minFilter!==Fe&&D.minFilter!==In}function g(D){n.generateMipmap(D)}function w(D,x,V,Q,st=!1){if(D!==null){if(n[D]!==void 0)return n[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let it=x;if(x===n.RED&&(V===n.FLOAT&&(it=n.R32F),V===n.HALF_FLOAT&&(it=n.R16F),V===n.UNSIGNED_BYTE&&(it=n.R8)),x===n.RED_INTEGER&&(V===n.UNSIGNED_BYTE&&(it=n.R8UI),V===n.UNSIGNED_SHORT&&(it=n.R16UI),V===n.UNSIGNED_INT&&(it=n.R32UI),V===n.BYTE&&(it=n.R8I),V===n.SHORT&&(it=n.R16I),V===n.INT&&(it=n.R32I)),x===n.RG&&(V===n.FLOAT&&(it=n.RG32F),V===n.HALF_FLOAT&&(it=n.RG16F),V===n.UNSIGNED_BYTE&&(it=n.RG8)),x===n.RG_INTEGER&&(V===n.UNSIGNED_BYTE&&(it=n.RG8UI),V===n.UNSIGNED_SHORT&&(it=n.RG16UI),V===n.UNSIGNED_INT&&(it=n.RG32UI),V===n.BYTE&&(it=n.RG8I),V===n.SHORT&&(it=n.RG16I),V===n.INT&&(it=n.RG32I)),x===n.RGB_INTEGER&&(V===n.UNSIGNED_BYTE&&(it=n.RGB8UI),V===n.UNSIGNED_SHORT&&(it=n.RGB16UI),V===n.UNSIGNED_INT&&(it=n.RGB32UI),V===n.BYTE&&(it=n.RGB8I),V===n.SHORT&&(it=n.RGB16I),V===n.INT&&(it=n.RGB32I)),x===n.RGBA_INTEGER&&(V===n.UNSIGNED_BYTE&&(it=n.RGBA8UI),V===n.UNSIGNED_SHORT&&(it=n.RGBA16UI),V===n.UNSIGNED_INT&&(it=n.RGBA32UI),V===n.BYTE&&(it=n.RGBA8I),V===n.SHORT&&(it=n.RGBA16I),V===n.INT&&(it=n.RGBA32I)),x===n.RGB&&V===n.UNSIGNED_INT_5_9_9_9_REV&&(it=n.RGB9_E5),x===n.RGBA){let gt=st?ga:Jt.getTransfer(Q);V===n.FLOAT&&(it=n.RGBA32F),V===n.HALF_FLOAT&&(it=n.RGBA16F),V===n.UNSIGNED_BYTE&&(it=gt===he?n.SRGB8_ALPHA8:n.RGBA8),V===n.UNSIGNED_SHORT_4_4_4_4&&(it=n.RGBA4),V===n.UNSIGNED_SHORT_5_5_5_1&&(it=n.RGB5_A1)}return(it===n.R16F||it===n.R32F||it===n.RG16F||it===n.RG32F||it===n.RGBA16F||it===n.RGBA32F)&&t.get("EXT_color_buffer_float"),it}function M(D,x){let V;return D?x===null||x===Gi||x===vi?V=n.DEPTH24_STENCIL8:x===ti?V=n.DEPTH32F_STENCIL8:x===pr&&(V=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Gi||x===vi?V=n.DEPTH_COMPONENT24:x===ti?V=n.DEPTH_COMPONENT32F:x===pr&&(V=n.DEPTH_COMPONENT16),V}function y(D,x){return p(D)===!0||D.isFramebufferTexture&&D.minFilter!==Fe&&D.minFilter!==In?Math.log2(Math.max(x.width,x.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?x.mipmaps.length:1}function C(D){let x=D.target;x.removeEventListener("dispose",C),S(x),x.isVideoTexture&&h.delete(x)}function b(D){let x=D.target;x.removeEventListener("dispose",b),T(x)}function S(D){let x=i.get(D);if(x.__webglInit===void 0)return;let V=D.source,Q=f.get(V);if(Q){let st=Q[x.__cacheKey];st.usedTimes--,st.usedTimes===0&&E(D),Object.keys(Q).length===0&&f.delete(V)}i.remove(D)}function E(D){let x=i.get(D);n.deleteTexture(x.__webglTexture);let V=D.source,Q=f.get(V);delete Q[x.__cacheKey],a.memory.textures--}function T(D){let x=i.get(D);if(D.depthTexture&&D.depthTexture.dispose(),D.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(x.__webglFramebuffer[Q]))for(let st=0;st<x.__webglFramebuffer[Q].length;st++)n.deleteFramebuffer(x.__webglFramebuffer[Q][st]);else n.deleteFramebuffer(x.__webglFramebuffer[Q]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[Q])}else{if(Array.isArray(x.__webglFramebuffer))for(let Q=0;Q<x.__webglFramebuffer.length;Q++)n.deleteFramebuffer(x.__webglFramebuffer[Q]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let Q=0;Q<x.__webglColorRenderbuffer.length;Q++)x.__webglColorRenderbuffer[Q]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[Q]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let V=D.textures;for(let Q=0,st=V.length;Q<st;Q++){let it=i.get(V[Q]);it.__webglTexture&&(n.deleteTexture(it.__webglTexture),a.memory.textures--),i.remove(V[Q])}i.remove(D)}let m=0;function v(){m=0}function R(){let D=m;return D>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+s.maxTextures),m+=1,D}function L(D){let x=[];return x.push(D.wrapS),x.push(D.wrapT),x.push(D.wrapR||0),x.push(D.magFilter),x.push(D.minFilter),x.push(D.anisotropy),x.push(D.internalFormat),x.push(D.format),x.push(D.type),x.push(D.generateMipmaps),x.push(D.premultiplyAlpha),x.push(D.flipY),x.push(D.unpackAlignment),x.push(D.colorSpace),x.join()}function I(D,x){let V=i.get(D);if(D.isVideoTexture&&mt(D),D.isRenderTargetTexture===!1&&D.version>0&&V.__version!==D.version){let Q=D.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{J(V,D,x);return}}e.bindTexture(n.TEXTURE_2D,V.__webglTexture,n.TEXTURE0+x)}function k(D,x){let V=i.get(D);if(D.version>0&&V.__version!==D.version){J(V,D,x);return}e.bindTexture(n.TEXTURE_2D_ARRAY,V.__webglTexture,n.TEXTURE0+x)}function B(D,x){let V=i.get(D);if(D.version>0&&V.__version!==D.version){J(V,D,x);return}e.bindTexture(n.TEXTURE_3D,V.__webglTexture,n.TEXTURE0+x)}function q(D,x){let V=i.get(D);if(D.version>0&&V.__version!==D.version){H(V,D,x);return}e.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture,n.TEXTURE0+x)}let z={[fn]:n.REPEAT,[$n]:n.CLAMP_TO_EDGE,[Al]:n.MIRRORED_REPEAT},tt={[Fe]:n.NEAREST,[Lf]:n.NEAREST_MIPMAP_NEAREST,[zr]:n.NEAREST_MIPMAP_LINEAR,[In]:n.LINEAR,[To]:n.LINEAR_MIPMAP_NEAREST,[Vi]:n.LINEAR_MIPMAP_LINEAR},ot={[Bf]:n.NEVER,[Gf]:n.ALWAYS,[Ff]:n.LESS,[nd]:n.LEQUAL,[kf]:n.EQUAL,[Vf]:n.GEQUAL,[zf]:n.GREATER,[Hf]:n.NOTEQUAL};function ut(D,x){if(x.type===ti&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===In||x.magFilter===To||x.magFilter===zr||x.magFilter===Vi||x.minFilter===In||x.minFilter===To||x.minFilter===zr||x.minFilter===Vi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(D,n.TEXTURE_WRAP_S,z[x.wrapS]),n.texParameteri(D,n.TEXTURE_WRAP_T,z[x.wrapT]),(D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY)&&n.texParameteri(D,n.TEXTURE_WRAP_R,z[x.wrapR]),n.texParameteri(D,n.TEXTURE_MAG_FILTER,tt[x.magFilter]),n.texParameteri(D,n.TEXTURE_MIN_FILTER,tt[x.minFilter]),x.compareFunction&&(n.texParameteri(D,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(D,n.TEXTURE_COMPARE_FUNC,ot[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Fe||x.minFilter!==zr&&x.minFilter!==Vi||x.type===ti&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){let V=t.get("EXT_texture_filter_anisotropic");n.texParameterf(D,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function Et(D,x){let V=!1;D.__webglInit===void 0&&(D.__webglInit=!0,x.addEventListener("dispose",C));let Q=x.source,st=f.get(Q);st===void 0&&(st={},f.set(Q,st));let it=L(x);if(it!==D.__cacheKey){st[it]===void 0&&(st[it]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,V=!0),st[it].usedTimes++;let gt=st[D.__cacheKey];gt!==void 0&&(st[D.__cacheKey].usedTimes--,gt.usedTimes===0&&E(x)),D.__cacheKey=it,D.__webglTexture=st[it].texture}return V}function J(D,x,V){let Q=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(Q=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(Q=n.TEXTURE_3D);let st=Et(D,x),it=x.source;e.bindTexture(Q,D.__webglTexture,n.TEXTURE0+V);let gt=i.get(it);if(it.version!==gt.__version||st===!0){e.activeTexture(n.TEXTURE0+V);let pt=Jt.getPrimaries(Jt.workingColorSpace),yt=x.colorSpace===gi?null:Jt.getPrimaries(x.colorSpace),Xt=x.colorSpace===gi||pt===yt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Xt);let dt=_(x.image,!1,s.maxTextureSize);dt=Dt(x,dt);let _t=r.convert(x.format,x.colorSpace),Ft=r.convert(x.type),kt=w(x.internalFormat,_t,Ft,x.colorSpace,x.isVideoTexture);ut(Q,x);let St,Yt=x.mipmaps,Vt=x.isVideoTexture!==!0,Qt=gt.__version===void 0||st===!0,X=it.dataReady,xt=y(x,dt);if(x.isDepthTexture)kt=M(x.format===xi,x.type),Qt&&(Vt?e.texStorage2D(n.TEXTURE_2D,1,kt,dt.width,dt.height):e.texImage2D(n.TEXTURE_2D,0,kt,dt.width,dt.height,0,_t,Ft,null));else if(x.isDataTexture)if(Yt.length>0){Vt&&Qt&&e.texStorage2D(n.TEXTURE_2D,xt,kt,Yt[0].width,Yt[0].height);for(let rt=0,lt=Yt.length;rt<lt;rt++)St=Yt[rt],Vt?X&&e.texSubImage2D(n.TEXTURE_2D,rt,0,0,St.width,St.height,_t,Ft,St.data):e.texImage2D(n.TEXTURE_2D,rt,kt,St.width,St.height,0,_t,Ft,St.data);x.generateMipmaps=!1}else Vt?(Qt&&e.texStorage2D(n.TEXTURE_2D,xt,kt,dt.width,dt.height),X&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,dt.width,dt.height,_t,Ft,dt.data)):e.texImage2D(n.TEXTURE_2D,0,kt,dt.width,dt.height,0,_t,Ft,dt.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Vt&&Qt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,xt,kt,Yt[0].width,Yt[0].height,dt.depth);for(let rt=0,lt=Yt.length;rt<lt;rt++)if(St=Yt[rt],x.format!==dn)if(_t!==null)if(Vt){if(X)if(x.layerUpdates.size>0){let Mt=Bu(St.width,St.height,x.format,x.type);for(let wt of x.layerUpdates){let Zt=St.data.subarray(wt*Mt/St.data.BYTES_PER_ELEMENT,(wt+1)*Mt/St.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,rt,0,0,wt,St.width,St.height,1,_t,Zt,0,0)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,rt,0,0,0,St.width,St.height,dt.depth,_t,St.data,0,0)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,rt,kt,St.width,St.height,dt.depth,0,St.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Vt?X&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,rt,0,0,0,St.width,St.height,dt.depth,_t,Ft,St.data):e.texImage3D(n.TEXTURE_2D_ARRAY,rt,kt,St.width,St.height,dt.depth,0,_t,Ft,St.data)}else{Vt&&Qt&&e.texStorage2D(n.TEXTURE_2D,xt,kt,Yt[0].width,Yt[0].height);for(let rt=0,lt=Yt.length;rt<lt;rt++)St=Yt[rt],x.format!==dn?_t!==null?Vt?X&&e.compressedTexSubImage2D(n.TEXTURE_2D,rt,0,0,St.width,St.height,_t,St.data):e.compressedTexImage2D(n.TEXTURE_2D,rt,kt,St.width,St.height,0,St.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?X&&e.texSubImage2D(n.TEXTURE_2D,rt,0,0,St.width,St.height,_t,Ft,St.data):e.texImage2D(n.TEXTURE_2D,rt,kt,St.width,St.height,0,_t,Ft,St.data)}else if(x.isDataArrayTexture)if(Vt){if(Qt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,xt,kt,dt.width,dt.height,dt.depth),X)if(x.layerUpdates.size>0){let rt=Bu(dt.width,dt.height,x.format,x.type);for(let lt of x.layerUpdates){let Mt=dt.data.subarray(lt*rt/dt.data.BYTES_PER_ELEMENT,(lt+1)*rt/dt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,lt,dt.width,dt.height,1,_t,Ft,Mt)}x.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,dt.width,dt.height,dt.depth,_t,Ft,dt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,kt,dt.width,dt.height,dt.depth,0,_t,Ft,dt.data);else if(x.isData3DTexture)Vt?(Qt&&e.texStorage3D(n.TEXTURE_3D,xt,kt,dt.width,dt.height,dt.depth),X&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,dt.width,dt.height,dt.depth,_t,Ft,dt.data)):e.texImage3D(n.TEXTURE_3D,0,kt,dt.width,dt.height,dt.depth,0,_t,Ft,dt.data);else if(x.isFramebufferTexture){if(Qt)if(Vt)e.texStorage2D(n.TEXTURE_2D,xt,kt,dt.width,dt.height);else{let rt=dt.width,lt=dt.height;for(let Mt=0;Mt<xt;Mt++)e.texImage2D(n.TEXTURE_2D,Mt,kt,rt,lt,0,_t,Ft,null),rt>>=1,lt>>=1}}else if(Yt.length>0){if(Vt&&Qt){let rt=Rt(Yt[0]);e.texStorage2D(n.TEXTURE_2D,xt,kt,rt.width,rt.height)}for(let rt=0,lt=Yt.length;rt<lt;rt++)St=Yt[rt],Vt?X&&e.texSubImage2D(n.TEXTURE_2D,rt,0,0,_t,Ft,St):e.texImage2D(n.TEXTURE_2D,rt,kt,_t,Ft,St);x.generateMipmaps=!1}else if(Vt){if(Qt){let rt=Rt(dt);e.texStorage2D(n.TEXTURE_2D,xt,kt,rt.width,rt.height)}X&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,_t,Ft,dt)}else e.texImage2D(n.TEXTURE_2D,0,kt,_t,Ft,dt);p(x)&&g(Q),gt.__version=it.version,x.onUpdate&&x.onUpdate(x)}D.__version=x.version}function H(D,x,V){if(x.image.length!==6)return;let Q=Et(D,x),st=x.source;e.bindTexture(n.TEXTURE_CUBE_MAP,D.__webglTexture,n.TEXTURE0+V);let it=i.get(st);if(st.version!==it.__version||Q===!0){e.activeTexture(n.TEXTURE0+V);let gt=Jt.getPrimaries(Jt.workingColorSpace),pt=x.colorSpace===gi?null:Jt.getPrimaries(x.colorSpace),yt=x.colorSpace===gi||gt===pt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,yt);let Xt=x.isCompressedTexture||x.image[0].isCompressedTexture,dt=x.image[0]&&x.image[0].isDataTexture,_t=[];for(let lt=0;lt<6;lt++)!Xt&&!dt?_t[lt]=_(x.image[lt],!0,s.maxCubemapSize):_t[lt]=dt?x.image[lt].image:x.image[lt],_t[lt]=Dt(x,_t[lt]);let Ft=_t[0],kt=r.convert(x.format,x.colorSpace),St=r.convert(x.type),Yt=w(x.internalFormat,kt,St,x.colorSpace),Vt=x.isVideoTexture!==!0,Qt=it.__version===void 0||Q===!0,X=st.dataReady,xt=y(x,Ft);ut(n.TEXTURE_CUBE_MAP,x);let rt;if(Xt){Vt&&Qt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,xt,Yt,Ft.width,Ft.height);for(let lt=0;lt<6;lt++){rt=_t[lt].mipmaps;for(let Mt=0;Mt<rt.length;Mt++){let wt=rt[Mt];x.format!==dn?kt!==null?Vt?X&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Mt,0,0,wt.width,wt.height,kt,wt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Mt,Yt,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Vt?X&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Mt,0,0,wt.width,wt.height,kt,St,wt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Mt,Yt,wt.width,wt.height,0,kt,St,wt.data)}}}else{if(rt=x.mipmaps,Vt&&Qt){rt.length>0&&xt++;let lt=Rt(_t[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,xt,Yt,lt.width,lt.height)}for(let lt=0;lt<6;lt++)if(dt){Vt?X&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,0,0,_t[lt].width,_t[lt].height,kt,St,_t[lt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,Yt,_t[lt].width,_t[lt].height,0,kt,St,_t[lt].data);for(let Mt=0;Mt<rt.length;Mt++){let Zt=rt[Mt].image[lt].image;Vt?X&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Mt+1,0,0,Zt.width,Zt.height,kt,St,Zt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Mt+1,Yt,Zt.width,Zt.height,0,kt,St,Zt.data)}}else{Vt?X&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,0,0,kt,St,_t[lt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,Yt,kt,St,_t[lt]);for(let Mt=0;Mt<rt.length;Mt++){let wt=rt[Mt];Vt?X&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Mt+1,0,0,kt,St,wt.image[lt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Mt+1,Yt,kt,St,wt.image[lt])}}}p(x)&&g(n.TEXTURE_CUBE_MAP),it.__version=st.version,x.onUpdate&&x.onUpdate(x)}D.__version=x.version}function U(D,x,V,Q,st,it){let gt=r.convert(V.format,V.colorSpace),pt=r.convert(V.type),yt=w(V.internalFormat,gt,pt,V.colorSpace);if(!i.get(x).__hasExternalTextures){let dt=Math.max(1,x.width>>it),_t=Math.max(1,x.height>>it);st===n.TEXTURE_3D||st===n.TEXTURE_2D_ARRAY?e.texImage3D(st,it,yt,dt,_t,x.depth,0,gt,pt,null):e.texImage2D(st,it,yt,dt,_t,0,gt,pt,null)}e.bindFramebuffer(n.FRAMEBUFFER,D),Ct(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Q,st,i.get(V).__webglTexture,0,ht(x)):(st===n.TEXTURE_2D||st>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&st<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Q,st,i.get(V).__webglTexture,it),e.bindFramebuffer(n.FRAMEBUFFER,null)}function F(D,x,V){if(n.bindRenderbuffer(n.RENDERBUFFER,D),x.depthBuffer){let Q=x.depthTexture,st=Q&&Q.isDepthTexture?Q.type:null,it=M(x.stencilBuffer,st),gt=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,pt=ht(x);Ct(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,pt,it,x.width,x.height):V?n.renderbufferStorageMultisample(n.RENDERBUFFER,pt,it,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,it,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,gt,n.RENDERBUFFER,D)}else{let Q=x.textures;for(let st=0;st<Q.length;st++){let it=Q[st],gt=r.convert(it.format,it.colorSpace),pt=r.convert(it.type),yt=w(it.internalFormat,gt,pt,it.colorSpace),Xt=ht(x);V&&Ct(x)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Xt,yt,x.width,x.height):Ct(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Xt,yt,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,yt,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function N(D,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,D),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(x.depthTexture).__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),I(x.depthTexture,0);let Q=i.get(x.depthTexture).__webglTexture,st=ht(x);if(x.depthTexture.format===ws)Ct(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Q,0,st):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Q,0);else if(x.depthTexture.format===xi)Ct(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Q,0,st):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Y(D){let x=i.get(D),V=D.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==D.depthTexture){let Q=D.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),Q){let st=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,Q.removeEventListener("dispose",st)};Q.addEventListener("dispose",st),x.__depthDisposeCallback=st}x.__boundDepthTexture=Q}if(D.depthTexture&&!x.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");N(x.__webglFramebuffer,D)}else if(V){x.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)if(e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[Q]),x.__webglDepthbuffer[Q]===void 0)x.__webglDepthbuffer[Q]=n.createRenderbuffer(),F(x.__webglDepthbuffer[Q],D,!1);else{let st=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,it=x.__webglDepthbuffer[Q];n.bindRenderbuffer(n.RENDERBUFFER,it),n.framebufferRenderbuffer(n.FRAMEBUFFER,st,n.RENDERBUFFER,it)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),F(x.__webglDepthbuffer,D,!1);else{let Q=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,st=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,st),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,st)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function W(D,x,V){let Q=i.get(D);x!==void 0&&U(Q.__webglFramebuffer,D,D.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),V!==void 0&&Y(D)}function nt(D){let x=D.texture,V=i.get(D),Q=i.get(x);D.addEventListener("dispose",b);let st=D.textures,it=D.isWebGLCubeRenderTarget===!0,gt=st.length>1;if(gt||(Q.__webglTexture===void 0&&(Q.__webglTexture=n.createTexture()),Q.__version=x.version,a.memory.textures++),it){V.__webglFramebuffer=[];for(let pt=0;pt<6;pt++)if(x.mipmaps&&x.mipmaps.length>0){V.__webglFramebuffer[pt]=[];for(let yt=0;yt<x.mipmaps.length;yt++)V.__webglFramebuffer[pt][yt]=n.createFramebuffer()}else V.__webglFramebuffer[pt]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){V.__webglFramebuffer=[];for(let pt=0;pt<x.mipmaps.length;pt++)V.__webglFramebuffer[pt]=n.createFramebuffer()}else V.__webglFramebuffer=n.createFramebuffer();if(gt)for(let pt=0,yt=st.length;pt<yt;pt++){let Xt=i.get(st[pt]);Xt.__webglTexture===void 0&&(Xt.__webglTexture=n.createTexture(),a.memory.textures++)}if(D.samples>0&&Ct(D)===!1){V.__webglMultisampledFramebuffer=n.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let pt=0;pt<st.length;pt++){let yt=st[pt];V.__webglColorRenderbuffer[pt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,V.__webglColorRenderbuffer[pt]);let Xt=r.convert(yt.format,yt.colorSpace),dt=r.convert(yt.type),_t=w(yt.internalFormat,Xt,dt,yt.colorSpace,D.isXRRenderTarget===!0),Ft=ht(D);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ft,_t,D.width,D.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pt,n.RENDERBUFFER,V.__webglColorRenderbuffer[pt])}n.bindRenderbuffer(n.RENDERBUFFER,null),D.depthBuffer&&(V.__webglDepthRenderbuffer=n.createRenderbuffer(),F(V.__webglDepthRenderbuffer,D,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(it){e.bindTexture(n.TEXTURE_CUBE_MAP,Q.__webglTexture),ut(n.TEXTURE_CUBE_MAP,x);for(let pt=0;pt<6;pt++)if(x.mipmaps&&x.mipmaps.length>0)for(let yt=0;yt<x.mipmaps.length;yt++)U(V.__webglFramebuffer[pt][yt],D,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,yt);else U(V.__webglFramebuffer[pt],D,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0);p(x)&&g(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(gt){for(let pt=0,yt=st.length;pt<yt;pt++){let Xt=st[pt],dt=i.get(Xt);e.bindTexture(n.TEXTURE_2D,dt.__webglTexture),ut(n.TEXTURE_2D,Xt),U(V.__webglFramebuffer,D,Xt,n.COLOR_ATTACHMENT0+pt,n.TEXTURE_2D,0),p(Xt)&&g(n.TEXTURE_2D)}e.unbindTexture()}else{let pt=n.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(pt=D.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(pt,Q.__webglTexture),ut(pt,x),x.mipmaps&&x.mipmaps.length>0)for(let yt=0;yt<x.mipmaps.length;yt++)U(V.__webglFramebuffer[yt],D,x,n.COLOR_ATTACHMENT0,pt,yt);else U(V.__webglFramebuffer,D,x,n.COLOR_ATTACHMENT0,pt,0);p(x)&&g(pt),e.unbindTexture()}D.depthBuffer&&Y(D)}function ct(D){let x=D.textures;for(let V=0,Q=x.length;V<Q;V++){let st=x[V];if(p(st)){let it=D.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,gt=i.get(st).__webglTexture;e.bindTexture(it,gt),g(it),e.unbindTexture()}}}let at=[],O=[];function Tt(D){if(D.samples>0){if(Ct(D)===!1){let x=D.textures,V=D.width,Q=D.height,st=n.COLOR_BUFFER_BIT,it=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,gt=i.get(D),pt=x.length>1;if(pt)for(let yt=0;yt<x.length;yt++)e.bindFramebuffer(n.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+yt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,gt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+yt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,gt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,gt.__webglFramebuffer);for(let yt=0;yt<x.length;yt++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(st|=n.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(st|=n.STENCIL_BUFFER_BIT)),pt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,gt.__webglColorRenderbuffer[yt]);let Xt=i.get(x[yt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Xt,0)}n.blitFramebuffer(0,0,V,Q,0,0,V,Q,st,n.NEAREST),l===!0&&(at.length=0,O.length=0,at.push(n.COLOR_ATTACHMENT0+yt),D.depthBuffer&&D.resolveDepthBuffer===!1&&(at.push(it),O.push(it),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,O)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,at))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),pt)for(let yt=0;yt<x.length;yt++){e.bindFramebuffer(n.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+yt,n.RENDERBUFFER,gt.__webglColorRenderbuffer[yt]);let Xt=i.get(x[yt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,gt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+yt,n.TEXTURE_2D,Xt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,gt.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&l){let x=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function ht(D){return Math.min(s.maxSamples,D.samples)}function Ct(D){let x=i.get(D);return D.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function mt(D){let x=a.render.frame;h.get(D)!==x&&(h.set(D,x),D.update())}function Dt(D,x){let V=D.colorSpace,Q=D.format,st=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||V!==_i&&V!==gi&&(Jt.getTransfer(V)===he?(Q!==dn||st!==Dn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),x}function Rt(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(c.width=D.naturalWidth||D.width,c.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(c.width=D.displayWidth,c.height=D.displayHeight):(c.width=D.width,c.height=D.height),c}this.allocateTextureUnit=R,this.resetTextureUnits=v,this.setTexture2D=I,this.setTexture2DArray=k,this.setTexture3D=B,this.setTextureCube=q,this.rebindTextures=W,this.setupRenderTarget=nt,this.updateRenderTargetMipmap=ct,this.updateMultisampleRenderTarget=Tt,this.setupDepthRenderbuffer=Y,this.setupFrameBufferTexture=U,this.useMultisampledRTT=Ct}function ZA(n,t){function e(i,s=gi){let r,a=Jt.getTransfer(s);if(i===Dn)return n.UNSIGNED_BYTE;if(i===Lc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Nc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Ku)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Xu)return n.BYTE;if(i===Yu)return n.SHORT;if(i===pr)return n.UNSIGNED_SHORT;if(i===Uc)return n.INT;if(i===Gi)return n.UNSIGNED_INT;if(i===ti)return n.FLOAT;if(i===bn)return n.HALF_FLOAT;if(i===ju)return n.ALPHA;if(i===Zu)return n.RGB;if(i===dn)return n.RGBA;if(i===Qu)return n.LUMINANCE;if(i===Ju)return n.LUMINANCE_ALPHA;if(i===ws)return n.DEPTH_COMPONENT;if(i===xi)return n.DEPTH_STENCIL;if(i===$u)return n.RED;if(i===Oc)return n.RED_INTEGER;if(i===td)return n.RG;if(i===Bc)return n.RG_INTEGER;if(i===Fc)return n.RGBA_INTEGER;if(i===ca||i===ha||i===ua||i===da)if(a===he)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===ca)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ha)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ua)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===da)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===ca)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ha)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ua)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===da)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===vl||i===xl||i===yl||i===_l)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===vl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===xl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===yl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===_l)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ml||i===bl||i===wl)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Ml||i===bl)return a===he?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===wl)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Sl||i===El||i===Tl||i===Cl||i===Rl||i===Pl||i===Il||i===Dl||i===Ul||i===Ll||i===Nl||i===Ol||i===Bl||i===Fl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Sl)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===El)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Tl)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Cl)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Rl)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Pl)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Il)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Dl)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ul)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ll)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Nl)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ol)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Bl)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Fl)return a===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===fa||i===kl||i===zl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===fa)return a===he?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===kl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===zl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ed||i===Hl||i===Vl||i===Gl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===fa)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Hl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Vl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Gl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===vi?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}var ic=class extends Qe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},ni=class extends rn{constructor(){super(),this.isGroup=!0,this.type="Group"}},QA={type:"move"},ur=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ni,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ni,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ni,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let _ of t.hand.values()){let p=e.getJointPose(_,i),g=this._getHandJoint(c,_);p!==null&&(g.matrix.fromArray(p.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=p.radius),g.visible=p!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,A=.005;c.inputState.pinching&&f>d+A?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-A&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(QA)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new ni;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},JA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,$A=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,sc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){let s=new sn,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new Se({vertexShader:JA,fragmentShader:$A,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new le(new Wn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},rc=class extends ii{constructor(t,e){super();let i=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,A=null,_=new sc,p=e.getContextAttributes(),g=null,w=null,M=[],y=[],C=new At,b=null,S=new Qe;S.layers.enable(1),S.viewport=new xe;let E=new Qe;E.layers.enable(2),E.viewport=new xe;let T=[S,E],m=new ic;m.layers.enable(1),m.layers.enable(2);let v=null,R=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let U=M[H];return U===void 0&&(U=new ur,M[H]=U),U.getTargetRaySpace()},this.getControllerGrip=function(H){let U=M[H];return U===void 0&&(U=new ur,M[H]=U),U.getGripSpace()},this.getHand=function(H){let U=M[H];return U===void 0&&(U=new ur,M[H]=U),U.getHandSpace()};function L(H){let U=y.indexOf(H.inputSource);if(U===-1)return;let F=M[U];F!==void 0&&(F.update(H.inputSource,H.frame,c||a),F.dispatchEvent({type:H.type,data:H.inputSource}))}function I(){s.removeEventListener("select",L),s.removeEventListener("selectstart",L),s.removeEventListener("selectend",L),s.removeEventListener("squeeze",L),s.removeEventListener("squeezestart",L),s.removeEventListener("squeezeend",L),s.removeEventListener("end",I),s.removeEventListener("inputsourceschange",k);for(let H=0;H<M.length;H++){let U=y[H];U!==null&&(y[H]=null,M[H].disconnect(U))}v=null,R=null,_.reset(),t.setRenderTarget(g),d=null,f=null,u=null,s=null,w=null,J.stop(),i.isPresenting=!1,t.setPixelRatio(b),t.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){r=H,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){o=H,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(H){c=H},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return A},this.getSession=function(){return s},this.setSession=async function(H){if(s=H,s!==null){if(g=t.getRenderTarget(),s.addEventListener("select",L),s.addEventListener("selectstart",L),s.addEventListener("selectend",L),s.addEventListener("squeeze",L),s.addEventListener("squeezestart",L),s.addEventListener("squeezeend",L),s.addEventListener("end",I),s.addEventListener("inputsourceschange",k),p.xrCompatible!==!0&&await e.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(C),s.renderState.layers===void 0){let U={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,U),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),w=new Ge(d.framebufferWidth,d.framebufferHeight,{format:dn,type:Dn,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let U=null,F=null,N=null;p.depth&&(N=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,U=p.stencil?xi:ws,F=p.stencil?vi:Gi);let Y={colorFormat:e.RGBA8,depthFormat:N,scaleFactor:r};u=new XRWebGLBinding(s,e),f=u.createProjectionLayer(Y),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),w=new Ge(f.textureWidth,f.textureHeight,{format:dn,type:Dn,depthTexture:new Ns(f.textureWidth,f.textureHeight,F,void 0,void 0,void 0,void 0,void 0,void 0,U),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),J.setContext(s),J.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function k(H){for(let U=0;U<H.removed.length;U++){let F=H.removed[U],N=y.indexOf(F);N>=0&&(y[N]=null,M[N].disconnect(F))}for(let U=0;U<H.added.length;U++){let F=H.added[U],N=y.indexOf(F);if(N===-1){for(let W=0;W<M.length;W++)if(W>=y.length){y.push(F),N=W;break}else if(y[W]===null){y[W]=F,N=W;break}if(N===-1)break}let Y=M[N];Y&&Y.connect(F)}}let B=new G,q=new G;function z(H,U,F){B.setFromMatrixPosition(U.matrixWorld),q.setFromMatrixPosition(F.matrixWorld);let N=B.distanceTo(q),Y=U.projectionMatrix.elements,W=F.projectionMatrix.elements,nt=Y[14]/(Y[10]-1),ct=Y[14]/(Y[10]+1),at=(Y[9]+1)/Y[5],O=(Y[9]-1)/Y[5],Tt=(Y[8]-1)/Y[0],ht=(W[8]+1)/W[0],Ct=nt*Tt,mt=nt*ht,Dt=N/(-Tt+ht),Rt=Dt*-Tt;if(U.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(Rt),H.translateZ(Dt),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert(),Y[10]===-1)H.projectionMatrix.copy(U.projectionMatrix),H.projectionMatrixInverse.copy(U.projectionMatrixInverse);else{let D=nt+Dt,x=ct+Dt,V=Ct-Rt,Q=mt+(N-Rt),st=at*ct/x*D,it=O*ct/x*D;H.projectionMatrix.makePerspective(V,Q,st,it,D,x),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}}function tt(H,U){U===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices(U.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(s===null)return;let U=H.near,F=H.far;_.texture!==null&&(_.depthNear>0&&(U=_.depthNear),_.depthFar>0&&(F=_.depthFar)),m.near=E.near=S.near=U,m.far=E.far=S.far=F,(v!==m.near||R!==m.far)&&(s.updateRenderState({depthNear:m.near,depthFar:m.far}),v=m.near,R=m.far);let N=H.parent,Y=m.cameras;tt(m,N);for(let W=0;W<Y.length;W++)tt(Y[W],N);Y.length===2?z(m,S,E):m.projectionMatrix.copy(S.projectionMatrix),ot(H,m,N)};function ot(H,U,F){F===null?H.matrix.copy(U.matrixWorld):(H.matrix.copy(F.matrixWorld),H.matrix.invert(),H.matrix.multiply(U.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy(U.projectionMatrix),H.projectionMatrixInverse.copy(U.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=mr*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return m},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(H){l=H,f!==null&&(f.fixedFoveation=H),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=H)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(m)};let ut=null;function Et(H,U){if(h=U.getViewerPose(c||a),A=U,h!==null){let F=h.views;d!==null&&(t.setRenderTargetFramebuffer(w,d.framebuffer),t.setRenderTarget(w));let N=!1;F.length!==m.cameras.length&&(m.cameras.length=0,N=!0);for(let W=0;W<F.length;W++){let nt=F[W],ct=null;if(d!==null)ct=d.getViewport(nt);else{let O=u.getViewSubImage(f,nt);ct=O.viewport,W===0&&(t.setRenderTargetTextures(w,O.colorTexture,f.ignoreDepthValues?void 0:O.depthStencilTexture),t.setRenderTarget(w))}let at=T[W];at===void 0&&(at=new Qe,at.layers.enable(W),at.viewport=new xe,T[W]=at),at.matrix.fromArray(nt.transform.matrix),at.matrix.decompose(at.position,at.quaternion,at.scale),at.projectionMatrix.fromArray(nt.projectionMatrix),at.projectionMatrixInverse.copy(at.projectionMatrix).invert(),at.viewport.set(ct.x,ct.y,ct.width,ct.height),W===0&&(m.matrix.copy(at.matrix),m.matrix.decompose(m.position,m.quaternion,m.scale)),N===!0&&m.cameras.push(at)}let Y=s.enabledFeatures;if(Y&&Y.includes("depth-sensing")){let W=u.getDepthInformation(F[0]);W&&W.isValid&&W.texture&&_.init(t,W,s.renderState)}}for(let F=0;F<M.length;F++){let N=y[F],Y=M[F];N!==null&&Y!==void 0&&Y.update(N,U,c||a)}ut&&ut(H,U),U.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:U}),A=null}let J=new ad;J.setAnimationLoop(Et),this.setAnimationLoop=function(H){ut=H},this.dispose=function(){}}},Fi=new Vn,tv=new ae;function ev(n,t){function e(p,g){p.matrixAutoUpdate===!0&&p.updateMatrix(),g.value.copy(p.matrix)}function i(p,g){g.color.getRGB(p.fogColor.value,rd(n)),g.isFog?(p.fogNear.value=g.near,p.fogFar.value=g.far):g.isFogExp2&&(p.fogDensity.value=g.density)}function s(p,g,w,M,y){g.isMeshBasicMaterial||g.isMeshLambertMaterial?r(p,g):g.isMeshToonMaterial?(r(p,g),u(p,g)):g.isMeshPhongMaterial?(r(p,g),h(p,g)):g.isMeshStandardMaterial?(r(p,g),f(p,g),g.isMeshPhysicalMaterial&&d(p,g,y)):g.isMeshMatcapMaterial?(r(p,g),A(p,g)):g.isMeshDepthMaterial?r(p,g):g.isMeshDistanceMaterial?(r(p,g),_(p,g)):g.isMeshNormalMaterial?r(p,g):g.isLineBasicMaterial?(a(p,g),g.isLineDashedMaterial&&o(p,g)):g.isPointsMaterial?l(p,g,w,M):g.isSpriteMaterial?c(p,g):g.isShadowMaterial?(p.color.value.copy(g.color),p.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(p,g){p.opacity.value=g.opacity,g.color&&p.diffuse.value.copy(g.color),g.emissive&&p.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.bumpMap&&(p.bumpMap.value=g.bumpMap,e(g.bumpMap,p.bumpMapTransform),p.bumpScale.value=g.bumpScale,g.side===ke&&(p.bumpScale.value*=-1)),g.normalMap&&(p.normalMap.value=g.normalMap,e(g.normalMap,p.normalMapTransform),p.normalScale.value.copy(g.normalScale),g.side===ke&&p.normalScale.value.negate()),g.displacementMap&&(p.displacementMap.value=g.displacementMap,e(g.displacementMap,p.displacementMapTransform),p.displacementScale.value=g.displacementScale,p.displacementBias.value=g.displacementBias),g.emissiveMap&&(p.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,p.emissiveMapTransform)),g.specularMap&&(p.specularMap.value=g.specularMap,e(g.specularMap,p.specularMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest);let w=t.get(g),M=w.envMap,y=w.envMapRotation;M&&(p.envMap.value=M,Fi.copy(y),Fi.x*=-1,Fi.y*=-1,Fi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Fi.y*=-1,Fi.z*=-1),p.envMapRotation.value.setFromMatrix4(tv.makeRotationFromEuler(Fi)),p.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=g.reflectivity,p.ior.value=g.ior,p.refractionRatio.value=g.refractionRatio),g.lightMap&&(p.lightMap.value=g.lightMap,p.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,p.lightMapTransform)),g.aoMap&&(p.aoMap.value=g.aoMap,p.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,p.aoMapTransform))}function a(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform))}function o(p,g){p.dashSize.value=g.dashSize,p.totalSize.value=g.dashSize+g.gapSize,p.scale.value=g.scale}function l(p,g,w,M){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.size.value=g.size*w,p.scale.value=M*.5,g.map&&(p.map.value=g.map,e(g.map,p.uvTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function c(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.rotation.value=g.rotation,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function h(p,g){p.specular.value.copy(g.specular),p.shininess.value=Math.max(g.shininess,1e-4)}function u(p,g){g.gradientMap&&(p.gradientMap.value=g.gradientMap)}function f(p,g){p.metalness.value=g.metalness,g.metalnessMap&&(p.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,p.metalnessMapTransform)),p.roughness.value=g.roughness,g.roughnessMap&&(p.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,p.roughnessMapTransform)),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)}function d(p,g,w){p.ior.value=g.ior,g.sheen>0&&(p.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),p.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(p.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,p.sheenColorMapTransform)),g.sheenRoughnessMap&&(p.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,p.sheenRoughnessMapTransform))),g.clearcoat>0&&(p.clearcoat.value=g.clearcoat,p.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(p.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,p.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(p.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===ke&&p.clearcoatNormalScale.value.negate())),g.dispersion>0&&(p.dispersion.value=g.dispersion),g.iridescence>0&&(p.iridescence.value=g.iridescence,p.iridescenceIOR.value=g.iridescenceIOR,p.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(p.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,p.iridescenceMapTransform)),g.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),g.transmission>0&&(p.transmission.value=g.transmission,p.transmissionSamplerMap.value=w.texture,p.transmissionSamplerSize.value.set(w.width,w.height),g.transmissionMap&&(p.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,p.transmissionMapTransform)),p.thickness.value=g.thickness,g.thicknessMap&&(p.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=g.attenuationDistance,p.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(p.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(p.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=g.specularIntensity,p.specularColor.value.copy(g.specularColor),g.specularColorMap&&(p.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,p.specularColorMapTransform)),g.specularIntensityMap&&(p.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,p.specularIntensityMapTransform))}function A(p,g){g.matcap&&(p.matcap.value=g.matcap)}function _(p,g){let w=t.get(g).light;p.referencePosition.value.setFromMatrixPosition(w.matrixWorld),p.nearDistance.value=w.shadow.camera.near,p.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function nv(n,t,e,i){let s={},r={},a=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(w,M){let y=M.program;i.uniformBlockBinding(w,y)}function c(w,M){let y=s[w.id];y===void 0&&(A(w),y=h(w),s[w.id]=y,w.addEventListener("dispose",p));let C=M.program;i.updateUBOMapping(w,C);let b=t.render.frame;r[w.id]!==b&&(f(w),r[w.id]=b)}function h(w){let M=u();w.__bindingPointIndex=M;let y=n.createBuffer(),C=w.__size,b=w.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,C,b),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,M,y),y}function u(){for(let w=0;w<o;w++)if(a.indexOf(w)===-1)return a.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(w){let M=s[w.id],y=w.uniforms,C=w.__cache;n.bindBuffer(n.UNIFORM_BUFFER,M);for(let b=0,S=y.length;b<S;b++){let E=Array.isArray(y[b])?y[b]:[y[b]];for(let T=0,m=E.length;T<m;T++){let v=E[T];if(d(v,b,T,C)===!0){let R=v.__offset,L=Array.isArray(v.value)?v.value:[v.value],I=0;for(let k=0;k<L.length;k++){let B=L[k],q=_(B);typeof B=="number"||typeof B=="boolean"?(v.__data[0]=B,n.bufferSubData(n.UNIFORM_BUFFER,R+I,v.__data)):B.isMatrix3?(v.__data[0]=B.elements[0],v.__data[1]=B.elements[1],v.__data[2]=B.elements[2],v.__data[3]=0,v.__data[4]=B.elements[3],v.__data[5]=B.elements[4],v.__data[6]=B.elements[5],v.__data[7]=0,v.__data[8]=B.elements[6],v.__data[9]=B.elements[7],v.__data[10]=B.elements[8],v.__data[11]=0):(B.toArray(v.__data,I),I+=q.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,R,v.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(w,M,y,C){let b=w.value,S=M+"_"+y;if(C[S]===void 0)return typeof b=="number"||typeof b=="boolean"?C[S]=b:C[S]=b.clone(),!0;{let E=C[S];if(typeof b=="number"||typeof b=="boolean"){if(E!==b)return C[S]=b,!0}else if(E.equals(b)===!1)return E.copy(b),!0}return!1}function A(w){let M=w.uniforms,y=0,C=16;for(let S=0,E=M.length;S<E;S++){let T=Array.isArray(M[S])?M[S]:[M[S]];for(let m=0,v=T.length;m<v;m++){let R=T[m],L=Array.isArray(R.value)?R.value:[R.value];for(let I=0,k=L.length;I<k;I++){let B=L[I],q=_(B),z=y%C,tt=z%q.boundary,ot=z+tt;y+=tt,ot!==0&&C-ot<q.storage&&(y+=C-ot),R.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),R.__offset=y,y+=q.storage}}}let b=y%C;return b>0&&(y+=C-b),w.__size=y,w.__cache={},this}function _(w){let M={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(M.boundary=4,M.storage=4):w.isVector2?(M.boundary=8,M.storage=8):w.isVector3||w.isColor?(M.boundary=16,M.storage=12):w.isVector4?(M.boundary=16,M.storage=16):w.isMatrix3?(M.boundary=48,M.storage=48):w.isMatrix4?(M.boundary=64,M.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),M}function p(w){let M=w.target;M.removeEventListener("dispose",p);let y=a.indexOf(M.__bindingPointIndex);a.splice(y,1),n.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function g(){for(let w in s)n.deleteBuffer(s[w]);a=[],s={},r={}}return{bind:l,update:c,dispose:g}}var Ea=class{constructor(t={}){let{canvas:e=ap(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=a;let d=new Uint32Array(4),A=new Int32Array(4),_=null,p=null,g=[],w=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ze,this.toneMapping=Ai,this.toneMappingExposure=1;let M=this,y=!1,C=0,b=0,S=null,E=-1,T=null,m=new xe,v=new xe,R=null,L=new Ot(0),I=0,k=e.width,B=e.height,q=1,z=null,tt=null,ot=new xe(0,0,k,B),ut=new xe(0,0,k,B),Et=!1,J=new vr,H=!1,U=!1,F=new ae,N=new ae,Y=new G,W=new xe,nt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ct=!1;function at(){return S===null?q:1}let O=i;function Tt(P,K){return e.getContext(P,K)}try{let P={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine","three.js r169"),e.addEventListener("webglcontextlost",lt,!1),e.addEventListener("webglcontextrestored",Mt,!1),e.addEventListener("webglcontextcreationerror",wt,!1),O===null){let K="webgl2";if(O=Tt(K,P),O===null)throw Tt(K)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(P){throw console.error("THREE.WebGLRenderer: "+P.message),P}let ht,Ct,mt,Dt,Rt,D,x,V,Q,st,it,gt,pt,yt,Xt,dt,_t,Ft,kt,St,Yt,Vt,Qt,X;function xt(){ht=new v0(O),ht.init(),Vt=new ZA(O,ht),Ct=new d0(O,ht,t,Vt),mt=new YA(O),Ct.reverseDepthBuffer&&mt.buffers.depth.setReversed(!0),Dt=new _0(O),Rt=new LA,D=new jA(O,ht,mt,Rt,Ct,Vt,Dt),x=new p0(M),V=new A0(M),Q=new Cp(O),Qt=new h0(O,Q),st=new x0(O,Q,Dt,Qt),it=new b0(O,st,Q,Dt),kt=new M0(O,Ct,D),dt=new f0(Rt),gt=new UA(M,x,V,ht,Ct,Qt,dt),pt=new ev(M,Rt),yt=new OA,Xt=new VA(ht),Ft=new c0(M,x,V,mt,it,f,l),_t=new qA(M,it,Ct),X=new nv(O,Dt,Ct,mt),St=new u0(O,ht,Dt),Yt=new y0(O,ht,Dt),Dt.programs=gt.programs,M.capabilities=Ct,M.extensions=ht,M.properties=Rt,M.renderLists=yt,M.shadowMap=_t,M.state=mt,M.info=Dt}xt();let rt=new rc(M,O);this.xr=rt,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){let P=ht.get("WEBGL_lose_context");P&&P.loseContext()},this.forceContextRestore=function(){let P=ht.get("WEBGL_lose_context");P&&P.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(P){P!==void 0&&(q=P,this.setSize(k,B,!1))},this.getSize=function(P){return P.set(k,B)},this.setSize=function(P,K,$=!0){if(rt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=P,B=K,e.width=Math.floor(P*q),e.height=Math.floor(K*q),$===!0&&(e.style.width=P+"px",e.style.height=K+"px"),this.setViewport(0,0,P,K)},this.getDrawingBufferSize=function(P){return P.set(k*q,B*q).floor()},this.setDrawingBufferSize=function(P,K,$){k=P,B=K,q=$,e.width=Math.floor(P*$),e.height=Math.floor(K*$),this.setViewport(0,0,P,K)},this.getCurrentViewport=function(P){return P.copy(m)},this.getViewport=function(P){return P.copy(ot)},this.setViewport=function(P,K,$,et){P.isVector4?ot.set(P.x,P.y,P.z,P.w):ot.set(P,K,$,et),mt.viewport(m.copy(ot).multiplyScalar(q).round())},this.getScissor=function(P){return P.copy(ut)},this.setScissor=function(P,K,$,et){P.isVector4?ut.set(P.x,P.y,P.z,P.w):ut.set(P,K,$,et),mt.scissor(v.copy(ut).multiplyScalar(q).round())},this.getScissorTest=function(){return Et},this.setScissorTest=function(P){mt.setScissorTest(Et=P)},this.setOpaqueSort=function(P){z=P},this.setTransparentSort=function(P){tt=P},this.getClearColor=function(P){return P.copy(Ft.getClearColor())},this.setClearColor=function(){Ft.setClearColor.apply(Ft,arguments)},this.getClearAlpha=function(){return Ft.getClearAlpha()},this.setClearAlpha=function(){Ft.setClearAlpha.apply(Ft,arguments)},this.clear=function(P=!0,K=!0,$=!0){let et=0;if(P){let j=!1;if(S!==null){let ft=S.texture.format;j=ft===Fc||ft===Bc||ft===Oc}if(j){let ft=S.texture.type,bt=ft===Dn||ft===Gi||ft===pr||ft===vi||ft===Lc||ft===Nc,Pt=Ft.getClearColor(),It=Ft.getClearAlpha(),zt=Pt.r,Ht=Pt.g,Ut=Pt.b;bt?(d[0]=zt,d[1]=Ht,d[2]=Ut,d[3]=It,O.clearBufferuiv(O.COLOR,0,d)):(A[0]=zt,A[1]=Ht,A[2]=Ut,A[3]=It,O.clearBufferiv(O.COLOR,0,A))}else et|=O.COLOR_BUFFER_BIT}K&&(et|=O.DEPTH_BUFFER_BIT,O.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),$&&(et|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(et)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",lt,!1),e.removeEventListener("webglcontextrestored",Mt,!1),e.removeEventListener("webglcontextcreationerror",wt,!1),yt.dispose(),Xt.dispose(),Rt.dispose(),x.dispose(),V.dispose(),it.dispose(),Qt.dispose(),X.dispose(),gt.dispose(),rt.dispose(),rt.removeEventListener("sessionstart",Ch),rt.removeEventListener("sessionend",Rh),Di.stop()};function lt(P){P.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function Mt(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;let P=Dt.autoReset,K=_t.enabled,$=_t.autoUpdate,et=_t.needsUpdate,j=_t.type;xt(),Dt.autoReset=P,_t.enabled=K,_t.autoUpdate=$,_t.needsUpdate=et,_t.type=j}function wt(P){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",P.statusMessage)}function Zt(P){let K=P.target;K.removeEventListener("dispose",Zt),be(K)}function be(P){en(P),Rt.remove(P)}function en(P){let K=Rt.get(P).programs;K!==void 0&&(K.forEach(function($){gt.releaseProgram($)}),P.isShaderMaterial&&gt.releaseShaderCache(P))}this.renderBufferDirect=function(P,K,$,et,j,ft){K===null&&(K=nt);let bt=j.isMesh&&j.matrixWorld.determinant()<0,Pt=ef(P,K,$,et,j);mt.setMaterial(et,bt);let It=$.index,zt=1;if(et.wireframe===!0){if(It=st.getWireframeAttribute($),It===void 0)return;zt=2}let Ht=$.drawRange,Ut=$.attributes.position,re=Ht.start*zt,fe=(Ht.start+Ht.count)*zt;ft!==null&&(re=Math.max(re,ft.start*zt),fe=Math.min(fe,(ft.start+ft.count)*zt)),It!==null?(re=Math.max(re,0),fe=Math.min(fe,It.count)):Ut!=null&&(re=Math.max(re,0),fe=Math.min(fe,Ut.count));let ve=fe-re;if(ve<0||ve===1/0)return;Qt.setup(j,et,Pt,$,It);let ln,ie=St;if(It!==null&&(ln=Q.get(It),ie=Yt,ie.setIndex(ln)),j.isMesh)et.wireframe===!0?(mt.setLineWidth(et.wireframeLinewidth*at()),ie.setMode(O.LINES)):ie.setMode(O.TRIANGLES);else if(j.isLine){let Lt=et.linewidth;Lt===void 0&&(Lt=1),mt.setLineWidth(Lt*at()),j.isLineSegments?ie.setMode(O.LINES):j.isLineLoop?ie.setMode(O.LINE_LOOP):ie.setMode(O.LINE_STRIP)}else j.isPoints?ie.setMode(O.POINTS):j.isSprite&&ie.setMode(O.TRIANGLES);if(j.isBatchedMesh)if(j._multiDrawInstances!==null)ie.renderMultiDrawInstances(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount,j._multiDrawInstances);else if(ht.get("WEBGL_multi_draw"))ie.renderMultiDraw(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount);else{let Lt=j._multiDrawStarts,Be=j._multiDrawCounts,se=j._multiDrawCount,En=It?Q.get(It).bytesPerElement:1,as=Rt.get(et).currentProgram.getUniforms();for(let cn=0;cn<se;cn++)as.setValue(O,"_gl_DrawID",cn),ie.render(Lt[cn]/En,Be[cn])}else if(j.isInstancedMesh)ie.renderInstances(re,ve,j.count);else if($.isInstancedBufferGeometry){let Lt=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,Be=Math.min($.instanceCount,Lt);ie.renderInstances(re,ve,Be)}else ie.render(re,ve)};function $t(P,K,$){P.transparent===!0&&P.side===Je&&P.forceSinglePass===!1?(P.side=ke,P.needsUpdate=!0,kr(P,K,$),P.side=zn,P.needsUpdate=!0,kr(P,K,$),P.side=Je):kr(P,K,$)}this.compile=function(P,K,$=null){$===null&&($=P),p=Xt.get($),p.init(K),w.push(p),$.traverseVisible(function(j){j.isLight&&j.layers.test(K.layers)&&(p.pushLight(j),j.castShadow&&p.pushShadow(j))}),P!==$&&P.traverseVisible(function(j){j.isLight&&j.layers.test(K.layers)&&(p.pushLight(j),j.castShadow&&p.pushShadow(j))}),p.setupLights();let et=new Set;return P.traverse(function(j){if(!(j.isMesh||j.isPoints||j.isLine||j.isSprite))return;let ft=j.material;if(ft)if(Array.isArray(ft))for(let bt=0;bt<ft.length;bt++){let Pt=ft[bt];$t(Pt,$,j),et.add(Pt)}else $t(ft,$,j),et.add(ft)}),w.pop(),p=null,et},this.compileAsync=function(P,K,$=null){let et=this.compile(P,K,$);return new Promise(j=>{function ft(){if(et.forEach(function(bt){Rt.get(bt).currentProgram.isReady()&&et.delete(bt)}),et.size===0){j(P);return}setTimeout(ft,10)}ht.get("KHR_parallel_shader_compile")!==null?ft():setTimeout(ft,10)})};let nn=null;function Xn(P){nn&&nn(P)}function Ch(){Di.stop()}function Rh(){Di.start()}let Di=new ad;Di.setAnimationLoop(Xn),typeof self<"u"&&Di.setContext(self),this.setAnimationLoop=function(P){nn=P,rt.setAnimationLoop(P),P===null?Di.stop():Di.start()},rt.addEventListener("sessionstart",Ch),rt.addEventListener("sessionend",Rh),this.render=function(P,K){if(K!==void 0&&K.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;if(P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),K.parent===null&&K.matrixWorldAutoUpdate===!0&&K.updateMatrixWorld(),rt.enabled===!0&&rt.isPresenting===!0&&(rt.cameraAutoUpdate===!0&&rt.updateCamera(K),K=rt.getCamera()),P.isScene===!0&&P.onBeforeRender(M,P,K,S),p=Xt.get(P,w.length),p.init(K),w.push(p),N.multiplyMatrices(K.projectionMatrix,K.matrixWorldInverse),J.setFromProjectionMatrix(N),U=this.localClippingEnabled,H=dt.init(this.clippingPlanes,U),_=yt.get(P,g.length),_.init(),g.push(_),rt.enabled===!0&&rt.isPresenting===!0){let ft=M.xr.getDepthSensingMesh();ft!==null&&bo(ft,K,-1/0,M.sortObjects)}bo(P,K,0,M.sortObjects),_.finish(),M.sortObjects===!0&&_.sort(z,tt),ct=rt.enabled===!1||rt.isPresenting===!1||rt.hasDepthSensing()===!1,ct&&Ft.addToRenderList(_,P),this.info.render.frame++,H===!0&&dt.beginShadows();let $=p.state.shadowsArray;_t.render($,P,K),H===!0&&dt.endShadows(),this.info.autoReset===!0&&this.info.reset();let et=_.opaque,j=_.transmissive;if(p.setupLights(),K.isArrayCamera){let ft=K.cameras;if(j.length>0)for(let bt=0,Pt=ft.length;bt<Pt;bt++){let It=ft[bt];Ih(et,j,P,It)}ct&&Ft.render(P);for(let bt=0,Pt=ft.length;bt<Pt;bt++){let It=ft[bt];Ph(_,P,It,It.viewport)}}else j.length>0&&Ih(et,j,P,K),ct&&Ft.render(P),Ph(_,P,K);S!==null&&(D.updateMultisampleRenderTarget(S),D.updateRenderTargetMipmap(S)),P.isScene===!0&&P.onAfterRender(M,P,K),Qt.resetDefaultState(),E=-1,T=null,w.pop(),w.length>0?(p=w[w.length-1],H===!0&&dt.setGlobalState(M.clippingPlanes,p.state.camera)):p=null,g.pop(),g.length>0?_=g[g.length-1]:_=null};function bo(P,K,$,et){if(P.visible===!1)return;if(P.layers.test(K.layers)){if(P.isGroup)$=P.renderOrder;else if(P.isLOD)P.autoUpdate===!0&&P.update(K);else if(P.isLight)p.pushLight(P),P.castShadow&&p.pushShadow(P);else if(P.isSprite){if(!P.frustumCulled||J.intersectsSprite(P)){et&&W.setFromMatrixPosition(P.matrixWorld).applyMatrix4(N);let bt=it.update(P),Pt=P.material;Pt.visible&&_.push(P,bt,Pt,$,W.z,null)}}else if((P.isMesh||P.isLine||P.isPoints)&&(!P.frustumCulled||J.intersectsObject(P))){let bt=it.update(P),Pt=P.material;if(et&&(P.boundingSphere!==void 0?(P.boundingSphere===null&&P.computeBoundingSphere(),W.copy(P.boundingSphere.center)):(bt.boundingSphere===null&&bt.computeBoundingSphere(),W.copy(bt.boundingSphere.center)),W.applyMatrix4(P.matrixWorld).applyMatrix4(N)),Array.isArray(Pt)){let It=bt.groups;for(let zt=0,Ht=It.length;zt<Ht;zt++){let Ut=It[zt],re=Pt[Ut.materialIndex];re&&re.visible&&_.push(P,bt,re,$,W.z,Ut)}}else Pt.visible&&_.push(P,bt,Pt,$,W.z,null)}}let ft=P.children;for(let bt=0,Pt=ft.length;bt<Pt;bt++)bo(ft[bt],K,$,et)}function Ph(P,K,$,et){let j=P.opaque,ft=P.transmissive,bt=P.transparent;p.setupLightsView($),H===!0&&dt.setGlobalState(M.clippingPlanes,$),et&&mt.viewport(m.copy(et)),j.length>0&&Fr(j,K,$),ft.length>0&&Fr(ft,K,$),bt.length>0&&Fr(bt,K,$),mt.buffers.depth.setTest(!0),mt.buffers.depth.setMask(!0),mt.buffers.color.setMask(!0),mt.setPolygonOffset(!1)}function Ih(P,K,$,et){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[et.id]===void 0&&(p.state.transmissionRenderTarget[et.id]=new Ge(1,1,{generateMipmaps:!0,type:ht.has("EXT_color_buffer_half_float")||ht.has("EXT_color_buffer_float")?bn:Dn,minFilter:Vi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Jt.workingColorSpace}));let ft=p.state.transmissionRenderTarget[et.id],bt=et.viewport||m;ft.setSize(bt.z,bt.w);let Pt=M.getRenderTarget();M.setRenderTarget(ft),M.getClearColor(L),I=M.getClearAlpha(),I<1&&M.setClearColor(16777215,.5),M.clear(),ct&&Ft.render($);let It=M.toneMapping;M.toneMapping=Ai;let zt=et.viewport;if(et.viewport!==void 0&&(et.viewport=void 0),p.setupLightsView(et),H===!0&&dt.setGlobalState(M.clippingPlanes,et),Fr(P,$,et),D.updateMultisampleRenderTarget(ft),D.updateRenderTargetMipmap(ft),ht.has("WEBGL_multisampled_render_to_texture")===!1){let Ht=!1;for(let Ut=0,re=K.length;Ut<re;Ut++){let fe=K[Ut],ve=fe.object,ln=fe.geometry,ie=fe.material,Lt=fe.group;if(ie.side===Je&&ve.layers.test(et.layers)){let Be=ie.side;ie.side=ke,ie.needsUpdate=!0,Dh(ve,$,et,ln,ie,Lt),ie.side=Be,ie.needsUpdate=!0,Ht=!0}}Ht===!0&&(D.updateMultisampleRenderTarget(ft),D.updateRenderTargetMipmap(ft))}M.setRenderTarget(Pt),M.setClearColor(L,I),zt!==void 0&&(et.viewport=zt),M.toneMapping=It}function Fr(P,K,$){let et=K.isScene===!0?K.overrideMaterial:null;for(let j=0,ft=P.length;j<ft;j++){let bt=P[j],Pt=bt.object,It=bt.geometry,zt=et===null?bt.material:et,Ht=bt.group;Pt.layers.test($.layers)&&Dh(Pt,K,$,It,zt,Ht)}}function Dh(P,K,$,et,j,ft){P.onBeforeRender(M,K,$,et,j,ft),P.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,P.matrixWorld),P.normalMatrix.getNormalMatrix(P.modelViewMatrix),j.onBeforeRender(M,K,$,et,P,ft),j.transparent===!0&&j.side===Je&&j.forceSinglePass===!1?(j.side=ke,j.needsUpdate=!0,M.renderBufferDirect($,K,et,j,P,ft),j.side=zn,j.needsUpdate=!0,M.renderBufferDirect($,K,et,j,P,ft),j.side=Je):M.renderBufferDirect($,K,et,j,P,ft),P.onAfterRender(M,K,$,et,j,ft)}function kr(P,K,$){K.isScene!==!0&&(K=nt);let et=Rt.get(P),j=p.state.lights,ft=p.state.shadowsArray,bt=j.state.version,Pt=gt.getParameters(P,j.state,ft,K,$),It=gt.getProgramCacheKey(Pt),zt=et.programs;et.environment=P.isMeshStandardMaterial?K.environment:null,et.fog=K.fog,et.envMap=(P.isMeshStandardMaterial?V:x).get(P.envMap||et.environment),et.envMapRotation=et.environment!==null&&P.envMap===null?K.environmentRotation:P.envMapRotation,zt===void 0&&(P.addEventListener("dispose",Zt),zt=new Map,et.programs=zt);let Ht=zt.get(It);if(Ht!==void 0){if(et.currentProgram===Ht&&et.lightsStateVersion===bt)return Lh(P,Pt),Ht}else Pt.uniforms=gt.getUniforms(P),P.onBeforeCompile(Pt,M),Ht=gt.acquireProgram(Pt,It),zt.set(It,Ht),et.uniforms=Pt.uniforms;let Ut=et.uniforms;return(!P.isShaderMaterial&&!P.isRawShaderMaterial||P.clipping===!0)&&(Ut.clippingPlanes=dt.uniform),Lh(P,Pt),et.needsLights=sf(P),et.lightsStateVersion=bt,et.needsLights&&(Ut.ambientLightColor.value=j.state.ambient,Ut.lightProbe.value=j.state.probe,Ut.directionalLights.value=j.state.directional,Ut.directionalLightShadows.value=j.state.directionalShadow,Ut.spotLights.value=j.state.spot,Ut.spotLightShadows.value=j.state.spotShadow,Ut.rectAreaLights.value=j.state.rectArea,Ut.ltc_1.value=j.state.rectAreaLTC1,Ut.ltc_2.value=j.state.rectAreaLTC2,Ut.pointLights.value=j.state.point,Ut.pointLightShadows.value=j.state.pointShadow,Ut.hemisphereLights.value=j.state.hemi,Ut.directionalShadowMap.value=j.state.directionalShadowMap,Ut.directionalShadowMatrix.value=j.state.directionalShadowMatrix,Ut.spotShadowMap.value=j.state.spotShadowMap,Ut.spotLightMatrix.value=j.state.spotLightMatrix,Ut.spotLightMap.value=j.state.spotLightMap,Ut.pointShadowMap.value=j.state.pointShadowMap,Ut.pointShadowMatrix.value=j.state.pointShadowMatrix),et.currentProgram=Ht,et.uniformsList=null,Ht}function Uh(P){if(P.uniformsList===null){let K=P.currentProgram.getUniforms();P.uniformsList=Es.seqWithValue(K.seq,P.uniforms)}return P.uniformsList}function Lh(P,K){let $=Rt.get(P);$.outputColorSpace=K.outputColorSpace,$.batching=K.batching,$.batchingColor=K.batchingColor,$.instancing=K.instancing,$.instancingColor=K.instancingColor,$.instancingMorph=K.instancingMorph,$.skinning=K.skinning,$.morphTargets=K.morphTargets,$.morphNormals=K.morphNormals,$.morphColors=K.morphColors,$.morphTargetsCount=K.morphTargetsCount,$.numClippingPlanes=K.numClippingPlanes,$.numIntersection=K.numClipIntersection,$.vertexAlphas=K.vertexAlphas,$.vertexTangents=K.vertexTangents,$.toneMapping=K.toneMapping}function ef(P,K,$,et,j){K.isScene!==!0&&(K=nt),D.resetTextureUnits();let ft=K.fog,bt=et.isMeshStandardMaterial?K.environment:null,Pt=S===null?M.outputColorSpace:S.isXRRenderTarget===!0?S.texture.colorSpace:_i,It=(et.isMeshStandardMaterial?V:x).get(et.envMap||bt),zt=et.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,Ht=!!$.attributes.tangent&&(!!et.normalMap||et.anisotropy>0),Ut=!!$.morphAttributes.position,re=!!$.morphAttributes.normal,fe=!!$.morphAttributes.color,ve=Ai;et.toneMapped&&(S===null||S.isXRRenderTarget===!0)&&(ve=M.toneMapping);let ln=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,ie=ln!==void 0?ln.length:0,Lt=Rt.get(et),Be=p.state.lights;if(H===!0&&(U===!0||P!==T)){let yn=P===T&&et.id===E;dt.setState(et,P,yn)}let se=!1;et.version===Lt.__version?(Lt.needsLights&&Lt.lightsStateVersion!==Be.state.version||Lt.outputColorSpace!==Pt||j.isBatchedMesh&&Lt.batching===!1||!j.isBatchedMesh&&Lt.batching===!0||j.isBatchedMesh&&Lt.batchingColor===!0&&j.colorTexture===null||j.isBatchedMesh&&Lt.batchingColor===!1&&j.colorTexture!==null||j.isInstancedMesh&&Lt.instancing===!1||!j.isInstancedMesh&&Lt.instancing===!0||j.isSkinnedMesh&&Lt.skinning===!1||!j.isSkinnedMesh&&Lt.skinning===!0||j.isInstancedMesh&&Lt.instancingColor===!0&&j.instanceColor===null||j.isInstancedMesh&&Lt.instancingColor===!1&&j.instanceColor!==null||j.isInstancedMesh&&Lt.instancingMorph===!0&&j.morphTexture===null||j.isInstancedMesh&&Lt.instancingMorph===!1&&j.morphTexture!==null||Lt.envMap!==It||et.fog===!0&&Lt.fog!==ft||Lt.numClippingPlanes!==void 0&&(Lt.numClippingPlanes!==dt.numPlanes||Lt.numIntersection!==dt.numIntersection)||Lt.vertexAlphas!==zt||Lt.vertexTangents!==Ht||Lt.morphTargets!==Ut||Lt.morphNormals!==re||Lt.morphColors!==fe||Lt.toneMapping!==ve||Lt.morphTargetsCount!==ie)&&(se=!0):(se=!0,Lt.__version=et.version);let En=Lt.currentProgram;se===!0&&(En=kr(et,K,j));let as=!1,cn=!1,wo=!1,ye=En.getUniforms(),ci=Lt.uniforms;if(mt.useProgram(En.program)&&(as=!0,cn=!0,wo=!0),et.id!==E&&(E=et.id,cn=!0),as||T!==P){Ct.reverseDepthBuffer?(F.copy(P.projectionMatrix),lp(F),cp(F),ye.setValue(O,"projectionMatrix",F)):ye.setValue(O,"projectionMatrix",P.projectionMatrix),ye.setValue(O,"viewMatrix",P.matrixWorldInverse);let yn=ye.map.cameraPosition;yn!==void 0&&yn.setValue(O,Y.setFromMatrixPosition(P.matrixWorld)),Ct.logarithmicDepthBuffer&&ye.setValue(O,"logDepthBufFC",2/(Math.log(P.far+1)/Math.LN2)),(et.isMeshPhongMaterial||et.isMeshToonMaterial||et.isMeshLambertMaterial||et.isMeshBasicMaterial||et.isMeshStandardMaterial||et.isShaderMaterial)&&ye.setValue(O,"isOrthographic",P.isOrthographicCamera===!0),T!==P&&(T=P,cn=!0,wo=!0)}if(j.isSkinnedMesh){ye.setOptional(O,j,"bindMatrix"),ye.setOptional(O,j,"bindMatrixInverse");let yn=j.skeleton;yn&&(yn.boneTexture===null&&yn.computeBoneTexture(),ye.setValue(O,"boneTexture",yn.boneTexture,D))}j.isBatchedMesh&&(ye.setOptional(O,j,"batchingTexture"),ye.setValue(O,"batchingTexture",j._matricesTexture,D),ye.setOptional(O,j,"batchingIdTexture"),ye.setValue(O,"batchingIdTexture",j._indirectTexture,D),ye.setOptional(O,j,"batchingColorTexture"),j._colorsTexture!==null&&ye.setValue(O,"batchingColorTexture",j._colorsTexture,D));let So=$.morphAttributes;if((So.position!==void 0||So.normal!==void 0||So.color!==void 0)&&kt.update(j,$,En),(cn||Lt.receiveShadow!==j.receiveShadow)&&(Lt.receiveShadow=j.receiveShadow,ye.setValue(O,"receiveShadow",j.receiveShadow)),et.isMeshGouraudMaterial&&et.envMap!==null&&(ci.envMap.value=It,ci.flipEnvMap.value=It.isCubeTexture&&It.isRenderTargetTexture===!1?-1:1),et.isMeshStandardMaterial&&et.envMap===null&&K.environment!==null&&(ci.envMapIntensity.value=K.environmentIntensity),cn&&(ye.setValue(O,"toneMappingExposure",M.toneMappingExposure),Lt.needsLights&&nf(ci,wo),ft&&et.fog===!0&&pt.refreshFogUniforms(ci,ft),pt.refreshMaterialUniforms(ci,et,q,B,p.state.transmissionRenderTarget[P.id]),Es.upload(O,Uh(Lt),ci,D)),et.isShaderMaterial&&et.uniformsNeedUpdate===!0&&(Es.upload(O,Uh(Lt),ci,D),et.uniformsNeedUpdate=!1),et.isSpriteMaterial&&ye.setValue(O,"center",j.center),ye.setValue(O,"modelViewMatrix",j.modelViewMatrix),ye.setValue(O,"normalMatrix",j.normalMatrix),ye.setValue(O,"modelMatrix",j.matrixWorld),et.isShaderMaterial||et.isRawShaderMaterial){let yn=et.uniformsGroups;for(let Eo=0,rf=yn.length;Eo<rf;Eo++){let Nh=yn[Eo];X.update(Nh,En),X.bind(Nh,En)}}return En}function nf(P,K){P.ambientLightColor.needsUpdate=K,P.lightProbe.needsUpdate=K,P.directionalLights.needsUpdate=K,P.directionalLightShadows.needsUpdate=K,P.pointLights.needsUpdate=K,P.pointLightShadows.needsUpdate=K,P.spotLights.needsUpdate=K,P.spotLightShadows.needsUpdate=K,P.rectAreaLights.needsUpdate=K,P.hemisphereLights.needsUpdate=K}function sf(P){return P.isMeshLambertMaterial||P.isMeshToonMaterial||P.isMeshPhongMaterial||P.isMeshStandardMaterial||P.isShadowMaterial||P.isShaderMaterial&&P.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return S},this.setRenderTargetTextures=function(P,K,$){Rt.get(P.texture).__webglTexture=K,Rt.get(P.depthTexture).__webglTexture=$;let et=Rt.get(P);et.__hasExternalTextures=!0,et.__autoAllocateDepthBuffer=$===void 0,et.__autoAllocateDepthBuffer||ht.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),et.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(P,K){let $=Rt.get(P);$.__webglFramebuffer=K,$.__useDefaultFramebuffer=K===void 0},this.setRenderTarget=function(P,K=0,$=0){S=P,C=K,b=$;let et=!0,j=null,ft=!1,bt=!1;if(P){let It=Rt.get(P);if(It.__useDefaultFramebuffer!==void 0)mt.bindFramebuffer(O.FRAMEBUFFER,null),et=!1;else if(It.__webglFramebuffer===void 0)D.setupRenderTarget(P);else if(It.__hasExternalTextures)D.rebindTextures(P,Rt.get(P.texture).__webglTexture,Rt.get(P.depthTexture).__webglTexture);else if(P.depthBuffer){let Ut=P.depthTexture;if(It.__boundDepthTexture!==Ut){if(Ut!==null&&Rt.has(Ut)&&(P.width!==Ut.image.width||P.height!==Ut.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");D.setupDepthRenderbuffer(P)}}let zt=P.texture;(zt.isData3DTexture||zt.isDataArrayTexture||zt.isCompressedArrayTexture)&&(bt=!0);let Ht=Rt.get(P).__webglFramebuffer;P.isWebGLCubeRenderTarget?(Array.isArray(Ht[K])?j=Ht[K][$]:j=Ht[K],ft=!0):P.samples>0&&D.useMultisampledRTT(P)===!1?j=Rt.get(P).__webglMultisampledFramebuffer:Array.isArray(Ht)?j=Ht[$]:j=Ht,m.copy(P.viewport),v.copy(P.scissor),R=P.scissorTest}else m.copy(ot).multiplyScalar(q).floor(),v.copy(ut).multiplyScalar(q).floor(),R=Et;if(mt.bindFramebuffer(O.FRAMEBUFFER,j)&&et&&mt.drawBuffers(P,j),mt.viewport(m),mt.scissor(v),mt.setScissorTest(R),ft){let It=Rt.get(P.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+K,It.__webglTexture,$)}else if(bt){let It=Rt.get(P.texture),zt=K||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,It.__webglTexture,$||0,zt)}E=-1},this.readRenderTargetPixels=function(P,K,$,et,j,ft,bt){if(!(P&&P.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pt=Rt.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&bt!==void 0&&(Pt=Pt[bt]),Pt){mt.bindFramebuffer(O.FRAMEBUFFER,Pt);try{let It=P.texture,zt=It.format,Ht=It.type;if(!Ct.textureFormatReadable(zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ct.textureTypeReadable(Ht)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}K>=0&&K<=P.width-et&&$>=0&&$<=P.height-j&&O.readPixels(K,$,et,j,Vt.convert(zt),Vt.convert(Ht),ft)}finally{let It=S!==null?Rt.get(S).__webglFramebuffer:null;mt.bindFramebuffer(O.FRAMEBUFFER,It)}}},this.readRenderTargetPixelsAsync=async function(P,K,$,et,j,ft,bt){if(!(P&&P.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pt=Rt.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&bt!==void 0&&(Pt=Pt[bt]),Pt){let It=P.texture,zt=It.format,Ht=It.type;if(!Ct.textureFormatReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ct.textureTypeReadable(Ht))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(K>=0&&K<=P.width-et&&$>=0&&$<=P.height-j){mt.bindFramebuffer(O.FRAMEBUFFER,Pt);let Ut=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,Ut),O.bufferData(O.PIXEL_PACK_BUFFER,ft.byteLength,O.STREAM_READ),O.readPixels(K,$,et,j,Vt.convert(zt),Vt.convert(Ht),0);let re=S!==null?Rt.get(S).__webglFramebuffer:null;mt.bindFramebuffer(O.FRAMEBUFFER,re);let fe=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await op(O,fe,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,Ut),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,ft),O.deleteBuffer(Ut),O.deleteSync(fe),ft}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(P,K=null,$=0){P.isTexture!==!0&&(pa("WebGLRenderer: copyFramebufferToTexture function signature has changed."),K=arguments[0]||null,P=arguments[1]);let et=Math.pow(2,-$),j=Math.floor(P.image.width*et),ft=Math.floor(P.image.height*et),bt=K!==null?K.x:0,Pt=K!==null?K.y:0;D.setTexture2D(P,0),O.copyTexSubImage2D(O.TEXTURE_2D,$,0,0,bt,Pt,j,ft),mt.unbindTexture()},this.copyTextureToTexture=function(P,K,$=null,et=null,j=0){P.isTexture!==!0&&(pa("WebGLRenderer: copyTextureToTexture function signature has changed."),et=arguments[0]||null,P=arguments[1],K=arguments[2],j=arguments[3]||0,$=null);let ft,bt,Pt,It,zt,Ht;$!==null?(ft=$.max.x-$.min.x,bt=$.max.y-$.min.y,Pt=$.min.x,It=$.min.y):(ft=P.image.width,bt=P.image.height,Pt=0,It=0),et!==null?(zt=et.x,Ht=et.y):(zt=0,Ht=0);let Ut=Vt.convert(K.format),re=Vt.convert(K.type);D.setTexture2D(K,0),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,K.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,K.unpackAlignment);let fe=O.getParameter(O.UNPACK_ROW_LENGTH),ve=O.getParameter(O.UNPACK_IMAGE_HEIGHT),ln=O.getParameter(O.UNPACK_SKIP_PIXELS),ie=O.getParameter(O.UNPACK_SKIP_ROWS),Lt=O.getParameter(O.UNPACK_SKIP_IMAGES),Be=P.isCompressedTexture?P.mipmaps[j]:P.image;O.pixelStorei(O.UNPACK_ROW_LENGTH,Be.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Be.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Pt),O.pixelStorei(O.UNPACK_SKIP_ROWS,It),P.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,j,zt,Ht,ft,bt,Ut,re,Be.data):P.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,j,zt,Ht,Be.width,Be.height,Ut,Be.data):O.texSubImage2D(O.TEXTURE_2D,j,zt,Ht,ft,bt,Ut,re,Be),O.pixelStorei(O.UNPACK_ROW_LENGTH,fe),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,ve),O.pixelStorei(O.UNPACK_SKIP_PIXELS,ln),O.pixelStorei(O.UNPACK_SKIP_ROWS,ie),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Lt),j===0&&K.generateMipmaps&&O.generateMipmap(O.TEXTURE_2D),mt.unbindTexture()},this.copyTextureToTexture3D=function(P,K,$=null,et=null,j=0){P.isTexture!==!0&&(pa("WebGLRenderer: copyTextureToTexture3D function signature has changed."),$=arguments[0]||null,et=arguments[1]||null,P=arguments[2],K=arguments[3],j=arguments[4]||0);let ft,bt,Pt,It,zt,Ht,Ut,re,fe,ve=P.isCompressedTexture?P.mipmaps[j]:P.image;$!==null?(ft=$.max.x-$.min.x,bt=$.max.y-$.min.y,Pt=$.max.z-$.min.z,It=$.min.x,zt=$.min.y,Ht=$.min.z):(ft=ve.width,bt=ve.height,Pt=ve.depth,It=0,zt=0,Ht=0),et!==null?(Ut=et.x,re=et.y,fe=et.z):(Ut=0,re=0,fe=0);let ln=Vt.convert(K.format),ie=Vt.convert(K.type),Lt;if(K.isData3DTexture)D.setTexture3D(K,0),Lt=O.TEXTURE_3D;else if(K.isDataArrayTexture||K.isCompressedArrayTexture)D.setTexture2DArray(K,0),Lt=O.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,K.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,K.unpackAlignment);let Be=O.getParameter(O.UNPACK_ROW_LENGTH),se=O.getParameter(O.UNPACK_IMAGE_HEIGHT),En=O.getParameter(O.UNPACK_SKIP_PIXELS),as=O.getParameter(O.UNPACK_SKIP_ROWS),cn=O.getParameter(O.UNPACK_SKIP_IMAGES);O.pixelStorei(O.UNPACK_ROW_LENGTH,ve.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,ve.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,It),O.pixelStorei(O.UNPACK_SKIP_ROWS,zt),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Ht),P.isDataTexture||P.isData3DTexture?O.texSubImage3D(Lt,j,Ut,re,fe,ft,bt,Pt,ln,ie,ve.data):K.isCompressedArrayTexture?O.compressedTexSubImage3D(Lt,j,Ut,re,fe,ft,bt,Pt,ln,ve.data):O.texSubImage3D(Lt,j,Ut,re,fe,ft,bt,Pt,ln,ie,ve),O.pixelStorei(O.UNPACK_ROW_LENGTH,Be),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,se),O.pixelStorei(O.UNPACK_SKIP_PIXELS,En),O.pixelStorei(O.UNPACK_SKIP_ROWS,as),O.pixelStorei(O.UNPACK_SKIP_IMAGES,cn),j===0&&K.generateMipmaps&&O.generateMipmap(Lt),mt.unbindTexture()},this.initRenderTarget=function(P){Rt.get(P).__webglFramebuffer===void 0&&D.setupRenderTarget(P)},this.initTexture=function(P){P.isCubeTexture?D.setTextureCube(P,0):P.isData3DTexture?D.setTexture3D(P,0):P.isDataArrayTexture||P.isCompressedArrayTexture?D.setTexture2DArray(P,0):D.setTexture2D(P,0),mt.unbindTexture()},this.resetState=function(){C=0,b=0,S=null,mt.reset(),Qt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ei}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=t===Hc?"display-p3":"srgb",e.unpackColorSpace=Jt.workingColorSpace===Ha?"display-p3":"srgb"}};var yr=class extends rn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Vn,this.environmentIntensity=1,this.environmentRotation=new Vn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var Os=class extends sn{constructor(t=null,e=1,i=1,s,r,a,o,l,c=Fe,h=Fe,u,f){super(null,a,o,l,c,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var pn=class extends sn{constructor(t,e,i,s,r,a,o,l,c){super(t,e,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Ln=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],i,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)i=this.getPoint(a/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let i=this.getLengths(),s=0,r=i.length,a;e?a=e:a=t*i[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=i[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===a)return s/(r-1);let h=i[s],f=i[s+1]-h,d=(a-h)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new At:new G);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){let i=new G,s=[],r=[],a=[],o=new G,l=new ae;for(let d=0;d<=t;d++){let A=d/t;s[d]=this.getTangentAt(A,new G)}r[0]=new G,a[0]=new G;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=c&&(c=h,i.set(1,0,0)),u<=c&&(c=u,i.set(0,1,0)),f<=c&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(s[d-1],s[d]),o.length()>Number.EPSILON){o.normalize();let A=Math.acos(Ee(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(o,A))}a[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(Ee(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(d=-d);for(let A=1;A<=t;A++)r[A].applyMatrix4(l.makeRotationAxis(s[A],d*A)),a[A].crossVectors(s[A],r[A])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Ta=class extends Ln{constructor(t=0,e=0,i=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new At){let i=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*h-d*u+this.aX,c=f*u+d*h+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},ac=class extends Ta{constructor(t,e,i,s,r,a){super(t,e,i,i,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Wc(){let n=0,t=0,e=0,i=0;function s(r,a,o,l){n=r,t=o,e=-3*r+3*a-2*o-l,i=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let f=(a-r)/c-(o-r)/(c+h)+(o-a)/h,d=(o-a)/h-(l-a)/(h+u)+(l-o)/u;f*=h,d*=h,s(a,o,f,d)},calc:function(r){let a=r*r,o=a*r;return n+t*r+e*a+i*o}}}var oa=new G,nl=new Wc,il=new Wc,sl=new Wc,yi=class extends Ln{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new G){let i=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(oa.subVectors(s[0],s[1]).add(s[0]),c=oa);let u=s[o%r],f=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(oa.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=oa),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,A=Math.pow(c.distanceToSquared(u),d),_=Math.pow(u.distanceToSquared(f),d),p=Math.pow(f.distanceToSquared(h),d);_<1e-4&&(_=1),A<1e-4&&(A=_),p<1e-4&&(p=_),nl.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,A,_,p),il.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,A,_,p),sl.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,A,_,p)}else this.curveType==="catmullrom"&&(nl.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),il.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),sl.initCatmullRom(c.z,u.z,f.z,h.z,this.tension));return i.set(nl.calc(l),il.calc(l),sl.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new G().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Fu(n,t,e,i,s){let r=(i-t)*.5,a=(s-e)*.5,o=n*n,l=n*o;return(2*e-2*i+r+a)*l+(-3*e+3*i-2*r-a)*o+r*n+e}function iv(n,t){let e=1-n;return e*e*t}function sv(n,t){return 2*(1-n)*n*t}function rv(n,t){return n*n*t}function dr(n,t,e,i){return iv(n,t)+sv(n,e)+rv(n,i)}function av(n,t){let e=1-n;return e*e*e*t}function ov(n,t){let e=1-n;return 3*e*e*n*t}function lv(n,t){return 3*(1-n)*n*n*t}function cv(n,t){return n*n*n*t}function fr(n,t,e,i,s){return av(n,t)+ov(n,e)+lv(n,i)+cv(n,s)}var oc=class extends Ln{constructor(t=new At,e=new At,i=new At,s=new At){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new At){let i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(fr(t,s.x,r.x,a.x,o.x),fr(t,s.y,r.y,a.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},lc=class extends Ln{constructor(t=new G,e=new G,i=new G,s=new G){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new G){let i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(fr(t,s.x,r.x,a.x,o.x),fr(t,s.y,r.y,a.y,o.y),fr(t,s.z,r.z,a.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},cc=class extends Ln{constructor(t=new At,e=new At){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new At){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new At){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},hc=class extends Ln{constructor(t=new G,e=new G){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new G){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new G){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},uc=class extends Ln{constructor(t=new At,e=new At,i=new At){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new At){let i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(dr(t,s.x,r.x,a.x),dr(t,s.y,r.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ca=class extends Ln{constructor(t=new G,e=new G,i=new G){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new G){let i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(dr(t,s.x,r.x,a.x),dr(t,s.y,r.y,a.y),dr(t,s.z,r.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},dc=class extends Ln{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new At){let i=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return i.set(Fu(o,l.x,c.x,h.x,u.x),Fu(o,l.y,c.y,h.y,u.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new At().fromArray(s))}return this}},hv=Object.freeze({__proto__:null,ArcCurve:ac,CatmullRomCurve3:yi,CubicBezierCurve:oc,CubicBezierCurve3:lc,EllipseCurve:Ta,LineCurve:cc,LineCurve3:hc,QuadraticBezierCurve:uc,QuadraticBezierCurve3:Ca,SplineCurve:dc});var Ra=class n extends ue{constructor(t=1,e=1,i=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],f=[],d=[],A=0,_=[],p=i/2,g=0;w(),a===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new me(u,3)),this.setAttribute("normal",new me(f,3)),this.setAttribute("uv",new me(d,2));function w(){let y=new G,C=new G,b=0,S=(e-t)/i;for(let E=0;E<=r;E++){let T=[],m=E/r,v=m*(e-t)+t;for(let R=0;R<=s;R++){let L=R/s,I=L*l+o,k=Math.sin(I),B=Math.cos(I);C.x=v*k,C.y=-m*i+p,C.z=v*B,u.push(C.x,C.y,C.z),y.set(k,S,B).normalize(),f.push(y.x,y.y,y.z),d.push(L,1-m),T.push(A++)}_.push(T)}for(let E=0;E<s;E++)for(let T=0;T<r;T++){let m=_[T][E],v=_[T+1][E],R=_[T+1][E+1],L=_[T][E+1];t>0&&(h.push(m,v,L),b+=3),e>0&&(h.push(v,R,L),b+=3)}c.addGroup(g,b,0),g+=b}function M(y){let C=A,b=new At,S=new G,E=0,T=y===!0?t:e,m=y===!0?1:-1;for(let R=1;R<=s;R++)u.push(0,p*m,0),f.push(0,m,0),d.push(.5,.5),A++;let v=A;for(let R=0;R<=s;R++){let I=R/s*l+o,k=Math.cos(I),B=Math.sin(I);S.x=T*B,S.y=p*m,S.z=T*k,u.push(S.x,S.y,S.z),f.push(0,m,0),b.x=k*.5+.5,b.y=B*.5*m+.5,d.push(b.x,b.y),A++}for(let R=0;R<s;R++){let L=C+R,I=v+R;y===!0?h.push(I,I+1,L):h.push(I+1,I,L),E+=3}c.addGroup(g,E,y===!0?1:2),g+=E}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var Bs=class n extends ue{constructor(t=new Ca(new G(-1,-1,0),new G(-1,1,0),new G(1,1,0)),e=64,i=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:i,radialSegments:s,closed:r};let a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new G,l=new G,c=new At,h=new G,u=[],f=[],d=[],A=[];_(),this.setIndex(A),this.setAttribute("position",new me(u,3)),this.setAttribute("normal",new me(f,3)),this.setAttribute("uv",new me(d,2));function _(){for(let M=0;M<e;M++)p(M);p(r===!1?e:0),w(),g()}function p(M){h=t.getPointAt(M/e,h);let y=a.normals[M],C=a.binormals[M];for(let b=0;b<=s;b++){let S=b/s*Math.PI*2,E=Math.sin(S),T=-Math.cos(S);l.x=T*y.x+E*C.x,l.y=T*y.y+E*C.y,l.z=T*y.z+E*C.z,l.normalize(),f.push(l.x,l.y,l.z),o.x=h.x+i*l.x,o.y=h.y+i*l.y,o.z=h.z+i*l.z,u.push(o.x,o.y,o.z)}}function g(){for(let M=1;M<=e;M++)for(let y=1;y<=s;y++){let C=(s+1)*(M-1)+(y-1),b=(s+1)*M+(y-1),S=(s+1)*M+y,E=(s+1)*(M-1)+y;A.push(C,b,E),A.push(b,S,E)}}function w(){for(let M=0;M<=e;M++)for(let y=0;y<=s;y++)c.x=M/e,c.y=y/s,d.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new n(new hv[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};var Pa=class extends si{constructor(t){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Ot(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}},Ia=class extends Se{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},_r=class extends si{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ot(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=zc,this.normalScale=new At(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},ri=class extends _r{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new At(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ee(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ot(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ot(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ot(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};var Fs=class extends si{constructor(t){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=zc,this.normalScale=new At(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(t)}copy(t){return super.copy(t),this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.flatShading=t.flatShading,this}};function la(n,t,e){return!n||!e&&n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function uv(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}var ks=class{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,s=e[i],r=e[i-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=i+2;;){if(s===void 0){if(t<r)break i;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=e[++i],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=e[--i-1],t>=r)break t}a=i,i=0;break e}break n}for(;i<a;){let o=i+a>>>1;t<e[o]?a=o:i=o+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=i[r+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},fc=class extends ks{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:qh,endingEnd:qh}}intervalChanged_(t,e,i){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Xh:r=t,o=2*e-i;break;case Yh:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Xh:a=t,l=2*i-e;break;case Yh:a=1,l=i+s[1]-s[0];break;default:a=t-1,l=e}let c=(i-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,A=(i-e)/(s-e),_=A*A,p=_*A,g=-f*p+2*f*_-f*A,w=(1+f)*p+(-1.5-2*f)*_+(-.5+f)*A+1,M=(-1-d)*p+(1.5+d)*_+.5*A,y=d*p-d*_;for(let C=0;C!==o;++C)r[C]=g*a[h+C]+w*a[c+C]+M*a[l+C]+y*a[u+C];return r}},pc=class extends ks{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(i-e)/(s-e),u=1-h;for(let f=0;f!==o;++f)r[f]=a[c+f]*u+a[l+f]*h;return r}},mc=class extends ks{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Nn=class{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=la(e,this.TimeBufferType),this.values=la(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:la(t.times,Array),values:la(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new mc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new pc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new fc(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case ma:e=this.InterpolantFactoryMethodDiscrete;break;case Wl:e=this.InterpolantFactoryMethodLinear;break;case Co:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ma;case this.InterpolantFactoryMethodLinear:return Wl;case this.InterpolantFactoryMethodSmooth:return Co}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t}return this}trim(t,e){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<t;)++r;for(;a!==-1&&i[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&uv(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Co,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(s)l=!0;else{let u=o*i,f=u-i,d=u+i;for(let A=0;A!==i;++A){let _=e[u+A];if(_!==e[f+A]||_!==e[d+A]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let u=o*i,f=a*i;for(let d=0;d!==i;++d)e[f+d]=e[u+d]}++a}}if(r>0){t[a]=t[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};Nn.prototype.TimeBufferType=Float32Array;Nn.prototype.ValueBufferType=Float32Array;Nn.prototype.DefaultInterpolation=Wl;var qi=class extends Nn{constructor(t,e,i){super(t,e,i)}};qi.prototype.ValueTypeName="bool";qi.prototype.ValueBufferType=Array;qi.prototype.DefaultInterpolation=ma;qi.prototype.InterpolantFactoryMethodLinear=void 0;qi.prototype.InterpolantFactoryMethodSmooth=void 0;var gc=class extends Nn{};gc.prototype.ValueTypeName="color";var Ac=class extends Nn{};Ac.prototype.ValueTypeName="number";var vc=class extends ks{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-e)/(s-e),c=t*o;for(let h=c+o;c!==h;c+=4)Un.slerpFlat(r,0,a,c-o,a,c,l);return r}},Da=class extends Nn{InterpolantFactoryMethodLinear(t){return new vc(this.times,this.values,this.getValueSize(),t)}};Da.prototype.ValueTypeName="quaternion";Da.prototype.InterpolantFactoryMethodSmooth=void 0;var Xi=class extends Nn{constructor(t,e,i){super(t,e,i)}};Xi.prototype.ValueTypeName="string";Xi.prototype.ValueBufferType=Array;Xi.prototype.DefaultInterpolation=ma;Xi.prototype.InterpolantFactoryMethodLinear=void 0;Xi.prototype.InterpolantFactoryMethodSmooth=void 0;var xc=class extends Nn{};xc.prototype.ValueTypeName="vector";var yc=class{constructor(t,e,i){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=c.length;u<f;u+=2){let d=c[u],A=c[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return A}return null}}},dv=new yc,_c=class{constructor(t){this.manager=t!==void 0?t:dv,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};_c.DEFAULT_MATERIAL_NAME="__DEFAULT";var Mc=class extends rn{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ot(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}};var rl=new ae,ku=new G,zu=new G,bc=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new At(512,512),this.map=null,this.mapPass=null,this.matrix=new ae,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vr,this._frameExtents=new At(1,1),this._viewportCount=1,this._viewports=[new xe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,i=this.matrix;ku.setFromMatrixPosition(t.matrixWorld),e.position.copy(ku),zu.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(zu),e.updateMatrixWorld(),rl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(rl),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(rl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var wc=class extends bc{constructor(){super(new Us(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ua=class extends Mc{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(rn.DEFAULT_UP),this.updateMatrix(),this.target=new rn,this.shadow=new wc}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var La=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Hu(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=Hu();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};function Hu(){return performance.now()}var qc="\\[\\]\\.:\\/",fv=new RegExp("["+qc+"]","g"),Xc="[^"+qc+"]",pv="[^"+qc.replace("\\.","")+"]",mv=/((?:WC+[\/:])*)/.source.replace("WC",Xc),gv=/(WCOD+)?/.source.replace("WCOD",pv),Av=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Xc),vv=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Xc),xv=new RegExp("^"+mv+gv+Av+vv+"$"),yv=["material","materials","bones","map"],Sc=class{constructor(t,e,i){let s=i||pe.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},pe=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(fv,"")}static parseTrackName(t){let e=xv.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);yv.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=i(o.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};pe.Composite=Sc;pe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};pe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};pe.prototype.GetterByBindingType=[pe.prototype._getValue_direct,pe.prototype._getValue_array,pe.prototype._getValue_arrayElement,pe.prototype._getValue_toArray];pe.prototype.SetterByBindingTypeAndVersioning=[[pe.prototype._setValue_direct,pe.prototype._setValue_direct_setNeedsUpdate,pe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[pe.prototype._setValue_array,pe.prototype._setValue_array_setNeedsUpdate,pe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[pe.prototype._setValue_arrayElement,pe.prototype._setValue_arrayElement_setNeedsUpdate,pe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[pe.prototype._setValue_fromArray,pe.prototype._setValue_fromArray_setNeedsUpdate,pe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Dx=new Float32Array(1);var Vu=new ae,Na=class{constructor(t,e,i=0,s=1/0){this.ray=new Is(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new Ar,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Vu.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Vu),this}intersectObject(t,e=!0,i=[]){return Ec(t,this,i,e),i.sort(Gu),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)Ec(t[s],this,i,e);return i.sort(Gu),i}};function Gu(n,t){return n.distance-t.distance}function Ec(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){let r=n.children;for(let a=0,o=r.length;a<o;a++)Ec(r[a],t,e,!0)}}var Mr=class{constructor(t=1,e=0,i=0){return this.radius=t,this.phi=e,this.theta=i,this}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Ee(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Oa=class extends ii{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"169"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="169");var ud={type:"change"},Kc={type:"start"},fd={type:"end"},Ga=new Is,dd=new Pn,Mv=Math.cos(70*wr.DEG2RAD),Pe=new G,an=2*Math.PI,ce={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Yc=1e-6,Wa=class extends Oa{constructor(t,e=null){super(t,e),this.state=ce.NONE,this.enabled=!0,this.target=new G,this.cursor=new G,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Yi.ROTATE,MIDDLE:Yi.DOLLY,RIGHT:Yi.PAN},this.touches={ONE:Ki.ROTATE,TWO:Ki.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new G,this._lastQuaternion=new Un,this._lastTargetPosition=new G,this._quat=new Un().setFromUnitVectors(t.up,new G(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Mr,this._sphericalDelta=new Mr,this._scale=1,this._panOffset=new G,this._rotateStart=new At,this._rotateEnd=new At,this._rotateDelta=new At,this._panStart=new At,this._panEnd=new At,this._panDelta=new At,this._dollyStart=new At,this._dollyEnd=new At,this._dollyDelta=new At,this._dollyDirection=new G,this._mouse=new At,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=wv.bind(this),this._onPointerDown=bv.bind(this),this._onPointerUp=Sv.bind(this),this._onContextMenu=Dv.bind(this),this._onMouseWheel=Cv.bind(this),this._onKeyDown=Rv.bind(this),this._onTouchStart=Pv.bind(this),this._onTouchMove=Iv.bind(this),this._onMouseDown=Ev.bind(this),this._onMouseMove=Tv.bind(this),this._interceptControlDown=Uv.bind(this),this._interceptControlUp=Lv.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(ud),this.update(),this.state=ce.NONE}update(t=null){let e=this.object.position;Pe.copy(e).sub(this.target),Pe.applyQuaternion(this._quat),this._spherical.setFromVector3(Pe),this.autoRotate&&this.state===ce.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=an:i>Math.PI&&(i-=an),s<-Math.PI?s+=an:s>Math.PI&&(s-=an),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Pe.setFromSpherical(this._spherical),Pe.applyQuaternion(this._quatInverse),e.copy(this.target).add(Pe),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Pe.length();a=this._clampDistance(o*this._scale);let l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let o=new G(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new G(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Pe.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Ga.origin.copy(this.object.position),Ga.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ga.direction))<Mv?this.object.lookAt(this.target):(dd.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ga.intersectPlane(dd,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Yc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Yc||this._lastTargetPosition.distanceToSquared(this.target)>Yc?(this.dispatchEvent(ud),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?an/60*this.autoRotateSpeed*t:an/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Pe.setFromMatrixColumn(e,0),Pe.multiplyScalar(-t),this._panOffset.add(Pe)}_panUp(t,e){this.screenSpacePanning===!0?Pe.setFromMatrixColumn(e,1):(Pe.setFromMatrixColumn(e,0),Pe.crossVectors(this.object.up,Pe)),Pe.multiplyScalar(t),this._panOffset.add(Pe)}_pan(t,e){let i=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Pe.copy(s).sub(this.target);let r=Pe.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(an*this._rotateDelta.x/e.clientHeight),this._rotateUp(an*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(an*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-an*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(an*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-an*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(an*this._rotateDelta.x/e.clientHeight),this._rotateUp(an*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new At,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}};function bv(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function wv(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function Sv(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(fd),this.state=ce.NONE;break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Ev(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Yi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=ce.DOLLY;break;case Yi.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ce.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ce.ROTATE}break;case Yi.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ce.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ce.PAN}break;default:this.state=ce.NONE}this.state!==ce.NONE&&this.dispatchEvent(Kc)}function Tv(n){switch(this.state){case ce.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case ce.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case ce.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function Cv(n){this.enabled===!1||this.enableZoom===!1||this.state!==ce.NONE||(n.preventDefault(),this.dispatchEvent(Kc),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(fd))}function Rv(n){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(n)}function Pv(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Ki.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=ce.TOUCH_ROTATE;break;case Ki.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=ce.TOUCH_PAN;break;default:this.state=ce.NONE}break;case 2:switch(this.touches.TWO){case Ki.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=ce.TOUCH_DOLLY_PAN;break;case Ki.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=ce.TOUCH_DOLLY_ROTATE;break;default:this.state=ce.NONE}break;default:this.state=ce.NONE}this.state!==ce.NONE&&this.dispatchEvent(Kc)}function Iv(n){switch(this._trackPointer(n),this.state){case ce.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case ce.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case ce.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case ce.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=ce.NONE}}function Dv(n){this.enabled!==!1&&n.preventDefault()}function Uv(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Lv(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function qa(n,t=!1){let e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},a={},o=n[0].morphTargetsRelative,l=new ue,c=0;for(let h=0;h<n.length;++h){let u=n[h],f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let d in u.attributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.attributes[d]),f++}if(f!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let d in u.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[d]===void 0&&(a[d]=[]),a[d].push(u.morphAttributes[d])}if(t){let d;if(e)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,d,h),c+=d}}if(e){let h=0,u=[];for(let f=0;f<n.length;++f){let d=n[f].index;for(let A=0;A<d.count;++A)u.push(d.getX(A)+h);h+=n[f].attributes.position.count}l.setIndex(u)}for(let h in r){let u=pd(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(let h in a){let u=a[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let f=0;f<u;++f){let d=[];for(let _=0;_<a[h].length;++_)d.push(a[h][_][f]);let A=pd(d);if(!A)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(A)}}return l}function pd(n){let t,e,i,s=-1,r=0;for(let c=0;c<n.length;++c){let h=n[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let a=new t(r),o=new Te(a,e,i),l=0;for(let c=0;c<n.length;++c){let h=n[c];if(h.isInterleavedBufferAttribute){let u=l/e;for(let f=0,d=h.count;f<d;f++)for(let A=0;A<e;A++){let _=h.getComponent(f,A);o.setComponent(f+u,A,_)}}else a.set(h.array,l);l+=h.count*e}return s!==void 0&&(o.gpuType=s),o}var Gs={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var mn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},Nv=new Us(-1,1,1,-1,0,1),jc=class extends ue{constructor(){super(),this.setAttribute("position",new me([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new me([0,2,0,0,2,0],2))}},Ov=new jc,Mi=class{constructor(t){this._mesh=new le(Ov,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Nv)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}};var Xa=class extends mn{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof Se?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=On.clone(t.uniforms),this.material=new Se({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Mi(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var Sr=class extends mn{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){let s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},Ya=class extends mn{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}};var Ka=class{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){let i=t.getSize(new At);this._width=i.width,this._height=i.height,e=new Ge(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:bn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Xa(Gs),this.copyPass.material.blending=_e,this.clock=new La}swapBuffers(){let t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){let e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());let e=this.renderer.getRenderTarget(),i=!1;for(let s=0,r=this.passes.length;s<r;s++){let a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),a.needsSwap){if(i){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Sr!==void 0&&(a instanceof Sr?i=!0:a instanceof Ya&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){let e=this.renderer.getSize(new At);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;let i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var ja=class extends mn{constructor(t,e,i=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Ot}render(t,e,i){let s=t.autoClear;t.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=s}};var Er={name:"GTAOShader",defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new At},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new ae},cameraProjectionMatrixInverse:{value:new ae},cameraWorldMatrix:{value:new ae},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new G(-1,-1,-1)},sceneBoxMax:{value:new G(1,1,1)}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		varying vec2 vUv;
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraProjectionMatrixInverse;		
		uniform mat4 cameraWorldMatrix;
		uniform float radius;
		uniform float distanceExponent;
		uniform float thickness;
		uniform float distanceFallOff;
		uniform float scale;
		#if SCENE_CLIP_BOX == 1
			uniform vec3 sceneBoxMin;
			uniform vec3 sceneBoxMax;
		#endif
		
		#include <common>
		#include <packing>

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(vec3(ao), 1.)
		#endif

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {  
			return textureLod(tDepth, uv.xy, 0.0).DEPTH_SWIZZLING;
		}

		float fetchDepth(const ivec2 uv) {   
			return texelFetch(tDepth, uv.xy, 0).DEPTH_SWIZZLING;
		}

		float getViewZ(const in float depth) {
			#if PERSPECTIVE_CAMERA == 1
				return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
			#else
				return orthographicDepthToViewZ(depth, cameraNear, cameraFar);
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ? ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz : -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ? ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz : -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
			#if NORMAL_VECTOR_TYPE == 2
				return normalize(textureLod(tNormal, uv, 0.).rgb);
			#elif NORMAL_VECTOR_TYPE == 1
				return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
			#else
				return computeNormalFromDepth(uv);
			#endif
		}

		vec3 getSceneUvAndDepth(vec3 sampleViewPos) {
			vec4 sampleClipPos = cameraProjectionMatrix * vec4(sampleViewPos, 1.);
			vec2 sampleUv = sampleClipPos.xy / sampleClipPos.w * 0.5 + 0.5;
			float sampleSceneDepth = getDepth(sampleUv);
			return vec3(sampleUv, sampleSceneDepth);
		}
		
		void main() {
			float depth = getDepth(vUv.xy);
			if (depth >= 1.0) {
				discard;
				return;
			}
			vec3 viewPos = getViewPosition(vUv, depth);
			vec3 viewNormal = getViewNormal(vUv);

			float radiusToUse = radius;
			float distanceFalloffToUse = thickness;
			#if SCREEN_SPACE_RADIUS == 1
				float radiusScale = getViewPosition(vec2(0.5 + float(SCREEN_SPACE_RADIUS_SCALE) / resolution.x, 0.0), depth).x;
				radiusToUse *= radiusScale;
				distanceFalloffToUse *= radiusScale;
			#endif

			#if SCENE_CLIP_BOX == 1
				vec3 worldPos = (cameraWorldMatrix * vec4(viewPos, 1.0)).xyz;
				float boxDistance = length(max(vec3(0.0), max(sceneBoxMin - worldPos, worldPos - sceneBoxMax)));
				if (boxDistance > radiusToUse) {
					discard;
					return;
				}
			#endif
			
			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
			vec3 randomVec = noiseTexel.xyz * 2.0 - 1.0;
			vec3 tangent = normalize(vec3(randomVec.xy, 0.));
			vec3 bitangent = vec3(-tangent.y, tangent.x, 0.);
			mat3 kernelMatrix = mat3(tangent, bitangent, vec3(0., 0., 1.));

			const int DIRECTIONS = SAMPLES < 30 ? 3 : 5;
			const int STEPS = (SAMPLES + DIRECTIONS - 1) / DIRECTIONS;
			float ao = 0.0;
			for (int i = 0; i < DIRECTIONS; ++i) {
				
				float angle = float(i) / float(DIRECTIONS) * PI;
				vec4 sampleDir = vec4(cos(angle), sin(angle), 0., 0.5 + 0.5 * noiseTexel.w); 
				sampleDir.xyz = normalize(kernelMatrix * sampleDir.xyz);

				vec3 viewDir = normalize(-viewPos.xyz);
				vec3 sliceBitangent = normalize(cross(sampleDir.xyz, viewDir));
				vec3 sliceTangent = cross(sliceBitangent, viewDir);
				vec3 normalInSlice = normalize(viewNormal - sliceBitangent * dot(viewNormal, sliceBitangent));
				
				vec3 tangentToNormalInSlice = cross(normalInSlice, sliceBitangent);
				vec2 cosHorizons = vec2(dot(viewDir, tangentToNormalInSlice), dot(viewDir, -tangentToNormalInSlice));
				
				for (int j = 0; j < STEPS; ++j) {
					vec3 sampleViewOffset = sampleDir.xyz * radiusToUse * sampleDir.w * pow(float(j + 1) / float(STEPS), distanceExponent);	

					vec3 sampleSceneUvDepth = getSceneUvAndDepth(viewPos + sampleViewOffset);
					vec3 sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					vec3 viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.x += max(0., (sampleCosHorizon - cosHorizons.x) * mix(1., 2. / float(j + 2), distanceFallOff));
					}		

					sampleSceneUvDepth = getSceneUvAndDepth(viewPos - sampleViewOffset);
					sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.y += max(0., (sampleCosHorizon - cosHorizons.y) * mix(1., 2. / float(j + 2), distanceFallOff));
					}
				}

				vec2 sinHorizons = sqrt(1. - cosHorizons * cosHorizons);
				float nx = dot(normalInSlice, sliceTangent);
				float ny = dot(normalInSlice, viewDir);
				float nxb = 1. / 2. * (acos(cosHorizons.y) - acos(cosHorizons.x) + sinHorizons.x * cosHorizons.x - sinHorizons.y * cosHorizons.y);
				float nyb = 1. / 2. * (2. - cosHorizons.x * cosHorizons.x - cosHorizons.y * cosHorizons.y);
				float occlusion = nx * nxb + ny * nyb;
				ao += occlusion;
			}

			ao = clamp(ao / float(DIRECTIONS), 0., 1.);		
		#if SCENE_CLIP_BOX == 1
			ao = mix(ao, 1., smoothstep(0., radiusToUse, boxDistance));
		#endif
			ao = pow(ao, scale);

			gl_FragColor = FRAGMENT_OUTPUT;
		}`},Tr={name:"GTAODepthShader",defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform sampler2D tDepth;
		uniform float cameraNear;
		uniform float cameraFar;
		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {
			#if PERSPECTIVE_CAMERA == 1
				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
			#else
				return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		void main() {
			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},Za={name:"GTAOBlendShader",uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform float intensity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;

		void main() {
			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = vec4(mix(vec3(1.), texel.rgb, intensity), texel.a);
		}`};function md(n=5){let t=Math.floor(n)%2===0?Math.floor(n)+1:Math.floor(n),e=Bv(t),i=e.length,s=new Uint8Array(i*4);for(let a=0;a<i;++a){let o=e[a],l=2*Math.PI*o/i,c=new G(Math.cos(l),Math.sin(l),0).normalize();s[a*4]=(c.x*.5+.5)*255,s[a*4+1]=(c.y*.5+.5)*255,s[a*4+2]=127,s[a*4+3]=255}let r=new Os(s,t,t);return r.wrapS=fn,r.wrapT=fn,r.needsUpdate=!0,r}function Bv(n){let t=Math.floor(n)%2===0?Math.floor(n)+1:Math.floor(n),e=t*t,i=Array(e).fill(0),s=Math.floor(t/2),r=t-1;for(let a=1;a<=e;){if(s===-1&&r===t?(r=t-2,s=0):(r===t&&(r=0),s<0&&(s=t-1)),i[s*t+r]!==0){r-=2,s++;continue}else i[s*t+r]=a++;r++,s--}return i}var Cr={name:"PoissonDenoiseShader",defines:{SAMPLES:16,SAMPLE_VECTORS:Zc(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new At},cameraProjectionMatrixInverse:{value:new ae},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`

		varying vec2 vUv;

		uniform sampler2D tDiffuse;
		uniform sampler2D tNormal;
		uniform sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform float lumaPhi;
		uniform float depthPhi;
		uniform float normalPhi;
		uniform float radius;
		uniform int index;
		
		#include <common>
		#include <packing>

		#ifndef SAMPLE_LUMINANCE
		#define SAMPLE_LUMINANCE dot(vec3(0.2125, 0.7154, 0.0721), a)
		#endif

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(denoised, 1.)
		#endif

		float getLuminance(const in vec3 a) {
			return SAMPLE_LUMINANCE;
		}

		const vec3 poissonDisk[SAMPLES] = SAMPLE_VECTORS;

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}
		
		float getDepth(const vec2 uv) {
		#if DEPTH_VALUE_SOURCE == 1    
			return textureLod(tDepth, uv.xy, 0.0).a;
		#else
			return textureLod(tDepth, uv.xy, 0.0).r;
		#endif
		}

		float fetchDepth(const ivec2 uv) {
			#if DEPTH_VALUE_SOURCE == 1    
				return texelFetch(tDepth, uv.xy, 0).a;
			#else
				return texelFetch(tDepth, uv.xy, 0).r;
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ?  ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz
									: -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ?  ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz
									: -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
		#if NORMAL_VECTOR_TYPE == 2
			return normalize(textureLod(tNormal, uv, 0.).rgb);
		#elif NORMAL_VECTOR_TYPE == 1
			return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
		#else
			return computeNormalFromDepth(uv);
		#endif
		}

		void denoiseSample(in vec3 center, in vec3 viewNormal, in vec3 viewPos, in vec2 sampleUv, inout vec3 denoised, inout float totalWeight) {
			vec4 sampleTexel = textureLod(tDiffuse, sampleUv, 0.0);
			float sampleDepth = getDepth(sampleUv);
			vec3 sampleNormal = getViewNormal(sampleUv);
			vec3 neighborColor = sampleTexel.rgb;
			vec3 viewPosSample = getViewPosition(sampleUv, sampleDepth);
			
			float normalDiff = dot(viewNormal, sampleNormal);
			float normalSimilarity = pow(max(normalDiff, 0.), normalPhi);
			float lumaDiff = abs(getLuminance(neighborColor) - getLuminance(center));
			float lumaSimilarity = max(1.0 - lumaDiff / lumaPhi, 0.0);
			float depthDiff = abs(dot(viewPos - viewPosSample, viewNormal));
			float depthSimilarity = max(1. - depthDiff / depthPhi, 0.);
			float w = lumaSimilarity * depthSimilarity * normalSimilarity;
		
			denoised += w * neighborColor;
			totalWeight += w;
		}
		
		void main() {
			float depth = getDepth(vUv.xy);	
			vec3 viewNormal = getViewNormal(vUv);	
			if (depth == 1. || dot(viewNormal, viewNormal) == 0.) {
				discard;
				return;
			}
			vec4 texel = textureLod(tDiffuse, vUv, 0.0);
			vec3 center = texel.rgb;
			vec3 viewPos = getViewPosition(vUv, depth);

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
      		vec2 noiseVec = vec2(sin(noiseTexel[index % 4] * 2. * PI), cos(noiseTexel[index % 4] * 2. * PI));
    		mat2 rotationMatrix = mat2(noiseVec.x, -noiseVec.y, noiseVec.x, noiseVec.y);
		
			float totalWeight = 1.0;
			vec3 denoised = texel.rgb;
			for (int i = 0; i < SAMPLES; i++) {
				vec3 sampleDir = poissonDisk[i];
				vec2 offset = rotationMatrix * (sampleDir.xy * (1. + sampleDir.z * (radius - 1.)) / resolution);
				vec2 sampleUv = vUv + offset;
				denoiseSample(center, viewNormal, viewPos, sampleUv, denoised, totalWeight);
			}
		
			if (totalWeight > 0.) { 
				denoised /= totalWeight;
			}
			gl_FragColor = FRAGMENT_OUTPUT;
		}`};function Zc(n,t,e){let i=Fv(n,t,e),s="vec3[SAMPLES](";for(let r=0;r<n;r++){let a=i[r];s+=`vec3(${a.x}, ${a.y}, ${a.z})${r<n-1?",":")"}`}return s}function Fv(n,t,e){let i=[];for(let s=0;s<n;s++){let r=2*Math.PI*t*s/n,a=Math.pow(s/(n-1),e);i.push(new G(Math.cos(r),Math.sin(r),a))}return i}var Qa=class{constructor(t=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let e=0;e<256;e++)this.p[e]=Math.floor(t.random()*256);this.perm=[];for(let e=0;e<512;e++)this.perm[e]=this.p[e&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}dot(t,e,i){return t[0]*e+t[1]*i}dot3(t,e,i,s){return t[0]*e+t[1]*i+t[2]*s}dot4(t,e,i,s,r){return t[0]*e+t[1]*i+t[2]*s+t[3]*r}noise(t,e){let i,s,r,a=.5*(Math.sqrt(3)-1),o=(t+e)*a,l=Math.floor(t+o),c=Math.floor(e+o),h=(3-Math.sqrt(3))/6,u=(l+c)*h,f=l-u,d=c-u,A=t-f,_=e-d,p,g;A>_?(p=1,g=0):(p=0,g=1);let w=A-p+h,M=_-g+h,y=A-1+2*h,C=_-1+2*h,b=l&255,S=c&255,E=this.perm[b+this.perm[S]]%12,T=this.perm[b+p+this.perm[S+g]]%12,m=this.perm[b+1+this.perm[S+1]]%12,v=.5-A*A-_*_;v<0?i=0:(v*=v,i=v*v*this.dot(this.grad3[E],A,_));let R=.5-w*w-M*M;R<0?s=0:(R*=R,s=R*R*this.dot(this.grad3[T],w,M));let L=.5-y*y-C*C;return L<0?r=0:(L*=L,r=L*L*this.dot(this.grad3[m],y,C)),70*(i+s+r)}noise3d(t,e,i){let s,r,a,o,c=(t+e+i)*.3333333333333333,h=Math.floor(t+c),u=Math.floor(e+c),f=Math.floor(i+c),d=1/6,A=(h+u+f)*d,_=h-A,p=u-A,g=f-A,w=t-_,M=e-p,y=i-g,C,b,S,E,T,m;w>=M?M>=y?(C=1,b=0,S=0,E=1,T=1,m=0):w>=y?(C=1,b=0,S=0,E=1,T=0,m=1):(C=0,b=0,S=1,E=1,T=0,m=1):M<y?(C=0,b=0,S=1,E=0,T=1,m=1):w<y?(C=0,b=1,S=0,E=0,T=1,m=1):(C=0,b=1,S=0,E=1,T=1,m=0);let v=w-C+d,R=M-b+d,L=y-S+d,I=w-E+2*d,k=M-T+2*d,B=y-m+2*d,q=w-1+3*d,z=M-1+3*d,tt=y-1+3*d,ot=h&255,ut=u&255,Et=f&255,J=this.perm[ot+this.perm[ut+this.perm[Et]]]%12,H=this.perm[ot+C+this.perm[ut+b+this.perm[Et+S]]]%12,U=this.perm[ot+E+this.perm[ut+T+this.perm[Et+m]]]%12,F=this.perm[ot+1+this.perm[ut+1+this.perm[Et+1]]]%12,N=.6-w*w-M*M-y*y;N<0?s=0:(N*=N,s=N*N*this.dot3(this.grad3[J],w,M,y));let Y=.6-v*v-R*R-L*L;Y<0?r=0:(Y*=Y,r=Y*Y*this.dot3(this.grad3[H],v,R,L));let W=.6-I*I-k*k-B*B;W<0?a=0:(W*=W,a=W*W*this.dot3(this.grad3[U],I,k,B));let nt=.6-q*q-z*z-tt*tt;return nt<0?o=0:(nt*=nt,o=nt*nt*this.dot3(this.grad3[F],q,z,tt)),32*(s+r+a+o)}noise4d(t,e,i,s){let r=this.grad4,a=this.simplex,o=this.perm,l=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20,h,u,f,d,A,_=(t+e+i+s)*l,p=Math.floor(t+_),g=Math.floor(e+_),w=Math.floor(i+_),M=Math.floor(s+_),y=(p+g+w+M)*c,C=p-y,b=g-y,S=w-y,E=M-y,T=t-C,m=e-b,v=i-S,R=s-E,L=T>m?32:0,I=T>v?16:0,k=m>v?8:0,B=T>R?4:0,q=m>R?2:0,z=v>R?1:0,tt=L+I+k+B+q+z,ot=a[tt][0]>=3?1:0,ut=a[tt][1]>=3?1:0,Et=a[tt][2]>=3?1:0,J=a[tt][3]>=3?1:0,H=a[tt][0]>=2?1:0,U=a[tt][1]>=2?1:0,F=a[tt][2]>=2?1:0,N=a[tt][3]>=2?1:0,Y=a[tt][0]>=1?1:0,W=a[tt][1]>=1?1:0,nt=a[tt][2]>=1?1:0,ct=a[tt][3]>=1?1:0,at=T-ot+c,O=m-ut+c,Tt=v-Et+c,ht=R-J+c,Ct=T-H+2*c,mt=m-U+2*c,Dt=v-F+2*c,Rt=R-N+2*c,D=T-Y+3*c,x=m-W+3*c,V=v-nt+3*c,Q=R-ct+3*c,st=T-1+4*c,it=m-1+4*c,gt=v-1+4*c,pt=R-1+4*c,yt=p&255,Xt=g&255,dt=w&255,_t=M&255,Ft=o[yt+o[Xt+o[dt+o[_t]]]]%32,kt=o[yt+ot+o[Xt+ut+o[dt+Et+o[_t+J]]]]%32,St=o[yt+H+o[Xt+U+o[dt+F+o[_t+N]]]]%32,Yt=o[yt+Y+o[Xt+W+o[dt+nt+o[_t+ct]]]]%32,Vt=o[yt+1+o[Xt+1+o[dt+1+o[_t+1]]]]%32,Qt=.6-T*T-m*m-v*v-R*R;Qt<0?h=0:(Qt*=Qt,h=Qt*Qt*this.dot4(r[Ft],T,m,v,R));let X=.6-at*at-O*O-Tt*Tt-ht*ht;X<0?u=0:(X*=X,u=X*X*this.dot4(r[kt],at,O,Tt,ht));let xt=.6-Ct*Ct-mt*mt-Dt*Dt-Rt*Rt;xt<0?f=0:(xt*=xt,f=xt*xt*this.dot4(r[St],Ct,mt,Dt,Rt));let rt=.6-D*D-x*x-V*V-Q*Q;rt<0?d=0:(rt*=rt,d=rt*rt*this.dot4(r[Yt],D,x,V,Q));let lt=.6-st*st-it*it-gt*gt-pt*pt;return lt<0?A=0:(lt*=lt,A=lt*lt*this.dot4(r[Vt],st,it,gt,pt)),27*(h+u+f+d+A)}};var Rr=class n extends mn{constructor(t,e,i,s,r,a,o){super(),this.width=i!==void 0?i:512,this.height=s!==void 0?s:512,this.clear=!0,this.camera=e,this.scene=t,this.output=0,this._renderGBuffer=!0,this._visibilityCache=new Map,this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=md(),this.pdNoiseTexture=this.generateNoise(),this.gtaoRenderTarget=new Ge(this.width,this.height,{type:bn}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new Se({defines:Object.assign({},Er.defines),uniforms:On.clone(Er.uniforms),vertexShader:Er.vertexShader,fragmentShader:Er.fragmentShader,blending:_e,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new Fs,this.normalMaterial.blending=_e,this.pdMaterial=new Se({defines:Object.assign({},Cr.defines),uniforms:On.clone(Cr.uniforms),vertexShader:Cr.vertexShader,fragmentShader:Cr.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new Se({defines:Object.assign({},Tr.defines),uniforms:On.clone(Tr.uniforms),vertexShader:Tr.vertexShader,fragmentShader:Tr.fragmentShader,blending:_e}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new Se({uniforms:On.clone(Gs.uniforms),vertexShader:Gs.vertexShader,fragmentShader:Gs.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:ka,blendDst:zs,blendEquation:Mn,blendSrcAlpha:Fa,blendDstAlpha:zs,blendEquationAlpha:Mn}),this.blendMaterial=new Se({uniforms:On.clone(Za.uniforms),vertexShader:Za.vertexShader,fragmentShader:Za.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:Tc,blendSrc:ka,blendDst:zs,blendEquation:Mn,blendSrcAlpha:Fa,blendDstAlpha:zs,blendEquationAlpha:Mn}),this.fsQuad=new Mi(null),this.originalClearColor=new Ot,this.setGBuffer(r?r.depthTexture:void 0,r?r.normalTexture:void 0),a!==void 0&&this.updateGtaoMaterial(a),o!==void 0&&this.updatePdMaterial(o)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this.fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(t,e){t!==void 0?(this.depthTexture=t,this.normalTexture=e,this._renderGBuffer=!1):(this.depthTexture=new Ns,this.depthTexture.format=xi,this.depthTexture.type=vi,this.normalRenderTarget=new Ge(this.width,this.height,{minFilter:Fe,magFilter:Fe,type:bn,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);let i=this.normalTexture?1:0,s=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=i,this.gtaoMaterial.defines.DEPTH_SWIZZLING=s,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=i,this.pdMaterial.defines.DEPTH_SWIZZLING=s,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(t){t?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(t.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(t.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(t){t.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=t.radius),t.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=t.distanceExponent),t.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=t.thickness),t.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=t.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),t.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=t.scale),t.samples!==void 0&&t.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=t.samples,this.gtaoMaterial.needsUpdate=!0),t.screenSpaceRadius!==void 0&&(t.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=t.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(t){let e=!1;t.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=t.lumaPhi),t.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=t.depthPhi),t.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=t.normalPhi),t.radius!==void 0&&t.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=t.radius),t.radiusExponent!==void 0&&t.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=t.radiusExponent,e=!0),t.rings!==void 0&&t.rings!==this.pdRings&&(this.pdRings=t.rings,e=!0),t.samples!==void 0&&t.samples!==this.pdSamples&&(this.pdSamples=t.samples,e=!0),e&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=Zc(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(t,e,i){switch(this._renderGBuffer&&(this.overrideVisibility(),this.renderOverride(t,this.normalMaterial,this.normalRenderTarget,7829503,1),this.restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this.renderPass(t,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.renderPass(t,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case n.OUTPUT.Off:break;case n.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=i.texture,this.copyMaterial.blending=_e,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case n.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=_e,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case n.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=_e,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case n.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.renderPass(t,this.depthRenderMaterial,this.renderToScreen?null:e);break;case n.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=_e,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case n.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=i.texture,this.copyMaterial.blending=_e,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.renderPass(t,this.blendMaterial,this.renderToScreen?null:e);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}renderPass(t,e,i,s,r){t.getClearColor(this.originalClearColor);let a=t.getClearAlpha(),o=t.autoClear;t.setRenderTarget(i),t.autoClear=!1,s!=null&&(t.setClearColor(s),t.setClearAlpha(r||0),t.clear()),this.fsQuad.material=e,this.fsQuad.render(t),t.autoClear=o,t.setClearColor(this.originalClearColor),t.setClearAlpha(a)}renderOverride(t,e,i,s,r){t.getClearColor(this.originalClearColor);let a=t.getClearAlpha(),o=t.autoClear;t.setRenderTarget(i),t.autoClear=!1,s=e.clearColor||s,r=e.clearAlpha||r,s!=null&&(t.setClearColor(s),t.setClearAlpha(r||0),t.clear()),this.scene.overrideMaterial=e,t.render(this.scene,this.camera),this.scene.overrideMaterial=null,t.autoClear=o,t.setClearColor(this.originalClearColor),t.setClearAlpha(a)}setSize(t,e){this.width=t,this.height=e,this.gtaoRenderTarget.setSize(t,e),this.normalRenderTarget.setSize(t,e),this.pdRenderTarget.setSize(t,e),this.gtaoMaterial.uniforms.resolution.value.set(t,e),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(t,e),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}overrideVisibility(){let t=this.scene,e=this._visibilityCache;t.traverse(function(i){e.set(i,i.visible),(i.isPoints||i.isLine)&&(i.visible=!1)})}restoreVisibility(){let t=this.scene,e=this._visibilityCache;t.traverse(function(i){let s=e.get(i);i.visible=s}),e.clear()}generateNoise(t=64){let e=new Qa,i=t*t*4,s=new Uint8Array(i);for(let a=0;a<t;a++)for(let o=0;o<t;o++){let l=a,c=o;s[(a*t+o)*4]=(e.noise(l,c)*.5+.5)*255,s[(a*t+o)*4+1]=(e.noise(l+t,c)*.5+.5)*255,s[(a*t+o)*4+2]=(e.noise(l,c+t)*.5+.5)*255,s[(a*t+o)*4+3]=(e.noise(l+t,c+t)*.5+.5)*255}let r=new Os(s,t,t,dn,Dn);return r.wrapS=fn,r.wrapT=fn,r.needsUpdate=!0,r}};Rr.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};var gd={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var Ja=class extends mn{constructor(){super();let t=gd;this.uniforms=On.clone(t.uniforms),this.material=new Ia({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new Mi(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},Jt.getTransfer(this._outputColorSpace)===he&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Cc?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Rc?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Pc?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ic?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Dc?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===br&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};window.qrcode=Pd.default;var kv="data:image/png;base64,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",ge=.01,Zs=1.04,Id=[["Red","#d42a1f"],["Orange","#e8641c"],["Yellow","#efbf2a"],["Green","#2e7d3c"],["Royal","#2350b8"],["Navy","#1f2b4d"],["Black","#1d1d20"],["Grey","#8c8e92"],["White","#efeee9"],["Kraft","#bd9665"],["Olive","#a2ad48"]],zv=[["Black","#1b1c20"],["Match fabric","match"],["White","#eceae4"],["Navy","#1f2b4d"],["Blue","#2b4db5"],["Red","#ec5534"]],Dd=[["Black","#1a1a1a"],["Dark grey","#4a4a4c"],["Grey","#7a7a7c"],["White","#f4f3ef"],["Gold","#c49a3c"],["Silver","#a9adb2"],["KOBAGS green","#7d9c44"],["Green","#4c8a3f"],["Dark green","#2f3b1c"],["Orange","#e2683a"],["Red","#d33a2c"],["Maroon","#7a1f18"],["Teal","#2fa58a"],["Navy","#1f2b4d"]],nh={"sans-900":["Montserrat",900,"Montserrat Black"],"sans-800":["Montserrat",800,"Montserrat Extra Bold"],"sans-700":["Montserrat",700,"Montserrat Bold"],"sans-600":["Montserrat",600,"Montserrat Semi Bold"],"sans-500":["Montserrat",500,"Montserrat Medium"],"sans-300":["Montserrat",300,"Montserrat Light"],"cond-700":["Oswald",700,"Oswald Bold (condensed)"],"script-700":["Dancing Script",700,"Script"],"serif-700":["Playfair Display",700,"Serif Bold"]},ne={box:{name:"Box bag",fill:.28,sub:"Side gusset \xB7 welded handles",gusset:"side",handles:"loop",strap:"webbing",hem:3.2,py:.51,ps:.85,handle:"#1b1c20",sizes:[["XS",20,26,12,"3,800"],["S",25,26,12,"3,300"],["M",32,29.5,15,"5,300"],["L",40,38.5,17,"4,400"],["XL",47,42,20,"3,800"]]},handle:{name:"Handle bag",fill:.12,sub:"Bottom gusset \xB7 fabric loop handles",gusset:"bottom",handles:"loop",strap:"fabric",close:.35,hem:3,py:.53,ps:.8,handle:"match",sizes:[["XS",20,25,5,"5,000"],["S",25,29.5,5,"4,000"],["M",35,33,8,"2,800"],["L",45,42,10,"4,000"],["XL",55,44.5,15,"\u22483,500"]]},dcut:{name:"D-cut bag",fill:.08,sub:"Die-cut handle with reinforcement patch",gusset:"bottom",handles:"dcut",close:.85,hem:0,py:.6,ps:.72,sizes:[["XS",20,25,0,"5,000"],["S",25,27.5,5,"4,000"],["M",35,31,8,"2,800"],["L",45,39,10,"4,000"],["XL",55,44.5,10,"\u22483,500"]]},tshirt:{name:"T-shirt bag",fill:.15,sub:"Vest handles \xB7 side gusset",gusset:"side",handles:"tshirt",hem:0,py:.68,ps:.66,sizes:[["S",27,40,12,"5,000"],["M",27,50,12,"4,000"],["L",32,60,17,"3,300"]]},bottle:{name:"Bottle bag",sub:"Side gusset \xB7 die-cut handle",gusset:"side",handles:"dcut",hem:0,topFold:.97,foldPow:1,fill:.2,sizes:[["Std",14,38,9,"on request"]]},string:{name:"String bag",fill:.12,sub:"Drawstring backpack \xB7 cord channel",gusset:"bottom",handles:"string",close:.6,hem:3,py:.55,ps:.72,handle:"#1b1c20",sizes:[["XS",20,27,5,"5,000"],["S",25,32.5,5,"4,000"],["M",35,36,8,"2,800"],["L",45,45,10,"4,000"],["XL",55,47.5,15,"\u22483,500"]]}},Z={type:"box",size:"XS",bagView:"open",W:20,H:26,D:12,hem:3.2,drop:12,full:.35,pose:"upright",strap:"fabric",bag:"#d42a1f",handle:"#1b1c20"},gn=document.documentElement.dataset.embed==="preview",$e=document.getElementById("stage"),Sn=!0,qt=new Ea({antialias:!0,preserveDrawingBuffer:!gn,premultipliedAlpha:!1});qt.setPixelRatio(Math.min(devicePixelRatio,innerWidth<760?1.5:2));qt.outputColorSpace=Ze;qt.toneMapping=br;qt.shadowMap.enabled=!gn;qt.shadowMap.type=Ba;$e.prepend(qt.domElement);var Ne=new yr,Hv=new Ls(qt);function Vv(){let n=new yr,t=new le(new Wi(12,8,12),new Gn({color:11842744,side:ke}));t.position.y=3,n.add(t);let e=new le(new Wn(12,12),new Gn({color:9079436}));e.rotation.x=-Math.PI/2,e.position.y=-.98,n.add(e);let i=(s,r,a,o,l,c)=>{let h=new le(new Wn(s,r),new Gn({color:new Ot(a,a,a),side:Je}));h.position.set(o,l,c),h.lookAt(0,.4,0),n.add(h)};return i(3.4,2.6,6,-2.6,2.8,2.6),i(2.6,2.2,2.6,3.2,1.4,2.4),i(.8,4.2,5,2.6,2,-2.8),i(.8,4.2,4,-2.8,2,-2.4),i(5,5,1.2,0,6.8,0),Hv.fromScene(n,.02).texture}Ne.environment=Vv();Ne.environmentIntensity=.7;var jt=new Qe(30,1,.01,20),ee=new Wa(jt,qt.domElement);ee.enableDamping=!0;ee.minDistance=.25;ee.maxDistance=3;ee.maxPolarAngle=Math.PI*.51;var Le=new Ua(16774892,1.25);Le.castShadow=!0;Le.shadow.mapSize.set(2048,2048);Le.shadow.radius=3.5;Le.shadow.bias=-3e-4;Le.shadow.normalBias=.0015;Object.assign(Le.shadow.camera,{left:-.45,right:.45,top:.6,bottom:-.3,near:.1,far:3});Ne.add(Le,Le.target);var mo=new le(new Wn(6,6),new Pa({opacity:.14}));mo.rotation.x=-Math.PI/2;mo.receiveShadow=!0;Ne.add(mo);var Ud=(()=>{let n=document.createElement("canvas");n.width=n.height=256;let t=n.getContext("2d");for(let s=18;s>=0;s--){let r=40+s*4.2,a=18+s*4;t.fillStyle=`rgba(0,0,0,${.075})`,t.beginPath(),t.roundRect(r,r,256-2*r,256-2*r,a),t.fill()}let e=new pn(n),i=new le(new Wn(1,1),new Gn({map:e,transparent:!0,depthWrite:!1,color:0,opacity:.85}));return i.rotation.x=-Math.PI/2,i.position.y=1e-4,i.renderOrder=1,Ne.add(i),i})();function Ad(n){return getComputedStyle(document.documentElement).getPropertyValue(n).trim()}function vh(){Ne.background=null,qt.setClearColor(16777215,0),Sn=!0}vh();matchMedia("(prefers-color-scheme: dark)").addEventListener("change",vh);new MutationObserver(vh).observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]});var Ie=(n,t,e)=>{let i=Math.min(1,Math.max(0,(e-n)/(t-n)));return i*i*(3-2*i)};function $a(n,t,e){let i=Math.sin(n*127.1+t*311.7+e*74.7)*43758.5453;return i-Math.floor(i)}function Si(n,t,e){let i=Math.floor(n),s=Math.floor(t),r=n-i,a=t-s,o=r*r*(3-2*r),l=a*a*(3-2*a),c=$a(i,s,e),h=$a(i+1,s,e),u=$a(i,s+1,e),f=$a(i+1,s+1,e);return(c+(h-c)*o+(u-c)*l+(c-h-u+f)*o*l)*2-1}var eo=(n,t,e)=>Si(n,t,e)*.6+Si(n*2.1,t*2.1,e+3)*.3+Si(n*4.3,t*4.3,e+7)*.1;function xh(){let{W:n,H:t,D:e}=Z,i=2,s=[i,i,e,t],r=[2*i+e,i,n,t],a=[3*i+e+n,i,e,t],o=[4*i+2*e+n,i,n,t],l=[r[0],2*i+t,n,e];return{left:s,front:r,right:a,back:o,bottom:l,AW:5*i+2*e+2*n,AH:3*i+t+e}}var Bt=xh();function Ye(){return(Z.bagView??(Z.type==="tshirt"?Z.vestView:"open"))==="flat"}function ai(n){let t=ne[Z.type],e=Z.D/2,i=Z.H;if(Ye()&&t.handles!=="tshirt"){let o=Math.min(e,.18);return t.gusset==="bottom"?{d:o*(1-Ie(0,ih(),n)),s:0}:{d:o,s:Math.sqrt(Math.max(e*e-o*o,0))}}if(t.gusset==="bottom")return{d:e*(1-Ie(0,ih(),n)),s:0};let s=Math.min(e,i*.45),r=(t.topFold??.82-.6*Z.full)*Math.pow(Ie(s,i,n),t.foldPow??1.4);if(t.handles==="tshirt"){if(Ye()){let d=wn().yb,A=(.06+.25*Z.full)*Ie(0,i*.18,n)*(1-Ie(i*.3,d-1,n)),_=.12+Math.min(A,e*.9);return{d:_,s:Math.sqrt(Math.max(e*e-_*_,0))}}let o=wn().yb,l=Ie(0,i*.14,n),c=1-.1*Ie(i*.5,o,n),h=1-Ie(o+.4,i-.8,n),u=.72+.26*Math.min(1,Math.max(0,Z.full)),f=.12+Math.max(0,e-.12)*u*l*c*h;return{d:f,s:Math.sqrt(Math.max(e*e-f*f,0))}}let a=e*Math.min(r,1);return{d:Math.max(Math.sqrt(Math.max(e*e-a*a,0)),.12),s:a}}function ih(){return Math.min(Z.H*.5,Math.max(Z.D*1.25,2))}function wn(){let{W:n,H:t,D:e}=Z,i=Math.min(n*.4,Math.max(e/2+.8,n*.29)),s=n/2-i;return{hw:i,c:s,yb:t*.73,r:Math.min(s*.35,2.5)}}function io(){let{W:n}=Z;return Z.type==="bottle"?{w:n*.5,h:2.4,top:2.2,pad:1}:{w:Math.min(9,n*.62),h:3,top:2.6,pad:1.4}}function Qs(n,t,e){let{W:i,H:s,hem:r,full:a}=Z,o=ne[Z.type],l=1-Math.pow(2*n/i,2),c=Math.sin(Math.PI*Math.min(1,Math.max(0,t/s))),h=Ie(0,1.4,i/2-Math.abs(n)),u=o.handles==="tshirt"?1-Ie(wn().yb-5,wn().yb-.5,t):1,f=(.08+.85*a)*l*Math.pow(c,.8)*u,d=((.3-.18*a)*eo(n*.15,t*.07,e)*l*c+.035*eo(n*.7,t*.5,e+20)*l*c)*u,A=Math.min(Z.D/2,s*.45),_=o.gusset==="side"&&o.handles!=="tshirt"?-.07*Math.exp(-(((t-A)/.3)**2))*l:0,p=0,g=Math.min(s*.42,11),w=Math.hypot(.5,1);for(let C of[-1,1]){let b=-C*.5/w,S=-1/w,E=n-C*i/2,T=t-(s-.4),m=E*b+T*S;if(m>0&&m<g){let v=E*-S+T*b;p-=.24*(1-.7*a)*Math.exp(-((v/.8)**2))*Math.sin(Math.PI*m/g)}}let M=0;if(o.handles==="loop"){let C=s-r-t,b=Math.min(s*.28,8);if(C>0&&C<b){let S=Math.sin(Math.PI*C/b)*(1-.45*a);for(let E of[-1,1]){let T=n-E*(go()+C*.13);M-=.16*Math.exp(-((T/.95)**2))*S*l}}}let y=r>0?(o.handles==="string"?.22:.05)*Ie(s-r-.06,s-r+.06,t):0;if(Ye()&&o.handles!=="tshirt"){let C=ai(t).d,b=o.gusset==="bottom"?.18*Math.pow(Math.max(l,0),.6)*Ie(0,2.5,t):0,S=(.018+.008*eo(n*.15,t*.07,e))*Math.max(l,0)*c;return C+b+S+y*h*(o.handles==="string"?1:.5)}if(o.gusset==="bottom"){let C=ai(t).d,b=Z.D/2,S=Math.pow(Math.max(l,0),.6),E=(.3+2*a)*S*Ie(0,3,t)*(.5+.5*c),T=1-(o.close||0)*(1-.5*a)*Ie(s*.45,s,t),m=o.handles==="string"?.24*l*h*Math.exp(-(((s-r-t)/Math.max(2.2,s*.17))**2))*(Math.sin(n*1.28+e*.7)+.32*Math.sin(n*2.1+t*.18)):0;return Math.max(0,(C+(b-C)*S+E)*T+.1*S*Ie(0,3,t)+d+m+(y+M)*h)}if(o.handles==="tshirt"&&Ye())return ai(t).d+.035*Math.max(0,l)*c*u;if(o.handles==="tshirt"&&!Ye()){let C=Z.D/2,b=wn().yb,S=0;for(let k of[-1,1]){let B=n-k*(i/2-C*.55-.025*t);S-=.18*Math.exp(-((B/1.05)**2))*Math.sin(Math.PI*Math.min(1,t/b))*u*h}let{c:E,hw:T}=wn(),m=b-t,v=b*.62;if(m>0&&m<v){let k=Math.pow(Math.sin(Math.PI*m/v),1.3)*h;for(let B of[-1,1]){let q=n-B*(E+T*.22+m*.1),z=1.05+m*.035,tt=(.85+B*(e===1?.15:-.15))*(1-.35*a);S+=tt*k*(-.26*Math.exp(-((q/z)**2))+.16*Math.exp(-(((q-B*1.2)/(z*1.4))**2)))}}let R=Math.max(0,Math.min(1,(Math.abs(n)-E)/T)),L=Math.max(0,Math.min(1,(t-b+2.5)/(s-b+2.5))),I=.24*Math.sin(Math.PI*R)*Math.sin(Math.PI*L)*(.88+.12*Math.sin(n*.28+e))*h;return Math.max(.12,Math.min(C,ai(t).d+f+d+S+I))}return ai(t).d+f+d+_+((o.handles==="tshirt"?0:p)+y+M)*h}function to(n,t,e,i){let s=(n+1)*(t+1),r=new Float32Array(s*3),a=new Float32Array(s*2),o=new Float32Array(s*2),l=new Float32Array(s*3),c=0;for(let p=0;p<=t;p++)for(let g=0;g<=n;g++,c++){let w=e(g/n,p/t);r[c*3]=w.p[0]*ge,r[c*3+1]=w.p[1]*ge,r[c*3+2]=w.p[2]*ge,a[c*2]=w.a[0]/Bt.AW,a[c*2+1]=1-w.a[1]/Bt.AH,o[c*2]=w.a[0]/Zs,o[c*2+1]=-w.a[1]/Zs;let M=.5+.5*Math.pow(Math.min(1,Math.max(0,w.p[1]/Z.H)),.75);l[c*3]=l[c*3+1]=l[c*3+2]=M}let h=[],u=(p,g)=>Math.abs(r[p*3]-r[g*3])+Math.abs(r[p*3+1]-r[g*3+1])+Math.abs(r[p*3+2]-r[g*3+2])<1e-9,f=(p,g,w)=>{!u(p,g)&&!u(g,w)&&!u(w,p)&&h.push(p,g,w)};for(let p=0;p<t;p++)for(let g=0;g<n;g++){let w=p*(n+1)+g,M=w+1,y=w+n+1,C=y+1;f(w,M,C),f(w,C,y)}let d=new ue;d.setAttribute("position",new Te(r,3)),d.setAttribute("uv",new Te(a,2)),d.setAttribute("uv1",new Te(o,2)),d.setAttribute("color",new Te(l,3)),d.setIndex(h),d.computeVertexNormals();let A=d.getAttribute("normal"),_=Math.floor(t/2)*(n+1)+Math.floor(n/2);if(A.getX(_)*i[0]+A.getY(_)*i[1]+A.getZ(_)*i[2]<0){for(let p=0;p<h.length;p+=3){let g=h[p+1];h[p+1]=h[p+2],h[p+2]=g}d.setIndex(h),d.computeVertexNormals()}return d}function Gv(n){let a=Z.H-.9,o=wn().yb+.45,l=.14,c=1.86,h=.14,u=Math.min(.75,(a-o)/4),f=[];for(let[C,b,S]of[[c-h,o+u,-90],[c-h,a-u,0],[l+h,a-u,90],[l+h,o+u,180]])for(let E=0;E<=4;E++){let T=(S+E*22.5)*Math.PI/180;f.push([C+h*Math.cos(T),b+u*Math.sin(T)])}let d=Object.fromEntries(Object.entries(n.attributes).map(([C,b])=>[C,{size:b.itemSize,values:Array.from(b.array)}])),A=[],_=new Map,p=(C,b)=>{let E=(C-17982-b*1887)%17/16;return{index:C,x:b%2?2-E:E,y:d.position.values[C*3+1]/ge}},g=(C,b,S,E)=>{if(S<1e-10)return C;if(S>1-1e-10)return b;let T=C.x+(b.x-C.x)*S,m=C.y+(b.y-C.y)*S,v=E+":"+T.toFixed(9)+":"+m.toFixed(9);if(_.has(v))return _.get(v);let R=d.position.values.length/3;for(let[I,{size:k,values:B}]of Object.entries(d)){let q=[];for(let z=0;z<k;z++)q.push(B[C.index*k+z]+(B[b.index*k+z]-B[C.index*k+z])*S);if(I==="normal"){let z=Math.hypot(...q)||1;for(let tt=0;tt<k;tt++)q[tt]/=z}B.push(...q)}let L={index:R,x:T,y:m};return _.set(v,L),L},w=(C,b,S,E,T)=>{let m=[],v=R=>(S[0]-b[0])*(R.y-b[1])-(S[1]-b[1])*(R.x-b[0]);for(let R=0;R<C.length;R++){let L=C[R],I=C[(R+1)%C.length],k=v(L),B=v(I),q=E?k>=0:k<=0,z=E?B>=0:B<=0;q&&m.push(L),q!==z&&m.push(g(L,I,k/(k-B),T))}return m},M=C=>{for(let b=1;b+1<C.length;b++){let S=C[0],E=C[b],T=C[b+1];Math.abs((E.x-S.x)*(T.y-S.y)-(E.y-S.y)*(T.x-S.x))>1e-10&&A.push(S.index,E.index,T.index)}},y=n.index.array;for(let C=0;C<y.length;C+=3){let b=[y[C],y[C+1],y[C+2]],S=Math.min(...b),E=Math.max(...b);if(S<17982||E>=25530){A.push(...b);continue}let T=Math.floor((S-17982)/1887),m=b.map(v=>p(v,T));if(m.every(v=>v.y<=o)||m.every(v=>v.y>=a)){A.push(...b);continue}for(let v=0;v<f.length&&m.length;v++){let R=f[v],L=f[(v+1)%f.length];M(w(m,R,L,!1,T)),m=w(m,R,L,!0,T)}}for(let[C,{size:b,values:S}]of Object.entries(d))n.setAttribute(C,new me(S,b));return n.setIndex(A),n}function Wv(){let{W:n,H:t,D:e}=Z,i=e/2,s=gn?55:110,r=[];r.push(to(gn?40:80,s,(c,h)=>{let u=-n/2+c*n,f=h*t;return{p:[u,f,Qs(u,f,1)],a:[Bt.front[0]+c*n,Bt.front[1]+(1-h)*t]}},[0,0,1])),r.push(to(gn?40:80,s,(c,h)=>{let u=n/2-c*n,f=h*t;return{p:[u,f,-Qs(u,f,2)],a:[Bt.back[0]+c*n,Bt.back[1]+(1-h)*t]}},[0,0,-1]));let a=ne[Z.type].gusset==="bottom"?Math.min(s,Math.ceil(ih()/(t/s))):s;if(e>=.5)for(let c of[1,-1])for(let h of["f","b"]){let u=c>0?Bt.right:Bt.left;r.push(to(gn?8:16,a,(f,d)=>{let A=d*a*t/s,{d:_,s:p}=ai(A),g=((.12+.35*Z.full)*(1-.6*p/i)*Math.sin(Math.PI*f)+.06*eo(f*3,A*.3,c*3+(h==="f"?1:2))*Math.sin(Math.PI*f))*(_/i)*Ie(0,2.5,A),w=ne[Z.type].handles==="tshirt"&&!Ye()?.16*Math.sin(Math.PI*f)*Math.sin(Math.PI*A/t)*Math.sin(A/t*Math.PI*2.2+c*.7+(h==="f"?0:.5))*(1-Ie(wn().yb-1.5,wn().yb+.4,A)):0,M=[c*(n/2-p*f+g+w),A,(h==="f"?_:-_)*(1-f)],y=h==="f"?f*i:e-f*i;return{p:M,a:[u[0]+(c>0?y:e-y),u[1]+t-A]}},[c,0,0]))}let o=ne[Z.type].handles==="tshirt"||Ye()?ai(0).d:i;e>=.5&&r.push(to(gn?40:80,ne[Z.type].handles==="tshirt"?2:gn?16:32,(c,h)=>({p:[(-n/2+c*n)*(Ye()&&ne[Z.type].handles!=="tshirt"&&ne[Z.type].gusset==="side"?1-2*ai(0).s*(1-Math.abs(1-2*h))/n:1),0,o-h*2*o],a:[Bt.bottom[0]+c*n,Bt.bottom[1]+h*e]}),[0,-1,0]));let l=qa(r);return ne[Z.type].handles==="tshirt"?Gv(l):l}function go(){return Math.min(.28*Z.W,Z.W/2-2,6.2)}function qv(n){let{W:t,H:e,hem:i,drop:s}=Z,r=go(),a=Z.strap!=="webbing",o=2.5,l=a?.028:.045,c=Ye()?n>0?.004:.008:Z.pose==="relaxed"?n>0?.62:.85:n>0?.12:.18,h=(q,z=0)=>n*(Qs(z,Math.min(q,e),n>0?1:2)-.09),u=(q,z)=>{if(z<=e)return new G(q,z,h(z,q));let tt=z-e,ot=c*Math.pow(Math.min(1,tt/s),.75),ut=(Ye()?.12:.42)*Math.sin(Math.PI*Math.min(1,tt/s))*Math.sin(q/r*.8+n);return new G(q+ut,e+tt*Math.cos(ot),h(e,q)+n*tt*Math.sin(ot))},f=e-i+.45,d=Z.pose==="relaxed"?.6:.22,A=Z.pose==="relaxed"?.64:.72,_=new yi([u(-r,f),u(-r,e-.3),u(-r-d,e+.3*s),u(-r*A,e+(Ye()?.84:.8)*s),u(-r*.19+n*.35,e+s*(n>0?.99:.965)),u(r*.15+n*.35,e+s*(n>0?1:.975)),u(r*A,e+.84*s),u(r+d,e+.3*s),u(r,e-.3),u(r,f)],!1,"centripetal"),p=gn?100:200,g=_.getSpacedPoints(p),w=gn?10:20,M=new G(0,-Math.sin(c),n*Math.cos(c)),y=[];for(let q=0;q<=w;q++){let z=Math.PI/2+q/w*Math.PI*2,tt=Math.cos(z),ot=Math.sin(z);y.push([Math.sign(tt)*Math.abs(tt)**.35,Math.sign(ot)*Math.abs(ot)**.7])}let C=[],b=[],S=[],E=[],T=[],m=new G,v=new G,R=new G,L=new G,I=new G,k=0;for(let q=0;q<=p;q++){let z=g[q];m.subVectors(g[Math.min(p,q+1)],g[Math.max(0,q-1)]).normalize(),q>0&&(k+=z.distanceTo(g[q-1])),v.crossVectors(M,m).normalize(),R.copy(M).addScaledVector(m,-M.dot(m)).normalize();let tt=z.y>e?Math.hypot(z.y-e,z.z-h(e)):0,ot=(Ye()?.035:.32)*Math.sin(tt*.26+n*1.7)*Ie(.08,.45,tt/s);L.copy(v).multiplyScalar(Math.cos(ot)).addScaledVector(R,Math.sin(ot)),I.crossVectors(m,L).normalize();let ut=Ie(e,e+2,z.y);for(let[Et,J]of y){let H=(a?.045:.025)*ut*(1-Et*Et)*Math.sin(Math.PI*q/p),U=J*l+H;C.push((z.x+L.x*Et*o/2+I.x*U)*ge,(z.y+L.y*Et*o/2+I.y*U)*ge,(z.z+L.z*Et*o/2+I.z*U)*ge),S.push(k,(Et+1)/2),E.push(k/Zs,(Et*o/2+(J<0?o:0))/Zs)}if(q<p)for(let Et=0;Et<w;Et++){let J=q*(w+1)+Et,H=J+w+1;T.push(J,H,J+1,J+1,H,H+1)}}let B=new ue;return B.setAttribute("position",new me(C,3)),B.setAttribute("uv",new me(S,2)),B.setAttribute("uv1",new me(E,2)),B.setIndex(T),B.computeVertexNormals(),B}function Xv(){let{W:n,H:t,D:e}=Z,i=ne[Z.type],s=t-.02,{d:r,s:a}=ai(s),o=i.gusset==="side"&&e>=.5,l=[[],[]];for(let c=0;c<=60;c++){let h=-n/2+n*c/60;l[0].push([h,s,Qs(h,s,1)]),l[1].push([h,s,-Qs(h,s,2)])}if(o)for(let c of[1,-1])for(let h of[1,-1]){let u=[];for(let f=0;f<=8;f++){let d=f/8;u.push([c*(n/2-a*d),s,h*r*(1-d)])}l.push(u)}return qa(l.map(c=>{let h=new yi(c.map(([u,f,d])=>new G(u*ge,f*ge,d*ge)),!1,"centripetal");return new Bs(h,c.length*2,.065*ge,6,!1)}))}function Yv(n){let{W:t,H:e,hem:i}=Z,s=n*(t/2-1.6),r=1.6,a=-(Qs(s,r,2)+.25),o=[[n*(t/2-.2),e-i/2,0],[n*(t/2+.9),e-i/2-1.4,-.3],[n*(t/2+1.9),e*.62,Ye()?-.25:-1.2],[n*(t/2+1.5),e*.3,Ye()?-.3:-1.9],[n*(t/2-.3),2.4,a-(Ye()?.2:.7)],[s,r,a]].map(([A,_,p])=>new G(A*ge,_*ge,p*ge)),l=new yi(o,!1,"centripetal"),c=new Bs(l,180,.12*ge,10,!1),h=c.getAttribute("uv"),u=l.getLength()/ge;for(let A=0;A<h.count;A++)h.setX(A,h.getX(A)*u);let f=new yi([[0,0,.15],[-.2,.25,0],[.18,.1,-.12],[.17,-.2,.1],[-.15,-.26,.12],[-.2,.08,-.08],[.08,.3,0],[.1,-.48,.12]].map(([A,_,p])=>new G((s+A)*ge,(r+_)*ge,(a-.15+p)*ge))),d=new Bs(f,32,.115*ge,8,!1);return qa([c.toNonIndexed(),d.toNonIndexed()])}function Ld(n,t,e,i){let s=document.createElement("canvas");s.width=t,s.height=e;let r=s.getContext("2d"),a=r.createImageData(t,e);for(let o=0;o<e;o++)for(let l=0;l<t;l++){let c=(n[o*t+(l+1)%t]-n[o*t+(l-1+t)%t])*i,h=(n[(o+1)%e*t+l]-n[(o-1+e)%e*t+l])*i,u=Math.hypot(c,h,1),f=(o*t+l)*4;a.data[f]=(-c/u*.5+.5)*255,a.data[f+1]=(h/u*.5+.5)*255,a.data[f+2]=(1/u*.5+.5)*255,a.data[f+3]=255}return r.putImageData(a,0,0),s}function Kv(){let t=new Float32Array(65536),e=7,i=8,s=256/e,r=256/i,a=s*.26,o=a;for(let f=0;f<256;f++)for(let d=0;d<256;d++){let A=0;for(let _=-1;_<=i;_++){let p=(_+.5)*r,g=_&1?s/2:0;if(!(Math.abs(f-p)>r))for(let w=-1;w<=e;w++){let M=(w+.5)*s+g,y=(d-M)/a,C=(f-p)/o;A-=Math.exp(-(y*y+C*C))}}t[f*256+d]=A+.12*Math.sin(d*1.73+f*2.31)*Math.sin(f*.81-d*.37)}let l=document.createElement("canvas");l.width=l.height=256;let c=l.getContext("2d"),h=c.createImageData(256,256);for(let f=0;f<t.length;f++){let d=255-18*Math.min(1,Math.max(0,-t[f]));h.data[f*4]=h.data[f*4+1]=h.data[f*4+2]=d,h.data[f*4+3]=255}c.putImageData(h,0,0);let u=new pn(Ld(t,256,256,1.6));return u.userData.emboss=l,u.wrapS=u.wrapT=fn,u.channel=1,u.anisotropy=8,u}function jv(){let e=new Float32Array(10240),i=document.createElement("canvas");i.width=64,i.height=160;let s=i.getContext("2d"),r=s.createImageData(64,160);for(let l=0;l<160;l++)for(let c=0;c<64;c++){let h=l<9||l>150,u=l<160/2?1:-1,f=h?.5+.5*Math.sin(2*Math.PI*c/64*12):.5+.5*Math.sin(2*Math.PI*(c/64*7+u*l/160*14));e[l*64+c]=f+(Math.random()-.5)*.15;let d=(.92+.08*f)*255,A=(l*64+c)*4;r.data[A]=r.data[A+1]=r.data[A+2]=d,r.data[A+3]=255}s.putImageData(r,0,0);let a=new pn(i);a.colorSpace=Ze;let o=new pn(Ld(e,64,160,1.2));for(let l of[a,o])l.wrapS=fn,l.wrapT=$n,l.anisotropy=8;return{map:a,nm:o}}function Zv(){let t=document.createElement("canvas");t.width=t.height=512;let e=t.getContext("2d");e.fillStyle="#808080",e.fillRect(0,0,512,512),e.lineWidth=1,e.lineCap="round";for(let i=0;i<9e3;i++){let s=Math.random()*512,r=Math.random()*512,a=Math.random()*Math.PI*2,o=6+Math.random()*26,l=(Math.random()-.5)*.9;e.strokeStyle=Math.random()<.5?"rgba(255,255,255,0.10)":"rgba(0,0,0,0.10)",e.beginPath();for(let c of[-512,0,512])for(let h of[-512,0,512])e.moveTo(s+c,r+h),e.quadraticCurveTo(s+c+Math.cos(a+l)*o/2,r+h+Math.sin(a+l)*o/2,s+c+Math.cos(a)*o,r+h+Math.sin(a)*o);e.stroke()}return t}function Qv(){let t=document.createElement("canvas");t.width=t.height=256;let e=t.getContext("2d"),i=e.createImageData(256,256);for(let s=0;s<256;s++)for(let r=0;r<256;r++){let a=128+70*(Si(r/16,s/16,11)*.5+Si(r/4,s/4,5)*.5),o=(s*256+r)*4;i.data[o]=i.data[o+1]=i.data[o+2]=a,i.data[o+3]=255}return e.putImageData(i,0,0),t}var Xs=document.createElement("canvas"),ts=new pn(Xs);ts.colorSpace=Ze;ts.anisotropy=qt.capabilities.getMaxAnisotropy();var vd=Qv();function Jv(n){let t=new Ot(n),e=.2126*t.r+.7152*t.g+.0722*t.b,i=e<.08?1.7:.78,s=Math.min(1,t.r*i+(e<.08?.03:0)),r=Math.min(1,t.g*i+(e<.08?.03:0)),a=Math.min(1,t.b*i+(e<.08?.03:0));return`rgb(${s*255|0},${r*255|0},${a*255|0})`}function Ue(n,t,e,i,s,r){let a=Math.hypot(s-e,r-i),o=(s-e)/a,l=(r-i)/a,c=-l,h=o,u=.19,f=.3;n.beginPath();for(let A=u/2;A<a;A+=u){let _=e+o*A,p=i+l*A;n.moveTo((_-c*f/2)*t,(p-h*f/2)*t),n.lineTo((_+c*f/2)*t,(p+h*f/2)*t)}n.lineWidth=.055*t,n.stroke();let d=n.globalAlpha;n.globalAlpha=d*.35,n.beginPath(),n.moveTo(e*t,i*t),n.lineTo(s*t,r*t),n.lineWidth=.03*t,n.stroke(),n.globalAlpha=d}function $v(n,t,e,i,s){let r=s/2,a=s*.16;n.lineWidth=.05*t,n.beginPath();for(let l=0;l<6;l++){let c=-r*.6+l*(s*.6/5);for(let[h,u,f,d]of[[c,-r,0,1],[c,r,0,-1],[-r,c,1,0],[r,c,-1,0]])n.moveTo((e+h)*t,(i+u)*t),n.lineTo((e+h+f*a)*t,(i+u+d*a)*t)}for(let[l,c]of[[-1,-1],[1,-1],[-1,1],[1,1]])n.moveTo((e+l*r)*t,(i+c*r)*t),n.lineTo((e+l*r*.72)*t,(i+c*r*.72)*t);n.stroke();let o=s*.24;n.beginPath(),n.arc(e*t,i*t,o*t,0,Math.PI*2),n.lineWidth=.04*t,n.stroke(),n.beginPath();for(let l=0;l<5;l++){let c=l*Math.PI*2/5-Math.PI/2;n.ellipse((e+Math.cos(c)*o*.45)*t,(i+Math.sin(c)*o*.45)*t,o*.42*t,o*.2*t,c,0,Math.PI*2)}n.lineWidth=.03*t,n.stroke()}var Kt={front:[],back:[]},Nt="front",on=null,oi=1,Ci=new Map,Ei={},Ti=new Map,xd=new WeakMap;function yd(n,t){let e=xd.get(n);if(e||xd.set(n,e=new Map),!e.has(t)){let i=document.createElement("canvas");i.width=n.width,i.height=n.height;let s=i.getContext("2d");s.fillStyle=t,s.fillRect(0,0,i.width,i.height),s.globalCompositeOperation="destination-in",s.drawImage(n,0,0),e.set(t,i)}return e.get(t)}function tx(n){let t=`t|${n.style}|${n.track||0}|${n.text}`;if(Ti.has(t))return Ti.get(t);let[e,i]=nh[n.style]||nh["sans-800"],s=160,r=(n.track||0)*s,a=i>=800?900:i>=500?800:700,o=(n.text||" ").split(`
`).map(_=>_.split("**").map((p,g)=>[p,g%2?a:i]).filter(([p])=>p)),l=document.createElement("canvas"),c=l.getContext("2d"),h=_=>{c.font=`${_} ${s}px "${e}", "Helvetica Neue", Arial, sans-serif`,"letterSpacing"in c&&(c.letterSpacing=r+"px")},u=_=>_.reduce((p,[g,w])=>(h(w),p+c.measureText(g).width),0)||s*.3,f=o.map(u),d=s*1.12,A=s*.14;return l.width=Math.ceil(Math.max(...f)+A*2),l.height=Math.ceil(o.length*d+A),c.fillStyle="#fff",c.textBaseline="middle",o.forEach((_,p)=>{let g=(l.width-f[p])/2+r/2;for(let[w,M]of _)h(M),c.fillText(w,g,A/2+d*(p+.5)),g+=c.measureText(w).width}),Ti.set(t,l),l}function ex(n){let t="q|"+n;if(Ti.has(t))return Ti.get(t);if(!window.qrcode)return null;let e=window.qrcode(0,"M");e.addData(n||" "),e.make();let i=e.getModuleCount(),s=2,r=16,a=document.createElement("canvas");a.width=a.height=(i+s*2)*r;let o=a.getContext("2d");o.fillStyle="#fff";for(let l=0;l<i;l++)for(let c=0;c<i;c++)e.isDark(l,c)&&o.fillRect((c+s)*r,(l+s)*r,r,r);return Ti.set(t,a),a}function Nd(n){return n.kind==="text"?tx(n):n.kind==="qr"?ex(n.data):n.kind==="logo"?Ci.get(n.asset)?.mask||null:Ei[n.graphic]||null}function Ri(n){let t=Nd(n);return[n.w,t?n.w*t.height/t.width:n.w*.4]}var Ks=n=>n.kind==="qr"?3:1;function nx(){let n=ne[Z.type];if(n.handles==="tshirt")return Z.H-wn().yb+1;if(n.handles==="dcut"){let t=io();return t.top+t.h+t.pad+.6}return Z.hem}function er(){let{W:n,H:t}=Z,e=ne[Z.type].handles==="tshirt"?2:1.2;return{x0:1,x1:n-1,y0:nx()+.4,y1:t-e}}function ze(n){let t=er(),[e,i]=Ri(n),s=Math.min(1,(t.x1-t.x0)/e,(t.y1-t.y0)/i);s<1&&(n.w*=s,e*=s,i*=s),n.x=Math.min(Math.max(n.x,t.x0+e/2),t.x1-e/2),n.y=Math.min(Math.max(n.y,t.y0+i/2),t.y1-i/2)}var ix=(()=>{let t=document.createElement("canvas");t.width=t.height=128;let e=t.getContext("2d"),i=128/7,s=128/8;for(let r=-1;r<=8;r++)for(let a=-1;a<=7;a++){let o=(a+.5)*i+(r&1?i/2:0),l=(r+.5)*s,c=e.createRadialGradient(o,l,0,o,l,i*.32);c.addColorStop(0,"rgba(0,0,0,1)"),c.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=c,e.fillRect(o-i,l-s,i*2,s*2)}return t})(),sx=(()=>{let t=document.createElement("canvas");t.width=t.height=256;let e=t.getContext("2d"),i=e.createImageData(256,256);for(let s=0;s<256;s++)for(let r=0;r<256;r++){let a=Si(r/9,s/9,31)*.55+Si(r/3,s/3,37)*.45,o=(s*256+r)*4;i.data[o+3]=Math.max(0,Math.min(255,(a*.5+.5)**2.2*255))}return e.putImageData(i,0,0),t})(),Ws=document.createElement("canvas");function _d(n,t,e,i,s){if(!s.length)return;Ws.width=Math.ceil(Z.W*t),Ws.height=Math.ceil(Z.H*t);let r=Ws.getContext("2d");Ur(r,t,0,0,s),r.save(),r.globalCompositeOperation="destination-out";for(let[a,o,l]of[[ix,Zs,.32],[sx,6,.22]]){let c=r.createPattern(a,"repeat");c.setTransform(new DOMMatrix().translate(-e*t,-i*t).scale(o*t/a.width)),r.globalAlpha=l,r.fillStyle=c,r.fillRect(0,0,Ws.width,Ws.height)}r.restore(),n.drawImage(Ws,e*t,i*t)}function Ur(n,t,e,i,s,r=null){let a=n.globalAlpha;for(let o of s){let l=Nd(o);if(!l)continue;let[c,h]=Ri(o),u=r?yd(l,r):null,f=1;u||(o.kind==="logo"&&o.method==="full"?u=Ci.get(o.asset).color:(u=yd(l,o.ink),f=.9)),n.save(),n.globalAlpha=a*f,n.drawImage(u,(e+o.x-c/2)*t,(i+o.y-h/2)*t,c*t,h*t),n.restore()}}var no=document.createElement("canvas"),bi=document.createElement("canvas"),Ys=document.createElement("canvas"),so=new pn(no),ro=new pn(bi),Pi=new pn(Ys),rx=Zv(),ax="#bd9665",ox=(()=>{let t=document.createElement("canvas");t.width=t.height=512;let e=t.getContext("2d");e.fillStyle="#fff",e.fillRect(0,0,512,512);for(let i=0;i<2600;i++){let s=Math.random()*512,r=Math.random()*512,a=.4+Math.random()**3*2.2,o=120+Math.random()*90;e.fillStyle=`rgba(${o*.75|0},${o*.55|0},${o*.35|0},${.35+Math.random()*.5})`;for(let l of[-512,0,512])for(let c of[-512,0,512])e.beginPath(),e.ellipse(s+l,r+c,a,a*(.4+Math.random()*.6),Math.random()*3,0,Math.PI*2),e.fill()}e.lineWidth=.8,e.strokeStyle="rgba(120,80,45,0.25)";for(let i=0;i<700;i++){let s=Math.random()*512,r=Math.random()*512,a=Math.random()*6.3,o=6+Math.random()*18;e.beginPath(),e.moveTo(s,r),e.lineTo(s+Math.cos(a)*o,r+Math.sin(a)*o),e.stroke()}return t})();function Qc(n,t){let{W:e,H:i,D:s,hem:r}=Z,a=ne[Z.type],o=go(),l=Math.min(2.2,r*.72);for(let c of[Bt.front,Bt.back]){let[h,u]=c;if(r>0&&Ue(n,t,h,u+r,h+e,u+r),a.handles==="loop")for(let f of[-1,1])$v(n,t,h+e/2+f*o,u+r*.52,l);if(a.gusset==="bottom"&&(Ue(n,t,h+.5,u,h+.5,u+i),Ue(n,t,h+e-.5,u,h+e-.5,u+i)),a.handles==="tshirt"){let f=wn();Ue(n,t,h,u+i-1.1,h+e,u+i-1.1),Ue(n,t,h,u+.9,h+f.hw,u+.9),Ue(n,t,h+e-f.hw,u+.9,h+e,u+.9)}}if(s>=.5)for(let c of[Bt.left,Bt.right]){let[h,u]=c;if(a.gusset==="side"&&a.handles==="tshirt")Ue(n,t,h,u+.9,h+s,u+.9),Ue(n,t,h,u+i-1.1,h+s,u+i-1.1);else if(a.gusset==="side"){let f=u+i-Math.min(s/2,i*.45);r>0&&Ue(n,t,h,u+r,h+s,u+r),Ue(n,t,h+.15,u+r,h+.15,u+i),Ue(n,t,h+s-.15,u+r,h+s-.15,u+i),Ue(n,t,h,f,h+s,f),Ue(n,t,h+s/2,f,h,u+i),Ue(n,t,h+s/2,f,h+s,u+i)}else{let f=Math.min(i*.5,Math.max(s*1.25,2));Ue(n,t,h+s/2,u+i-f,h+s/2,u+i)}}if(s>=.5&&a.handles!=="tshirt"){let[c,h]=Bt.bottom;Ue(n,t,c+.4,h,c+.4,h+s),Ue(n,t,c+e-.4,h,c+e-.4,h+s)}if(a.handles==="string"){let[c,h]=Bt.back,u=Math.min(4,e*.15);for(let[f,d]of[[c,1],[c+e,-1]])Ue(n,t,f,h+i-u,f+d*u,h+i),n.beginPath(),n.arc((f+d*1.6)*t,(h+i-1.6)*t,.4*t,0,Math.PI*2),n.stroke()}}function Od(n,t,e,i){let s=ne[Z.type],{W:r,H:a}=Z;if(n.beginPath(),s.handles==="dcut"){let o=io();n.roundRect((e+r/2-o.w/2)*t,(i+o.top)*t,o.w*t,o.h*t,o.h/2*t)}if(s.handles==="tshirt"){let o=wn(),l=e+r/2,c=i+a-o.yb,h=o.c*.9,u=Math.min(2.4,a*.06),f=Math.min(h/2,u)*.92,d=.35,A=(_,p)=>[_*t,p*t];n.moveTo(...A(l-o.c,i-1)),n.arcTo(...A(l-o.c,c),...A(l-h/2,c),o.r*t),n.arcTo(...A(l-h/2,c),...A(l-h/2,c-u),d*t),n.arcTo(...A(l-h/2,c-u),...A(l,c-u),f*t),n.arcTo(...A(l+h/2,c-u),...A(l+h/2,c),f*t),n.arcTo(...A(l+h/2,c),...A(l+o.c,c),d*t),n.arcTo(...A(l+o.c,c),...A(l+o.c,i-1),o.r*t),n.lineTo(...A(l+o.c,i-1)),n.closePath()}}function lx(n,t){n.fillStyle="#000";for(let e of[Bt.front,Bt.back])Od(n,t,e[0],e[1]),n.fill()}var Md=40,bd="";function Ii(){Bt=xh(),Md=Math.min(40,4e3/Bt.AW,4e3/Bt.AH);let n=Md,t=Math.round(Bt.AW*n),e=Math.round(Bt.AH*n),{W:i,hem:s}=Z;if(Xs.width!==t||Xs.height!==e)for(let d of[ts,so,ro,Pi])d.dispose();Xs.width=t,Xs.height=e;let r=Xs.getContext("2d");r.fillStyle=Z.bag,r.fillRect(0,0,t,e);let a=(d,A,_,p)=>{let g=r.createPattern(d,"repeat");g.setTransform(new DOMMatrix().scale(A)),r.save(),r.globalCompositeOperation=_,r.globalAlpha=p,r.fillStyle=g,r.fillRect(0,0,t,e),r.restore()};if(a(vd,n/40,"soft-light",.08),a(Ao.userData.emboss,n*Zs/256,"multiply",.55),a(rx,n/40,"soft-light",.72),Z.bag===ax&&(a(ox,n/40,"multiply",.3),a(vd,n/90,"soft-light",.22)),ne[Z.type].handles==="dcut"){let d=io();r.save(),r.fillStyle="rgba(0,0,0,0.025)";for(let A of[Bt.front,Bt.back])r.fillRect((A[0]+i/2-d.w/2-d.pad)*n,(A[1]+d.top-d.pad)*n,(d.w+2*d.pad)*n,(d.h+2*d.pad)*n);r.restore()}let o=new Ot(Z.bag).getHSL({}).l,l=o>.75?.3:o>.45?.14:.05;if(ne[Z.type].handles==="loop"&&Z.handle!=="match"&&l>.1){let d=go(),A=2.5;r.save(),r.fillStyle=Z.handle,r.globalAlpha=l*1.25;for(let _ of[Bt.front,Bt.back])for(let p of[-1,1])r.fillRect((_[0]+i/2+p*d-A/2)*n,_[1]*n,A*n,(s-.45)*n);r.restore()}r.save(),r.strokeStyle=Jv(Z.bag),r.lineCap="butt",r.globalAlpha=.6,Qc(r,n),r.restore(),_d(r,n,Bt.front[0],Bt.front[1],Kt.front),_d(r,n,Bt.back[0],Bt.back[1],Kt.back),ts.needsUpdate=!0;let c=JSON.stringify([t,e,Z]),h=bd!==c;if(bd=c,h){no.width=t,no.height=e;let d=no.getContext("2d");d.fillStyle="#808080",d.fillRect(0,0,t,e),d.fillStyle="#8c8c8c";for(let A of[Bt.front,Bt.back])d.fillRect(A[0]*n,A[1]*n,i*n,s*n);for(let A of[Bt.left,Bt.right])d.fillRect(A[0]*n,A[1]*n,Z.D*n,s*n);if(ne[Z.type].handles==="dcut"){let A=io();for(let _ of[Bt.front,Bt.back])d.fillRect((_[0]+i/2-A.w/2-A.pad)*n,(_[1]+A.top-A.pad)*n,(A.w+2*A.pad)*n,(A.h+2*A.pad)*n)}d.strokeStyle="#3c3c3c",d.lineCap="butt",Qc(d,n),so.needsUpdate=!0}let u=.5;bi.width=Math.round(t*u),bi.height=Math.round(e*u);let f=bi.getContext("2d");if(f.fillStyle="rgb(239,239,239)",f.fillRect(0,0,bi.width,bi.height),f.strokeStyle="rgb(209,209,209)",f.lineCap="butt",Qc(f,n*u),Ur(f,n*u,Bt.front[0],Bt.front[1],Kt.front,"#d4d4d4"),Ur(f,n*u,Bt.back[0],Bt.back[1],Kt.back,"#d4d4d4"),ro.needsUpdate=!0,h){Ys.width=bi.width,Ys.height=bi.height;let d=Ys.getContext("2d");d.fillStyle="#fff",d.fillRect(0,0,Ys.width,Ys.height),lx(d,n*u),Pi.needsUpdate=!0}kd.value=l>.2?Z.type==="tshirt"?.46:.39:l,is.transmission=l>.2?Z.type==="tshirt"?.3:.23:l>.1?.07:.012,Bd.value=l>.2?.46:l>.1?.24:.07,Nr.emissive.set(Z.bag).multiplyScalar(l*.38),Sn=!0}var Ao=Kv(),ao=jv(),Bd={value:.3};function Fd(n){n.uniforms.backLight=Bd,n.fragmentShader=n.fragmentShader.replace("#include <lights_physical_pars_fragment>",`#include <lights_physical_pars_fragment>
uniform float backLight;
void RE_Direct_Thin( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir,
    const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
  RE_Direct_Physical( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
  float through = saturate( dot( - geometryNormal, directLight.direction ) );
  reflectedLight.directDiffuse += through * directLight.color * material.diffuseColor * backLight;
}
#undef RE_Direct
#define RE_Direct RE_Direct_Thin`)}var is=new ri({map:ts,normalMap:Ao,normalScale:new At(.6,.6),bumpMap:so,bumpScale:.0012,roughnessMap:ro,roughness:1,alphaMap:Pi,alphaTest:.5,sheen:.18,sheenRoughness:.6,sheenColor:16777215,side:zn,transmission:.1,thickness:0});is.onBeforeCompile=n=>{Fd(n),n.fragmentShader=n.fragmentShader.replace("#include <transmission_fragment>",`#ifdef USE_TRANSMISSION
material.transmission *= clamp(dot(diffuseColor.rgb, vec3(0.2126, 0.7152, 0.0722)) * 1.4, 0.08, 1.0);
#endif
`+Gt.transmission_fragment.replace("n, v, material.roughness, material.diffuseColor","n, v, material.roughness * 0.78, material.diffuseColor")),n.fragmentShader=n.fragmentShader.replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
#if defined( USE_BUMPMAP ) && defined( USE_NORMALMAP_TANGENTSPACE )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`)};var cx=is.onBeforeCompile;is.onBeforeCompile=n=>{cx(n),n.fragmentShader=n.fragmentShader.replace("#include <opaque_fragment>",`#include <opaque_fragment>
gl_FragColor.a = 1.0;`)};is.customProgramCacheKey=()=>"bag-outer-bump-white-coverage";var kd={value:.05},Nr=new ri({color:16777215,vertexColors:!0,map:ts,normalMap:Ao,normalScale:new At(.56,.56),alphaMap:Pi,alphaTest:.5,roughness:.9,sheen:.3,sheenRoughness:.6,side:ke});Nr.onBeforeCompile=n=>{Fd(n),n.uniforms.showThrough=kd,n.fragmentShader=`uniform float showThrough;
`+n.fragmentShader.replace("#include <map_fragment>",`#ifdef USE_MAP
	diffuseColor.rgb = mix( diffuseColor.rgb, texture2D( map, vMapUv ).rgb * 0.92, showThrough );
#endif`)};Nr.customProgramCacheKey=()=>"bag-inner-through";var hx=(()=>{let t=document.createElement("canvas");t.width=t.height=256;let e=t.getContext("2d"),i=e.createImageData(256,256);for(let r=0;r<256;r++)for(let a=0;a<256;a++){let o=251+3*Si(a*.7,r*.16,91)+1.5*Math.sin(a*1.7+r*.6),l=(r*256+a)*4;i.data[l]=i.data[l+1]=i.data[l+2]=o,i.data[l+3]=255}e.putImageData(i,0,0);let s=new pn(t);return s.colorSpace=Ze,s.wrapS=s.wrapT=fn,s.channel=1,s.anisotropy=Math.min(8,qt.capabilities.getMaxAnisotropy()),s})(),oo=new ri({map:ao.map,normalMap:ao.nm,normalScale:new At(.4,.4),roughness:.88,sheen:.22,sheenRoughness:.55,sheenColor:9079434,side:Je}),wd=new ri({map:hx,normalMap:Ao,normalScale:new At(.52,.52),roughness:.94,sheen:.2,sheenRoughness:.65,side:Je}),sh=new ri({map:ao.map,normalMap:ao.nm,normalScale:new At(1.2,1.2),roughness:.7,sheen:.5,sheenRoughness:.4}),Fn=new ni;Ne.add(Fn);Fn.position.y=4e-4;var vn=new le(new ue,is),vo=new le(new ue,Nr),Or=[new le(new ue,oo),new le(new ue,oo)],xo=[new le(new ue,sh),new le(new ue,sh)],rh=new ri({roughness:.82,sheen:.35,sheenRoughness:.5}),js=new le(new ue,rh);vn.castShadow=vn.receiveShadow=!0;vo.receiveShadow=!0;vn.customDepthMaterial=new xr({depthPacking:kc,alphaMap:Pi,alphaTest:.5});for(let n of[...Or,...xo])n.castShadow=n.receiveShadow=!0;Fn.add(vn,vo,js,...Or,...xo);function ss(){Nr.color.set(Z.bag).multiplyScalar(.92),rh.color.set(Z.bag),rh.sheenColor.set(Z.bag).lerp(new Ot(16777215),.2),is.sheenColor.set(Z.bag).lerp(new Ot(16777215),.2);let n=Z.handle==="match"?Z.bag:Z.handle;oo.color.set(n),wd.color.set(n),sh.color.set(n),Or.forEach(t=>{t.material=Z.strap==="webbing"?oo:wd}),document.documentElement.style.setProperty("--bagc",Z.bag),Sn=!0}function qn(){Bt=xh();let n=Wv();vn.geometry.dispose(),vn.geometry=n,vo.geometry=n;let t=ne[Z.type];Or.forEach((e,i)=>{e.visible=t.handles==="loop",e.geometry.dispose(),e.geometry=e.visible?qv(i===0?1:-1):new ue}),js.visible=ne[Z.type].handles!=="tshirt",js.geometry.dispose(),js.geometry=js.visible?Xv():new ue,xo.forEach((e,i)=>{e.visible=t.handles==="string",e.geometry.dispose(),e.geometry=e.visible?Yv(i===0?-1:1):new ue}),Ud.scale.set(Z.W*ge/.69*1.04,(Ye()?Z.type==="tshirt"?2:.9:Math.max(Z.D,2))*ge/.69*1.1,1),Ii(),document.getElementById("dimsHud").textContent=`${An(Z.W)} \xD7 ${An(Z.H)} \xD7 ${An(Z.D)} cm`}var An=n=>(Math.round(n*10)/10).toString(),ah={34:{dir:[.62,.3,.73],ty:.5},front:{dir:[0,.12,1],ty:.5},side:{dir:[1,.12,.02],ty:.5},top:{dir:[.08,1.5,.62],ty:.55},back:{dir:[-.62,.3,-.73],ty:.5}},qe=null;function oh(n){let t=ah[n],e=Z.H+(ne[Z.type].handles==="loop"?Z.drop*.7:0),i=Math.max(e,Z.W*1.1)*ge,s=new G(0,(n==="top"?Z.H*t.ty:e*t.ty)*ge,0),r=i/(2*Math.tan(wr.degToRad(jt.fov/2)))*(jt.aspect<1?1.35/jt.aspect:1.35);return{pos:new G(...t.dir).normalize().multiplyScalar(r).add(s),target:s}}function Xe(n,t=!0){document.querySelectorAll("#views button").forEach(i=>i.classList.toggle("on",i.dataset.view===n));let e=oh(n);if(!t||matchMedia("(prefers-reduced-motion: reduce)").matches){jt.position.copy(e.pos),ee.target.copy(e.target),qe=null;return}qe={t0:performance.now(),p0:jt.position.clone(),q0:ee.target.clone(),to:e}}document.getElementById("views").addEventListener("click",n=>{let t=n.target.closest("button");t&&Xe(t.dataset.view)});ee.addEventListener("start",()=>{qe=null,document.querySelectorAll("#views button").forEach(n=>n.classList.remove("on"))});function zd(n,t,e,i){let s=document.getElementById(n),r=document.createElement("span");r.className="swname";let a=()=>{s.querySelectorAll(".sw").forEach(l=>l.classList.toggle("on",l.dataset.v===Z[e]));let o=t.find(([,l])=>l===Z[e]);r.textContent=o?o[0]:Z[e]};for(let[o,l]of t){let c=document.createElement("button");c.className="sw",c.dataset.v=l,c.title=o,c.setAttribute("aria-label",o),l!=="match"&&(c.style.background=l),c.onclick=()=>{Z[e]=l,a(),i()},s.appendChild(c)}return s.appendChild(r),a(),a}var yo=zd("handleSw",zv,"handle",()=>{ss(),Ii(),rs()}),Hd=zd("bagSw",Id,"bag",()=>{ss(),yo(),Ii(),Oe(),de(),rs()}),Vd={};function ux(n,t,e,i){let s=document.getElementById(n),r=document.getElementById("o-"+n),a=()=>{r.textContent=e(+s.value)};s.value=Z[t],a(),Vd[t]=()=>{s.value=Z[t],a()},s.addEventListener("input",()=>{Z[t]=+s.value,a(),i()})}var Gd=()=>Object.values(Vd).forEach(n=>n()),dx=n=>An(n)+" cm";ux("drop","drop",dx,qn);function xn(n){document.querySelectorAll("#tabs button").forEach(t=>{let e=t.dataset.tab===n;t.classList.toggle("on",e),t.setAttribute("aria-selected",e)}),document.querySelectorAll(".pane").forEach(t=>{t.hidden=t.dataset.pane!==n}),document.getElementById("panes").scrollTop=0,n==="design"&&Oe()}document.getElementById("tabs").addEventListener("click",n=>{let t=n.target.closest("button");t&&xn(t.dataset.tab)});document.querySelectorAll("[data-go]").forEach(n=>{n.onclick=()=>xn(n.dataset.go)});function yh(){document.querySelectorAll("#strapSeg button").forEach(n=>n.classList.toggle("on",n.dataset.v===Z.strap))}document.getElementById("strapSeg").addEventListener("click",n=>{let t=n.target.closest("button");t&&(Z.strap=t.dataset.v,yh(),ss(),qn(),rs())});document.getElementById("poseSeg").addEventListener("click",n=>{let t=n.target.closest("button");t&&(Z.pose=t.dataset.v,document.querySelectorAll("#poseSeg button").forEach(e=>e.classList.toggle("on",e===t)),qn())});var lh=document.getElementById("sizeSeg"),fx=document.getElementById("moq");function px(){let n=ne[Z.type];lh.querySelectorAll("button").forEach(i=>i.classList.toggle("on",i.dataset.v===Z.size));let t=n.sizes.find(i=>i[0]===Z.size),e=/\d/.test(t[4])?t[4]+" pcs":t[4];fx.innerHTML=`${An(t[1])} \xD7 ${An(t[2])} \xD7 ${An(t[3])} cm \xB7 minimum order <b>${e}</b>`,document.getElementById("sumType").textContent=`${n.name} \xB7 ${t[0]}`,document.getElementById("sumDims").textContent=`${An(t[1])} \xD7 ${An(t[2])} \xD7 ${An(t[3])} cm`,document.getElementById("sumMoq").textContent=`Minimum order ${e}`}function lo(n){let t=ne[Z.type].sizes.find(s=>s[0]===n);if(!t)return;let e=Z.W,i=Z.H;Object.assign(Z,{size:n,W:t[1],H:t[2],D:t[3]}),ne[Z.type].handles==="loop"&&(Z.drop=Math.min(30,Math.max(10,Math.round(Z.H*.46))));for(let s of["front","back"])for(let r of Kt[s])r.x*=Z.W/e,r.y*=Z.H/i,r.w*=Z.W/e,ze(r);Gd(),px(),qn(),Oe(),de(),Xe(Nt==="back"?"back":"34")}function nr(n){let t=ne[n];Z.type=n,document.querySelectorAll("#typeSeg button").forEach(s=>s.classList.toggle("on",s.dataset.v===n)),document.getElementById("typeSub").textContent=t.sub,Z.hem=t.hem,Z.full=t.fill??.2,t.handle&&(Z.handle=t.handle,yo(),ss()),lh.innerHTML="";for(let[s,r,a,o]of t.sizes){let l=document.createElement("button");l.dataset.v=s,l.textContent=s,l.title=`${s}: ${r} \xD7 ${a} \xD7 ${o} cm`,l.onclick=()=>{lo(s),rs()},lh.appendChild(l)}let e=t.handles==="loop",i=t.handles==="string";document.getElementById("handlesSec").hidden=!(e||i),document.getElementById("handlesTitle").textContent=i?"Cords":"Handles",document.getElementById("poseSeg").hidden=!e,document.getElementById("dropRow").hidden=!e,lo(t.sizes.some(s=>s[0]===Z.size)?Z.size:t.sizes[0][0])}document.getElementById("typeSeg").addEventListener("click",n=>{let t=n.target.closest("button");t&&(nr(t.dataset.v),rs())});var ch=document.getElementById("envRot"),hh=document.getElementById("expo");function _h(){let n=+ch.value*Math.PI/180;Ne.environmentRotation.y=n,Le.position.set(Math.sin(n-Math.PI/4)*1.25,1,Math.cos(n-Math.PI/4)*1.25),qt.toneMappingExposure=+hh.value,document.getElementById("o-envRot").textContent=ch.value+"\xB0",document.getElementById("o-expo").textContent=(+hh.value).toFixed(2),Sn=!0}ch.oninput=_h;hh.oninput=_h;_h();function co(n){return new Promise((t,e)=>{let i=new Image;i.onload=()=>t(i),i.onerror=e,i.src=n})}function mx(n,t){let e=Math.min(1,2400/Math.max(n.width,n.height)),i=Math.max(1,Math.round(n.width*e)),s=Math.max(1,Math.round(n.height*e)),r=document.createElement("canvas");r.width=i,r.height=s;let a=r.getContext("2d");a.drawImage(n,0,0,i,s);let o=a.getImageData(0,0,i,s),l=o.data,c=0,h=new Float32Array(i*s);for(let A=0;A<i*s;A++)l[A*4+3]<250&&c++,h[A]=.2126*l[A*4]+.7152*l[A*4+1]+.0722*l[A*4+2];let u=document.createElement("canvas");u.width=i,u.height=s;let f=u.getContext("2d"),d=f.createImageData(i,s);if(c>i*s*.02)for(let A=0;A<i*s;A++)d.data[A*4+3]=l[A*4+3];else{let A=Float32Array.from(h).sort(),_=A[Math.floor(A.length*.5)],p=_>127,g=p?A[Math.floor(A.length*.02)]:A[Math.floor(A.length*.98)],w=(_+g)/2;for(let M=0;M<i*s;M++){let y=Math.min(1,Math.max(0,(p?w-h[M]:h[M]-w)/40+.5));d.data[M*4+3]=y*255,l[M*4+3]=y*255}a.putImageData(o,0,0)}return f.putImageData(d,0,0),{mask:u,color:r,name:t}}var We=(n,t)=>[{text:"ENHANCE",style:"sans-600",track:.05,fx:.5,fy:.35,fw:.58,ink:n},{kind:"graphic",graphic:"your",fx:.5,fy:.452,fw:.38,ink:n},{text:"BRAND",style:"sans-800",track:.02,fx:.5,fy:.565,fw:.64,ink:n},{text:"WITH **KOBAGS**",style:"sans-500",track:.04,fx:.5,fy:.66,fw:.4,ink:n},{text:"www.kobags-group.com",style:"sans-500",track:.02,fx:.5,fy:.712,fw:.28,ink:t}],Jc=(n,t)=>[{text:"PUT YOUR",style:"sans-800",fx:.5,fy:.36,fw:.42,ink:n},{text:"BRAND",style:"sans-900",fx:.5,fy:.475,fw:.6,ink:t},{text:"IN THEIR HAND.",style:"sans-800",fx:.5,fy:.585,fw:.5,ink:n},{text:"\u2014\u2014\u2014  CONTACT US  \u2014\u2014\u2014",style:"sans-700",fx:.5,fy:.67,fw:.42,ink:n},{text:"www.kobags-group.com   |   Kobags   |   kobags_group",style:"sans-500",fx:.5,fy:.735,fw:.74,ink:n}],Sd=n=>n.map(t=>({...t,fy:.69+(t.fy-.53)*.74,fw:t.fw*1.05})),qs=n=>[{kind:"graphic",graphic:"heart",fx:.5,fy:.665,fw:.66,ink:n}],Pr="#d33a2c",es=[{name:"Enhance your brand",sub:"Box bag L \xB7 white",type:"box",size:"L",bag:"#efeee9",handle:"#2b4db5",ink:"#7d9c44",front:We("#7d9c44","#4a4a4c"),back:We("#7d9c44","#4a4a4c")},{name:"Black & gold",sub:"Box bag L \xB7 black",type:"box",size:"L",bag:"#1d1d20",handle:"#1b1c20",ink:"#c49a3c",front:We("#c49a3c","#c49a3c"),back:We("#c49a3c","#c49a3c")},{name:"Olive & red",sub:"Box bag M \xB7 olive",type:"box",size:"M",bag:"#a2ad48",handle:"#ec5534",strap:"webbing",ink:"#2f3b1c",front:We("#2f3b1c","#2f3b1c"),back:We("#2f3b1c","#2f3b1c")},{name:"Black \xB7 white ink",sub:"Box bag M \xB7 black",type:"box",size:"M",bag:"#1d1d20",handle:"#1b1c20",ink:"#f4f3ef",front:We("#f4f3ef","#f4f3ef"),back:We("#f4f3ef","#f4f3ef")},{name:"Grey \xB7 white ink",sub:"Box bag L \xB7 grey",type:"box",size:"L",bag:"#8c8e92",handle:"#1b1c20",ink:"#f4f3ef",front:We("#f4f3ef","#f4f3ef"),back:We("#f4f3ef","#f4f3ef")},{name:"Two-sided kraft",sub:"Box bag M \xB7 kraft",type:"box",size:"M",bag:"#bd9665",handle:"match",ink:"#e2683a",front:Jc("#3a3a3c","#e2683a"),back:We("#1a1a1a","#1a1a1a")},{name:"Saray",sub:"Box bag M \xB7 red",type:"box",size:"M",bag:"#d42a1f",handle:"#1b1c20",ink:"#7a1f18",front:[{text:"Saray",style:"serif-700",fx:.5,fy:.47,fw:.56,ink:"#7a1f18"}],back:[{text:"Saray",style:"serif-700",fx:.5,fy:.47,fw:.56,ink:"#7a1f18"}]},{name:"American Beauty Clinic",sub:"Box bag XL \xB7 white",type:"box",size:"XL",bag:"#efeee9",handle:"#1b1c20",ink:"#4a4a4c",front:[{kind:"graphic",graphic:"crescent",fx:.255,fy:.5,fw:.075,ink:"#4a4a4c"},{text:"AMERICAN",style:"serif-700",track:.04,fx:.535,fy:.49,fw:.44,ink:"#4a4a4c"},{text:"BEAUTY CLINIC",style:"sans-500",track:.25,fx:.535,fy:.56,fw:.25,ink:"#4a4a4c"}],back:[]},{name:"Papirun",sub:"Box bag M \xB7 kraft",type:"box",size:"M",bag:"#bd9665",handle:"match",ink:"#1a1a1a",front:[{kind:"graphic",graphic:"papirun",fx:.5,fy:.4,fw:.2,ink:"#1a1a1a"},{text:"PAPIRUN",style:"sans-700",track:.14,fx:.5,fy:.625,fw:.58,ink:"#1a1a1a"},{text:"\u2014\u2014\u2014  LIMITED EDITION  \u2014\u2014\u2014",style:"sans-600",track:.12,fx:.5,fy:.69,fw:.36,ink:"#1a1a1a"}],back:[]},{name:"Full-panel M",sub:"Box bag L \xB7 kraft",type:"box",size:"L",bag:"#bd9665",handle:"match",ink:"#e2683a",front:[{text:"M",style:"sans-900",fx:.5,fy:.56,fw:.86,ink:"#e2683a"}],back:[{text:"M",style:"sans-900",fx:.5,fy:.56,fw:.86,ink:"#e2683a"}]},{name:"Dina \xB7 two designs",sub:"Box bag L \xB7 kraft",type:"box",size:"L",bag:"#bd9665",handle:"match",ink:Pr,front:[{text:"Dina",style:"sans-900",fx:.5,fy:.48,fw:.88,ink:Pr},{text:"Dina-R SUPERMARKET",style:"sans-800",fx:.5,fy:.75,fw:.62,ink:Pr}],back:[{text:"Mbushur me",style:"sans-900",fx:.5,fy:.42,fw:.78,ink:"#3a3a3c"},{text:"t'mira!",style:"sans-900",fx:.5,fy:.6,fw:.56,ink:Pr},{text:"Dina-R",style:"sans-900",fx:.76,fy:.84,fw:.22,ink:Pr}]},{name:"Put your brand",sub:"D-cut L \xB7 white",type:"dcut",size:"L",bag:"#efeee9",ink:"#e2683a",front:Jc("#4a4a4c","#e2683a"),back:Jc("#4a4a4c","#e2683a")},{name:"Black D-cut",sub:"D-cut L \xB7 gold ink",type:"dcut",size:"L",bag:"#1d1d20",ink:"#c49a3c",front:We("#c49a3c","#c49a3c"),back:We("#c49a3c","#c49a3c")},{name:"ECO bottle bag",sub:"Bottle bag \xB7 kraft",type:"bottle",size:"Std",bag:"#bd9665",ink:"#4c8a3f",front:[{kind:"graphic",graphic:"eco",fx:.5,fy:.6,fw:.78,ink:"#4c8a3f"}],back:[{kind:"graphic",graphic:"eco",fx:.5,fy:.6,fw:.78,ink:"#4c8a3f"}]},{name:"Enhance \xB7 navy",sub:"T-shirt S \xB7 white",type:"tshirt",size:"S",bag:"#efeee9",ink:"#1f2b4d",front:Sd(We("#1f2b4d","#1f2b4d")),back:Sd(We("#1f2b4d","#1f2b4d"))},{name:"Thank you \xB7 orange",sub:"T-shirt S \xB7 white",type:"tshirt",size:"S",bag:"#efeee9",ink:"#e2683a",front:qs("#e2683a"),back:qs("#e2683a")},{name:"Thank you \xB7 grey",sub:"T-shirt S \xB7 white",type:"tshirt",size:"S",bag:"#efeee9",ink:"#7a7a7c",front:qs("#7a7a7c"),back:qs("#7a7a7c")},{name:"Thank you \xB7 teal",sub:"T-shirt S \xB7 white",type:"tshirt",size:"S",bag:"#efeee9",ink:"#2fa58a",front:qs("#2fa58a"),back:qs("#2fa58a")},{name:"Drawstring",sub:"String bag M \xB7 white",type:"string",size:"M",bag:"#efeee9",handle:"#eceae4",ink:"#c49a3c",front:We("#c49a3c","#c49a3c"),back:[]},{name:"KIVO",sub:"Box bag XS \xB7 red",type:"box",size:"XS",bag:"#d42a1f",handle:"#1b1c20",strap:"webbing",ink:"#1a1a1a",front:[{kind:"graphic",graphic:"kivo",fx:.5,fy:.53,fw:.85,ink:"#1a1a1a"}],back:[]}],ho=document.getElementById("samples"),gx=n=>(Id.find(([,t])=>t===n)||["Custom"])[0];for(let n of[...document.querySelectorAll("#typeSeg button")].map(t=>t.dataset.v)){let t=es.map((s,r)=>[s,r]).filter(([s])=>s.type===n);if(!t.length)continue;let e=document.createElement("h3");e.textContent=ne[n].name+"s";let i=document.createElement("span");i.textContent=t.length,e.appendChild(i),ho.appendChild(e);for(let[s,r]of t){let a=document.createElement("button");a.className="sample",a.dataset.i=r,a.innerHTML='<i class="dot"></i><span><b></b><small></small></span>',a.querySelector(".dot").style.background=`linear-gradient(135deg, ${s.bag} 58%, ${s.ink} 58%)`,a.querySelector("b").textContent=s.name,a.querySelector("small").textContent=`${s.size} \xB7 ${gx(s.bag)}`,a.onclick=()=>Js(r),ho.appendChild(a)}}function rs(){ho.querySelectorAll(".sample").forEach(n=>n.classList.remove("on"))}function Js(n){let t=es[n];Object.assign(Z,{bag:t.bag,size:t.size}),Kt.front=[],Kt.back=[],nr(t.type),t.handle&&(Z.handle=t.handle),Z.strap=t.strap||"fabric",yh();for(let e of["front","back"])Kt[e]=t[e].map(({fx:i,fy:s,fw:r,...a})=>{let o={kind:"text",...a,id:oi++,x:i*Z.W,y:s*Z.H,w:r*Z.W};return ze(o),o});Hd(),yo(),ss(),Nt="front",on=null,$i(),ho.querySelectorAll(".sample").forEach(e=>e.classList.toggle("on",+e.dataset.i===n)),Ii(),Oe(),de(),Xe("34")}var Ae=document.getElementById("editor"),te=Ae.getContext("2d"),Ir=document.getElementById("props"),uh=document.getElementById("designNote"),Zi=document.getElementById("pText"),Lr=document.getElementById("pStyle"),Qi=document.getElementById("pQr"),uo=document.getElementById("pMethod"),fo=document.getElementById("pInk"),Ji=document.getElementById("pSize"),$c=document.getElementById("pNote"),ji=document.getElementById("copySide"),po=10,Bn=null,th=!1,oe=()=>Kt[Nt].find(n=>n.id===on)||null;function Me(){Oe(),th||(th=!0,requestAnimationFrame(()=>{th=!1,Ii()}))}var eh={};function Ax(n){if(!eh[n]){let t=document.createElement("canvas");t.width=t.height=10;let e=t.getContext("2d");e.fillStyle=n?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.05)",e.fillRect(0,0,10,10),e.strokeStyle=n?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.22)",e.lineWidth=1.2,e.beginPath(),e.moveTo(-2,12),e.lineTo(12,-2),e.moveTo(-2,2),e.lineTo(2,-2),e.moveTo(8,12),e.lineTo(12,8),e.stroke(),eh[n]=t}return eh[n]}function Oe(){if(!Ae.getClientRects().length)return;let{W:n,H:t}=Z,e=Math.max(120,Ae.parentElement.clientWidth-18),i=matchMedia("(max-width:760px), (max-width:1000px) and (max-height:500px)").matches,s=document.documentElement.dataset.canvasFocus==="true",r=i?Math.max(96,s?document.querySelector(".studio-canvas-body").clientHeight-20:Math.min(340,document.getElementById("panes").clientHeight-24)):340,a=e/n;t*a>r&&(a=r/t);let o=Math.min(window.devicePixelRatio||1,2),l=Math.round(n*a),c=Math.round(t*a);(Ae.width!==Math.round(l*o)||Ae.height!==Math.round(c*o))&&(Ae.width=Math.round(l*o),Ae.height=Math.round(c*o)),Ae.style.width=l+"px",Ae.style.height=c+"px",po=a;let h=a*o,u=er(),f=new Ot(Z.bag).getHSL({}).l<.5;te.setTransform(1,0,0,1,0,0),te.fillStyle=Z.bag,te.fillRect(0,0,Ae.width,Ae.height),te.save(),te.beginPath(),te.rect(0,0,Ae.width,Ae.height),te.rect(u.x0*h,u.y0*h,(u.x1-u.x0)*h,(u.y1-u.y0)*h),te.fillStyle=te.createPattern(Ax(f),"repeat"),te.fill("evenodd"),te.setLineDash([4*o,4*o]),te.strokeStyle=f?"rgba(255,255,255,0.45)":"rgba(0,0,0,0.3)",te.lineWidth=o,te.strokeRect(u.x0*h,u.y0*h,(u.x1-u.x0)*h,(u.y1-u.y0)*h),te.restore(),te.save(),te.fillStyle=Ad("--chip")||"#fff",Od(te,h,0,0),te.fill(),te.restore(),Ur(te,h,0,0,Kt[Nt]);let d=oe();if(d){let[A,_]=Ri(d),p=(d.x-A/2)*h,g=(d.y-_/2)*h,w=10*o;te.save(),te.strokeStyle=Ad("--focus")||"#2b59c3",te.lineWidth=1.5*o,te.setLineDash([5*o,3*o]),te.strokeRect(p,g,A*h,_*h),te.setLineDash([]),te.fillStyle="#fff",te.fillRect(p+A*h-w/2,g+_*h-w/2,w,w),te.strokeRect(p+A*h-w/2,g+_*h-w/2,w,w),te.restore()}}new ResizeObserver(()=>Oe()).observe(Ae.parentElement);matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>Oe());var Wd=n=>{let t=Ae.getBoundingClientRect();return[(n.clientX-t.left)/po,(n.clientY-t.top)/po]};function qd(n,t){let e=oe(),i=12/po;if(e){let[r,a]=Ri(e),o=Math.min(i,Math.min(r,a)*.4);if(Math.abs(n-(e.x+r/2))<o&&Math.abs(t-(e.y+a/2))<o)return[e,"resize"]}let s=Kt[Nt];for(let r=s.length-1;r>=0;r--){let a=s[r],[o,l]=Ri(a);if(Math.abs(n-a.x)<=o/2&&Math.abs(t-a.y)<=l/2)return[a,"move"]}return[null,null]}Ae.addEventListener("pointerdown",n=>{let[t,e]=Wd(n),[i,s]=qd(t,e);if(!i){wi(null);return}wi(i.id),Ae.setPointerCapture(n.pointerId),Bn={mode:s,el:i,x0:t,y0:e,ex:i.x,ey:i.y,w0:i.w}});Ae.addEventListener("pointermove",n=>{let[t,e]=Wd(n);if(!Bn){let[s,r]=qd(t,e);Ae.style.cursor=r==="resize"?"nwse-resize":s?"move":"default";return}let i=Bn.el;Bn.mode==="move"?(i.x=Bn.ex+t-Bn.x0,i.y=Bn.ey+e-Bn.y0):i.w=Math.max(Ks(i),Bn.w0+2*(t-Bn.x0)),ze(i),de(),Me()});var Xd=()=>{Bn=null};Ae.addEventListener("pointerup",Xd);Ae.addEventListener("pointercancel",Xd);Ae.addEventListener("keydown",n=>{let t=oe();if(!t)return;let e=n.shiftKey?1:.2,i={ArrowLeft:[-e,0],ArrowRight:[e,0],ArrowUp:[0,-e],ArrowDown:[0,e]}[n.key];i&&(t.x+=i[0],t.y+=i[1],ze(t),de(),Me(),n.preventDefault()),(n.key==="Delete"||n.key==="Backspace")&&(Yd(),n.preventDefault())});function wi(n){on=n,de(),Oe()}function Yd(){Kt[Nt]=Kt[Nt].filter(n=>n.id!==on),on=null,de(),Me()}for(let[n,[,,t]]of Object.entries(nh))Lr.add(new Option(t,n));var Mh=document.createElement("span");Mh.className="swname";for(let[n,t]of Dd){let e=document.createElement("button");e.className="sw",e.dataset.v=t,e.title=n,e.setAttribute("aria-label",n),e.style.background=t,e.onclick=()=>{let i=oe();i&&(i.ink=t,de(),Me())},fo.appendChild(e)}fo.appendChild(Mh);var dh=n=>{let t=new Ot(n);return .2126*t.r+.7152*t.g+.0722*t.b};function de(){let n=oe();if(Ir.hidden=!n,!n)return;document.getElementById("propsTitle").textContent={text:"Text",logo:"Logo",qr:"QR code",graphic:"Artwork"}[n.kind],Zi.hidden=Lr.hidden=n.kind!=="text",n.kind==="text"&&(document.activeElement!==Zi&&(Zi.value=n.text),Lr.value=n.style),Qi.hidden=n.kind!=="qr",n.kind==="qr"&&document.activeElement!==Qi&&(Qi.value=n.data),uo.hidden=n.kind!=="logo",uo.querySelectorAll("button").forEach(s=>s.classList.toggle("on",s.dataset.v===(n.method||"mono"))),fo.hidden=n.kind==="logo"&&n.method==="full",fo.querySelectorAll(".sw").forEach(s=>s.classList.toggle("on",s.dataset.v===n.ink)),Mh.textContent=(Dd.find(([,s])=>s===n.ink)||[n.ink])[0];let t=er();Ji.min=Ks(n),Ji.max=(t.x1-t.x0).toFixed(1),Ji.value=n.w,document.getElementById("o-pSize").textContent=An(n.w)+" cm";let e="",i=!1;if(n.kind==="qr"){let s=dh(n.ink),r=dh(Z.bag),a=(Math.max(s,r)+.05)/(Math.min(s,r)+.05);window.qrcode?a<3?(e="Low contrast with the fabric, so phones may not read this QR code. Pick a darker or lighter ink.",i=!0):s>r?(e="Light ink on dark fabric makes an inverted QR code, which some phones cannot read. Scan a sample before ordering.",i=!0):n.w<3.5?(e="Make it at least 3.5 cm wide so phones read it through the fabric texture.",i=!0):e="Scannable size and contrast. Phones read it best on a flat, well-lit panel.":(e="The QR code generator did not load. Check the internet connection and reload the page.",i=!0)}else n.kind==="logo"&&n.method==="full"?e="Full-colour logos are printed as a heat transfer, so they keep their own colours.":n.kind==="text"&&(e="Put **double asterisks** around words to make them bold. Press Enter for a new line.");$c.textContent=e,$c.classList.toggle("warn",i),$c.hidden=!e}Zi.addEventListener("input",()=>{let n=oe();n&&(n.text=Zi.value||" ",ze(n),de(),Me())});Lr.addEventListener("change",()=>{let n=oe();n&&(n.style=Lr.value,ze(n),Me())});Qi.addEventListener("input",()=>{let n=oe();n&&(n.data=Qi.value.trim()||" ",ze(n),Me())});uo.addEventListener("click",n=>{let t=n.target.closest("button"),e=oe();t&&e&&(e.method=t.dataset.v,de(),Me())});Ji.addEventListener("input",()=>{let n=oe();n&&(n.w=+Ji.value,ze(n),de(),Me())});document.getElementById("pCenter").onclick=()=>{let n=oe();n&&(n.x=Z.W/2,ze(n),Me())};document.getElementById("delItem").onclick=Yd;var vx=()=>dh(Z.bag)>.3?"#1a1a1a":"#f4f3ef";function _o(n){let t=er();n={id:oi++,x:(t.x0+t.x1)/2,y:(t.y0+t.y1)/2,ink:vx(),...n},ze(n),Kt[Nt].push(n),on=n.id,de(),Me()}document.getElementById("addText").onclick=()=>_o({kind:"text",text:"Your text",style:"sans-800",track:.02,w:Math.min(14,Z.W*.5)});document.getElementById("addQr").onclick=()=>{let n=er();_o({kind:"qr",data:"https://www.kobags-group.com",w:4.5,x:n.x1-2.25,y:n.y1-2.25})};document.getElementById("addLogo").onchange=async n=>{let t=n.target.files[0];if(t){try{let e=await co(URL.createObjectURL(t)),i="logo"+oi++;Ci.set(i,mx(e,t.name)),_o({kind:"logo",asset:i,method:"mono",w:Math.min(12,Z.W*.45)}),uh.textContent=`Added ${t.name}. Drag it into place.`}catch{uh.textContent="That file could not be read as an image. Try a PNG, JPG or SVG."}n.target.value=""}};function $i(){document.querySelectorAll("#sideSeg button[data-v]").forEach(n=>n.classList.toggle("on",n.dataset.v===Nt)),ji.textContent=Nt==="front"?"Copy to back":"Copy to front"}document.getElementById("sideSeg").addEventListener("click",n=>{let t=n.target.closest("button[data-v]");t&&(Nt=t.dataset.v,on=null,$i(),de(),Oe(),Xe(Nt==="back"?"back":"34"))});ji.onclick=()=>{let n=Nt==="front"?"back":"front";Kt[n]=Kt[Nt].map(t=>({...t,id:oi++})),Me(),uh.textContent=`The ${n} now has the same design as the ${Nt}.`};function Kd(){let e=document.createElement("canvas"),i=e.getContext("2d"),s=()=>{i.font='300 200px "Montserrat", "Helvetica Neue", Arial, sans-serif',"letterSpacing"in i&&(i.letterSpacing="20px")};s();let r=i.measureText("Y").width,a=i.measureText("UR").width,o=i.measureText("H").actualBoundingBoxAscent||200*.7,l=o*1.04,c=200*.14;e.width=Math.ceil(r+l+20+a+c*2),e.height=Math.ceil(200*1.12+c),s(),i.fillStyle=i.strokeStyle="#fff",i.textBaseline="alphabetic";let h=e.height/2+o/2;i.fillText("Y",c,h);let u=c+r+l/2,f=h-o/2,d=l/2;i.lineWidth=200*.045,i.lineCap="round";for(let A=0;A<3;A++)i.save(),i.translate(u,f),i.rotate(A*Math.PI*2/3-Math.PI/2),i.beginPath(),i.arc(0,0,d*.94,-.95,1.15),i.quadraticCurveTo(d*.2,d*.25,d*.55,-d*.76),i.stroke(),i.beginPath(),i.moveTo(d*.83,d*.42),i.quadraticCurveTo(d*.55,0,d*.62,-d*.55),i.stroke(),i.restore();return i.fillText("UR",c+r+l+20,h),e}function bh(n,t,e){let i=document.createElement("canvas");i.width=n,i.height=t;let s=i.getContext("2d");return s.fillStyle=s.strokeStyle="#fff",e(s),i}var xx=()=>bh(520,560,n=>{for(let t=0;t<4;t++)n.beginPath(),n.roundRect(40+t*115,20,85,220,[42,42,8,8]),n.fill();n.beginPath(),n.moveTo(20,268),n.lineTo(500,268),n.lineTo(500,318),n.lineTo(20,318),n.closePath(),n.fill(),n.beginPath(),n.moveTo(40,350),n.lineTo(480,350),n.arc(260,350,220,0,Math.PI),n.closePath(),n.fill()}),yx=()=>bh(400,400,n=>{n.beginPath(),n.arc(200,200,180,0,Math.PI*2),n.fill(),n.globalCompositeOperation="destination-out",n.beginPath(),n.arc(250,185,150,0,Math.PI*2),n.fill(),n.globalCompositeOperation="source-over",n.beginPath(),n.ellipse(215,215,70,34,-.8,0,Math.PI*2),n.fill()}),jd=()=>bh(600,1500,n=>{n.lineWidth=12,n.lineCap=n.lineJoin="round";for(let[t,e,i]of[[300,170,95],[215,230,80],[385,230,80],[300,290,85]])n.beginPath(),n.arc(t,e,i,0,Math.PI*2),n.stroke();n.beginPath(),n.moveTo(300,370),n.lineTo(300,470),n.moveTo(300,420),n.lineTo(255,380),n.moveTo(300,405),n.lineTo(340,370),n.stroke(),n.font='700 190px "Montserrat", sans-serif',n.textAlign="center",n.lineWidth=10,n.strokeText("ECO",300,700),n.lineWidth=12,n.beginPath(),n.arc(300,900,85,0,Math.PI*2),n.stroke();for(let t=0;t<12;t++){let e=t*Math.PI/6;n.beginPath(),n.moveTo(300+Math.cos(e)*115,900+Math.sin(e)*115),n.lineTo(300+Math.cos(e)*160,900+Math.sin(e)*160),n.stroke()}n.beginPath(),n.arc(170,1300,95,0,Math.PI*2),n.moveTo(525,1300),n.arc(430,1300,95,0,Math.PI*2),n.stroke(),n.beginPath(),n.moveTo(170,1300),n.lineTo(270,1170),n.lineTo(390,1170),n.lineTo(430,1300),n.moveTo(170,1300),n.lineTo(300,1300),n.lineTo(390,1170),n.moveTo(270,1170),n.lineTo(300,1300),n.moveTo(250,1140),n.lineTo(300,1140),n.moveTo(390,1170),n.lineTo(380,1120),n.lineTo(420,1110),n.stroke();for(let[t,e,i]of[[110,560,-.6],[500,1020,.6],[100,1050,-.4]])n.save(),n.translate(t,e),n.rotate(i),n.beginPath(),n.ellipse(0,0,70,28,0,0,Math.PI*2),n.moveTo(-70,0),n.lineTo(70,0),n.stroke(),n.restore()});function Zd(){let t=document.createElement("canvas");t.width=1400,t.height=1400;let e=t.getContext("2d"),i=[];for(let I=0;I<480;I++){let k=I/480*Math.PI*2;i.push([16*Math.sin(k)**3,-(13*Math.cos(k)-5*Math.cos(2*k)-2*Math.cos(3*k)-Math.cos(4*k))])}let s=Math.min(...i.map(I=>I[1])),r=1400*.92/32,a=i.map(([I,k])=>[1400/2+I*r,(k-s)*r+1400*.02]),o=I=>{let k=1/0,B=-1/0;for(let q=0;q<a.length;q++){let z=a[q],tt=a[(q+1)%a.length];if((z[1]-I)*(tt[1]-I)<=0&&z[1]!==tt[1]){let ot=z[0]+(I-z[1])/(tt[1]-z[1])*(tt[0]-z[0]);k=Math.min(k,ot),B=Math.max(B,ot)}}return[k,B]},l=[{words:[["Gracias","s"],["XIEXIE","b"],["Merci","s"]],k:1},{words:[["DANKE","b"],["SHUKRAN","b"]],k:1.3},{big:"THANK",left:["HVALA","KIITOS"],right:["OBRIGADO","TERIMA KASIH"],k:2.1},{big:"YOU",left:["ARIGATO","DEKUJI"],right:["SALAMAT","TACK"],k:1.9},{words:[["FALEMINDERIT","b"]],k:1.1},{words:[["KOSZONOM","b"],["MULTUMESC","b"]],k:.75},{words:[["TESEKKUR EDERIM","b"]],k:.65},{words:[["DANK U","b"]],k:.6}],c=(I,k)=>I==="s"?`700 ${k*1.2}px "Dancing Script", cursive`:`700 ${k}px "Oswald", "Arial Narrow", sans-serif`,h=(I,k,B)=>(e.font=c(k,B),e.measureText(I).width),u=.46,f=.22,d=(I,k)=>Math.max(...I.map(B=>h(B,"b",k*u))),A=(I,k)=>I.big?d(I.left,k)+h(I.big,"b",k)+d(I.right,k)+2*f*k:I.words.reduce((B,[q,z])=>B+h(q,z,k),0)+(I.words.length-1)*k*.26;e.font=c("b",100);let _=e.measureText("H").actualBoundingBoxAscent/100||.78,p=1.14,g=Math.min(...a.map(I=>I[1])),w=Math.max(...a.map(I=>I[1])),M=w-g,y=g+M*.08,C=g+M*.9,b=(C-y)/l.reduce((I,k)=>I+k.k*_*p,0),S=[];for(let I=0;I<8;I++){S=[];let k=y;for(let B of l){let q=B.k*b,[z,tt]=o(k+q*_*.5);if(!(tt>z)){k+=q*_*p;continue}let ot=(tt-z)*.96/A(B,1),ut=Math.min(Math.max(ot,q*.6),q*1.6),Et=Math.min(Math.max((tt-z)*.96/A(B,ut),.8),1.25);S.push({row:B,size:ut,sx:Et,cx:(z+tt)/2,base:k+ut*_}),k+=ut*_*p}b*=(C-y)/(k-y)}e.fillStyle="#fff";for(let{row:I,size:k,sx:B,cx:q,base:z}of S){e.save(),e.translate(q,0),e.scale(B,1);let tt=-A(I,k)/2;if(I.big){let ot=k*u,ut=d(I.left,k),Et=z-k*_*.56;e.textAlign="right",e.font=c("b",ot),e.fillText(I.left[0],tt+ut,Et),e.fillText(I.left[1],tt+ut,z),tt+=ut+f*k,e.textAlign="left",e.font=c("b",k),e.fillText(I.big,tt,z),tt+=h(I.big,"b",k)+f*k,e.font=c("b",ot),e.fillText(I.right[0],tt,Et),e.fillText(I.right[1],tt,z)}else for(let[ot,ut]of I.words)e.font=c(ut,k),e.fillText(ot,tt,z),tt+=e.measureText(ot).width+k*.26;e.restore()}let E=e.getImageData(0,0,1400,1400).data,T=1400,m=1400,v=0,R=0;for(let I=0;I<1400;I+=2)for(let k=0;k<1400;k+=2)E[(I*1400+k)*4+3]>20&&(T=Math.min(T,k),v=Math.max(v,k),m=Math.min(m,I),R=Math.max(R,I));let L=document.createElement("canvas");return L.width=v-T+12,L.height=R-m+12,L.getContext("2d").drawImage(t,T-6,m-6,L.width,L.height,0,0,L.width,L.height),L}function _x(n){let t=document.createElement("canvas");return t.width=n.width,t.height=n.height,t.getContext("2d").drawImage(n,0,0),t}function Mx(){let n=document.querySelector('link[href*="fonts.googleapis.com/css2"]'),t=new Promise(i=>{!n||n.sheet?i():(n.addEventListener("load",i,{once:!0}),n.addEventListener("error",i,{once:!0}))}),e=["300","500","600","700","800","900"].map(i=>`${i} 40px "Montserrat"`).concat(['700 40px "Oswald"','700 40px "Dancing Script"','700 40px "Playfair Display"']);return Promise.race([t.then(()=>Promise.all(e.map(i=>document.fonts.load(i)))),new Promise(i=>setTimeout(i,5e3))]).catch(()=>{})}document.fonts?.addEventListener?.("loadingdone",()=>{if(window.__ready){Ti.clear(),Ei.heart=Zd(),Ei.eco=jd(),Ei.your=Kd();for(let n of["front","back"])Kt[n].forEach(ze);Ii(),Oe()}});var bx=window.claude?.use?window.claude.use("downloads"):Promise.resolve(null);document.getElementById("shot").onclick=async()=>{$s(!0);let n=await new Promise(s=>qt.domElement.toBlob(s,"image/png")),t=`${ne[Z.type].name.toLowerCase().replace(/[^a-z]+/g,"-")}-${Z.size}-${Nt}.png`,e=await bx;if(e){try{await e.save({filename:t,data:n})}catch{}return}let i=document.createElement("a");i.href=URL.createObjectURL(n),i.download=t,i.click(),setTimeout(()=>URL.revokeObjectURL(i.href),5e3)};var ns=new Ka(qt,new Ge(1,1,{type:bn,samples:4}));ns.addPass(new ja(Ne,jt));var tn=new Rr(Ne,jt,1,1);tn.normalMaterial.side=Je;tn.updateGtaoMaterial({radius:.045,distanceExponent:1.6,thickness:.03,scale:1.15,samples:16,distanceFallOff:1});tn.updatePdMaterial({lumaPhi:10,depthPhi:2,normalPhi:3,radius:5,rings:2,samples:16});tn.blendIntensity=.9;var Mo=new Fs({side:Je,blending:_e});Mo.alphaMap=Pi;Mo.onBeforeCompile=n=>{n.fragmentShader=n.fragmentShader.replace("#include <uv_pars_fragment>",`#include <uv_pars_fragment>
#include <alphamap_pars_fragment>`).replace("#include <normal_fragment_begin>",`#ifdef USE_ALPHAMAP
	if ( texture2D( alphaMap, vAlphaMapUv ).g < 0.5 ) discard;
#endif
#include <normal_fragment_begin>`)};Mo.customProgramCacheKey=()=>"bag-cut-normals";var wx=tn.renderOverride.bind(tn),Ed=new Ot;tn.renderOverride=(n,t,e,i,s)=>{if(t!==tn.normalMaterial)return wx(n,t,e,i,s);let r=[];Ne.traverse(l=>{l.isMesh&&(r.push([l,l.material]),l.material=l===vn||l===vo?Mo:tn.normalMaterial)}),n.getClearColor(Ed);let a=n.getClearAlpha(),o=n.autoClear;n.setRenderTarget(e),n.autoClear=!1,n.setClearColor(i),n.setClearAlpha(s||0),n.clear(),n.render(Ne,jt),n.autoClear=o,n.setClearColor(Ed),n.setClearAlpha(a);for(let[l,c]of r)l.material=c};ns.addPass(tn);var fh=new Ja;fh.material.fragmentShader=fh.material.fragmentShader.replace("gl_FragColor = texture2D( tDiffuse, vUv );",`gl_FragColor = texture2D( tDiffuse, vUv );
    // Opaque fabric keeps its original linear colour. For transparent floor
    // shadows, include GTAO darkening in the black-shadow coverage first.
    float websiteCoverage = clamp(max(gl_FragColor.a, 1.0 - min(min(gl_FragColor.r, gl_FragColor.g), gl_FragColor.b)), 0.0, 1.0);
    gl_FragColor.rgb = max(vec3(0.0), (gl_FragColor.rgb - vec3(1.0 - websiteCoverage)) / max(websiteCoverage, 0.00001));`).replace("// color space",`// Composite a true white backdrop after tone mapping, also for downloads.
    gl_FragColor.rgb = mix(vec3(1.0), gl_FragColor.rgb, websiteCoverage);
    gl_FragColor.a = 1.0;
    // color space`);ns.addPass(fh);function Qd(){let n=$e.clientWidth,t=Math.max(1,$e.clientHeight-(parseFloat(getComputedStyle($e).paddingBottom)||0));qt.setSize(n,t,!1),jt.aspect=n/t,jt.updateProjectionMatrix(),gn||(ns.setPixelRatio(qt.getPixelRatio()),ns.setSize(n,t)),Sn=!0}new ResizeObserver(Qd).observe($e);Qd();var wh=matchMedia("(max-width:760px), (max-width:1000px) and (max-height:500px)"),Jd=0,Td=0,ph=!1,Cd="",mh={motionFrames:0,detailFrames:0,shadowRefreshes:0};function Sh(){!wh.matches||gn||(Jd=performance.now()+160,clearTimeout(Td),Td=setTimeout(()=>{Sn=!0},180))}for(let n of["pointerdown","pointermove","pointerup","pointercancel","wheel"])$e.addEventListener(n,t=>{(n!=="pointermove"||t.buttons)&&Sh()},{capture:!0,passive:!0});ee.addEventListener("start",Sh);ee.addEventListener("end",Sh);document.addEventListener("visibilitychange",()=>{document.hidden||(Sn=!0)});function Sx(n,t){let e=wh.matches&&!n&&(!!qe||t||performance.now()<Jd);if(!(t||Sn||n||ph&&!e))return;let s=[vn.geometry.uuid,Pi.version,...Fn.matrixWorld.elements,...Le.position.toArray(),...Le.target.position.toArray()].join("|");qt.shadowMap.autoUpdate=!1,(s!==Cd||n)&&(qt.shadowMap.needsUpdate=!0,Cd=s,mh.shadowRefreshes++);let r=tn.enabled;try{tn.enabled=r&&!e,ns.render()}finally{tn.enabled=r}ph=e,mh[e?"motionFrames":"detailFrames"]++,Sn=!1}window.__builderPerformance={stats:mh,get motion(){return ph},get mobile(){return wh.matches}};function $s(n=!1){if(document.hidden&&!n||gn)return;let t=!1;if(qe){t=!0;let e=Math.min(1,(performance.now()-qe.t0)/650),i=1-Math.pow(1-e,3);jt.position.lerpVectors(qe.p0,qe.to.pos,i),ee.target.lerpVectors(qe.q0,qe.to.target,i),e===1&&(qe=null)}t=ee.update()||t,Sx(n,t)}qt.setAnimationLoop(()=>$s());ss();nr("box");Xe("34",!1);window.qrcode?.stringToBytesFuncs?.["UTF-8"]&&(window.qrcode.stringToBytes=window.qrcode.stringToBytesFuncs["UTF-8"]);Promise.all([Mx(),co(kv)]).then(([,n])=>{Ei.kivo=_x(n),Ei.heart=Zd(),Object.assign(Ei,{papirun:xx(),crescent:yx(),eco:jd(),your:Kd()}),Ti.clear(),gh()||Js(0),Xe("34",!1),window.__ready=!0,addEventListener("hashchange",gh)});var $d=n=>n.toLowerCase().normalize("NFD").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");function gh(){let n;try{n=decodeURIComponent(location.hash.slice(1)).toLowerCase()}catch{return!1}if(!n)return!1;let t=es.findIndex(e=>$d(e.name)===n);return t>=0?(Js(t),xn("bag"),!0):Object.hasOwn(ne,n)?(Js(Math.max(0,es.findIndex(e=>e.type===n))),Z.type!==n&&(nr(n),rs()),xn("bag"),!0):!1}window.__api={renderer:qt,render:()=>$s(!0),gtao:tn,slug:$d,applyType:nr,applySize:lo,loadSample:Js,SAMPLES:es,design:Kt,select:wi,drawEditor:Oe,printArea:er,elementSize:Ri,getSide:()=>Nt,outer:vn,rim:js,straps:Or,cords:xo,TYPES:ne,state:Z,setView:Xe,rebuild:qn,redrawAtlas:Ii,camera:jt,controls:ee,composer:ns,gtao:tn,scene:Ne};var li=document.documentElement.dataset.embed==="preview",Eh="kobags-reference-studio-v1",Br=!1;window.addEventListener("storage",n=>{!li&&n.key===Eh&&n.newValue===null&&(Br=!1,clearTimeout(Ah),location.reload())});function Dr(n,t={}){window.parent!==window&&window.parent.postMessage({type:n,...t},location.origin)}function tf(){if(!(!Br||li))try{let n=new Set([...Kt.front,...Kt.back].filter(e=>e.kind==="logo").map(e=>e.asset)),t=[...Ci.entries()].filter(([e])=>n.has(e)).map(([e,i])=>[e,{name:i.name,mask:i.mask.toDataURL(),color:i.color.toDataURL()}]);localStorage.setItem(Eh,JSON.stringify({version:1,state:Z,design:Kt,side:Nt,nextId:oi,uploaded:t}))}catch{Dr("kobags:storage-unavailable")}}var Ah;function tr(){clearTimeout(Ah),Ah=setTimeout(tf,350)}for(let n of["input","change","click","pointerup"])document.addEventListener(n,tr,{passive:!0});var Ex=Me;Me=function(){Ex(),tr()};function Th(n){let t=n.toDataURL("image/png");if(t.length<=8e4)return t;for(let i of[.9,.8,.65])if(t=n.toDataURL("image/webp",i),t.length<=8e4)return t;if(n.width<=180)throw Error("IMAGE_TOO_LARGE");let e=document.createElement("canvas");return e.width=Math.round(n.width*.75),e.height=Math.round(n.height*.75),e.getContext("2d").drawImage(n,0,0,e.width,e.height),Th(e)}function Rd(n){if(!Kt[n].length)return"";let t=document.createElement("canvas");t.width=900,t.height=Math.round(900*Z.H/Z.W);let e=t.getContext("2d");return Ur(e,900/Z.W,0,0,Kt[n]),Th(t)}function Tx(){let n=jt.position.clone(),t=ee.target.clone(),e=document.getElementById("mobile-camera-view")?.value,i={};try{for(let s of["front","back"]){Xe(s,!1),$s(!0);let r=document.createElement("canvas"),a=qt.domElement,o=Math.min(1,800/Math.max(a.width,a.height));r.width=Math.round(a.width*o),r.height=Math.round(a.height*o),r.getContext("2d").drawImage(a,0,0,r.width,r.height),i[s]=Th(r)}}finally{qe=null,jt.position.copy(n),ee.target.copy(t),ee.update(),Sn=!0,e!==void 0&&(document.getElementById("mobile-camera-view").value=e)}return{source:"ariongj-mo-b23cd8f",productName:ne[Z.type].name,size:Z.size,dimensions:`${Z.W} \xD7 ${Z.H} \xD7 ${Z.D} cm`,fabric:Z.bag,...i}}window.addEventListener("message",n=>{if(!(n.source!==window.parent||n.origin!==location.origin||!Br)&&(n.data?.type==="kobags:studio-status"&&Dr("kobags:studio-ready"),n.data?.type==="kobags:request-quote")){tf();try{Dr("kobags:quote-design",{bag:{...Z},front:Rd("front"),back:Rd("back"),referenceStudio:Tx()})}catch{Dr("kobags:quote-error")}}});async function Cx(){if(!li)try{let n=JSON.parse(localStorage.getItem(Eh)||"null");if(n?.version!==1||!Object.hasOwn(ne,n.state?.type))return;let t=n.state;if(!ne[t.type].sizes.some(i=>i[0]===t.size)||!/^#[\da-f]{6}$/i.test(t.bag)||!Array.isArray(n.design?.front)||!Array.isArray(n.design?.back)||n.design.front.length+n.design.back.length>100)return;Number.isSafeInteger(n.nextId)&&n.nextId>0&&n.nextId<1e9&&(oi=Math.max(oi,n.nextId));for(let[i,s]of(n.uploaded||[]).slice(0,32)){if(typeof i!="string"||i.length>100||!s.mask?.startsWith("data:image/png;base64,")||!s.color?.startsWith("data:image/png;base64,")||s.mask.length+s.color.length>8e6)continue;let[r,a]=await Promise.all([co(s.mask),co(s.color)]);if([r,a].some(l=>l.width>4096||l.height>4096))continue;let o=l=>{let c=document.createElement("canvas");return c.width=l.width,c.height=l.height,c.getContext("2d").drawImage(l,0,0),c};Ci.set(i,{name:String(s.name||"Logo").slice(0,200),mask:o(r),color:o(a)})}Kt.front=[],Kt.back=[],nr(t.type),lo(t.size);let e=t.bagView==="flat"||t.bagView==null&&t.type==="tshirt"&&t.vestView==="flat"?"flat":"open";Object.assign(Z,{bag:t.bag,handle:t.handle==="match"||/^#[\da-f]{6}$/i.test(t.handle)?t.handle:"match",strap:t.strap==="webbing"?"webbing":"fabric",pose:t.pose==="relaxed"?"relaxed":"upright",bagView:e}),Number.isFinite(t.drop)&&(Z.drop=Math.max(6,Math.min(35,t.drop)));for(let i of["front","back"])Kt[i]=n.design[i].filter(s=>["text","logo","graphic","qr"].includes(s.kind)&&[s.x,s.y,s.w].every(Number.isFinite)&&/^#[\da-f]{6}$/i.test(s.ink)&&(s.kind!=="logo"||Ci.has(s.asset))&&(s.kind!=="graphic"||Object.hasOwn(Ei,s.graphic))).map(s=>{let r={...s,id:oi++,text:String(s.text||"").slice(0,2e3),data:String(s.data||"").slice(0,2e3)};return ze(r),r});Nt=n.side==="back"?"back":"front",on=null,Hd(),yo(),yh(),Gd(),$i(),document.querySelectorAll("#poseSeg button").forEach(i=>i.classList.toggle("on",i.dataset.v===Z.pose)),ss(),qn(),Ii(),Oe(),de(),rs(),Xe(Nt==="back"?"back":"34",!1)}catch{}}var Rx=setInterval(async()=>{window.__ready&&(clearInterval(Rx),gh()||await Cx(),Br=!0,document.documentElement.dataset.studioSource="ariongj-mo-b23cd8f",Dr("kobags:studio-ready"))},50);if(!li){let h=function(){for(let x of c){let V=x.dataset.v===(Z.bagView==="flat"?"flat":"open");x.classList.toggle("on",V),x.setAttribute("aria-pressed",String(V))}},I=function(x,V=!1){C.matches&&(_.hidden=!x,m.setAttribute("aria-expanded",String(x)),V&&m.focus({preventScroll:!0}))},nt=function(){z.open||(U=document.activeElement,I(!1),document.documentElement.dataset.canvasFocus="true",Et.append(s),J.append(d,v,L),v.prepend(w),R.append(...y),H.append(k),z.showModal(),Oe(),requestAnimationFrame(Oe),Ae.focus({preventScroll:!0}))},ct=function(){if(z.open){at();return}let x=document.activeElement,V=S.contains(x)||_.contains(x)||d.contains(x)||w.contains(x)||y.includes(x);if(C.matches){E.prepend(d),E.insertBefore(q,T),q.textContent="Move",E.after(_),v.prepend(w),R.append(...y),I(!1);let st=document.querySelector("[data-pane=bag]");st.prepend(l),st.append(F),document.getElementById("stage").append(N),N.textContent="Save",Ir.after(Y)}else{document.querySelector(".editor").before(_,d),Ir.append(w),M.append(...y),_.hidden=!1,B.append(q),q.textContent="Expand canvas",N.textContent="Save image";for(let{node:st,anchor:it}of W)it.after(st)}at(),V&&(x.isConnected&&x.getClientRects().length&&!x.matches(":disabled")?x:document.querySelector("#tabs button.on"))?.focus({preventScroll:!0})},at=function(){let x=document.querySelector("#tabs button.on")?.dataset.tab||"samples";document.documentElement.dataset.studioTab=x,S.hidden=!C.matches||x!=="design";let V=oe();T.disabled=!V;for(let Q of[...w.querySelectorAll("button"),...y])Q.disabled=!V;L.textContent=V?`${An(V.w)} cm wide`:"Select artwork to move or resize",!S.hidden&&V&&(a[Nt]=V.id)},mt=function(){let x=Kt[Nt],V=String(on??""),Q=document.activeElement===A;A.replaceChildren(new Option(x.length?"Choose an item\u2026":"Add a logo, text or QR code",""));for(let[it,gt]of x.entries()){let pt=gt.kind==="text"?gt.text:gt.kind==="logo"?Ci.get(gt.asset)?.name||"Logo":gt.kind==="qr"?"QR code":"Artwork";A.add(new Option(`${it+1}. ${String(pt).replace(/\s+/g," ").slice(0,48)}`,String(gt.id)))}A.value=V,A.disabled=!x.length,Q&&A.focus();for(let it of["front","back"]){let gt=r[it];gt.textContent=`${it==="front"?"Front":"Back"} \xB7 ${Kt[it].length}`,gt.classList.toggle("on",it===Nt),gt.setAttribute("aria-pressed",String(it===Nt))}u.textContent=Nt==="front"?"Front artwork":"Back artwork",ji.textContent=Nt==="front"?"Copy to back":"Copy to front",A.setAttribute("aria-label",`Select ${Nt} artwork`);let st=document.getElementById("designNote");st.textContent=x.length?"Select an item above, drag it on the canvas, or use the move and size controls.":"This side is blank. Add your logo, a message or a QR code.",document.documentElement.dataset.editingSide=Nt,oe()&&(a[Nt]=on),h(),at()},n=(x,V,Q)=>{let st=document.createElement(x);return V&&(st.className=V),Q&&(st.textContent=Q),st},t=(x,V,Q="")=>{let st=n("button",Q,x);return st.type="button",st.addEventListener("click",V),st},e=document.querySelector("#panel .head h1");e.textContent="Make it yours.";let i={samples:"Products",bag:"Bag & size",design:"Your design"};for(let x of document.querySelectorAll("#tabs button"))x.textContent=i[x.dataset.tab],x.id="studio-tab-"+x.dataset.tab,x.setAttribute("aria-controls","studio-pane-"+x.dataset.tab);for(let x of document.querySelectorAll("[data-pane]"))x.id="studio-pane-"+x.dataset.pane,x.setAttribute("aria-labelledby","studio-tab-"+x.dataset.pane);document.querySelector("[data-pane=samples] .lead").textContent="Choose a starting design, then make either side your own.";let s=n("div","studio-side-tools");s.setAttribute("role","group"),s.setAttribute("aria-label","Design either side of your bag");let r={},a={front:null,back:null},o=x=>{oe()&&(a[Nt]=on),Nt=x,on=Kt[Nt].find(V=>V.id===a[Nt])?.id??Kt[Nt][0]?.id??null,$i(),de(),xn("design"),Xe(x),Oe(),tr()};for(let x of["front","back"]){let V=t(x==="front"?"Front":"Back",()=>o(x),"studio-side-button");V.id="edit-"+x,V.setAttribute("aria-label","Design the "+x),r[x]=V,s.append(V)}document.getElementById("stage").append(s);let l=n("div","studio-bag-view");l.id="bag-view",l.setAttribute("role","group"),l.setAttribute("aria-label","Bag presentation"),l.append(n("span","","Bag view"));let c=[];for(let[x,V]of[["open","Opened"],["flat","Folded"]]){let Q=t(V,()=>{Z.bagView!==x&&(Z.bagView=x,qn(),h(),tr())});Q.dataset.v=x,Q.id="bag-view-"+x,Q.setAttribute("aria-label",x==="open"?"Show bag opened":"Show bag folded flat"),c.push(Q),l.append(Q)}document.getElementById("tabs").before(l),l.addEventListener("keydown",x=>{let V=c.indexOf(document.activeElement);if(V<0)return;let Q;if(x.key==="ArrowRight"||x.key==="ArrowLeft")Q=1-V;else if(x.key==="Home")Q=0;else if(x.key==="End")Q=1;else return;x.preventDefault(),c[Q].focus(),c[Q].click()});let u=n("strong","studio-edit-title","Front artwork");document.getElementById("sideSeg").prepend(u);let f=n("p","note studio-edit-help","Tap an item to select it. Drag to move, or use the controls below.");document.querySelector(".editor").before(f);let d=n("label","studio-artwork-picker");d.htmlFor="artwork-picker",d.append(n("span","","Select artwork"));let A=n("select");A.id="artwork-picker",d.append(A),document.querySelector(".editor").after(d),A.addEventListener("change",()=>wi(A.value?Number(A.value):null));let _=document.getElementById("addText").parentElement;_.classList.add("studio-add-tools"),document.querySelector(".editor").before(_,d);let p=_.querySelector(".file");p.tabIndex=0,p.setAttribute("role","button"),p.setAttribute("aria-label","Add a logo"),p.addEventListener("keydown",x=>{(x.key==="Enter"||x.key===" ")&&(x.preventDefault(),document.getElementById("addLogo").click())}),document.getElementById("addText").textContent="+ Text",document.getElementById("addQr").textContent="+ QR code";for(let[x,V]of[["addText",Zi],["addQr",Qi]])document.getElementById(x).addEventListener("click",()=>{V.focus({preventScroll:!0}),V.scrollIntoView({block:"nearest",behavior:"auto"})});let g=t("Duplicate",()=>{let x=oe();x&&_o({...x,id:oi++,x:x.x+.8,y:x.y+.8})},"ghost");g.id="duplicate-artwork",document.querySelector(".propsHead").insertBefore(g,document.getElementById("delItem"));let w=n("div","studio-move");w.setAttribute("role","group"),w.setAttribute("aria-label","Move selected artwork");for(let[x,V,Q,st]of[["Move left","\u2190",-.5,0],["Move up","\u2191",0,-.5],["Move down","\u2193",0,.5],["Move right","\u2192",.5,0]]){let it=t(V,()=>{let gt=oe();gt&&(gt.x+=Q,gt.y+=st,ze(gt),de(),Me())});it.setAttribute("aria-label",x),w.append(it)}Ir.append(w);let M=Ji.parentElement;M.classList.add("studio-size-row");let y=[];for(let[x,V,Q]of[["Make artwork smaller","\u2212",-.5],["Make artwork larger","+",.5]]){let st=t(V,()=>{let it=oe();it&&(it.w+=Q,ze(it),de(),Me())});st.setAttribute("aria-label",x),M.append(st),y.push(st)}let C=matchMedia("(max-width:760px), (max-width:1000px) and (max-height:500px)"),b=document.getElementById("panes"),S=n("div","studio-mobile-tools");S.id="studio-mobile-tools",S.hidden=!0,S.setAttribute("role","region"),S.setAttribute("aria-label","Artwork controls"),b.before(S);let E=n("div","studio-mobile-selection"),T=t("Edit",()=>{let x=oe();if(!x)return;let V=x.kind==="text"?Zi:x.kind==="qr"?Qi:x.kind==="logo"?uo.querySelector("button"):Ji;V.focus({preventScroll:!0}),V.scrollIntoView({block:"nearest",behavior:"auto"})});T.id="studio-edit-artwork",T.setAttribute("aria-label","Edit selected artwork");let m=t("+ Add",()=>I(_.hidden));m.id="studio-add-toggle",m.setAttribute("aria-label","Add logo, text or QR code"),m.setAttribute("aria-controls","studio-add-artwork"),m.setAttribute("aria-expanded","false"),_.id="studio-add-artwork",_.setAttribute("role","group"),_.setAttribute("aria-label","Add artwork");let v=n("div","studio-quick-adjust"),R=n("div","studio-quick-size");R.setAttribute("role","group"),R.setAttribute("aria-label","Resize selected artwork");let L=n("output","studio-quick-width");L.id="studio-quick-width",L.setAttribute("aria-label","Selected artwork width"),E.append(T,m),v.append(R),S.append(E,v,L);for(let x of["addText","addQr"])document.getElementById(x).addEventListener("click",()=>I(!1));document.getElementById("addLogo").addEventListener("change",()=>I(!1,!0)),S.addEventListener("keydown",x=>{x.key==="Escape"&&!_.hidden&&(x.preventDefault(),I(!1,!0))});let k=document.querySelector(".editor"),B=n("div","studio-canvas-heading"),q=t("Expand canvas",nt);q.id="expand-artwork-canvas",q.setAttribute("aria-label","Move and resize artwork"),q.setAttribute("aria-haspopup","dialog"),q.setAttribute("aria-controls","artwork-canvas-dialog"),B.append(f,q),k.before(B);let z=n("dialog","studio-canvas-dialog");z.id="artwork-canvas-dialog",z.setAttribute("aria-labelledby","artwork-canvas-title");let tt=n("div","studio-canvas-header"),ot=n("h2","","Place your artwork");ot.id="artwork-canvas-title";let ut=t("Done",()=>z.close());ut.id="close-artwork-canvas",tt.append(ot,ut);let Et=n("div","studio-canvas-sides"),J=n("div","studio-canvas-tools"),H=n("div","studio-canvas-body");z.append(tt,Et,J,H),document.body.append(z);let U=null,F=document.getElementById("lightBox"),N=document.getElementById("shot");N.setAttribute("aria-label","Save bag image");let Y=document.getElementById("sideSeg"),W=[l,F,N,Y].map(x=>{let V=document.createComment("desktop control position");return x.before(V),{node:x,anchor:V}});z.addEventListener("close",()=>{delete document.documentElement.dataset.canvasFocus,document.getElementById("stage").append(s),B.after(k),S.append(v,L),ct(),Oe(),(U?.isConnected&&U.getClientRects().length?U:q).focus({preventScroll:!0})}),C.addEventListener("change",ct),window.addEventListener("message",x=>{x.source!==parent||x.origin!==location.origin||x.data?.type!=="kobags:viewport"||(document.documentElement.dataset.studioKeyboard=String(x.data.keyboard===!0),requestAnimationFrame(()=>{Oe(),x.data.keyboard===!0&&document.activeElement?.matches("input,textarea,select")&&document.activeElement.scrollIntoView({block:"nearest",behavior:"auto"})}))});let O=xn;xn=function(x){O(x),I(!1),at()};let Tt=n("div","studio-copy-confirm");Tt.hidden=!0,Tt.setAttribute("role","group"),Tt.setAttribute("aria-label","Replace other side artwork"),Tt.append(n("span","","Replace the artwork on the other side?"));let ht=ji.onclick,Ct=t("Replace artwork",()=>{ht(),Tt.hidden=!0,mt(),ji.focus()});Ct.id="confirm-copy",Tt.append(Ct,t("Cancel",()=>{Tt.hidden=!0,ji.focus()})),document.getElementById("sideSeg").after(Tt),ji.onclick=()=>{Kt[Nt==="front"?"back":"front"].length?(Tt.hidden=!1,Ct.focus()):(ht(),mt())};let Dt=de;de=function(){Dt(),mt()};let Rt=Me;Me=function(){Rt(),mt()};let D=$i;$i=function(){D(),Tt.hidden=!0,mt()},document.getElementById("tabs").addEventListener("keydown",x=>{let V=[...document.querySelectorAll("#tabs button")],Q=V.indexOf(document.activeElement);if(Q<0)return;let st;if(x.key==="ArrowRight")st=(Q+1)%V.length;else if(x.key==="ArrowLeft")st=(Q+V.length-1)%V.length;else if(x.key==="Home")st=0;else if(x.key==="End")st=V.length-1;else return;x.preventDefault(),V[st].focus(),xn(V[st].dataset.tab)}),ct(),mt()}(()=>{if(document.documentElement.dataset.embed==="preview")return;let n="/assets/client-2026-09/",t={box:[{src:n+"box-bag.jpg",label:"Natural Box bag",detail:"Loop handles, welded attachments and a folded side gusset."},{src:n+"detail-box.jpg",label:"Red Box bag",detail:"Fabric texture, the top hem and the finished base."}],handle:[{src:n+"handle-bag.jpg",label:"Olive Handle bag",detail:"Soft loop handles and their attachment to the top hem."},{src:n+"detail-handle.jpg",label:"Black Handle bag",detail:"Front panel, handle shape and the non-woven finish."}],dcut:[{src:n+"d-cut-bag.jpg",label:"Black D-cut bag",detail:"The integrated grip, fabric texture and finished edges."}],tshirt:[{src:n+"t-shirt-bag.jpg",label:"T-shirt bag",detail:"The centre tab, integrated handles and side folds."},{src:"/assets/client-2026-10/thank-you-stock-640.webp",label:"Thank you collection",detail:"Finished T-shirt bags photographed on the production floor."}],string:[{src:n+"string-bag.jpg",label:"String bag, upright",detail:"The gathered opening, cord and natural fabric folds."},{src:n+"detail-string.jpg",label:"String bag, laid down",detail:"The cord channel and the way the material rests."}],bottle:[]},e=document.createElement("details");e.id="product-references",e.className="reference-gallery";let i=document.createElement("summary"),s=document.createElement("span");s.textContent="Real bag references";let r=document.createElement("span");r.className="reference-gallery-count",i.append(s,r);let a=document.createElement("div");a.className="reference-gallery-grid",e.append(i,a),document.getElementById("tabs").after(e);let o=matchMedia("(max-width:760px), (max-width:1000px) and (max-height:500px)"),l=()=>{o.matches?document.querySelector("[data-pane=bag]").append(e):document.getElementById("tabs").after(e)};o.addEventListener("change",l),l();let c=document.createElement("dialog");c.id="reference-photo-dialog",c.className="reference-photo-dialog",c.setAttribute("aria-labelledby","reference-photo-title"),c.setAttribute("aria-describedby","reference-photo-description");let h=document.createElement("header");h.className="reference-photo-head";let u=document.createElement("h2");u.id="reference-photo-title";let f=document.createElement("button");f.type="button",f.textContent="Close",f.setAttribute("aria-label","Close product reference"),h.append(u,f);let d=document.createElement("img");d.className="reference-photo-image",d.decoding="async",d.width=1280,d.height=1600;let A=document.createElement("p");A.id="reference-photo-description";let _=document.createElement("div");_.className="reference-photo-controls";let p=document.createElement("button");p.type="button",p.textContent="Previous";let g=document.createElement("button");g.type="button",g.textContent="Next";let w=document.createElement("span");w.setAttribute("aria-live","polite"),w.setAttribute("aria-atomic","true"),_.append(p,w,g),c.append(h,d,A,_),document.body.appendChild(c);let M="",y=[],C=0,b=null;function S(m){if(!y.length)return;C=(m+y.length)%y.length;let v=y[C];d.src=v.src,d.alt=`Real Kobags ${v.label.toLowerCase()}`,u.textContent=v.label,A.textContent=v.detail,w.textContent=`${C+1} of ${y.length}`,p.disabled=g.disabled=y.length<2}f.addEventListener("click",()=>c.close()),c.addEventListener("click",m=>{if(m.target!==c)return;let v=c.getBoundingClientRect();(m.clientX<v.left||m.clientX>v.right||m.clientY<v.top||m.clientY>v.bottom)&&c.close()}),c.addEventListener("close",()=>{d.removeAttribute("src"),(b?.isConnected?b:i).focus({preventScroll:!0})}),c.addEventListener("keydown",m=>{(m.key==="ArrowLeft"||m.key==="ArrowRight")&&(m.preventDefault(),S(C+(m.key==="ArrowLeft"?-1:1)))}),p.addEventListener("click",()=>S(C-1)),g.addEventListener("click",()=>S(C+1));function E(){a.replaceChildren(),e.open&&y.forEach((m,v)=>{let R=document.createElement("button");R.type="button",R.className="reference-gallery-card",R.setAttribute("aria-label",`View ${m.label.toLowerCase()} production photograph`),R.setAttribute("aria-haspopup","dialog");let L=document.createElement("img");L.src=m.src,L.alt="",L.width=120,L.height=90,L.loading="lazy",L.decoding="async";let I=document.createElement("span");I.textContent=m.label,R.append(L,I),R.addEventListener("click",()=>{b=R,S(v),c.showModal(),f.focus()}),a.appendChild(R)})}function T(){M!==Z.type&&(M=Z.type,y=t[M]||[],e.hidden=!y.length,e.dataset.product=M,r.textContent=`${y.length} ${y.length===1?"photo":"photos"}`,c.open&&c.close(),E())}e.addEventListener("toggle",E),new MutationObserver(T).observe(document.getElementById("typeSub"),{childList:!0,characterData:!0,subtree:!0}),window.updateReferenceGallery=T,T()})();function Px(n,t,e,i,s=[]){let r=n.flat();if(!r.length||e<=0||i<=0)return null;let a=new Hn().setFromPoints(r).getCenter(new G),o=t.clone().normalize(),l=new G().crossVectors(jt.up,o);l.lengthSq()<1e-10&&l.set(1,0,0),l.normalize();let c=new G().crossVectors(o,l).normalize(),h=Math.tan(wr.degToRad(jt.getEffectiveFOV()/2)),u=h*jt.aspect,f=r.map(E=>{let T=E.clone().sub(a);return{x:T.dot(l),y:T.dot(c),z:T.dot(o)}}),d=Math.max(10,e*.1),A=Math.max(10,i*.1),_={left:d,right:e-d,top:A,bottom:i-A};function p(E){let T=E.left/e*2-1,m=E.right/e*2-1,v=1-E.bottom/i*2,R=1-E.top/i*2,L=(T+m)/2,I=(v+R)/2,k=(m-T)/2,B=(R-v)/2,q=ee.minDistance;for(let tt of f)q=Math.max(q,tt.z+Math.abs(tt.x/u+L*tt.z)/k,tt.z+Math.abs(tt.y/h+I*tt.z)/B,tt.z+jt.near*2);q*=1.005;let z=a.clone().addScaledVector(l,-L*q*u).addScaledVector(c,-I*q*h);return{target:z,pos:z.clone().addScaledVector(o,q)}}function g(E){let T=n.map(R=>{let L=R.map(I=>{let k=I.clone().sub(E.pos),B=-k.dot(o);return{x:(k.dot(l)/(B*u)+1)*e/2,y:(1-k.dot(c)/(B*h))*i/2}});return{left:Math.min(...L.map(I=>I.x)),right:Math.max(...L.map(I=>I.x)),top:Math.min(...L.map(I=>I.y)),bottom:Math.max(...L.map(I=>I.y))}}),m=T.some(R=>R.left<0||R.right>e||R.top<0||R.bottom>i||s.some(L=>R.left<L.right+5&&R.right>L.left-5&&R.top<L.bottom+5&&R.bottom>L.top-5)),v=(Math.max(...T.map(R=>R.right))-Math.min(...T.map(R=>R.left)))*(Math.max(...T.map(R=>R.bottom))-Math.min(...T.map(R=>R.top)));return{blocked:m,area:v}}let w=p(_);if(!g(w).blocked)return w;let M={..._,top:Math.min(_.bottom-20,Math.max(_.top,...s.map(E=>E.bottom+8)))},y=p(M),C=g(y),b=[],S=_.left;for(let E of[...s].sort((T,m)=>T.left-m.left)){let T=Math.min(_.right,E.left-8);T-S>=20&&b.push({..._,left:S,right:T}),S=Math.max(S,E.right+8)}_.right-S>=20&&b.push({..._,left:S});for(let E of b){let T=p(E),m=g(T);!m.blocked&&(C.blocked||m.area>C.area)&&(y=T,C=m)}return y}if(!li){let s=function(u){let f=qt.domElement,d=f.getBoundingClientRect();if(!d.width||!d.height)return null;Fn.updateMatrixWorld(!0);let A=[];Fn.traverseVisible(p=>{if(!p.isMesh||!p.geometry.getAttribute("position")?.count)return;let g=p.geometry;g.boundingBox||g.computeBoundingBox();let w=g.boundingBox;if(!w||w.isEmpty())return;let M=[];for(let y of[w.min.x,w.max.x])for(let C of[w.min.y,w.max.y])for(let b of[w.min.z,w.max.z])M.push(new G(y,C,b).applyMatrix4(p.matrixWorld));A.push(M)});let _=[n,document.getElementById("shot")].filter(Boolean).flatMap(p=>{if(!p.getClientRects().length)return[];let g=p.getBoundingClientRect();return g.bottom<=d.top||g.top>=d.top+d.height||g.right<=d.left||g.left>=d.left+d.width?[]:[{left:g.left-d.left,right:g.right-d.left,top:g.top-d.top,bottom:g.bottom-d.top}]});return Px(A,u,d.width,d.height,_)},o=function(){if(!e.matches)return;let u=n.value,f=u?new G(...ah[u].dir):jt.position.clone().sub(ee.target),d=s(f);d&&(qe&&u?qe.to=d:(jt.position.copy(d.pos),ee.target.copy(d.target),ee.update()),Sn=!0)},l=function(){e.matches&&(cancelAnimationFrame(a),a=requestAnimationFrame(o))},n=document.createElement("select");n.id="mobile-camera-view",n.setAttribute("aria-label","Camera view");let t=new Option("Free view","");t.disabled=!0,n.add(t);for(let[u,f]of[["34","3/4 view"],["front","Front"],["back","Back"],["side","Side"],["top","Inside"]])n.add(new Option(f,u));n.addEventListener("change",()=>Xe(n.value)),document.getElementById("stage").append(n),n.value=document.querySelector("#views button.on")?.dataset.view||"34";let e=matchMedia("(max-width:760px), (max-width:1000px) and (max-height:500px)"),i=oh;oh=function(u){return e.matches&&s(new G(...ah[u].dir))||i(u)};let r=Xe;Xe=function(u,f=!0){r(u,f),n.value=u,Sn=!0},window.__api.setView=Xe,ee.addEventListener("start",()=>{n.value=""});let a,c=qn;qn=function(){c(),l()},window.__api.rebuild=qn,new ResizeObserver(l).observe($e),e.addEventListener("change",()=>{e.matches?l():n.value&&Xe(n.value,!1)}),l();let h;new ResizeObserver(()=>{cancelAnimationFrame(h),h=requestAnimationFrame(()=>Oe())}).observe(document.getElementById("panes"))}if(!li){let g=function(){document.getElementById("artwork-canvas-dialog").open||h.append(a,s,r);let C=document.querySelector("[data-pane=bag]");C.prepend(document.getElementById("bag-view")),C.append(document.getElementById("lightBox"),document.getElementById("product-references")),n.style.setProperty("--studio-toolbar-height",`${l.offsetHeight}px`)},w=function(y,C=!1){_=y,n.dataset.panelOpen=String(y),e.inert=!y,e.setAttribute("aria-hidden",String(!y)),u.setAttribute("aria-expanded",String(y)),u.setAttribute("aria-label",y?"Hide editing panel":"Show editing panel"),u.textContent=y?"Hide \u2192":"Edit \u2630";for(let b of i.querySelectorAll("button"))b.setAttribute("aria-expanded",String(y&&b.classList.contains("on")));d.textContent=i.querySelector("button.on")?.textContent||"Your design",!y&&C&&(p?.isConnected?p:u).focus({preventScroll:!0})},n=document.documentElement,t=document.getElementById("app"),e=document.getElementById("panel"),i=document.getElementById("tabs"),s=document.querySelector(".studio-side-tools"),r=document.getElementById("shot"),a=document.getElementById("mobile-camera-view"),o=matchMedia("(max-width:760px), (max-width:1000px) and (max-height:500px)");n.classList.add("studio-workspace");let l=document.createElement("div");l.id="studio-toolbar";let c=document.createElement("div");c.className="studio-toolbar-nav";let h=document.createElement("div");h.className="studio-toolbar-view";let u=document.createElement("button");u.type="button",u.id="studio-panel-toggle",u.setAttribute("aria-controls","panel"),c.append(i,u),l.append(c,h),t.prepend(l);let f=document.createElement("div");f.className="studio-panel-heading";let d=document.createElement("strong");d.id="studio-panel-title",d.textContent="Products";let A=document.createElement("button");A.type="button",A.id="studio-panel-close",A.textContent="Hide \u2192",A.setAttribute("aria-label","Hide editing panel"),f.append(d,A),e.prepend(f),e.setAttribute("aria-labelledby",d.id);let _=!o.matches,p=u;u.addEventListener("click",()=>{p=u,w(!_)}),A.addEventListener("click",()=>w(!1,!0)),i.addEventListener("click",y=>{let C=y.target.closest("button");C&&(p=C,w(!0))}),i.addEventListener("keydown",y=>{["ArrowLeft","ArrowRight","Home","End"].includes(y.key)&&(p=document.activeElement,w(!0))});let M=xn;xn=function(y){M(y),w(_)},document.addEventListener("keydown",y=>{y.key!=="Escape"||!_||document.querySelector("dialog[open]")||y.defaultPrevented||(y.preventDefault(),w(!1,!0))}),document.getElementById("samples").addEventListener("click",y=>{o.matches&&y.target.closest(".sample")&&w(!1,!0)}),$e.addEventListener("pointerdown",()=>{o.matches&&_&&w(!1)}),document.getElementById("artwork-canvas-dialog").addEventListener("close",g),o.addEventListener("change",()=>{g(),w(!o.matches)}),new ResizeObserver(()=>n.style.setProperty("--studio-toolbar-height",`${l.offsetHeight}px`)).observe(l),g(),w(_)}if(!li){let b=function(J,H){let U=n.getBoundingClientRect();e.set((J-U.left)/U.width*2-1,1-(H-U.top)/U.height*2),jt.updateMatrixWorld(),Fn.updateMatrixWorld(!0),t.setFromCamera(e,jt);let F=t.intersectObjects(Fn.children.filter(W=>W.visible),!1)[0];if(!F||F.object!==vn||!F.uv)return null;let N=F.uv.x*Bt.AW,Y=(1-F.uv.y)*Bt.AH;for(let W of["front","back"]){let[nt,ct,at,O]=Bt[W];if(N>=nt&&N<=nt+at&&Y>=ct&&Y<=ct+O)return{which:W,x:N-nt,y:Y-ct}}return null},v=function(J,H,U){if(S!==J){S=J,E=Array.from({length:T*T},()=>[]);let F=J.getAttribute("uv"),N=J.index,Y=N?N.count:F.count;for(let W=0;W<Y;W+=3){let nt=N?N.getX(W):W,ct=N?N.getX(W+1):W+1,at=N?N.getX(W+2):W+2,O=m(Math.min(F.getX(nt),F.getX(ct),F.getX(at))-1e-7),Tt=m(Math.max(F.getX(nt),F.getX(ct),F.getX(at))+1e-7),ht=m(Math.min(F.getY(nt),F.getY(ct),F.getY(at))-1e-7),Ct=m(Math.max(F.getY(nt),F.getY(ct),F.getY(at))+1e-7);for(let mt=ht;mt<=Ct;mt++)for(let Dt=O;Dt<=Tt;Dt++)E[mt*T+Dt].push(W)}}return E[m(U)*T+m(H)]},R=function(J,H,U){let F=vn.geometry,N=F.getAttribute("uv"),Y=F.getAttribute("position"),W=F.index,nt=(Bt[J][0]+H)/Bt.AW,ct=1-(Bt[J][1]+U)/Bt.AH;for(let at of v(F,nt,ct)){let O=W?W.getX(at):at,Tt=W?W.getX(at+1):at+1,ht=W?W.getX(at+2):at+2,Ct=N.getX(O),mt=N.getY(O),Dt=N.getX(Tt),Rt=N.getY(Tt),D=N.getX(ht),x=N.getY(ht);if(nt<Math.min(Ct,Dt,D)-1e-7||nt>Math.max(Ct,Dt,D)+1e-7||ct<Math.min(mt,Rt,x)-1e-7||ct>Math.max(mt,Rt,x)+1e-7)continue;let V=(Rt-x)*(Ct-D)+(D-Dt)*(mt-x);if(Math.abs(V)<1e-12)continue;let Q=((Rt-x)*(nt-D)+(D-Dt)*(ct-x))/V,st=((x-mt)*(nt-D)+(Ct-D)*(ct-x))/V,it=1-Q-st;if(Math.min(Q,st,it)<-1e-5)continue;let gt=new G(Y.getX(O)*Q+Y.getX(Tt)*st+Y.getX(ht)*it,Y.getY(O)*Q+Y.getY(Tt)*st+Y.getY(ht)*it,Y.getZ(O)*Q+Y.getZ(Tt)*st+Y.getZ(ht)*it);gt.applyMatrix4(vn.matrixWorld).project(jt);let pt=n.getBoundingClientRect();return{x:pt.left+(gt.x+1)*pt.width/2,y:pt.top+(1-gt.y)*pt.height/2,z:gt.z}}return null},L=function(J,H){Nt!==J&&(Nt=J,$i()),wi(H),tr()},I=function(J=!1){let H=oe(),U=n.getBoundingClientRect(),F=$e.getBoundingClientRect(),N=!!document.querySelector("#artwork-canvas-dialog[open]"),Y=[vn.geometry.uuid,Nt,on,H?.x,H?.y,H?.w,U.width,U.height,N,...jt.matrixWorld.elements].join("|"),W=Nt+"|"+Kt[Nt].map(Dt=>Dt.id+":"+C(Dt)).join("|");if(!J&&Y===g&&W===w||(g=Y,W!==w&&(l.replaceChildren(new Option("Select artwork\u2026","")),Kt[Nt].forEach((Dt,Rt)=>l.add(new Option(`${Rt+1}. ${C(Dt).replace(/\s+/g," ").slice(0,36)}`,String(Dt.id)))),w=W),l.value=String(on??""),l.disabled=!Kt[Nt].length,d.disabled=A.disabled=_.disabled=!H,c.textContent=H?`${An(H.w)} cm`:"",o.hidden=N||!H&&document.documentElement.classList.contains("studio-organized"),h.hidden=N,h.textContent=H?"Drag artwork \xB7 use \u2198 or +/\u2212 to resize":"Tap artwork to edit \xB7 drag an empty area to rotate",s.setAttribute("hidden",""),a.hidden=!0,M=!1,!H||N))return;Fn.updateMatrixWorld(!0),jt.updateMatrixWorld();let[nt,ct]=Ri(H),at=R(Nt,H.x,H.y);if(!at||at.z<-1||at.z>1)return;let O=b(at.x,at.y);if(!O||O.which!==Nt)return;let Tt=[[-1,-1],[1,-1],[1,1],[-1,1]].map(([Dt,Rt])=>R(Nt,H.x+Dt*nt/2,H.y+Rt*ct/2));if(Tt.some(Dt=>!Dt||Dt.z<-1||Dt.z>1))return;r.setAttribute("points",Tt.map(Dt=>`${Dt.x-F.left},${Dt.y-F.top}`).join(" ")),s.dataset.selectedId=String(H.id),s.dataset.side=Nt,s.removeAttribute("hidden"),a.hidden=!1,M=!0;let ht=Tt[2].x-at.x,Ct=Tt[2].y-at.y,mt=Math.max(1,Math.hypot(ht,Ct));a.style.left=`${Math.max(24,Math.min(F.width-24,Tt[2].x-F.left+ht/mt*26))}px`,a.style.top=`${Math.max(24,Math.min(U.height-24,Tt[2].y-F.top+Ct/mt*26))}px`},k=function(J,H,U,F){qe=null;let N=jt.position.clone(),Y=ee.target.clone(),W=ee.enableDamping;ee.enableDamping=!1,ee.update(),jt.position.copy(N),ee.target.copy(Y),ee.update(),ee.enableDamping=W,ee.enabled=!1,L(F.which,H.id);let nt=R(Nt,H.x,H.y),ct=R(Nt,H.x+.2,H.y),at=R(Nt,H.x,H.y+.2);if(!nt||!ct||!at){ee.enabled=!0;return}p={item:H,which:Nt,mode:U,start:{x:J.clientX,y:J.clientY},x:H.x,y:H.y,w:H.w,point:F,centre:nt,bx:{x:(ct.x-nt.x)/.2,y:(ct.y-nt.y)/.2},by:{x:(at.x-nt.x)/.2,y:(at.y-nt.y)/.2},radius:Math.max(12,Math.hypot(J.clientX-nt.x,J.clientY-nt.y))},y.set(J.pointerId,{x:J.clientX,y:J.clientY}),n.setPointerCapture(J.pointerId),J.preventDefault(),J.stopImmediatePropagation(),n.focus({preventScroll:!0})},B=function(J){if(J.button!==0)return;if(p){y.set(J.pointerId,{x:J.clientX,y:J.clientY}),n.setPointerCapture(J.pointerId);let U=[...y.values()];U.length===2&&(p.pinch=Math.max(8,Math.hypot(U[0].x-U[1].x,U[0].y-U[1].y)),p.pinchWidth=p.item.w),J.preventDefault(),J.stopImmediatePropagation();return}let H=b(J.clientX,J.clientY);if(H){let U=Kt[H.which];for(let F=U.length-1;F>=0;F--){let N=U[F],[Y,W]=Ri(N);if(Math.abs(H.x-N.x)<=Y/2&&Math.abs(H.y-N.y)<=W/2){k(J,N,"move",H);return}}}wi(null),I(!0)},q=function(J){if(!p||!y.has(J.pointerId))return;J.preventDefault(),J.stopImmediatePropagation(),y.set(J.pointerId,{x:J.clientX,y:J.clientY});let H=p,U=H.item;if(Nt!==H.which||!Kt[Nt].includes(U)){z();return}if(y.size>1&&H.pinch){let F=[...y.values()];U.w=Math.max(Ks(U),H.pinchWidth*Math.hypot(F[0].x-F[1].x,F[0].y-F[1].y)/H.pinch)}else if(H.mode==="resize")U.w=Math.max(Ks(U),H.w*Math.hypot(J.clientX-H.centre.x,J.clientY-H.centre.y)/H.radius);else{let F=b(J.clientX,J.clientY);if(F&&F.which===H.which)U.x=H.x+F.x-H.point.x,U.y=H.y+F.y-H.point.y;else{let N=J.clientX-H.start.x,Y=J.clientY-H.start.y,W=H.bx.x*H.by.y-H.bx.y*H.by.x;Math.abs(W)>1e-5&&(U.x=H.x+(N*H.by.y-Y*H.by.x)/W,U.y=H.y+(Y*H.bx.x-N*H.bx.y)/W)}}ze(U),de(),Me()},z=function(){let J=[...y.keys()];y.clear(),p=null,ee.enabled=!0;for(let H of J)n.hasPointerCapture(H)&&n.releasePointerCapture(H);tr(),I(!0)},tt=function(J){if(y.has(J.pointerId)){if(J.preventDefault(),J.stopImmediatePropagation(),y.size>1&&J.type==="pointerup"){y.delete(J.pointerId),n.hasPointerCapture(J.pointerId)&&n.releasePointerCapture(J.pointerId);let H=[...y.values()][0],U=p,F=b(H.x,H.y);U.pinch=null,U.mode="move",U.start=H,U.x=U.item.x,U.y=U.item.y,U.w=U.item.w,U.point=F&&F.which===U.which?F:{which:U.which,x:U.item.x,y:U.item.y};return}z()}},n=qt.domElement,t=new Na,e=new At,i="http://www.w3.org/2000/svg",s=document.createElementNS(i,"svg");s.id="direct-artwork-outline",s.setAttribute("aria-hidden","true");let r=document.createElementNS(i,"polygon");s.append(r);let a=document.createElement("button");a.id="direct-artwork-resize",a.type="button",a.textContent="\u2198",a.setAttribute("aria-label","Resize selected artwork. Drag or use arrow keys.");let o=document.createElement("div");o.id="direct-artwork-tools",o.setAttribute("role","group"),o.setAttribute("aria-label","Edit artwork on the bag");let l=document.createElement("select");l.id="direct-artwork-picker",l.setAttribute("aria-label","Select artwork on the bag");let c=document.createElement("output");c.id="direct-artwork-width",c.setAttribute("aria-label","Artwork width");let h=document.createElement("p");h.id="direct-artwork-hint",h.textContent="Tap artwork to edit \xB7 drag an empty area to rotate";let u=(J,H,U)=>{let F=document.createElement("button");return F.type="button",F.textContent=H,F.setAttribute("aria-label",J),F.addEventListener("click",U),F},f=J=>{let H=oe();H&&(H.w=Math.max(Ks(H),H.w+J),ze(H),de(),Me())},d=u("Shrink selected artwork","\u2212",()=>f(-.5)),A=u("Enlarge selected artwork","+",()=>f(.5)),_=u("Finish editing artwork","Done",()=>{wi(null),n.focus({preventScroll:!0})});o.append(l,d,c,A,_),$e.append(s,a,o,h),n.tabIndex=0,n.setAttribute("aria-label","3D bag. Tap artwork to select and drag it. Drag an empty area to rotate.");let p=null,g="",w="",M=!1,y=new Map,C=J=>J.kind==="logo"?Ci.get(J.asset)?.name||"Logo":J.kind==="text"?J.text||"Text":J.kind==="qr"?"QR code":"Artwork",S=null,E=[],T=48,m=J=>Math.max(0,Math.min(T-1,Math.floor(J*T)));l.addEventListener("change",()=>{L(Nt,l.value?Number(l.value):null),oe()&&Xe(Nt,!1),I(!0)}),n.addEventListener("pointerdown",B,{capture:!0}),n.addEventListener("pointermove",q,{capture:!0}),n.addEventListener("pointerup",tt,{capture:!0}),n.addEventListener("pointercancel",tt,{capture:!0}),n.addEventListener("lostpointercapture",J=>{y.has(J.pointerId)&&z()}),a.addEventListener("pointerdown",J=>{J.button===0&&oe()&&M&&k(J,oe(),"resize",{which:Nt,x:oe().x,y:oe().y})});let ot=J=>{let H=oe();if(!H)return;let U=J.shiftKey?1:.2,F={ArrowLeft:[-U,0],ArrowRight:[U,0],ArrowUp:[0,-U],ArrowDown:[0,U]};if(F[J.key])H.x+=F[J.key][0],H.y+=F[J.key][1];else if(J.key==="+"||J.key==="=")H.w+=.5;else if(J.key==="-")H.w=Math.max(Ks(H),H.w-.5);else if(J.key==="Escape"){wi(null),I(!0),J.preventDefault();return}else return;J.preventDefault(),ze(H),de(),Me()};n.addEventListener("keydown",ot),a.addEventListener("keydown",J=>{["ArrowRight","ArrowUp","+","=","Enter"," "].includes(J.key)?(J.preventDefault(),f(.5)):["ArrowLeft","ArrowDown","-"].includes(J.key)?(J.preventDefault(),f(-.5)):ot(J)}),window.addEventListener("blur",()=>{p&&z()}),window.addEventListener("resize",()=>{p&&z()}),document.addEventListener("visibilitychange",()=>{document.hidden&&p&&z()}),n.addEventListener("webglcontextlost",()=>{p&&z()});let ut=de;de=function(){ut(),I(!0)};let Et=$s;$s=function(J=!1){let H=qt.info.render.frame;Et(J),(J||H!==qt.info.render.frame)&&I()},new ResizeObserver(()=>{p&&z(),I(!0)}).observe($e),I(!0)}if(!li){let E=function(){u.open||(g.append(r,a),p.append(document.getElementById("bag-view"),document.getElementById("lightBox"),document.getElementById("product-references")),document.querySelector(".studio-toolbar-view").append(o),C.after(l,c,Ir),b.append(h,document.getElementById("sideSeg")),h.textContent="Precise placement",l.hidden=!1)},T=function(){l.hidden=!1,S.hidden=!!oe()||u.open,document.getElementById("direct-artwork-tools").hidden=!oe()||u.open,n.dataset.artworkSelected=String(!!oe())},n=document.documentElement;n.classList.add("studio-organized");let t=document.getElementById("tabs"),e=document.querySelector("[data-pane=bag]"),i=document.getElementById("designSec"),s=document.getElementById("panel"),r=document.getElementById("mobile-camera-view"),a=document.getElementById("shot"),o=document.querySelector(".studio-side-tools"),l=document.getElementById("studio-add-artwork"),c=document.querySelector(".studio-artwork-picker"),h=document.getElementById("expand-artwork-canvas"),u=document.getElementById("artwork-canvas-dialog"),f=t.querySelector("[data-tab=bag]"),d=t.querySelector("[data-tab=design]"),A=t.querySelector("[data-tab=samples]");f.textContent="Bag",d.textContent="Design",A.textContent="Templates",t.append(f,d,A),t.setAttribute("aria-label","Studio tools"),document.querySelector("[data-pane=samples] .lead").textContent="Optional starting designs. Choose one to replace the current design.";let _=(R,L)=>{let I=document.createElement("details");I.className="studio-options",I.id=L;let k=document.createElement("summary");return k.textContent=R,I.append(k),I},p=_("View, lighting & references","studio-view-options");e.append(p);let g=document.createElement("div");g.className="studio-view-options-row",p.append(g);let w=document.getElementById("handlesSec"),M=_("Handle options","studio-handle-options"),y=document.getElementById("handlesTitle");M.querySelector("summary").replaceChildren(y),M.append(...Array.from(w.childNodes).filter(R=>R!==y)),w.append(M);let C=document.createElement("p");C.className="studio-design-intro",C.textContent="Add your artwork. Move and resize it directly on the bag.";let b=document.createElement("div");b.className="studio-design-extras",i.prepend(C),i.append(b);let S=document.createElement("div");S.id="studio-add-dock",S.setAttribute("role","group"),S.setAttribute("aria-label","Add to this side");for(let[R,L]of[["+ Logo","addLogo"],["+ Text","addText"],["+ QR","addQr"]]){let I=document.createElement("button");I.type="button",I.textContent=R,I.addEventListener("click",()=>{if(L==="addLogo"){document.getElementById(L).click();return}d.click(),document.getElementById(L).click()}),S.append(I)}$e.append(S);let m=de;de=function(){m(),T()};let v=xn;xn=function(R){v(R),T()},new MutationObserver(()=>{l.hidden&&(l.hidden=!1)}).observe(l,{attributes:!0,attributeFilter:["hidden"]}),u.addEventListener("close",()=>{E(),T()}),u.addEventListener("toggle",T),matchMedia("(max-width:760px), (max-width:1000px) and (max-height:500px)").addEventListener("change",()=>{E(),T()}),s.addEventListener("click",R=>{let L=R.target.closest("[data-go]");L&&t.querySelector(`[data-tab="${L.dataset.go}"]`)?.click()}),E(),xn("bag"),T()}if(li){let n=setInterval(()=>{if(!Br)return;clearInterval(n),qt.setAnimationLoop(null),ee.enabled=!1,qt.setPixelRatio(Math.min(devicePixelRatio,1.2)),qt.setClearColor(15988465,1),Ne.background=new Ot(15988465);let t=[],e=[es.findIndex(C=>C.type==="tshirt"),0,2,es.findIndex(C=>C.type==="bottle")];for(let C of e){Js(Math.max(0,C));let b=new Map,S=new Map,E=B=>{if(!B||![ts,Pi,so,ro].includes(B))return B;if(b.has(B))return b.get(B);let q=B.image,z=document.createElement("canvas"),tt=Math.min(1,1024/Math.max(q.width,q.height));z.width=Math.max(1,Math.round(q.width*tt)),z.height=Math.max(1,Math.round(q.height*tt)),z.getContext("2d").drawImage(q,0,0,z.width,z.height);let ot=B.clone();return ot.source=new Ps(z),ot.needsUpdate=!0,b.set(B,ot),ot},T=B=>{if(S.has(B))return S.get(B);let q=B.clone();q.isMeshPhysicalMaterial&&(q.transmission=0),q.onBeforeCompile=B.onBeforeCompile,q.customProgramCacheKey=B.customProgramCacheKey;for(let z of["map","alphaMap","bumpMap","roughnessMap","normalMap"])q[z]=E(B[z]);return S.set(B,q),q},m=Fn.clone(!0);m.traverse(B=>{B.isMesh&&(B.geometry=B.geometry.clone(),B.material=T(B.material),B.customDepthMaterial&&(B.customDepthMaterial=T(B.customDepthMaterial)))});let v=new Hn().setFromObject(m),R=v.getSize(new G),L=v.getCenter(new G),I=.53/Math.max(R.y,R.x*1.15);m.scale.setScalar(I),m.position.set(-L.x*I,.055-v.min.y*I,-L.z*I);let k=new ni;k.add(m),Ne.add(k),k.visible=!1,t.push(k)}Fn.visible=!1,Ud.visible=!1;let i=new le(new Ra(.205,.22,.05,64),new _r({color:15002333,roughness:.95}));i.position.y=.025,i.receiveShadow=!0,i.castShadow=!0,Ne.add(i),mo.visible=!1;let s=document.createElement("canvas");s.width=128,s.height=128;let r=s.getContext("2d"),a=r.createRadialGradient(64,64,14,64,64,64);a.addColorStop(0,"rgba(26,48,37,.25)"),a.addColorStop(1,"rgba(26,48,37,0)"),r.fillStyle=a,r.fillRect(0,0,128,128);let o=new le(new Wn(.64,.55),new Gn({map:new pn(s),transparent:!0,depthWrite:!1}));o.rotation.x=-Math.PI/2,o.position.y=.001,Ne.add(o),Object.assign(Le.shadow.camera,{left:-.7,right:.7,top:1,bottom:-.4,near:.1,far:4}),Le.shadow.camera.updateProjectionMatrix(),Le.shadow.mapSize.set(1024,1024),Le.shadow.map?.dispose(),Le.shadow.map=null,Le.position.set(-.6,1.3,1),Le.target.position.set(0,.25,0),qe=null;let l=!1,c=!1,h=0,u=.35,f=0,d=!0,A=matchMedia("(prefers-reduced-motion: reduce)"),_=0,p=0,g=()=>{let C=$e.clientWidth,b=$e.clientHeight;return(C!==_||b!==p)&&(qt.setSize(C,b,!1),_=C,p=b),{w:C,h:b,cols:parent.innerWidth<=760?2:4}};function w(){let{w:C,h:b,cols:S}=g(),E=4/S,T=C/S,m=b/E;qt.setScissorTest(!1),qt.setViewport(0,0,C,b),qt.clear(),qt.setScissorTest(!0),jt.aspect=T/(m-44),jt.fov=30;let v=Math.max(.76/Math.tan(Math.PI/12)/2,.52/Math.tan(Math.PI/12)/2/jt.aspect);jt.position.set(0,.34+v*.15,v),jt.lookAt(0,.3,0),jt.updateProjectionMatrix(),t.forEach((R,L)=>{R.visible=!0,R.rotation.y=u+L*.12;let I=Math.round(L%S*T),k=Math.round((E-1-Math.floor(L/S))*m);qt.setViewport(I,k+44,Math.ceil(T),Math.ceil(m-44)),qt.setScissor(I,k+44,Math.ceil(T),Math.ceil(m-44)),qt.render(Ne,jt),R.visible=!1}),qt.setScissorTest(!1),d=!1}function M(C){f=0,!(!l||document.hidden)&&((d||!c&&!A.matches&&C-h>=30)&&(!c&&!A.matches&&h&&(u+=Math.min(.15,(C-h)/1e3)*.3),w(),h=C),!c&&!A.matches&&(f=requestAnimationFrame(M)))}let y=()=>{d=!0,h=0,f&&cancelAnimationFrame(f),f=requestAnimationFrame(M)};window.addEventListener("message",C=>{C.source!==parent||C.origin!==location.origin||C.data?.type!=="kobags:showcase"||(l=C.data.visible===!0,c=C.data.paused===!0,y())}),document.addEventListener("visibilitychange",y),A.addEventListener("change",y),new ResizeObserver(y).observe($e),window.addEventListener("pagehide",()=>{cancelAnimationFrame(f),qt.setAnimationLoop(null)}),window.__showcase={models:t,renderer:qt,performanceVersion:2,get angle(){return u},get paused(){return c||A.matches},get visible(){return l}},w(),parent.postMessage({type:"kobags:showcase-ready"},location.origin)},80)}
