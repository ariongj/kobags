var kf=Object.create;var gh=Object.defineProperty;var Hf=Object.getOwnPropertyDescriptor;var Vf=Object.getOwnPropertyNames;var Gf=Object.getPrototypeOf,Wf=Object.prototype.hasOwnProperty;var Xf=(n,t)=>()=>{try{return t||n((t={exports:{}}).exports,t),t.exports}catch(e){throw t=0,e}};var qf=(n,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Vf(t))!Wf.call(n,s)&&s!==e&&gh(n,s,{get:()=>t[s],enumerable:!(i=Hf(t,s))||i.enumerable});return n};var Yf=(n,t,e)=>(e=n!=null?kf(Gf(n)):{},qf(t||!n||!n.__esModule?gh(e,"default",{value:n,enumerable:!0}):e,n));var yh=Xf((vh,xh)=>{var Ah=(function(){var n=function(M,x){var _=236,P=17,S=M,w=e[x],T=null,C=0,g=null,v=[],I={},B=function(L,G){C=S*4+17,T=(function(N){for(var q=new Array(N),Y=0;Y<N;Y+=1){q[Y]=new Array(N);for(var it=0;it<N;it+=1)q[Y][it]=null}return q})(C),U(0,0),U(C-7,0),U(0,C-7),Z(),k(),$(L,G),S>=7&&V(L),g==null&&(g=Tt(S,w,v)),rt(g,G)},U=function(L,G){for(var N=-1;N<=7;N+=1)if(!(L+N<=-1||C<=L+N))for(var q=-1;q<=7;q+=1)G+q<=-1||C<=G+q||(0<=N&&N<=6&&(q==0||q==6)||0<=q&&q<=6&&(N==0||N==6)||2<=N&&N<=4&&2<=q&&q<=4?T[L+N][G+q]=!0:T[L+N][G+q]=!1)},z=function(){for(var L=0,G=0,N=0;N<8;N+=1){B(!0,N);var q=s.getLostPoint(I);(N==0||L>q)&&(L=q,G=N)}return G},k=function(){for(var L=8;L<C-8;L+=1)T[L][6]==null&&(T[L][6]=L%2==0);for(var G=8;G<C-8;G+=1)T[6][G]==null&&(T[6][G]=G%2==0)},Z=function(){for(var L=s.getPatternPosition(S),G=0;G<L.length;G+=1)for(var N=0;N<L.length;N+=1){var q=L[G],Y=L[N];if(T[q][Y]==null)for(var it=-2;it<=2;it+=1)for(var ft=-2;ft<=2;ft+=1)it==-2||it==2||ft==-2||ft==2||it==0&&ft==0?T[q+it][Y+ft]=!0:T[q+it][Y+ft]=!1}},V=function(L){for(var G=s.getBCHTypeNumber(S),N=0;N<18;N+=1){var q=!L&&(G>>N&1)==1;T[Math.floor(N/3)][N%3+C-8-3]=q}for(var N=0;N<18;N+=1){var q=!L&&(G>>N&1)==1;T[N%3+C-8-3][Math.floor(N/3)]=q}},$=function(L,G){for(var N=w<<3|G,q=s.getBCHTypeInfo(N),Y=0;Y<15;Y+=1){var it=!L&&(q>>Y&1)==1;Y<6?T[Y][8]=it:Y<8?T[Y+1][8]=it:T[C-15+Y][8]=it}for(var Y=0;Y<15;Y+=1){var it=!L&&(q>>Y&1)==1;Y<8?T[8][C-Y-1]=it:Y<9?T[8][15-Y-1+1]=it:T[8][15-Y-1]=it}T[C-8][8]=!L},rt=function(L,G){for(var N=-1,q=C-1,Y=7,it=0,ft=s.getMaskFunction(G),ct=C-1;ct>0;ct-=2)for(ct==6&&(ct-=1);;){for(var D=0;D<2;D+=1)if(T[q][ct-D]==null){var Gt=!1;it<L.length&&(Gt=(L[it]>>>Y&1)==1);var ut=ft(q,ct-D);ut&&(Gt=!Gt),T[q][ct-D]=Gt,Y-=1,Y==-1&&(it+=1,Y=7)}if(q+=N,q<0||C<=q){q-=N,N=-N;break}}},ot=function(L,G){for(var N=0,q=0,Y=0,it=new Array(G.length),ft=new Array(G.length),ct=0;ct<G.length;ct+=1){var D=G[ct].dataCount,Gt=G[ct].totalCount-D;q=Math.max(q,D),Y=Math.max(Y,Gt),it[ct]=new Array(D);for(var ut=0;ut<it[ct].length;ut+=1)it[ct][ut]=255&L.getBuffer()[ut+N];N+=D;var Dt=s.getErrorCorrectPolynomial(Gt),bt=a(it[ct],Dt.getLength()-1),qt=bt.mod(Dt);ft[ct]=new Array(Dt.getLength()-1);for(var ut=0;ut<ft[ct].length;ut+=1){var It=ut+qt.getLength()-ft[ct].length;ft[ct][ut]=It>=0?qt.getAt(It):0}}for(var R=0,ut=0;ut<G.length;ut+=1)R+=G[ut].totalCount;for(var b=new Array(R),X=0,ut=0;ut<q;ut+=1)for(var ct=0;ct<G.length;ct+=1)ut<it[ct].length&&(b[X]=it[ct][ut],X+=1);for(var ut=0;ut<Y;ut+=1)for(var ct=0;ct<G.length;ct+=1)ut<ft[ct].length&&(b[X]=ft[ct][ut],X+=1);return b},Tt=function(L,G,N){for(var q=o.getRSBlocks(L,G),Y=l(),it=0;it<N.length;it+=1){var ft=N[it];Y.put(ft.getMode(),4),Y.put(ft.getLength(),s.getLengthInBits(ft.getMode(),L)),ft.write(Y)}for(var ct=0,it=0;it<q.length;it+=1)ct+=q[it].dataCount;if(Y.getLengthInBits()>ct*8)throw"code length overflow. ("+Y.getLengthInBits()+">"+ct*8+")";for(Y.getLengthInBits()+4<=ct*8&&Y.put(0,4);Y.getLengthInBits()%8!=0;)Y.putBit(!1);for(;!(Y.getLengthInBits()>=ct*8||(Y.put(_,8),Y.getLengthInBits()>=ct*8));)Y.put(P,8);return ot(Y,q)};I.addData=function(L,G){G=G||"Byte";var N=null;switch(G){case"Numeric":N=c(L);break;case"Alphanumeric":N=h(L);break;case"Byte":N=u(L);break;case"Kanji":N=d(L);break;default:throw"mode:"+G}v.push(N),g=null},I.isDark=function(L,G){if(L<0||C<=L||G<0||C<=G)throw L+","+G;return T[L][G]},I.getModuleCount=function(){return C},I.make=function(){if(S<1){for(var L=1;L<40;L++){for(var G=o.getRSBlocks(L,w),N=l(),q=0;q<v.length;q++){var Y=v[q];N.put(Y.getMode(),4),N.put(Y.getLength(),s.getLengthInBits(Y.getMode(),L)),Y.write(N)}for(var it=0,q=0;q<G.length;q++)it+=G[q].dataCount;if(N.getLengthInBits()<=it*8)break}S=L}B(!1,z())},I.createTableTag=function(L,G){L=L||2,G=typeof G>"u"?L*4:G;var N="";N+='<table style="',N+=" border-width: 0px; border-style: none;",N+=" border-collapse: collapse;",N+=" padding: 0px; margin: "+G+"px;",N+='">',N+="<tbody>";for(var q=0;q<I.getModuleCount();q+=1){N+="<tr>";for(var Y=0;Y<I.getModuleCount();Y+=1)N+='<td style="',N+=" border-width: 0px; border-style: none;",N+=" border-collapse: collapse;",N+=" padding: 0px; margin: 0px;",N+=" width: "+L+"px;",N+=" height: "+L+"px;",N+=" background-color: ",N+=I.isDark(q,Y)?"#000000":"#ffffff",N+=";",N+='"/>';N+="</tr>"}return N+="</tbody>",N+="</table>",N},I.createSvgTag=function(L,G,N,q){var Y={};typeof arguments[0]=="object"&&(Y=arguments[0],L=Y.cellSize,G=Y.margin,N=Y.alt,q=Y.title),L=L||2,G=typeof G>"u"?L*4:G,N=typeof N=="string"?{text:N}:N||{},N.text=N.text||null,N.id=N.text?N.id||"qrcode-description":null,q=typeof q=="string"?{text:q}:q||{},q.text=q.text||null,q.id=q.text?q.id||"qrcode-title":null;var it=I.getModuleCount()*L+G*2,ft,ct,D,Gt,ut="",Dt;for(Dt="l"+L+",0 0,"+L+" -"+L+",0 0,-"+L+"z ",ut+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',ut+=Y.scalable?"":' width="'+it+'px" height="'+it+'px"',ut+=' viewBox="0 0 '+it+" "+it+'" ',ut+=' preserveAspectRatio="xMinYMin meet"',ut+=q.text||N.text?' role="img" aria-labelledby="'+Bt([q.id,N.id].join(" ").trim())+'"':"",ut+=">",ut+=q.text?'<title id="'+Bt(q.id)+'">'+Bt(q.text)+"</title>":"",ut+=N.text?'<description id="'+Bt(N.id)+'">'+Bt(N.text)+"</description>":"",ut+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',ut+='<path d="',D=0;D<I.getModuleCount();D+=1)for(Gt=D*L+G,ft=0;ft<I.getModuleCount();ft+=1)I.isDark(D,ft)&&(ct=ft*L+G,ut+="M"+ct+","+Gt+Dt);return ut+='" stroke="transparent" fill="black"/>',ut+="</svg>",ut},I.createDataURL=function(L,G){L=L||2,G=typeof G>"u"?L*4:G;var N=I.getModuleCount()*L+G*2,q=G,Y=N-G;return m(N,N,function(it,ft){if(q<=it&&it<Y&&q<=ft&&ft<Y){var ct=Math.floor((it-q)/L),D=Math.floor((ft-q)/L);return I.isDark(D,ct)?0:1}else return 1})},I.createImgTag=function(L,G,N){L=L||2,G=typeof G>"u"?L*4:G;var q=I.getModuleCount()*L+G*2,Y="";return Y+="<img",Y+=' src="',Y+=I.createDataURL(L,G),Y+='"',Y+=' width="',Y+=q,Y+='"',Y+=' height="',Y+=q,Y+='"',N&&(Y+=' alt="',Y+=Bt(N),Y+='"'),Y+="/>",Y};var Bt=function(L){for(var G="",N=0;N<L.length;N+=1){var q=L.charAt(N);switch(q){case"<":G+="&lt;";break;case">":G+="&gt;";break;case"&":G+="&amp;";break;case'"':G+="&quot;";break;default:G+=q;break}}return G},tt=function(L){var G=1;L=typeof L>"u"?G*2:L;var N=I.getModuleCount()*G+L*2,q=L,Y=N-L,it,ft,ct,D,Gt,ut={"\u2588\u2588":"\u2588","\u2588 ":"\u2580"," \u2588":"\u2584","  ":" "},Dt={"\u2588\u2588":"\u2580","\u2588 ":"\u2580"," \u2588":" ","  ":" "},bt="";for(it=0;it<N;it+=2){for(ct=Math.floor((it-q)/G),D=Math.floor((it+1-q)/G),ft=0;ft<N;ft+=1)Gt="\u2588",q<=ft&&ft<Y&&q<=it&&it<Y&&I.isDark(ct,Math.floor((ft-q)/G))&&(Gt=" "),q<=ft&&ft<Y&&q<=it+1&&it+1<Y&&I.isDark(D,Math.floor((ft-q)/G))?Gt+=" ":Gt+="\u2588",bt+=L<1&&it+1>=Y?Dt[Gt]:ut[Gt];bt+=`
`}return N%2&&L>0?bt.substring(0,bt.length-N-1)+Array(N+1).join("\u2580"):bt.substring(0,bt.length-1)};return I.createASCII=function(L,G){if(L=L||1,L<2)return tt(G);L-=1,G=typeof G>"u"?L*2:G;var N=I.getModuleCount()*L+G*2,q=G,Y=N-G,it,ft,ct,D,Gt=Array(L+1).join("\u2588\u2588"),ut=Array(L+1).join("  "),Dt="",bt="";for(it=0;it<N;it+=1){for(ct=Math.floor((it-q)/L),bt="",ft=0;ft<N;ft+=1)D=1,q<=ft&&ft<Y&&q<=it&&it<Y&&I.isDark(ct,Math.floor((ft-q)/L))&&(D=0),bt+=D?Gt:ut;for(ct=0;ct<L;ct+=1)Dt+=bt+`
`}return Dt.substring(0,Dt.length-1)},I.renderTo2dContext=function(L,G){G=G||2;for(var N=I.getModuleCount(),q=0;q<N;q++)for(var Y=0;Y<N;Y++)L.fillStyle=I.isDark(q,Y)?"black":"white",L.fillRect(q*G,Y*G,G,G)},I};n.stringToBytesFuncs={default:function(M){for(var x=[],_=0;_<M.length;_+=1){var P=M.charCodeAt(_);x.push(P&255)}return x}},n.stringToBytes=n.stringToBytesFuncs.default,n.createStringToBytes=function(M,x){var _=(function(){for(var S=y(M),w=function(){var k=S.read();if(k==-1)throw"eof";return k},T=0,C={};;){var g=S.read();if(g==-1)break;var v=w(),I=w(),B=w(),U=String.fromCharCode(g<<8|v),z=I<<8|B;C[U]=z,T+=1}if(T!=x)throw T+" != "+x;return C})(),P=63;return function(S){for(var w=[],T=0;T<S.length;T+=1){var C=S.charCodeAt(T);if(C<128)w.push(C);else{var g=_[S.charAt(T)];typeof g=="number"?(g&255)==g?w.push(g):(w.push(g>>>8),w.push(g&255)):w.push(P)}}return w}};var t={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},e={L:1,M:0,Q:3,H:2},i={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},s=(function(){var M=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],x=1335,_=7973,P=21522,S={},w=function(T){for(var C=0;T!=0;)C+=1,T>>>=1;return C};return S.getBCHTypeInfo=function(T){for(var C=T<<10;w(C)-w(x)>=0;)C^=x<<w(C)-w(x);return(T<<10|C)^P},S.getBCHTypeNumber=function(T){for(var C=T<<12;w(C)-w(_)>=0;)C^=_<<w(C)-w(_);return T<<12|C},S.getPatternPosition=function(T){return M[T-1]},S.getMaskFunction=function(T){switch(T){case i.PATTERN000:return function(C,g){return(C+g)%2==0};case i.PATTERN001:return function(C,g){return C%2==0};case i.PATTERN010:return function(C,g){return g%3==0};case i.PATTERN011:return function(C,g){return(C+g)%3==0};case i.PATTERN100:return function(C,g){return(Math.floor(C/2)+Math.floor(g/3))%2==0};case i.PATTERN101:return function(C,g){return C*g%2+C*g%3==0};case i.PATTERN110:return function(C,g){return(C*g%2+C*g%3)%2==0};case i.PATTERN111:return function(C,g){return(C*g%3+(C+g)%2)%2==0};default:throw"bad maskPattern:"+T}},S.getErrorCorrectPolynomial=function(T){for(var C=a([1],0),g=0;g<T;g+=1)C=C.multiply(a([1,r.gexp(g)],0));return C},S.getLengthInBits=function(T,C){if(1<=C&&C<10)switch(T){case t.MODE_NUMBER:return 10;case t.MODE_ALPHA_NUM:return 9;case t.MODE_8BIT_BYTE:return 8;case t.MODE_KANJI:return 8;default:throw"mode:"+T}else if(C<27)switch(T){case t.MODE_NUMBER:return 12;case t.MODE_ALPHA_NUM:return 11;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 10;default:throw"mode:"+T}else if(C<41)switch(T){case t.MODE_NUMBER:return 14;case t.MODE_ALPHA_NUM:return 13;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 12;default:throw"mode:"+T}else throw"type:"+C},S.getLostPoint=function(T){for(var C=T.getModuleCount(),g=0,v=0;v<C;v+=1)for(var I=0;I<C;I+=1){for(var B=0,U=T.isDark(v,I),z=-1;z<=1;z+=1)if(!(v+z<0||C<=v+z))for(var k=-1;k<=1;k+=1)I+k<0||C<=I+k||z==0&&k==0||U==T.isDark(v+z,I+k)&&(B+=1);B>5&&(g+=3+B-5)}for(var v=0;v<C-1;v+=1)for(var I=0;I<C-1;I+=1){var Z=0;T.isDark(v,I)&&(Z+=1),T.isDark(v+1,I)&&(Z+=1),T.isDark(v,I+1)&&(Z+=1),T.isDark(v+1,I+1)&&(Z+=1),(Z==0||Z==4)&&(g+=3)}for(var v=0;v<C;v+=1)for(var I=0;I<C-6;I+=1)T.isDark(v,I)&&!T.isDark(v,I+1)&&T.isDark(v,I+2)&&T.isDark(v,I+3)&&T.isDark(v,I+4)&&!T.isDark(v,I+5)&&T.isDark(v,I+6)&&(g+=40);for(var I=0;I<C;I+=1)for(var v=0;v<C-6;v+=1)T.isDark(v,I)&&!T.isDark(v+1,I)&&T.isDark(v+2,I)&&T.isDark(v+3,I)&&T.isDark(v+4,I)&&!T.isDark(v+5,I)&&T.isDark(v+6,I)&&(g+=40);for(var V=0,I=0;I<C;I+=1)for(var v=0;v<C;v+=1)T.isDark(v,I)&&(V+=1);var $=Math.abs(100*V/C/C-50)/5;return g+=$*10,g},S})(),r=(function(){for(var M=new Array(256),x=new Array(256),_=0;_<8;_+=1)M[_]=1<<_;for(var _=8;_<256;_+=1)M[_]=M[_-4]^M[_-5]^M[_-6]^M[_-8];for(var _=0;_<255;_+=1)x[M[_]]=_;var P={};return P.glog=function(S){if(S<1)throw"glog("+S+")";return x[S]},P.gexp=function(S){for(;S<0;)S+=255;for(;S>=256;)S-=255;return M[S]},P})();function a(M,x){if(typeof M.length>"u")throw M.length+"/"+x;var _=(function(){for(var S=0;S<M.length&&M[S]==0;)S+=1;for(var w=new Array(M.length-S+x),T=0;T<M.length-S;T+=1)w[T]=M[T+S];return w})(),P={};return P.getAt=function(S){return _[S]},P.getLength=function(){return _.length},P.multiply=function(S){for(var w=new Array(P.getLength()+S.getLength()-1),T=0;T<P.getLength();T+=1)for(var C=0;C<S.getLength();C+=1)w[T+C]^=r.gexp(r.glog(P.getAt(T))+r.glog(S.getAt(C)));return a(w,0)},P.mod=function(S){if(P.getLength()-S.getLength()<0)return P;for(var w=r.glog(P.getAt(0))-r.glog(S.getAt(0)),T=new Array(P.getLength()),C=0;C<P.getLength();C+=1)T[C]=P.getAt(C);for(var C=0;C<S.getLength();C+=1)T[C]^=r.gexp(r.glog(S.getAt(C))+w);return a(T,0).mod(S)},P}var o=(function(){var M=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],x=function(S,w){var T={};return T.totalCount=S,T.dataCount=w,T},_={},P=function(S,w){switch(w){case e.L:return M[(S-1)*4+0];case e.M:return M[(S-1)*4+1];case e.Q:return M[(S-1)*4+2];case e.H:return M[(S-1)*4+3];default:return}};return _.getRSBlocks=function(S,w){var T=P(S,w);if(typeof T>"u")throw"bad rs block @ typeNumber:"+S+"/errorCorrectionLevel:"+w;for(var C=T.length/3,g=[],v=0;v<C;v+=1)for(var I=T[v*3+0],B=T[v*3+1],U=T[v*3+2],z=0;z<I;z+=1)g.push(x(B,U));return g},_})(),l=function(){var M=[],x=0,_={};return _.getBuffer=function(){return M},_.getAt=function(P){var S=Math.floor(P/8);return(M[S]>>>7-P%8&1)==1},_.put=function(P,S){for(var w=0;w<S;w+=1)_.putBit((P>>>S-w-1&1)==1)},_.getLengthInBits=function(){return x},_.putBit=function(P){var S=Math.floor(x/8);M.length<=S&&M.push(0),P&&(M[S]|=128>>>x%8),x+=1},_},c=function(M){var x=t.MODE_NUMBER,_=M,P={};P.getMode=function(){return x},P.getLength=function(T){return _.length},P.write=function(T){for(var C=_,g=0;g+2<C.length;)T.put(S(C.substring(g,g+3)),10),g+=3;g<C.length&&(C.length-g==1?T.put(S(C.substring(g,g+1)),4):C.length-g==2&&T.put(S(C.substring(g,g+2)),7))};var S=function(T){for(var C=0,g=0;g<T.length;g+=1)C=C*10+w(T.charAt(g));return C},w=function(T){if("0"<=T&&T<="9")return T.charCodeAt(0)-48;throw"illegal char :"+T};return P},h=function(M){var x=t.MODE_ALPHA_NUM,_=M,P={};P.getMode=function(){return x},P.getLength=function(w){return _.length},P.write=function(w){for(var T=_,C=0;C+1<T.length;)w.put(S(T.charAt(C))*45+S(T.charAt(C+1)),11),C+=2;C<T.length&&w.put(S(T.charAt(C)),6)};var S=function(w){if("0"<=w&&w<="9")return w.charCodeAt(0)-48;if("A"<=w&&w<="Z")return w.charCodeAt(0)-65+10;switch(w){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+w}};return P},u=function(M){var x=t.MODE_8BIT_BYTE,_=M,P=n.stringToBytes(M),S={};return S.getMode=function(){return x},S.getLength=function(w){return P.length},S.write=function(w){for(var T=0;T<P.length;T+=1)w.put(P[T],8)},S},d=function(M){var x=t.MODE_KANJI,_=M,P=n.stringToBytesFuncs.SJIS;if(!P)throw"sjis not supported.";(function(T,C){var g=P(T);if(g.length!=2||(g[0]<<8|g[1])!=C)throw"sjis not supported."})("\u53CB",38726);var S=P(M),w={};return w.getMode=function(){return x},w.getLength=function(T){return~~(S.length/2)},w.write=function(T){for(var C=S,g=0;g+1<C.length;){var v=(255&C[g])<<8|255&C[g+1];if(33088<=v&&v<=40956)v-=33088;else if(57408<=v&&v<=60351)v-=49472;else throw"illegal char at "+(g+1)+"/"+v;v=(v>>>8&255)*192+(v&255),T.put(v,13),g+=2}if(g<C.length)throw"illegal char at "+(g+1)},w},f=function(){var M=[],x={};return x.writeByte=function(_){M.push(_&255)},x.writeShort=function(_){x.writeByte(_),x.writeByte(_>>>8)},x.writeBytes=function(_,P,S){P=P||0,S=S||_.length;for(var w=0;w<S;w+=1)x.writeByte(_[w+P])},x.writeString=function(_){for(var P=0;P<_.length;P+=1)x.writeByte(_.charCodeAt(P))},x.toByteArray=function(){return M},x.toString=function(){var _="";_+="[";for(var P=0;P<M.length;P+=1)P>0&&(_+=","),_+=M[P];return _+="]",_},x},A=function(){var M=0,x=0,_=0,P="",S={},w=function(C){P+=String.fromCharCode(T(C&63))},T=function(C){if(!(C<0)){if(C<26)return 65+C;if(C<52)return 97+(C-26);if(C<62)return 48+(C-52);if(C==62)return 43;if(C==63)return 47}throw"n:"+C};return S.writeByte=function(C){for(M=M<<8|C&255,x+=8,_+=1;x>=6;)w(M>>>x-6),x-=6},S.flush=function(){if(x>0&&(w(M<<6-x),M=0,x=0),_%3!=0)for(var C=3-_%3,g=0;g<C;g+=1)P+="="},S.toString=function(){return P},S},y=function(M){var x=M,_=0,P=0,S=0,w={};w.read=function(){for(;S<8;){if(_>=x.length){if(S==0)return-1;throw"unexpected end of file./"+S}var C=x.charAt(_);if(_+=1,C=="=")return S=0,-1;if(C.match(/^\s$/))continue;P=P<<6|T(C.charCodeAt(0)),S+=6}var g=P>>>S-8&255;return S-=8,g};var T=function(C){if(65<=C&&C<=90)return C-65;if(97<=C&&C<=122)return C-97+26;if(48<=C&&C<=57)return C-48+52;if(C==43)return 62;if(C==47)return 63;throw"c:"+C};return w},p=function(M,x){var _=M,P=x,S=new Array(M*x),w={};w.setPixel=function(v,I,B){S[I*_+v]=B},w.write=function(v){v.writeString("GIF87a"),v.writeShort(_),v.writeShort(P),v.writeByte(128),v.writeByte(0),v.writeByte(0),v.writeByte(0),v.writeByte(0),v.writeByte(0),v.writeByte(255),v.writeByte(255),v.writeByte(255),v.writeString(","),v.writeShort(0),v.writeShort(0),v.writeShort(_),v.writeShort(P),v.writeByte(0);var I=2,B=C(I);v.writeByte(I);for(var U=0;B.length-U>255;)v.writeByte(255),v.writeBytes(B,U,255),U+=255;v.writeByte(B.length-U),v.writeBytes(B,U,B.length-U),v.writeByte(0),v.writeString(";")};var T=function(v){var I=v,B=0,U=0,z={};return z.write=function(k,Z){if(k>>>Z)throw"length over";for(;B+Z>=8;)I.writeByte(255&(k<<B|U)),Z-=8-B,k>>>=8-B,U=0,B=0;U=k<<B|U,B=B+Z},z.flush=function(){B>0&&I.writeByte(U)},z},C=function(v){for(var I=1<<v,B=(1<<v)+1,U=v+1,z=g(),k=0;k<I;k+=1)z.add(String.fromCharCode(k));z.add(String.fromCharCode(I)),z.add(String.fromCharCode(B));var Z=f(),V=T(Z);V.write(I,U);var $=0,rt=String.fromCharCode(S[$]);for($+=1;$<S.length;){var ot=String.fromCharCode(S[$]);$+=1,z.contains(rt+ot)?rt=rt+ot:(V.write(z.indexOf(rt),U),z.size()<4095&&(z.size()==1<<U&&(U+=1),z.add(rt+ot)),rt=ot)}return V.write(z.indexOf(rt),U),V.write(B,U),V.flush(),Z.toByteArray()},g=function(){var v={},I=0,B={};return B.add=function(U){if(B.contains(U))throw"dup key:"+U;v[U]=I,I+=1},B.size=function(){return I},B.indexOf=function(U){return v[U]},B.contains=function(U){return typeof v[U]<"u"},B};return w},m=function(M,x,_){for(var P=p(M,x),S=0;S<x;S+=1)for(var w=0;w<M;w+=1)P.setPixel(w,S,_(w,S));var T=f();P.write(T);for(var C=A(),g=T.toByteArray(),v=0;v<g.length;v+=1)C.writeByte(g[v]);return C.flush(),"data:image/gif;base64,"+C};return n})();(function(){Ah.stringToBytesFuncs["UTF-8"]=function(n){function t(e){for(var i=[],s=0;s<e.length;s++){var r=e.charCodeAt(s);r<128?i.push(r):r<2048?i.push(192|r>>6,128|r&63):r<55296||r>=57344?i.push(224|r>>12,128|r>>6&63,128|r&63):(s++,r=65536+((r&1023)<<10|e.charCodeAt(s)&1023),i.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63))}return i}return t(n)}})();(function(n){typeof define=="function"&&define.amd?define([],n):typeof vh=="object"&&(xh.exports=n())})(function(){return Ah})});var of=Yf(yh());/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */var Di={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Ui={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Kf=0,_h=1,jf=2;var Mu=1,nc=2,Bn=3,Rn=0,Re=1,Fe=2,pe=0,ts=1,Mh=2,bh=3,Sh=4,ic=5,rn=100,Zf=101,Qf=102,Jf=103,$f=104,ps=200,td=201,ed=202,nd=203,No=204,Oo=205,Aa=206,id=207,va=208,sd=209,rd=210,ad=211,od=212,ld=213,cd=214,Bo=0,Fo=1,zo=2,ss=3,ko=4,Ho=5,Vo=6,Go=7,bu=0,hd=1,ud=2,ni=0,sc=1,rc=2,ac=3,oc=4,fd=5,lc=6,$s=7;var Su=300,rs=301,as=302,Wo=303,Xo=304,xa=306,an=1e3,Fn=1001,qo=1002,Ce=1003,dd=1004;var xr=1005;var An=1006,eo=1007;var wi=1008;var vn=1009,wu=1010,Eu=1011,Ws=1012,cc=1013,Ei=1014,zn=1015,on=1016,hc=1017,uc=1018,ii=1020,Tu=35902,Cu=1021,Ru=1022,Je=1023,Pu=1024,Iu=1025,es=1026,si=1027,Du=1028,fc=1029,Uu=1030,dc=1031;var pc=1033,Vr=33776,Gr=33777,Wr=33778,Xr=33779,Yo=35840,Ko=35841,jo=35842,Zo=35843,Qo=36196,Jo=37492,$o=37496,tl=37808,el=37809,nl=37810,il=37811,sl=37812,rl=37813,al=37814,ol=37815,ll=37816,cl=37817,hl=37818,ul=37819,fl=37820,dl=37821,qr=36492,pl=36494,ml=36495,Lu=36283,gl=36284,Al=36285,vl=36286;var Kr=2300,xl=2301,no=2302,wh=2400,Eh=2401,Th=2402;var pd=3200,mc=3201;var gc=0,md=1,ti="",Ve="srgb",ri="srgb-linear",Ac="display-p3",ya="display-p3-linear",jr="linear",ne="srgb",Zr="rec709",Qr="p3";var Fi=7680;var Ch=519,gd=512,Ad=513,vd=514,Nu=515,xd=516,yd=517,_d=518,Md=519,Rh=35044;var Ph="300 es",kn=2e3,Jr=2001,Hn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let i=this._listeners[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},Ie=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ih=1234567,zs=Math.PI/180,Xs=180/Math.PI;function ms(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ie[n&255]+Ie[n>>8&255]+Ie[n>>16&255]+Ie[n>>24&255]+"-"+Ie[t&255]+Ie[t>>8&255]+"-"+Ie[t>>16&15|64]+Ie[t>>24&255]+"-"+Ie[e&63|128]+Ie[e>>8&255]+"-"+Ie[e>>16&255]+Ie[e>>24&255]+Ie[i&255]+Ie[i>>8&255]+Ie[i>>16&255]+Ie[i>>24&255]).toLowerCase()}function ye(n,t,e){return Math.max(t,Math.min(e,n))}function vc(n,t){return(n%t+t)%t}function bd(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function Sd(n,t,e){return n!==t?(e-n)/(t-n):0}function ks(n,t,e){return(1-e)*n+e*t}function wd(n,t,e,i){return ks(n,t,1-Math.exp(-e*i))}function Ed(n,t=1){return t-Math.abs(vc(n,t*2)-t)}function Td(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function Cd(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function Rd(n,t){return n+Math.floor(Math.random()*(t-n+1))}function Pd(n,t){return n+Math.random()*(t-n)}function Id(n){return n*(.5-Math.random())}function Dd(n){n!==void 0&&(Ih=n);let t=Ih+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Ud(n){return n*zs}function Ld(n){return n*Xs}function Nd(n){return(n&n-1)===0&&n!==0}function Od(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Bd(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Fd(n,t,e,i,s){let r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+i)/2),h=a((t+i)/2),u=r((t-i)/2),d=a((t-i)/2),f=r((i-t)/2),A=a((i-t)/2);switch(s){case"XYX":n.set(o*h,l*u,l*d,o*c);break;case"YZY":n.set(l*d,o*h,l*u,o*c);break;case"ZXZ":n.set(l*u,l*d,o*h,o*c);break;case"XZX":n.set(o*h,l*A,l*f,o*c);break;case"YXY":n.set(l*f,o*h,l*A,o*c);break;case"ZYZ":n.set(l*A,l*f,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ji(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Ne(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var _a={DEG2RAD:zs,RAD2DEG:Xs,generateUUID:ms,clamp:ye,euclideanModulo:vc,mapLinear:bd,inverseLerp:Sd,lerp:ks,damp:wd,pingpong:Ed,smoothstep:Td,smootherstep:Cd,randInt:Rd,randFloat:Pd,randFloatSpread:Id,seededRandom:Dd,degToRad:Ud,radToDeg:Ld,isPowerOfTwo:Nd,ceilPowerOfTwo:Od,floorPowerOfTwo:Bd,setQuaternionFromProperEuler:Fd,normalize:Ne,denormalize:Ji},mt=class n{constructor(t=0,e=0){n.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(ye(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ht=class n{constructor(t,e,i,s,r,a,o,l,c){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c)}set(t,e,i,s,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],u=i[7],d=i[2],f=i[5],A=i[8],y=s[0],p=s[3],m=s[6],M=s[1],x=s[4],_=s[7],P=s[2],S=s[5],w=s[8];return r[0]=a*y+o*M+l*P,r[3]=a*p+o*x+l*S,r[6]=a*m+o*_+l*w,r[1]=c*y+h*M+u*P,r[4]=c*p+h*x+u*S,r[7]=c*m+h*_+u*w,r[2]=d*y+f*M+A*P,r[5]=d*p+f*x+A*S,r[8]=d*m+f*_+A*w,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-i*r*h+i*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,d=o*l-h*r,f=c*r-a*l,A=e*u+i*d+s*f;if(A===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/A;return t[0]=u*y,t[1]=(s*c-h*i)*y,t[2]=(o*i-s*a)*y,t[3]=d*y,t[4]=(h*e-s*l)*y,t[5]=(s*r-o*e)*y,t[6]=f*y,t[7]=(i*l-c*e)*y,t[8]=(a*e-i*r)*y,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(io.makeScale(t,e)),this}rotate(t){return this.premultiply(io.makeRotation(-t)),this}translate(t,e){return this.premultiply(io.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},io=new Ht;function Ou(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function $r(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function zd(){let n=$r("canvas");return n.style.display="block",n}var Dh={};function Yr(n){n in Dh||(Dh[n]=!0,console.warn(n))}function kd(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function Hd(n){let t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Vd(n){let t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var Uh=new Ht().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Lh=new Ht().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Us={[ri]:{transfer:jr,primaries:Zr,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n,fromReference:n=>n},[Ve]:{transfer:ne,primaries:Zr,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[ya]:{transfer:jr,primaries:Qr,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.applyMatrix3(Lh),fromReference:n=>n.applyMatrix3(Uh)},[Ac]:{transfer:ne,primaries:Qr,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.convertSRGBToLinear().applyMatrix3(Lh),fromReference:n=>n.applyMatrix3(Uh).convertLinearToSRGB()}},Gd=new Set([ri,ya]),Kt={enabled:!0,_workingColorSpace:ri,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!Gd.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,t,e){if(this.enabled===!1||t===e||!t||!e)return n;let i=Us[t].toReference,s=Us[e].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,t){return this.convert(n,this._workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this._workingColorSpace)},getPrimaries:function(n){return Us[n].primaries},getTransfer:function(n){return n===ti?jr:Us[n].transfer},getLuminanceCoefficients:function(n,t=this._workingColorSpace){return n.fromArray(Us[t].luminanceCoefficients)}};function ns(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function so(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var zi,yl=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{zi===void 0&&(zi=$r("canvas")),zi.width=t.width,zi.height=t.height;let i=zi.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=zi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=$r("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ns(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(ns(e[i]/255)*255):e[i]=ns(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Wd=0,ta=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Wd++}),this.uuid=ms(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(ro(s[a].image)):r.push(ro(s[a]))}else r=ro(s);i.url=r}return e||(t.images[this.uuid]=i),i}};function ro(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?yl.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Xd=0,Ge=class n extends Hn{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=Fn,s=Fn,r=An,a=wi,o=Je,l=vn,c=n.DEFAULT_ANISOTROPY,h=ti){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Xd++}),this.uuid=ms(),this.name="",this.source=new ta(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new mt(0,0),this.repeat=new mt(1,1),this.center=new mt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ht,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Su)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case an:t.x=t.x-Math.floor(t.x);break;case Fn:t.x=t.x<0?0:1;break;case qo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case an:t.y=t.y-Math.floor(t.y);break;case Fn:t.y=t.y<0?0:1;break;case qo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Ge.DEFAULT_IMAGE=null;Ge.DEFAULT_MAPPING=Su;Ge.DEFAULT_ANISOTROPY=1;var fe=class n{constructor(t=0,e=0,i=0,s=1){n.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r,l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],A=l[9],y=l[2],p=l[6],m=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-y)<.01&&Math.abs(A-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+y)<.1&&Math.abs(A+p)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let x=(c+1)/2,_=(f+1)/2,P=(m+1)/2,S=(h+d)/4,w=(u+y)/4,T=(A+p)/4;return x>_&&x>P?x<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(x),s=S/i,r=w/i):_>P?_<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),i=S/s,r=T/s):P<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),i=w/r,s=T/r),this.set(i,s,r,e),this}let M=Math.sqrt((p-A)*(p-A)+(u-y)*(u-y)+(d-h)*(d-h));return Math.abs(M)<.001&&(M=1),this.x=(p-A)/M,this.y=(u-y)/M,this.z=(d-h)/M,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},_l=class extends Hn{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new fe(0,0,t,e),this.scissorTest=!1,this.viewport=new fe(0,0,t,e);let s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:An,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);let r=new Ge(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];let a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new ta(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ue=class extends _l{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},ea=class extends Ge{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ce,this.minFilter=Ce,this.wrapR=Fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ml=class extends Ge{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ce,this.minFilter=Ce,this.wrapR=Fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var xn=class{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let l=i[s+0],c=i[s+1],h=i[s+2],u=i[s+3],d=r[a+0],f=r[a+1],A=r[a+2],y=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=d,t[e+1]=f,t[e+2]=A,t[e+3]=y;return}if(u!==y||l!==d||c!==f||h!==A){let p=1-o,m=l*d+c*f+h*A+u*y,M=m>=0?1:-1,x=1-m*m;if(x>Number.EPSILON){let P=Math.sqrt(x),S=Math.atan2(P,m*M);p=Math.sin(p*S)/P,o=Math.sin(o*S)/P}let _=o*M;if(l=l*p+d*_,c=c*p+f*_,h=h*p+A*_,u=u*p+y*_,p===1-o){let P=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=P,c*=P,h*=P,u*=P}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,a){let o=i[s],l=i[s+1],c=i[s+2],h=i[s+3],u=r[a],d=r[a+1],f=r[a+2],A=r[a+3];return t[e]=o*A+h*u+l*f-c*d,t[e+1]=l*A+h*d+c*u-o*f,t[e+2]=c*A+h*f+o*d-l*u,t[e+3]=h*A-o*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(s/2),u=o(r/2),d=l(i/2),f=l(s/2),A=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*f*A,this._y=c*f*u-d*h*A,this._z=c*h*A+d*f*u,this._w=c*h*u-d*f*A;break;case"YXZ":this._x=d*h*u+c*f*A,this._y=c*f*u-d*h*A,this._z=c*h*A-d*f*u,this._w=c*h*u+d*f*A;break;case"ZXY":this._x=d*h*u-c*f*A,this._y=c*f*u+d*h*A,this._z=c*h*A+d*f*u,this._w=c*h*u-d*f*A;break;case"ZYX":this._x=d*h*u-c*f*A,this._y=c*f*u+d*h*A,this._z=c*h*A-d*f*u,this._w=c*h*u+d*f*A;break;case"YZX":this._x=d*h*u+c*f*A,this._y=c*f*u+d*h*A,this._z=c*h*A-d*f*u,this._w=c*h*u-d*f*A;break;case"XZY":this._x=d*h*u-c*f*A,this._y=c*f*u-d*h*A,this._z=c*h*A+d*f*u,this._w=c*h*u+d*f*A;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=i+o+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(i>o&&i>u){let f=2*Math.sqrt(1+i-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>u){let f=2*Math.sqrt(1+o-i-u);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-i-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ye(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-s*o,this._w=a*h-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let i=this._x,s=this._y,r=this._z,a=this._w,o=a*t._w+i*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;let l=1-o*o;if(l<=Number.EPSILON){let f=1-e;return this._w=f*a+e*this._w,this._x=f*i+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=a*u+this._w*d,this._x=i*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},O=class n{constructor(t=0,e=0,i=0){n.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Nh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Nh.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*i),h=2*(o*e-r*s),u=2*(r*i-a*e);return this.x=e+l*c+a*u-o*h,this.y=i+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return ao.copy(this).projectOnVector(t),this.sub(ao)}reflect(t){return this.sub(ao.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(ye(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ao=new O,Nh=new xn,Ti=class{constructor(t=new O(1/0,1/0,1/0),e=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(dn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(dn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=dn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,dn):dn.fromBufferAttribute(r,a),dn.applyMatrix4(t.matrixWorld),this.expandByPoint(dn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),yr.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),yr.copy(i.boundingBox)),yr.applyMatrix4(t.matrixWorld),this.union(yr)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,dn),dn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ls),_r.subVectors(this.max,Ls),ki.subVectors(t.a,Ls),Hi.subVectors(t.b,Ls),Vi.subVectors(t.c,Ls),Kn.subVectors(Hi,ki),jn.subVectors(Vi,Hi),gi.subVectors(ki,Vi);let e=[0,-Kn.z,Kn.y,0,-jn.z,jn.y,0,-gi.z,gi.y,Kn.z,0,-Kn.x,jn.z,0,-jn.x,gi.z,0,-gi.x,-Kn.y,Kn.x,0,-jn.y,jn.x,0,-gi.y,gi.x,0];return!oo(e,ki,Hi,Vi,_r)||(e=[1,0,0,0,1,0,0,0,1],!oo(e,ki,Hi,Vi,_r))?!1:(Mr.crossVectors(Kn,jn),e=[Mr.x,Mr.y,Mr.z],oo(e,ki,Hi,Vi,_r))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,dn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(dn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Dn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Dn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Dn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Dn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Dn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Dn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Dn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Dn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Dn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Dn=[new O,new O,new O,new O,new O,new O,new O,new O],dn=new O,yr=new Ti,ki=new O,Hi=new O,Vi=new O,Kn=new O,jn=new O,gi=new O,Ls=new O,_r=new O,Mr=new O,Ai=new O;function oo(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Ai.fromArray(n,r);let o=s.x*Math.abs(Ai.x)+s.y*Math.abs(Ai.y)+s.z*Math.abs(Ai.z),l=t.dot(Ai),c=e.dot(Ai),h=i.dot(Ai);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var qd=new Ti,Ns=new O,lo=new O,qs=class{constructor(t=new O,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):qd.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ns.subVectors(t,this.center);let e=Ns.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Ns,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(lo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ns.copy(t.center).add(lo)),this.expandByPoint(Ns.copy(t.center).sub(lo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Un=new O,co=new O,br=new O,Zn=new O,ho=new O,Sr=new O,uo=new O,Ys=class{constructor(t=new O,e=new O(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Un)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Un.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Un.copy(this.origin).addScaledVector(this.direction,e),Un.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){co.copy(t).add(e).multiplyScalar(.5),br.copy(e).sub(t).normalize(),Zn.copy(this.origin).sub(co);let r=t.distanceTo(e)*.5,a=-this.direction.dot(br),o=Zn.dot(this.direction),l=-Zn.dot(br),c=Zn.lengthSq(),h=Math.abs(1-a*a),u,d,f,A;if(h>0)if(u=a*l-o,d=a*o-l,A=r*h,u>=0)if(d>=-A)if(d<=A){let y=1/h;u*=y,d*=y,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-A?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=A?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(co).addScaledVector(br,d),f}intersectSphere(t,e){Un.subVectors(t.center,this.origin);let i=Un.dot(this.direction),s=Un.dot(Un)-i*i,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(i=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(i=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Un)!==null}intersectTriangle(t,e,i,s,r){ho.subVectors(e,t),Sr.subVectors(i,t),uo.crossVectors(ho,Sr);let a=this.direction.dot(uo),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Zn.subVectors(this.origin,t);let l=o*this.direction.dot(Sr.crossVectors(Zn,Sr));if(l<0)return null;let c=o*this.direction.dot(ho.cross(Zn));if(c<0||l+c>a)return null;let h=-o*Zn.dot(uo);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},te=class n{constructor(t,e,i,s,r,a,o,l,c,h,u,d,f,A,y,p){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c,h,u,d,f,A,y,p)}set(t,e,i,s,r,a,o,l,c,h,u,d,f,A,y,p){let m=this.elements;return m[0]=t,m[4]=e,m[8]=i,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=A,m[11]=y,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,i=t.elements,s=1/Gi.setFromMatrixColumn(t,0).length(),r=1/Gi.setFromMatrixColumn(t,1).length(),a=1/Gi.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let d=a*h,f=a*u,A=o*h,y=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+A*c,e[5]=d-y*c,e[9]=-o*l,e[2]=y-d*c,e[6]=A+f*c,e[10]=a*l}else if(t.order==="YXZ"){let d=l*h,f=l*u,A=c*h,y=c*u;e[0]=d+y*o,e[4]=A*o-f,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=f*o-A,e[6]=y+d*o,e[10]=a*l}else if(t.order==="ZXY"){let d=l*h,f=l*u,A=c*h,y=c*u;e[0]=d-y*o,e[4]=-a*u,e[8]=A+f*o,e[1]=f+A*o,e[5]=a*h,e[9]=y-d*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let d=a*h,f=a*u,A=o*h,y=o*u;e[0]=l*h,e[4]=A*c-f,e[8]=d*c+y,e[1]=l*u,e[5]=y*c+d,e[9]=f*c-A,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let d=a*l,f=a*c,A=o*l,y=o*c;e[0]=l*h,e[4]=y-d*u,e[8]=A*u+f,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*u+A,e[10]=d-y*u}else if(t.order==="XZY"){let d=a*l,f=a*c,A=o*l,y=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+y,e[5]=a*h,e[9]=f*u-A,e[2]=A*u-f,e[6]=o*h,e[10]=y*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Yd,t,Kd)}lookAt(t,e,i){let s=this.elements;return Ze.subVectors(t,e),Ze.lengthSq()===0&&(Ze.z=1),Ze.normalize(),Qn.crossVectors(i,Ze),Qn.lengthSq()===0&&(Math.abs(i.z)===1?Ze.x+=1e-4:Ze.z+=1e-4,Ze.normalize(),Qn.crossVectors(i,Ze)),Qn.normalize(),wr.crossVectors(Ze,Qn),s[0]=Qn.x,s[4]=wr.x,s[8]=Ze.x,s[1]=Qn.y,s[5]=wr.y,s[9]=Ze.y,s[2]=Qn.z,s[6]=wr.z,s[10]=Ze.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],u=i[5],d=i[9],f=i[13],A=i[2],y=i[6],p=i[10],m=i[14],M=i[3],x=i[7],_=i[11],P=i[15],S=s[0],w=s[4],T=s[8],C=s[12],g=s[1],v=s[5],I=s[9],B=s[13],U=s[2],z=s[6],k=s[10],Z=s[14],V=s[3],$=s[7],rt=s[11],ot=s[15];return r[0]=a*S+o*g+l*U+c*V,r[4]=a*w+o*v+l*z+c*$,r[8]=a*T+o*I+l*k+c*rt,r[12]=a*C+o*B+l*Z+c*ot,r[1]=h*S+u*g+d*U+f*V,r[5]=h*w+u*v+d*z+f*$,r[9]=h*T+u*I+d*k+f*rt,r[13]=h*C+u*B+d*Z+f*ot,r[2]=A*S+y*g+p*U+m*V,r[6]=A*w+y*v+p*z+m*$,r[10]=A*T+y*I+p*k+m*rt,r[14]=A*C+y*B+p*Z+m*ot,r[3]=M*S+x*g+_*U+P*V,r[7]=M*w+x*v+_*z+P*$,r[11]=M*T+x*I+_*k+P*rt,r[15]=M*C+x*B+_*Z+P*ot,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],A=t[3],y=t[7],p=t[11],m=t[15];return A*(+r*l*u-s*c*u-r*o*d+i*c*d+s*o*f-i*l*f)+y*(+e*l*f-e*c*d+r*a*d-s*a*f+s*c*h-r*l*h)+p*(+e*c*u-e*o*f-r*a*u+i*a*f+r*o*h-i*c*h)+m*(-s*o*h-e*l*u+e*o*d+s*a*u-i*a*d+i*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],A=t[12],y=t[13],p=t[14],m=t[15],M=u*p*c-y*d*c+y*l*f-o*p*f-u*l*m+o*d*m,x=A*d*c-h*p*c-A*l*f+a*p*f+h*l*m-a*d*m,_=h*y*c-A*u*c+A*o*f-a*y*f-h*o*m+a*u*m,P=A*u*l-h*y*l-A*o*d+a*y*d+h*o*p-a*u*p,S=e*M+i*x+s*_+r*P;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let w=1/S;return t[0]=M*w,t[1]=(y*d*r-u*p*r-y*s*f+i*p*f+u*s*m-i*d*m)*w,t[2]=(o*p*r-y*l*r+y*s*c-i*p*c-o*s*m+i*l*m)*w,t[3]=(u*l*r-o*d*r-u*s*c+i*d*c+o*s*f-i*l*f)*w,t[4]=x*w,t[5]=(h*p*r-A*d*r+A*s*f-e*p*f-h*s*m+e*d*m)*w,t[6]=(A*l*r-a*p*r-A*s*c+e*p*c+a*s*m-e*l*m)*w,t[7]=(a*d*r-h*l*r+h*s*c-e*d*c-a*s*f+e*l*f)*w,t[8]=_*w,t[9]=(A*u*r-h*y*r-A*i*f+e*y*f+h*i*m-e*u*m)*w,t[10]=(a*y*r-A*o*r+A*i*c-e*y*c-a*i*m+e*o*m)*w,t[11]=(h*o*r-a*u*r-h*i*c+e*u*c+a*i*f-e*o*f)*w,t[12]=P*w,t[13]=(h*y*s-A*u*s+A*i*d-e*y*d-h*i*p+e*u*p)*w,t[14]=(A*o*s-a*y*s-A*i*l+e*y*l+a*i*p-e*o*p)*w,t[15]=(a*u*s-h*o*s+h*i*l-e*u*l-a*i*d+e*o*d)*w,this}scale(t){let e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+i,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,d=r*c,f=r*h,A=r*u,y=a*h,p=a*u,m=o*u,M=l*c,x=l*h,_=l*u,P=i.x,S=i.y,w=i.z;return s[0]=(1-(y+m))*P,s[1]=(f+_)*P,s[2]=(A-x)*P,s[3]=0,s[4]=(f-_)*S,s[5]=(1-(d+m))*S,s[6]=(p+M)*S,s[7]=0,s[8]=(A+x)*w,s[9]=(p-M)*w,s[10]=(1-(d+y))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){let s=this.elements,r=Gi.set(s[0],s[1],s[2]).length(),a=Gi.set(s[4],s[5],s[6]).length(),o=Gi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],pn.copy(this);let c=1/r,h=1/a,u=1/o;return pn.elements[0]*=c,pn.elements[1]*=c,pn.elements[2]*=c,pn.elements[4]*=h,pn.elements[5]*=h,pn.elements[6]*=h,pn.elements[8]*=u,pn.elements[9]*=u,pn.elements[10]*=u,e.setFromRotationMatrix(pn),i.x=r,i.y=a,i.z=o,this}makePerspective(t,e,i,s,r,a,o=kn){let l=this.elements,c=2*r/(e-t),h=2*r/(i-s),u=(e+t)/(e-t),d=(i+s)/(i-s),f,A;if(o===kn)f=-(a+r)/(a-r),A=-2*a*r/(a-r);else if(o===Jr)f=-a/(a-r),A=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=A,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=kn){let l=this.elements,c=1/(e-t),h=1/(i-s),u=1/(a-r),d=(e+t)*c,f=(i+s)*h,A,y;if(o===kn)A=(a+r)*u,y=-2*u;else if(o===Jr)A=r*u,y=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=y,l[14]=-A,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}},Gi=new O,pn=new te,Yd=new O(0,0,0),Kd=new O(1,1,1),Qn=new O,wr=new O,Ze=new O,Oh=new te,Bh=new xn,Pn=class n{constructor(t=0,e=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(ye(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ye(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(ye(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ye(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ye(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-ye(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Oh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Oh,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Bh.setFromEuler(this),this.setFromQuaternion(Bh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Pn.DEFAULT_ORDER="XYZ";var na=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},jd=0,Fh=new O,Wi=new xn,Ln=new te,Er=new O,Os=new O,Zd=new O,Qd=new xn,zh=new O(1,0,0),kh=new O(0,1,0),Hh=new O(0,0,1),Vh={type:"added"},Jd={type:"removed"},Xi={type:"childadded",child:null},fo={type:"childremoved",child:null},We=class n extends Hn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:jd++}),this.uuid=ms(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new O,e=new Pn,i=new xn,s=new O(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new te},normalMatrix:{value:new Ht}}),this.matrix=new te,this.matrixWorld=new te,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new na,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Wi.setFromAxisAngle(t,e),this.quaternion.multiply(Wi),this}rotateOnWorldAxis(t,e){return Wi.setFromAxisAngle(t,e),this.quaternion.premultiply(Wi),this}rotateX(t){return this.rotateOnAxis(zh,t)}rotateY(t){return this.rotateOnAxis(kh,t)}rotateZ(t){return this.rotateOnAxis(Hh,t)}translateOnAxis(t,e){return Fh.copy(t).applyQuaternion(this.quaternion),this.position.add(Fh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(zh,t)}translateY(t){return this.translateOnAxis(kh,t)}translateZ(t){return this.translateOnAxis(Hh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ln.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Er.copy(t):Er.set(t,e,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Os.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ln.lookAt(Os,Er,this.up):Ln.lookAt(Er,Os,this.up),this.quaternion.setFromRotationMatrix(Ln),s&&(Ln.extractRotation(s.matrixWorld),Wi.setFromRotationMatrix(Ln),this.quaternion.premultiply(Wi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Vh),Xi.child=t,this.dispatchEvent(Xi),Xi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Jd),fo.child=t,this.dispatchEvent(fo),fo.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ln.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ln.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ln),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Vh),Xi.child=t,this.dispatchEvent(Xi),Xi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Os,t,Zd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Os,Qd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),d=a(t.skeletons),f=a(t.animations),A=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),f.length>0&&(i.animations=f),A.length>0&&(i.nodes=A)}return i.object=s,i;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}};We.DEFAULT_UP=new O(0,1,0);We.DEFAULT_MATRIX_AUTO_UPDATE=!0;We.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var mn=new O,Nn=new O,po=new O,On=new O,qi=new O,Yi=new O,Gh=new O,mo=new O,go=new O,Ao=new O,vo=new fe,xo=new fe,yo=new fe,bi=class n{constructor(t=new O,e=new O,i=new O){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),mn.subVectors(t,e),s.cross(mn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){mn.subVectors(s,e),Nn.subVectors(i,e),po.subVectors(t,e);let a=mn.dot(mn),o=mn.dot(Nn),l=mn.dot(po),c=Nn.dot(Nn),h=Nn.dot(po),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(c*l-o*h)*d,A=(a*h-o*l)*d;return r.set(1-f-A,A,f)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,On)===null?!1:On.x>=0&&On.y>=0&&On.x+On.y<=1}static getInterpolation(t,e,i,s,r,a,o,l){return this.getBarycoord(t,e,i,s,On)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,On.x),l.addScaledVector(a,On.y),l.addScaledVector(o,On.z),l)}static getInterpolatedAttribute(t,e,i,s,r,a){return vo.setScalar(0),xo.setScalar(0),yo.setScalar(0),vo.fromBufferAttribute(t,e),xo.fromBufferAttribute(t,i),yo.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(vo,r.x),a.addScaledVector(xo,r.y),a.addScaledVector(yo,r.z),a}static isFrontFacing(t,e,i,s){return mn.subVectors(i,e),Nn.subVectors(t,e),mn.cross(Nn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return mn.subVectors(this.c,this.b),Nn.subVectors(this.a,this.b),mn.cross(Nn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,s=this.b,r=this.c,a,o;qi.subVectors(s,i),Yi.subVectors(r,i),mo.subVectors(t,i);let l=qi.dot(mo),c=Yi.dot(mo);if(l<=0&&c<=0)return e.copy(i);go.subVectors(t,s);let h=qi.dot(go),u=Yi.dot(go);if(h>=0&&u<=h)return e.copy(s);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(i).addScaledVector(qi,a);Ao.subVectors(t,r);let f=qi.dot(Ao),A=Yi.dot(Ao);if(A>=0&&f<=A)return e.copy(r);let y=f*c-l*A;if(y<=0&&c>=0&&A<=0)return o=c/(c-A),e.copy(i).addScaledVector(Yi,o);let p=h*A-f*u;if(p<=0&&u-h>=0&&f-A>=0)return Gh.subVectors(r,s),o=(u-h)/(u-h+(f-A)),e.copy(s).addScaledVector(Gh,o);let m=1/(p+y+d);return a=y*m,o=d*m,e.copy(i).addScaledVector(qi,a).addScaledVector(Yi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Bu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Jn={h:0,s:0,l:0},Tr={h:0,s:0,l:0};function _o(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var Pt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ve){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Kt.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=Kt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Kt.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=Kt.workingColorSpace){if(t=vc(t,1),e=ye(e,0,1),i=ye(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=_o(a,r,t+1/3),this.g=_o(a,r,t),this.b=_o(a,r,t-1/3)}return Kt.toWorkingColorSpace(this,s),this}setStyle(t,e=Ve){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ve){let i=Bu[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ns(t.r),this.g=ns(t.g),this.b=ns(t.b),this}copyLinearToSRGB(t){return this.r=so(t.r),this.g=so(t.g),this.b=so(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ve){return Kt.fromWorkingColorSpace(De.copy(this),t),Math.round(ye(De.r*255,0,255))*65536+Math.round(ye(De.g*255,0,255))*256+Math.round(ye(De.b*255,0,255))}getHexString(t=Ve){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Kt.workingColorSpace){Kt.fromWorkingColorSpace(De.copy(this),e);let i=De.r,s=De.g,r=De.b,a=Math.max(i,s,r),o=Math.min(i,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case i:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-i)/u+2;break;case r:l=(i-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Kt.workingColorSpace){return Kt.fromWorkingColorSpace(De.copy(this),e),t.r=De.r,t.g=De.g,t.b=De.b,t}getStyle(t=Ve){Kt.fromWorkingColorSpace(De.copy(this),t);let e=De.r,i=De.g,s=De.b;return t!==Ve?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Jn),this.setHSL(Jn.h+t,Jn.s+e,Jn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Jn),t.getHSL(Tr);let i=ks(Jn.h,Tr.h,e),s=ks(Jn.s,Tr.s,e),r=ks(Jn.l,Tr.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},De=new Pt;Pt.NAMES=Bu;var $d=0,Vn=class extends Hn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$d++}),this.uuid=ms(),this.name="",this.type="Material",this.blending=ts,this.side=Rn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=No,this.blendDst=Oo,this.blendEquation=rn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Pt(0,0,0),this.blendAlpha=0,this.depthFunc=ss,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ch,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Fi,this.stencilZFail=Fi,this.stencilZPass=Fi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ts&&(i.blending=this.blending),this.side!==Rn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==No&&(i.blendSrc=this.blendSrc),this.blendDst!==Oo&&(i.blendDst=this.blendDst),this.blendEquation!==rn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ss&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ch&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Fi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Fi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Fi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Gn=class extends Vn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Pt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pn,this.combine=bu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Ae=new O,Cr=new mt,_e=class{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Rh,this.updateRanges=[],this.gpuType=zn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Cr.fromBufferAttribute(this,e),Cr.applyMatrix3(t),this.setXY(e,Cr.x,Cr.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ae.fromBufferAttribute(this,e),Ae.applyMatrix3(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ae.fromBufferAttribute(this,e),Ae.applyMatrix4(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ae.fromBufferAttribute(this,e),Ae.applyNormalMatrix(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ae.fromBufferAttribute(this,e),Ae.transformDirection(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Ji(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Ne(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ji(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ji(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ji(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ji(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),i=Ne(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),i=Ne(i,this.array),s=Ne(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),i=Ne(i,this.array),s=Ne(s,this.array),r=Ne(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Rh&&(t.usage=this.usage),t}};var ia=class extends _e{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var sa=class extends _e{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var ce=class extends _e{constructor(t,e,i){super(new Float32Array(t),e,i)}},tp=0,sn=new te,Mo=new We,Ki=new O,Qe=new Ti,Bs=new Ti,we=new O,se=class n extends Hn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:tp++}),this.uuid=ms(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ou(t)?sa:ia)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Ht().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return sn.makeRotationFromQuaternion(t),this.applyMatrix4(sn),this}rotateX(t){return sn.makeRotationX(t),this.applyMatrix4(sn),this}rotateY(t){return sn.makeRotationY(t),this.applyMatrix4(sn),this}rotateZ(t){return sn.makeRotationZ(t),this.applyMatrix4(sn),this}translate(t,e,i){return sn.makeTranslation(t,e,i),this.applyMatrix4(sn),this}scale(t,e,i){return sn.makeScale(t,e,i),this.applyMatrix4(sn),this}lookAt(t){return Mo.lookAt(t),Mo.updateMatrix(),this.applyMatrix4(Mo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ki).negate(),this.translate(Ki.x,Ki.y,Ki.z),this}setFromPoints(t){let e=[];for(let i=0,s=t.length;i<s;i++){let r=t[i];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new ce(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ti);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){let r=e[i];Qe.setFromBufferAttribute(r),this.morphTargetsRelative?(we.addVectors(this.boundingBox.min,Qe.min),this.boundingBox.expandByPoint(we),we.addVectors(this.boundingBox.max,Qe.max),this.boundingBox.expandByPoint(we)):(this.boundingBox.expandByPoint(Qe.min),this.boundingBox.expandByPoint(Qe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qs);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(t){let i=this.boundingSphere.center;if(Qe.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];Bs.setFromBufferAttribute(o),this.morphTargetsRelative?(we.addVectors(Qe.min,Bs.min),Qe.expandByPoint(we),we.addVectors(Qe.max,Bs.max),Qe.expandByPoint(we)):(Qe.expandByPoint(Bs.min),Qe.expandByPoint(Bs.max))}Qe.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)we.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(we));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)we.fromBufferAttribute(o,c),l&&(Ki.fromBufferAttribute(t,c),we.add(Ki)),s=Math.max(s,i.distanceToSquared(we))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new _e(new Float32Array(4*i.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let T=0;T<i.count;T++)o[T]=new O,l[T]=new O;let c=new O,h=new O,u=new O,d=new mt,f=new mt,A=new mt,y=new O,p=new O;function m(T,C,g){c.fromBufferAttribute(i,T),h.fromBufferAttribute(i,C),u.fromBufferAttribute(i,g),d.fromBufferAttribute(r,T),f.fromBufferAttribute(r,C),A.fromBufferAttribute(r,g),h.sub(c),u.sub(c),f.sub(d),A.sub(d);let v=1/(f.x*A.y-A.x*f.y);isFinite(v)&&(y.copy(h).multiplyScalar(A.y).addScaledVector(u,-f.y).multiplyScalar(v),p.copy(u).multiplyScalar(f.x).addScaledVector(h,-A.x).multiplyScalar(v),o[T].add(y),o[C].add(y),o[g].add(y),l[T].add(p),l[C].add(p),l[g].add(p))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let T=0,C=M.length;T<C;++T){let g=M[T],v=g.start,I=g.count;for(let B=v,U=v+I;B<U;B+=3)m(t.getX(B+0),t.getX(B+1),t.getX(B+2))}let x=new O,_=new O,P=new O,S=new O;function w(T){P.fromBufferAttribute(s,T),S.copy(P);let C=o[T];x.copy(C),x.sub(P.multiplyScalar(P.dot(C))).normalize(),_.crossVectors(S,C);let v=_.dot(l[T])<0?-1:1;a.setXYZW(T,x.x,x.y,x.z,v)}for(let T=0,C=M.length;T<C;++T){let g=M[T],v=g.start,I=g.count;for(let B=v,U=v+I;B<U;B+=3)w(t.getX(B+0)),w(t.getX(B+1)),w(t.getX(B+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new _e(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let d=0,f=i.count;d<f;d++)i.setXYZ(d,0,0,0);let s=new O,r=new O,a=new O,o=new O,l=new O,c=new O,h=new O,u=new O;if(t)for(let d=0,f=t.count;d<f;d+=3){let A=t.getX(d+0),y=t.getX(d+1),p=t.getX(d+2);s.fromBufferAttribute(e,A),r.fromBufferAttribute(e,y),a.fromBufferAttribute(e,p),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(i,A),l.fromBufferAttribute(i,y),c.fromBufferAttribute(i,p),o.add(h),l.add(h),c.add(h),i.setXYZ(A,o.x,o.y,o.z),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)we.fromBufferAttribute(t,e),we.normalize(),t.setXYZ(e,we.x,we.y,we.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h),f=0,A=0;for(let y=0,p=l.length;y<p;y++){o.isInterleavedBufferAttribute?f=l[y]*o.data.stride+o.offset:f=l[y]*h;for(let m=0;m<h;m++)d[A++]=c[f++]}return new _e(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,i);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=t(d,i);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone(e));let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Wh=new te,vi=new Ys,Rr=new qs,Xh=new O,Pr=new O,Ir=new O,Dr=new O,bo=new O,Ur=new O,qh=new O,Lr=new O,ie=class extends We{constructor(t=new se,e=new Gn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){Ur.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],u=r[l];h!==0&&(bo.fromBufferAttribute(u,t),a?Ur.addScaledVector(bo,h):Ur.addScaledVector(bo.sub(e),h))}e.add(Ur)}return e}raycast(t,e){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Rr.copy(i.boundingSphere),Rr.applyMatrix4(r),vi.copy(t.ray).recast(t.near),!(Rr.containsPoint(vi.origin)===!1&&(vi.intersectSphere(Rr,Xh)===null||vi.origin.distanceToSquared(Xh)>(t.far-t.near)**2))&&(Wh.copy(r).invert(),vi.copy(t.ray).applyMatrix4(Wh),!(i.boundingBox!==null&&vi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,vi)))}_computeIntersections(t,e,i){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let A=0,y=d.length;A<y;A++){let p=d[A],m=a[p.materialIndex],M=Math.max(p.start,f.start),x=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let _=M,P=x;_<P;_+=3){let S=o.getX(_),w=o.getX(_+1),T=o.getX(_+2);s=Nr(this,m,t,i,c,h,u,S,w,T),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let A=Math.max(0,f.start),y=Math.min(o.count,f.start+f.count);for(let p=A,m=y;p<m;p+=3){let M=o.getX(p),x=o.getX(p+1),_=o.getX(p+2);s=Nr(this,a,t,i,c,h,u,M,x,_),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let A=0,y=d.length;A<y;A++){let p=d[A],m=a[p.materialIndex],M=Math.max(p.start,f.start),x=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let _=M,P=x;_<P;_+=3){let S=_,w=_+1,T=_+2;s=Nr(this,m,t,i,c,h,u,S,w,T),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let A=Math.max(0,f.start),y=Math.min(l.count,f.start+f.count);for(let p=A,m=y;p<m;p+=3){let M=p,x=p+1,_=p+2;s=Nr(this,a,t,i,c,h,u,M,x,_),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}};function ep(n,t,e,i,s,r,a,o){let l;if(t.side===Re?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,t.side===Rn,o),l===null)return null;Lr.copy(o),Lr.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(Lr);return c<e.near||c>e.far?null:{distance:c,point:Lr.clone(),object:n}}function Nr(n,t,e,i,s,r,a,o,l,c){n.getVertexPosition(o,Pr),n.getVertexPosition(l,Ir),n.getVertexPosition(c,Dr);let h=ep(n,t,e,i,Pr,Ir,Dr,qh);if(h){let u=new O;bi.getBarycoord(qh,Pr,Ir,Dr,u),s&&(h.uv=bi.getInterpolatedAttribute(s,o,l,c,u,new mt)),r&&(h.uv1=bi.getInterpolatedAttribute(r,o,l,c,u,new mt)),a&&(h.normal=bi.getInterpolatedAttribute(a,o,l,c,u,new O),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new O,materialIndex:0};bi.getNormal(Pr,Ir,Dr,d.normal),h.face=d,h.barycoord=u}return h}var Ci=class n extends se{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],u=[],d=0,f=0;A("z","y","x",-1,-1,i,e,t,a,r,0),A("z","y","x",1,-1,i,e,-t,a,r,1),A("x","z","y",1,1,t,i,e,s,a,2),A("x","z","y",1,-1,t,i,-e,s,a,3),A("x","y","z",1,-1,t,e,i,s,r,4),A("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new ce(c,3)),this.setAttribute("normal",new ce(h,3)),this.setAttribute("uv",new ce(u,2));function A(y,p,m,M,x,_,P,S,w,T,C){let g=_/w,v=P/T,I=_/2,B=P/2,U=S/2,z=w+1,k=T+1,Z=0,V=0,$=new O;for(let rt=0;rt<k;rt++){let ot=rt*v-B;for(let Tt=0;Tt<z;Tt++){let Bt=Tt*g-I;$[y]=Bt*M,$[p]=ot*x,$[m]=U,c.push($.x,$.y,$.z),$[y]=0,$[p]=0,$[m]=S>0?1:-1,h.push($.x,$.y,$.z),u.push(Tt/w),u.push(1-rt/T),Z+=1}}for(let rt=0;rt<T;rt++)for(let ot=0;ot<w;ot++){let Tt=d+ot+z*rt,Bt=d+ot+z*(rt+1),tt=d+(ot+1)+z*(rt+1),L=d+(ot+1)+z*rt;l.push(Tt,Bt,L),l.push(Bt,tt,L),V+=6}o.addGroup(f,V,C),f+=V,d+=Z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function os(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function Oe(n){let t={};for(let e=0;e<n.length;e++){let i=os(n[e]);for(let s in i)t[s]=i[s]}return t}function np(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Fu(n){let t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Kt.workingColorSpace}var bn={clone:os,merge:Oe},ip=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,sp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ve=class extends Vn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ip,this.fragmentShader=sp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=os(t.uniforms),this.uniformsGroups=np(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}},ra=class extends We{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new te,this.projectionMatrix=new te,this.projectionMatrixInverse=new te,this.coordinateSystem=kn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},$n=new O,Yh=new mt,Kh=new mt,Be=class extends ra{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Xs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(zs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Xs*2*Math.atan(Math.tan(zs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){$n.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set($n.x,$n.y).multiplyScalar(-t/$n.z),$n.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set($n.x,$n.y).multiplyScalar(-t/$n.z)}getViewSize(t,e){return this.getViewBounds(t,Yh,Kh),e.subVectors(Kh,Yh)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(zs*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},ji=-90,Zi=1,bl=class extends We{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Be(ji,Zi,t,e);s.layers=this.layers,this.add(s);let r=new Be(ji,Zi,t,e);r.layers=this.layers,this.add(r);let a=new Be(ji,Zi,t,e);a.layers=this.layers,this.add(a);let o=new Be(ji,Zi,t,e);o.layers=this.layers,this.add(o);let l=new Be(ji,Zi,t,e);l.layers=this.layers,this.add(l);let c=new Be(ji,Zi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===kn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Jr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),A=t.xr.enabled;t.xr.enabled=!1;let y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,a),t.setRenderTarget(i,2,s),t.render(e,o),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=y,t.setRenderTarget(i,5,s),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=A,i.texture.needsPMREMUpdate=!0}},aa=class extends Ge{constructor(t,e,i,s,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:rs,super(t,e,i,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Sl=class extends Ue{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new aa(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:An}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ci(5,5,5),r=new ve({name:"CubemapFromEquirect",uniforms:os(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Re,blending:pe});r.uniforms.tEquirect.value=e;let a=new ie(s,r),o=e.minFilter;return e.minFilter===wi&&(e.minFilter=An),new bl(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,i,s){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}},So=new O,rp=new O,ap=new Ht,gn=class{constructor(t=new O(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let s=So.subVectors(i,e).cross(rp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let i=t.delta(So),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||ap.getNormalMatrix(t),s=this.coplanarPoint(So).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},xi=new qs,Or=new O,Ks=class{constructor(t=new gn,e=new gn,i=new gn,s=new gn,r=new gn,a=new gn){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=kn){let i=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],u=s[6],d=s[7],f=s[8],A=s[9],y=s[10],p=s[11],m=s[12],M=s[13],x=s[14],_=s[15];if(i[0].setComponents(l-r,d-c,p-f,_-m).normalize(),i[1].setComponents(l+r,d+c,p+f,_+m).normalize(),i[2].setComponents(l+a,d+h,p+A,_+M).normalize(),i[3].setComponents(l-a,d-h,p-A,_-M).normalize(),i[4].setComponents(l-o,d-u,p-y,_-x).normalize(),e===kn)i[5].setComponents(l+o,d+u,p+y,_+x).normalize();else if(e===Jr)i[5].setComponents(o,u,y,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),xi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),xi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(xi)}intersectsSprite(t){return xi.center.set(0,0,0),xi.radius=.7071067811865476,xi.applyMatrix4(t.matrixWorld),this.intersectsSphere(xi)}intersectsSphere(t){let e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let s=e[i];if(Or.x=s.normal.x>0?t.max.x:t.min.x,Or.y=s.normal.y>0?t.max.y:t.min.y,Or.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Or)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function zu(){let n=null,t=!1,e=null,i=null;function s(r,a){e(r,a),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function op(n){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,u=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,l,c){let h=l.array,u=l.updateRanges;if(n.bindBuffer(c,o),u.length===0)n.bufferSubData(c,0,h);else{u.sort((f,A)=>f.start-A.start);let d=0;for(let f=1;f<u.length;f++){let A=u[d],y=u[f];y.start<=A.start+A.count+1?A.count=Math.max(A.count,y.start+y.count-A.start):(++d,u[d]=y)}u.length=d+1;for(let f=0,A=u.length;f<A;f++){let y=u[f];n.bufferSubData(c,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(n.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Wn=class n extends se{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(i),l=Math.floor(s),c=o+1,h=l+1,u=t/o,d=e/l,f=[],A=[],y=[],p=[];for(let m=0;m<h;m++){let M=m*d-a;for(let x=0;x<c;x++){let _=x*u-r;A.push(_,-M,0),y.push(0,0,1),p.push(x/o),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let M=0;M<o;M++){let x=M+c*m,_=M+c*(m+1),P=M+1+c*(m+1),S=M+1+c*m;f.push(x,_,S),f.push(_,P,S)}this.setIndex(f),this.setAttribute("position",new ce(A,3)),this.setAttribute("normal",new ce(y,3)),this.setAttribute("uv",new ce(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}},lp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,cp=`#ifdef USE_ALPHAHASH
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
#endif`,hp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,up=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,fp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,dp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,pp=`#ifdef USE_AOMAP
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
#endif`,mp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,gp=`#ifdef USE_BATCHING
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
#endif`,Ap=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,vp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,xp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,yp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,_p=`#ifdef USE_IRIDESCENCE
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
#endif`,Mp=`#ifdef USE_BUMPMAP
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
#endif`,bp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Sp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,wp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ep=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Tp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Cp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Rp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Pp=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Ip=`#define PI 3.141592653589793
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
} // validated`,Dp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Up=`vec3 transformedNormal = objectNormal;
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
#endif`,Lp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Np=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Op=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Bp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Fp="gl_FragColor = linearToOutputTexel( gl_FragColor );",zp=`
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
}`,kp=`#ifdef USE_ENVMAP
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
#endif`,Hp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Vp=`#ifdef USE_ENVMAP
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
#endif`,Gp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Wp=`#ifdef USE_ENVMAP
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
#endif`,Xp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,qp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Yp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Kp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,jp=`#ifdef USE_GRADIENTMAP
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
}`,Zp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Qp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Jp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$p=`uniform bool receiveShadow;
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
#endif`,tm=`#ifdef USE_ENVMAP
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
#endif`,em=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,nm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,im=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,sm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,rm=`PhysicalMaterial material;
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
#endif`,am=`struct PhysicalMaterial {
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
}`,om=`
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
#endif`,lm=`#if defined( RE_IndirectDiffuse )
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
#endif`,cm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,hm=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,um=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,dm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,pm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,mm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,gm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Am=`#if defined( USE_POINTS_UV )
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
#endif`,vm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,xm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ym=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,_m=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Mm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,bm=`#ifdef USE_MORPHTARGETS
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
#endif`,Sm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Em=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Tm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Rm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Pm=`#ifdef USE_NORMALMAP
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
#endif`,Im=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Dm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Um=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Lm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Nm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Om=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Bm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Fm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,zm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,km=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Hm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Vm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Gm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Wm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Xm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,qm=`float getShadowMask() {
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
}`,Ym=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Km=`#ifdef USE_SKINNING
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
#endif`,jm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Zm=`#ifdef USE_SKINNING
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
#endif`,Qm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Jm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,$m=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,eg=`#ifdef USE_TRANSMISSION
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
#endif`,ng=`#ifdef USE_TRANSMISSION
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
#endif`,ig=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,rg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ag=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,og=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,lg=`uniform sampler2D t2D;
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
}`,cg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,ug=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dg=`#include <common>
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
}`,pg=`#if DEPTH_PACKING == 3200
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
}`,mg=`#define DISTANCE
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
}`,gg=`#define DISTANCE
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
}`,Ag=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,vg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xg=`uniform float scale;
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
}`,yg=`uniform vec3 diffuse;
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
}`,_g=`#include <common>
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
}`,Mg=`uniform vec3 diffuse;
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
}`,bg=`#define LAMBERT
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
}`,Sg=`#define LAMBERT
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
}`,wg=`#define MATCAP
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
}`,Eg=`#define MATCAP
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
}`,Tg=`#define NORMAL
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
}`,Cg=`#define NORMAL
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
}`,Rg=`#define PHONG
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
}`,Pg=`#define PHONG
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
}`,Ig=`#define STANDARD
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
}`,Dg=`#define STANDARD
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
}`,Ug=`#define TOON
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
}`,Lg=`#define TOON
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
}`,Ng=`uniform float size;
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
}`,Og=`uniform vec3 diffuse;
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
}`,Bg=`#include <common>
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
}`,Fg=`uniform vec3 color;
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
}`,zg=`uniform float rotation;
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
}`,kg=`uniform vec3 diffuse;
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
}`,zt={alphahash_fragment:lp,alphahash_pars_fragment:cp,alphamap_fragment:hp,alphamap_pars_fragment:up,alphatest_fragment:fp,alphatest_pars_fragment:dp,aomap_fragment:pp,aomap_pars_fragment:mp,batching_pars_vertex:gp,batching_vertex:Ap,begin_vertex:vp,beginnormal_vertex:xp,bsdfs:yp,iridescence_fragment:_p,bumpmap_pars_fragment:Mp,clipping_planes_fragment:bp,clipping_planes_pars_fragment:Sp,clipping_planes_pars_vertex:wp,clipping_planes_vertex:Ep,color_fragment:Tp,color_pars_fragment:Cp,color_pars_vertex:Rp,color_vertex:Pp,common:Ip,cube_uv_reflection_fragment:Dp,defaultnormal_vertex:Up,displacementmap_pars_vertex:Lp,displacementmap_vertex:Np,emissivemap_fragment:Op,emissivemap_pars_fragment:Bp,colorspace_fragment:Fp,colorspace_pars_fragment:zp,envmap_fragment:kp,envmap_common_pars_fragment:Hp,envmap_pars_fragment:Vp,envmap_pars_vertex:Gp,envmap_physical_pars_fragment:tm,envmap_vertex:Wp,fog_vertex:Xp,fog_pars_vertex:qp,fog_fragment:Yp,fog_pars_fragment:Kp,gradientmap_pars_fragment:jp,lightmap_pars_fragment:Zp,lights_lambert_fragment:Qp,lights_lambert_pars_fragment:Jp,lights_pars_begin:$p,lights_toon_fragment:em,lights_toon_pars_fragment:nm,lights_phong_fragment:im,lights_phong_pars_fragment:sm,lights_physical_fragment:rm,lights_physical_pars_fragment:am,lights_fragment_begin:om,lights_fragment_maps:lm,lights_fragment_end:cm,logdepthbuf_fragment:hm,logdepthbuf_pars_fragment:um,logdepthbuf_pars_vertex:fm,logdepthbuf_vertex:dm,map_fragment:pm,map_pars_fragment:mm,map_particle_fragment:gm,map_particle_pars_fragment:Am,metalnessmap_fragment:vm,metalnessmap_pars_fragment:xm,morphinstance_vertex:ym,morphcolor_vertex:_m,morphnormal_vertex:Mm,morphtarget_pars_vertex:bm,morphtarget_vertex:Sm,normal_fragment_begin:wm,normal_fragment_maps:Em,normal_pars_fragment:Tm,normal_pars_vertex:Cm,normal_vertex:Rm,normalmap_pars_fragment:Pm,clearcoat_normal_fragment_begin:Im,clearcoat_normal_fragment_maps:Dm,clearcoat_pars_fragment:Um,iridescence_pars_fragment:Lm,opaque_fragment:Nm,packing:Om,premultiplied_alpha_fragment:Bm,project_vertex:Fm,dithering_fragment:zm,dithering_pars_fragment:km,roughnessmap_fragment:Hm,roughnessmap_pars_fragment:Vm,shadowmap_pars_fragment:Gm,shadowmap_pars_vertex:Wm,shadowmap_vertex:Xm,shadowmask_pars_fragment:qm,skinbase_vertex:Ym,skinning_pars_vertex:Km,skinning_vertex:jm,skinnormal_vertex:Zm,specularmap_fragment:Qm,specularmap_pars_fragment:Jm,tonemapping_fragment:$m,tonemapping_pars_fragment:tg,transmission_fragment:eg,transmission_pars_fragment:ng,uv_pars_fragment:ig,uv_pars_vertex:sg,uv_vertex:rg,worldpos_vertex:ag,background_vert:og,background_frag:lg,backgroundCube_vert:cg,backgroundCube_frag:hg,cube_vert:ug,cube_frag:fg,depth_vert:dg,depth_frag:pg,distanceRGBA_vert:mg,distanceRGBA_frag:gg,equirect_vert:Ag,equirect_frag:vg,linedashed_vert:xg,linedashed_frag:yg,meshbasic_vert:_g,meshbasic_frag:Mg,meshlambert_vert:bg,meshlambert_frag:Sg,meshmatcap_vert:wg,meshmatcap_frag:Eg,meshnormal_vert:Tg,meshnormal_frag:Cg,meshphong_vert:Rg,meshphong_frag:Pg,meshphysical_vert:Ig,meshphysical_frag:Dg,meshtoon_vert:Ug,meshtoon_frag:Lg,points_vert:Ng,points_frag:Og,shadow_vert:Bg,shadow_frag:Fg,sprite_vert:zg,sprite_frag:kg},pt={common:{diffuse:{value:new Pt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ht}},envmap:{envMap:{value:null},envMapRotation:{value:new Ht},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ht}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ht}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ht},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ht},normalScale:{value:new mt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ht},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ht}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ht}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ht}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Pt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Pt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0},uvTransform:{value:new Ht}},sprite:{diffuse:{value:new Pt(16777215)},opacity:{value:1},center:{value:new mt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}}},Cn={basic:{uniforms:Oe([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.fog]),vertexShader:zt.meshbasic_vert,fragmentShader:zt.meshbasic_frag},lambert:{uniforms:Oe([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Pt(0)}}]),vertexShader:zt.meshlambert_vert,fragmentShader:zt.meshlambert_frag},phong:{uniforms:Oe([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Pt(0)},specular:{value:new Pt(1118481)},shininess:{value:30}}]),vertexShader:zt.meshphong_vert,fragmentShader:zt.meshphong_frag},standard:{uniforms:Oe([pt.common,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.roughnessmap,pt.metalnessmap,pt.fog,pt.lights,{emissive:{value:new Pt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag},toon:{uniforms:Oe([pt.common,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.gradientmap,pt.fog,pt.lights,{emissive:{value:new Pt(0)}}]),vertexShader:zt.meshtoon_vert,fragmentShader:zt.meshtoon_frag},matcap:{uniforms:Oe([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,{matcap:{value:null}}]),vertexShader:zt.meshmatcap_vert,fragmentShader:zt.meshmatcap_frag},points:{uniforms:Oe([pt.points,pt.fog]),vertexShader:zt.points_vert,fragmentShader:zt.points_frag},dashed:{uniforms:Oe([pt.common,pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:zt.linedashed_vert,fragmentShader:zt.linedashed_frag},depth:{uniforms:Oe([pt.common,pt.displacementmap]),vertexShader:zt.depth_vert,fragmentShader:zt.depth_frag},normal:{uniforms:Oe([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,{opacity:{value:1}}]),vertexShader:zt.meshnormal_vert,fragmentShader:zt.meshnormal_frag},sprite:{uniforms:Oe([pt.sprite,pt.fog]),vertexShader:zt.sprite_vert,fragmentShader:zt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ht},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:zt.background_vert,fragmentShader:zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ht}},vertexShader:zt.backgroundCube_vert,fragmentShader:zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:zt.cube_vert,fragmentShader:zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:zt.equirect_vert,fragmentShader:zt.equirect_frag},distanceRGBA:{uniforms:Oe([pt.common,pt.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:zt.distanceRGBA_vert,fragmentShader:zt.distanceRGBA_frag},shadow:{uniforms:Oe([pt.lights,pt.fog,{color:{value:new Pt(0)},opacity:{value:1}}]),vertexShader:zt.shadow_vert,fragmentShader:zt.shadow_frag}};Cn.physical={uniforms:Oe([Cn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ht},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ht},clearcoatNormalScale:{value:new mt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ht},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ht},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ht},sheen:{value:0},sheenColor:{value:new Pt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ht},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ht},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ht},transmissionSamplerSize:{value:new mt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ht},attenuationDistance:{value:0},attenuationColor:{value:new Pt(0)},specularColor:{value:new Pt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ht},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ht},anisotropyVector:{value:new mt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ht}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag};var Br={r:0,b:0,g:0},yi=new Pn,Hg=new te;function Vg(n,t,e,i,s,r,a){let o=new Pt(0),l=r===!0?0:1,c,h,u=null,d=0,f=null;function A(M){let x=M.isScene===!0?M.background:null;return x&&x.isTexture&&(x=(M.backgroundBlurriness>0?e:t).get(x)),x}function y(M){let x=!1,_=A(M);_===null?m(o,l):_&&_.isColor&&(m(_,1),x=!0);let P=n.xr.getEnvironmentBlendMode();P==="additive"?i.buffers.color.setClear(0,0,0,1,a):P==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||x)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function p(M,x){let _=A(x);_&&(_.isCubeTexture||_.mapping===xa)?(h===void 0&&(h=new ie(new Ci(1,1,1),new ve({name:"BackgroundCubeMaterial",uniforms:os(Cn.backgroundCube.uniforms),vertexShader:Cn.backgroundCube.vertexShader,fragmentShader:Cn.backgroundCube.fragmentShader,side:Re,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,S,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),yi.copy(x.backgroundRotation),yi.x*=-1,yi.y*=-1,yi.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(yi.y*=-1,yi.z*=-1),h.material.uniforms.envMap.value=_,h.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Hg.makeRotationFromEuler(yi)),h.material.toneMapped=Kt.getTransfer(_.colorSpace)!==ne,(u!==_||d!==_.version||f!==n.toneMapping)&&(h.material.needsUpdate=!0,u=_,d=_.version,f=n.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new ie(new Wn(2,2),new ve({name:"BackgroundMaterial",uniforms:os(Cn.background.uniforms),vertexShader:Cn.background.vertexShader,fragmentShader:Cn.background.fragmentShader,side:Rn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=Kt.getTransfer(_.colorSpace)!==ne,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||d!==_.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,u=_,d=_.version,f=n.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function m(M,x){M.getRGB(Br,Fu(n)),i.buffers.color.setClear(Br.r,Br.g,Br.b,x,a)}return{getClearColor:function(){return o},setClearColor:function(M,x=1){o.set(M),l=x,m(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,m(o,l)},render:y,addToRenderList:p}}function Gg(n,t){let e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=d(null),r=s,a=!1;function o(g,v,I,B,U){let z=!1,k=u(B,I,v);r!==k&&(r=k,c(r.object)),z=f(g,B,I,U),z&&A(g,B,I,U),U!==null&&t.update(U,n.ELEMENT_ARRAY_BUFFER),(z||a)&&(a=!1,_(g,v,I,B),U!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(U).buffer))}function l(){return n.createVertexArray()}function c(g){return n.bindVertexArray(g)}function h(g){return n.deleteVertexArray(g)}function u(g,v,I){let B=I.wireframe===!0,U=i[g.id];U===void 0&&(U={},i[g.id]=U);let z=U[v.id];z===void 0&&(z={},U[v.id]=z);let k=z[B];return k===void 0&&(k=d(l()),z[B]=k),k}function d(g){let v=[],I=[],B=[];for(let U=0;U<e;U++)v[U]=0,I[U]=0,B[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:v,enabledAttributes:I,attributeDivisors:B,object:g,attributes:{},index:null}}function f(g,v,I,B){let U=r.attributes,z=v.attributes,k=0,Z=I.getAttributes();for(let V in Z)if(Z[V].location>=0){let rt=U[V],ot=z[V];if(ot===void 0&&(V==="instanceMatrix"&&g.instanceMatrix&&(ot=g.instanceMatrix),V==="instanceColor"&&g.instanceColor&&(ot=g.instanceColor)),rt===void 0||rt.attribute!==ot||ot&&rt.data!==ot.data)return!0;k++}return r.attributesNum!==k||r.index!==B}function A(g,v,I,B){let U={},z=v.attributes,k=0,Z=I.getAttributes();for(let V in Z)if(Z[V].location>=0){let rt=z[V];rt===void 0&&(V==="instanceMatrix"&&g.instanceMatrix&&(rt=g.instanceMatrix),V==="instanceColor"&&g.instanceColor&&(rt=g.instanceColor));let ot={};ot.attribute=rt,rt&&rt.data&&(ot.data=rt.data),U[V]=ot,k++}r.attributes=U,r.attributesNum=k,r.index=B}function y(){let g=r.newAttributes;for(let v=0,I=g.length;v<I;v++)g[v]=0}function p(g){m(g,0)}function m(g,v){let I=r.newAttributes,B=r.enabledAttributes,U=r.attributeDivisors;I[g]=1,B[g]===0&&(n.enableVertexAttribArray(g),B[g]=1),U[g]!==v&&(n.vertexAttribDivisor(g,v),U[g]=v)}function M(){let g=r.newAttributes,v=r.enabledAttributes;for(let I=0,B=v.length;I<B;I++)v[I]!==g[I]&&(n.disableVertexAttribArray(I),v[I]=0)}function x(g,v,I,B,U,z,k){k===!0?n.vertexAttribIPointer(g,v,I,U,z):n.vertexAttribPointer(g,v,I,B,U,z)}function _(g,v,I,B){y();let U=B.attributes,z=I.getAttributes(),k=v.defaultAttributeValues;for(let Z in z){let V=z[Z];if(V.location>=0){let $=U[Z];if($===void 0&&(Z==="instanceMatrix"&&g.instanceMatrix&&($=g.instanceMatrix),Z==="instanceColor"&&g.instanceColor&&($=g.instanceColor)),$!==void 0){let rt=$.normalized,ot=$.itemSize,Tt=t.get($);if(Tt===void 0)continue;let Bt=Tt.buffer,tt=Tt.type,L=Tt.bytesPerElement,G=tt===n.INT||tt===n.UNSIGNED_INT||$.gpuType===cc;if($.isInterleavedBufferAttribute){let N=$.data,q=N.stride,Y=$.offset;if(N.isInstancedInterleavedBuffer){for(let it=0;it<V.locationSize;it++)m(V.location+it,N.meshPerAttribute);g.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=N.meshPerAttribute*N.count)}else for(let it=0;it<V.locationSize;it++)p(V.location+it);n.bindBuffer(n.ARRAY_BUFFER,Bt);for(let it=0;it<V.locationSize;it++)x(V.location+it,ot/V.locationSize,tt,rt,q*L,(Y+ot/V.locationSize*it)*L,G)}else{if($.isInstancedBufferAttribute){for(let N=0;N<V.locationSize;N++)m(V.location+N,$.meshPerAttribute);g.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let N=0;N<V.locationSize;N++)p(V.location+N);n.bindBuffer(n.ARRAY_BUFFER,Bt);for(let N=0;N<V.locationSize;N++)x(V.location+N,ot/V.locationSize,tt,rt,ot*L,ot/V.locationSize*N*L,G)}}else if(k!==void 0){let rt=k[Z];if(rt!==void 0)switch(rt.length){case 2:n.vertexAttrib2fv(V.location,rt);break;case 3:n.vertexAttrib3fv(V.location,rt);break;case 4:n.vertexAttrib4fv(V.location,rt);break;default:n.vertexAttrib1fv(V.location,rt)}}}}M()}function P(){T();for(let g in i){let v=i[g];for(let I in v){let B=v[I];for(let U in B)h(B[U].object),delete B[U];delete v[I]}delete i[g]}}function S(g){if(i[g.id]===void 0)return;let v=i[g.id];for(let I in v){let B=v[I];for(let U in B)h(B[U].object),delete B[U];delete v[I]}delete i[g.id]}function w(g){for(let v in i){let I=i[v];if(I[g.id]===void 0)continue;let B=I[g.id];for(let U in B)h(B[U].object),delete B[U];delete I[g.id]}}function T(){C(),a=!0,r!==s&&(r=s,c(r.object))}function C(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:T,resetDefaultState:C,dispose:P,releaseStatesOfGeometry:S,releaseStatesOfProgram:w,initAttributes:y,enableAttribute:p,disableUnusedAttributes:M}}function Wg(n,t,e){let i;function s(c){i=c}function r(c,h){n.drawArrays(i,c,h),e.update(h,i,1)}function a(c,h,u){u!==0&&(n.drawArraysInstanced(i,c,h,u),e.update(h,i,u))}function o(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let f=0;for(let A=0;A<u;A++)f+=h[A];e.update(f,i,1)}function l(c,h,u,d){if(u===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let A=0;A<c.length;A++)a(c[A],h[A],d[A]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,h,0,d,0,u);let A=0;for(let y=0;y<u;y++)A+=h[y];for(let y=0;y<d.length;y++)e.update(A,i,d[y])}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Xg(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let w=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(w){return!(w!==Je&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){let T=w===on&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==vn&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==zn&&!T)}function l(w){if(w==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control");if(d===!0){let w=t.get("EXT_clip_control");w.clipControlEXT(w.LOWER_LEFT_EXT,w.ZERO_TO_ONE_EXT)}let f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),A=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),x=n.getParameter(n.MAX_VARYING_VECTORS),_=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),P=A>0,S=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:A,maxTextureSize:y,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:M,maxVaryings:x,maxFragmentUniforms:_,vertexTextures:P,maxSamples:S}}function qg(n){let t=this,e=null,i=0,s=!1,r=!1,a=new gn,o=new Ht,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||i!==0||s;return s=d,i=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){let A=u.clippingPlanes,y=u.clipIntersection,p=u.clipShadows,m=n.get(u);if(!s||A===null||A.length===0||r&&!p)r?h(null):c();else{let M=r?0:i,x=M*4,_=m.clippingState||null;l.value=_,_=h(A,d,x,f);for(let P=0;P!==x;++P)_[P]=e[P];m.clippingState=_,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,d,f,A){let y=u!==null?u.length:0,p=null;if(y!==0){if(p=l.value,A!==!0||p===null){let m=f+y*4,M=d.matrixWorldInverse;o.getNormalMatrix(M),(p===null||p.length<m)&&(p=new Float32Array(m));for(let x=0,_=f;x!==y;++x,_+=4)a.copy(u[x]).applyMatrix4(M,o),a.normal.toArray(p,_),p[_+3]=a.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,p}}function Yg(n){let t=new WeakMap;function e(a,o){return o===Wo?a.mapping=rs:o===Xo&&(a.mapping=as),a}function i(a){if(a&&a.isTexture){let o=a.mapping;if(o===Wo||o===Xo)if(t.has(a)){let l=t.get(a).texture;return e(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new Sl(l.height);return c.fromEquirectangularTexture(n,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}var ls=class extends ra{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,a=i+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},$i=4,jh=[.125,.215,.35,.446,.526,.582],Si=20,wo=new ls,Zh=new Pt,Eo=null,To=0,Co=0,Ro=!1,Mi=(1+Math.sqrt(5))/2,Qi=1/Mi,Qh=[new O(-Mi,Qi,0),new O(Mi,Qi,0),new O(-Qi,0,Mi),new O(Qi,0,Mi),new O(0,Mi,-Qi),new O(0,Mi,Qi),new O(-1,1,-1),new O(1,1,-1),new O(-1,1,1),new O(1,1,1)],cs=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){Eo=this._renderer.getRenderTarget(),To=this._renderer.getActiveCubeFace(),Co=this._renderer.getActiveMipmapLevel(),Ro=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=tu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=$h(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Eo,To,Co),this._renderer.xr.enabled=Ro,t.scissorTest=!1,Fr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===rs||t.mapping===as?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Eo=this._renderer.getRenderTarget(),To=this._renderer.getActiveCubeFace(),Co=this._renderer.getActiveMipmapLevel(),Ro=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:An,minFilter:An,generateMipmaps:!1,type:on,format:Je,colorSpace:ri,depthBuffer:!1},s=Jh(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Jh(t,e,i);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Kg(r)),this._blurMaterial=jg(r,t,e)}return s}_compileMaterial(t){let e=new ie(this._lodPlanes[0],t);this._renderer.compile(e,wo)}_sceneToCubeUV(t,e,i,s){let o=new Be(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Zh),h.toneMapping=ni,h.autoClear=!1;let f=new Gn({name:"PMREM.Background",side:Re,depthWrite:!1,depthTest:!1}),A=new ie(new Ci,f),y=!1,p=t.background;p?p.isColor&&(f.color.copy(p),t.background=null,y=!0):(f.color.copy(Zh),y=!0);for(let m=0;m<6;m++){let M=m%3;M===0?(o.up.set(0,l[m],0),o.lookAt(c[m],0,0)):M===1?(o.up.set(0,0,l[m]),o.lookAt(0,c[m],0)):(o.up.set(0,l[m],0),o.lookAt(0,0,c[m]));let x=this._cubeSize;Fr(s,M*x,m>2?x:0,x,x),h.setRenderTarget(s),y&&h.render(A,o),h.render(t,o)}A.geometry.dispose(),A.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=p}_textureToCubeUV(t,e){let i=this._renderer,s=t.mapping===rs||t.mapping===as;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=tu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=$h());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new ie(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;Fr(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,wo)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Qh[(s-r-1)%Qh.length];this._blur(t,r-1,r,a,o)}e.autoClear=i}_blur(t,e,i,s,r){let a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,s,"latitudinal",r),this._halfBlur(a,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new ie(this._lodPlanes[s],c),d=c.uniforms,f=this._sizeLods[i]-1,A=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Si-1),y=r/A,p=isFinite(r)?1+Math.floor(h*y):Si;p>Si&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Si}`);let m=[],M=0;for(let w=0;w<Si;++w){let T=w/y,C=Math.exp(-T*T/2);m.push(C),w===0?M+=C:w<p&&(M+=2*C)}for(let w=0;w<m.length;w++)m[w]=m[w]/M;d.envMap.value=t.texture,d.samples.value=p,d.weights.value=m,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);let{_lodMax:x}=this;d.dTheta.value=A,d.mipInt.value=x-i;let _=this._sizeLods[s],P=3*_*(s>x-$i?s-x+$i:0),S=4*(this._cubeSize-_);Fr(e,P,S,3*_,2*_),l.setRenderTarget(e),l.render(u,wo)}};function Kg(n){let t=[],e=[],i=[],s=n,r=n-$i+1+jh.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);e.push(o);let l=1/o;a>n-$i?l=jh[a-n+$i-1]:a===0&&(l=0),i.push(l);let c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,A=6,y=3,p=2,m=1,M=new Float32Array(y*A*f),x=new Float32Array(p*A*f),_=new Float32Array(m*A*f);for(let S=0;S<f;S++){let w=S%3*2/3-1,T=S>2?0:-1,C=[w,T,0,w+2/3,T,0,w+2/3,T+1,0,w,T,0,w+2/3,T+1,0,w,T+1,0];M.set(C,y*A*S),x.set(d,p*A*S);let g=[S,S,S,S,S,S];_.set(g,m*A*S)}let P=new se;P.setAttribute("position",new _e(M,y)),P.setAttribute("uv",new _e(x,p)),P.setAttribute("faceIndex",new _e(_,m)),t.push(P),s>$i&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Jh(n,t,e){let i=new Ue(n,t,e);return i.texture.mapping=xa,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Fr(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function jg(n,t,e){let i=new Float32Array(Si),s=new O(0,1,0);return new ve({name:"SphericalGaussianBlur",defines:{n:Si,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:xc(),fragmentShader:`

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
		`,blending:pe,depthTest:!1,depthWrite:!1})}function $h(){return new ve({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xc(),fragmentShader:`

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
		`,blending:pe,depthTest:!1,depthWrite:!1})}function tu(){return new ve({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:pe,depthTest:!1,depthWrite:!1})}function xc(){return`

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
	`}function Zg(n){let t=new WeakMap,e=null;function i(o){if(o&&o.isTexture){let l=o.mapping,c=l===Wo||l===Xo,h=l===rs||l===as;if(c||h){let u=t.get(o),d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new cs(n)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{let f=o.image;return c&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new cs(n)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0,c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){let l=o.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:a}}function Qg(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let s=e(i);return s===null&&Yr("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function Jg(n,t,e,i){let s={},r=new WeakMap;function a(u){let d=u.target;d.index!==null&&t.remove(d.index);for(let A in d.attributes)t.remove(d.attributes[A]);for(let A in d.morphAttributes){let y=d.morphAttributes[A];for(let p=0,m=y.length;p<m;p++)t.remove(y[p])}d.removeEventListener("dispose",a),delete s[d.id];let f=r.get(d);f&&(t.remove(f),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,e.memory.geometries++),d}function l(u){let d=u.attributes;for(let A in d)t.update(d[A],n.ARRAY_BUFFER);let f=u.morphAttributes;for(let A in f){let y=f[A];for(let p=0,m=y.length;p<m;p++)t.update(y[p],n.ARRAY_BUFFER)}}function c(u){let d=[],f=u.index,A=u.attributes.position,y=0;if(f!==null){let M=f.array;y=f.version;for(let x=0,_=M.length;x<_;x+=3){let P=M[x+0],S=M[x+1],w=M[x+2];d.push(P,S,S,w,w,P)}}else if(A!==void 0){let M=A.array;y=A.version;for(let x=0,_=M.length/3-1;x<_;x+=3){let P=x+0,S=x+1,w=x+2;d.push(P,S,S,w,w,P)}}else return;let p=new(Ou(d)?sa:ia)(d,1);p.version=y;let m=r.get(u);m&&t.remove(m),r.set(u,p)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function $g(n,t,e){let i;function s(d){i=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,f){n.drawElements(i,f,r,d*a),e.update(f,i,1)}function c(d,f,A){A!==0&&(n.drawElementsInstanced(i,f,r,d*a,A),e.update(f,i,A))}function h(d,f,A){if(A===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,d,0,A);let p=0;for(let m=0;m<A;m++)p+=f[m];e.update(p,i,1)}function u(d,f,A,y){if(A===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<d.length;m++)c(d[m]/a,f[m],y[m]);else{p.multiDrawElementsInstancedWEBGL(i,f,0,r,d,0,y,0,A);let m=0;for(let M=0;M<A;M++)m+=f[M];for(let M=0;M<y.length;M++)e.update(m,i,y[M])}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function t0(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function e0(n,t,e){let i=new WeakMap,s=new fe;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,d=i.get(o);if(d===void 0||d.count!==u){let C=function(){w.dispose(),i.delete(o),o.removeEventListener("dispose",C)};d!==void 0&&d.texture.dispose();let f=o.morphAttributes.position!==void 0,A=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],M=o.morphAttributes.color||[],x=0;f===!0&&(x=1),A===!0&&(x=2),y===!0&&(x=3);let _=o.attributes.position.count*x,P=1;_>t.maxTextureSize&&(P=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);let S=new Float32Array(_*P*4*u),w=new ea(S,_,P,u);w.type=zn,w.needsUpdate=!0;let T=x*4;for(let g=0;g<u;g++){let v=p[g],I=m[g],B=M[g],U=_*P*4*g;for(let z=0;z<v.count;z++){let k=z*T;f===!0&&(s.fromBufferAttribute(v,z),S[U+k+0]=s.x,S[U+k+1]=s.y,S[U+k+2]=s.z,S[U+k+3]=0),A===!0&&(s.fromBufferAttribute(I,z),S[U+k+4]=s.x,S[U+k+5]=s.y,S[U+k+6]=s.z,S[U+k+7]=0),y===!0&&(s.fromBufferAttribute(B,z),S[U+k+8]=s.x,S[U+k+9]=s.y,S[U+k+10]=s.z,S[U+k+11]=B.itemSize===4?s.w:1)}}d={count:u,texture:w,size:new mt(_,P)},i.set(o,d),o.addEventListener("dispose",C)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let f=0;for(let y=0;y<c.length;y++)f+=c[y];let A=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",A),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:r}}function n0(n,t,e,i){let s=new WeakMap;function r(l){let c=i.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function a(){s=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}var hs=class extends Ge{constructor(t,e,i,s,r,a,o,l,c,h=es){if(h!==es&&h!==si)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===es&&(i=Ei),i===void 0&&h===si&&(i=ii),super(null,s,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Ce,this.minFilter=l!==void 0?l:Ce,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},ku=new Ge,eu=new hs(1,1),Hu=new ea,Vu=new Ml,Gu=new aa,nu=[],iu=[],su=new Float32Array(16),ru=new Float32Array(9),au=new Float32Array(4);function gs(n,t,e){let i=n[0];if(i<=0||i>0)return n;let s=t*e,r=nu[s];if(r===void 0&&(r=new Float32Array(s),nu[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function Me(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function be(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Ma(n,t){let e=iu[t];e===void 0&&(e=new Int32Array(t),iu[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function i0(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function s0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;n.uniform2fv(this.addr,t),be(e,t)}}function r0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Me(e,t))return;n.uniform3fv(this.addr,t),be(e,t)}}function a0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;n.uniform4fv(this.addr,t),be(e,t)}}function o0(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Me(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),be(e,t)}else{if(Me(e,i))return;au.set(i),n.uniformMatrix2fv(this.addr,!1,au),be(e,i)}}function l0(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Me(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),be(e,t)}else{if(Me(e,i))return;ru.set(i),n.uniformMatrix3fv(this.addr,!1,ru),be(e,i)}}function c0(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Me(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),be(e,t)}else{if(Me(e,i))return;su.set(i),n.uniformMatrix4fv(this.addr,!1,su),be(e,i)}}function h0(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function u0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;n.uniform2iv(this.addr,t),be(e,t)}}function f0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Me(e,t))return;n.uniform3iv(this.addr,t),be(e,t)}}function d0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;n.uniform4iv(this.addr,t),be(e,t)}}function p0(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function m0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;n.uniform2uiv(this.addr,t),be(e,t)}}function g0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Me(e,t))return;n.uniform3uiv(this.addr,t),be(e,t)}}function A0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;n.uniform4uiv(this.addr,t),be(e,t)}}function v0(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(eu.compareFunction=Nu,r=eu):r=ku,e.setTexture2D(t||r,s)}function x0(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Vu,s)}function y0(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||Gu,s)}function _0(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Hu,s)}function M0(n){switch(n){case 5126:return i0;case 35664:return s0;case 35665:return r0;case 35666:return a0;case 35674:return o0;case 35675:return l0;case 35676:return c0;case 5124:case 35670:return h0;case 35667:case 35671:return u0;case 35668:case 35672:return f0;case 35669:case 35673:return d0;case 5125:return p0;case 36294:return m0;case 36295:return g0;case 36296:return A0;case 35678:case 36198:case 36298:case 36306:case 35682:return v0;case 35679:case 36299:case 36307:return x0;case 35680:case 36300:case 36308:case 36293:return y0;case 36289:case 36303:case 36311:case 36292:return _0}}function b0(n,t){n.uniform1fv(this.addr,t)}function S0(n,t){let e=gs(t,this.size,2);n.uniform2fv(this.addr,e)}function w0(n,t){let e=gs(t,this.size,3);n.uniform3fv(this.addr,e)}function E0(n,t){let e=gs(t,this.size,4);n.uniform4fv(this.addr,e)}function T0(n,t){let e=gs(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function C0(n,t){let e=gs(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function R0(n,t){let e=gs(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function P0(n,t){n.uniform1iv(this.addr,t)}function I0(n,t){n.uniform2iv(this.addr,t)}function D0(n,t){n.uniform3iv(this.addr,t)}function U0(n,t){n.uniform4iv(this.addr,t)}function L0(n,t){n.uniform1uiv(this.addr,t)}function N0(n,t){n.uniform2uiv(this.addr,t)}function O0(n,t){n.uniform3uiv(this.addr,t)}function B0(n,t){n.uniform4uiv(this.addr,t)}function F0(n,t,e){let i=this.cache,s=t.length,r=Ma(e,s);Me(i,r)||(n.uniform1iv(this.addr,r),be(i,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||ku,r[a])}function z0(n,t,e){let i=this.cache,s=t.length,r=Ma(e,s);Me(i,r)||(n.uniform1iv(this.addr,r),be(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Vu,r[a])}function k0(n,t,e){let i=this.cache,s=t.length,r=Ma(e,s);Me(i,r)||(n.uniform1iv(this.addr,r),be(i,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Gu,r[a])}function H0(n,t,e){let i=this.cache,s=t.length,r=Ma(e,s);Me(i,r)||(n.uniform1iv(this.addr,r),be(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Hu,r[a])}function V0(n){switch(n){case 5126:return b0;case 35664:return S0;case 35665:return w0;case 35666:return E0;case 35674:return T0;case 35675:return C0;case 35676:return R0;case 5124:case 35670:return P0;case 35667:case 35671:return I0;case 35668:case 35672:return D0;case 35669:case 35673:return U0;case 5125:return L0;case 36294:return N0;case 36295:return O0;case 36296:return B0;case 35678:case 36198:case 36298:case 36306:case 35682:return F0;case 35679:case 36299:case 36307:return z0;case 35680:case 36300:case 36308:case 36293:return k0;case 36289:case 36303:case 36311:case 36292:return H0}}var wl=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=M0(e.type)}},El=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=V0(e.type)}},Tl=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],i)}}},Po=/(\w+)(\])?(\[|\.)?/g;function ou(n,t){n.seq.push(t),n.map[t.id]=t}function G0(n,t,e){let i=n.name,s=i.length;for(Po.lastIndex=0;;){let r=Po.exec(i),a=Po.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){ou(e,c===void 0?new wl(o,n,t):new El(o,n,t));break}else{let u=e.map[o];u===void 0&&(u=new Tl(o),ou(e,u)),e=u}}}var is=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);G0(r,a,this)}}setValue(t,e,i,s){let r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){let s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let i=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&i.push(a)}return i}};function lu(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var W0=37297,X0=0;function q0(n,t){let e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}function Y0(n){let t=Kt.getPrimaries(Kt.workingColorSpace),e=Kt.getPrimaries(n),i;switch(t===e?i="":t===Qr&&e===Zr?i="LinearDisplayP3ToLinearSRGB":t===Zr&&e===Qr&&(i="LinearSRGBToLinearDisplayP3"),n){case ri:case ya:return[i,"LinearTransferOETF"];case Ve:case Ac:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function cu(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+q0(n.getShaderSource(t),a)}else return s}function K0(n,t){let e=Y0(t);return`vec4 ${n}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function j0(n,t){let e;switch(t){case sc:e="Linear";break;case rc:e="Reinhard";break;case ac:e="Cineon";break;case oc:e="ACESFilmic";break;case lc:e="AgX";break;case $s:e="Neutral";break;case fd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var zr=new O;function Z0(){Kt.getLuminanceCoefficients(zr);let n=zr.x.toFixed(4),t=zr.y.toFixed(4),e=zr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Q0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Fs).join(`
`)}function J0(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function $0(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(t,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function Fs(n){return n!==""}function hu(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function uu(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var tA=/^[ \t]*#include +<([\w\d./]+)>/gm;function Cl(n){return n.replace(tA,nA)}var eA=new Map;function nA(n,t){let e=zt[t];if(e===void 0){let i=eA.get(t);if(i!==void 0)e=zt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Cl(e)}var iA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fu(n){return n.replace(iA,sA)}function sA(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function du(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}function rA(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Mu?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===nc?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Bn&&(t="SHADOWMAP_TYPE_VSM"),t}function aA(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case rs:case as:t="ENVMAP_TYPE_CUBE";break;case xa:t="ENVMAP_TYPE_CUBE_UV";break}return t}function oA(n){let t="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===as&&(t="ENVMAP_MODE_REFRACTION"),t}function lA(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case bu:t="ENVMAP_BLENDING_MULTIPLY";break;case hd:t="ENVMAP_BLENDING_MIX";break;case ud:t="ENVMAP_BLENDING_ADD";break}return t}function cA(n){let t=n.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function hA(n,t,e,i){let s=n.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=rA(e),c=aA(e),h=oA(e),u=lA(e),d=cA(e),f=Q0(e),A=J0(r),y=s.createProgram(),p,m,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,A].filter(Fs).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,A].filter(Fs).join(`
`),m.length>0&&(m+=`
`)):(p=[du(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,A,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Fs).join(`
`),m=[du(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,A,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ni?"#define TONE_MAPPING":"",e.toneMapping!==ni?zt.tonemapping_pars_fragment:"",e.toneMapping!==ni?j0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",zt.colorspace_pars_fragment,K0("linearToOutputTexel",e.outputColorSpace),Z0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Fs).join(`
`)),a=Cl(a),a=hu(a,e),a=uu(a,e),o=Cl(o),o=hu(o,e),o=uu(o,e),a=fu(a),o=fu(o),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",e.glslVersion===Ph?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ph?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let x=M+p+a,_=M+m+o,P=lu(s,s.VERTEX_SHADER,x),S=lu(s,s.FRAGMENT_SHADER,_);s.attachShader(y,P),s.attachShader(y,S),e.index0AttributeName!==void 0?s.bindAttribLocation(y,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function w(v){if(n.debug.checkShaderErrors){let I=s.getProgramInfoLog(y).trim(),B=s.getShaderInfoLog(P).trim(),U=s.getShaderInfoLog(S).trim(),z=!0,k=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(z=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,y,P,S);else{let Z=cu(s,P,"vertex"),V=cu(s,S,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+v.name+`
Material Type: `+v.type+`

Program Info Log: `+I+`
`+Z+`
`+V)}else I!==""?console.warn("THREE.WebGLProgram: Program Info Log:",I):(B===""||U==="")&&(k=!1);k&&(v.diagnostics={runnable:z,programLog:I,vertexShader:{log:B,prefix:p},fragmentShader:{log:U,prefix:m}})}s.deleteShader(P),s.deleteShader(S),T=new is(s,y),C=$0(s,y)}let T;this.getUniforms=function(){return T===void 0&&w(this),T};let C;this.getAttributes=function(){return C===void 0&&w(this),C};let g=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return g===!1&&(g=s.getProgramParameter(y,W0)),g},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=X0++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=P,this.fragmentShader=S,this}var uA=0,Rl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new Pl(t),e.set(t,i)),i}},Pl=class{constructor(t){this.id=uA++,this.code=t,this.usedTimes=0}};function fA(n,t,e,i,s,r,a){let o=new na,l=new Rl,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.reverseDepthBuffer,f=s.vertexTextures,A=s.precision,y={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(g){return c.add(g),g===0?"uv":`uv${g}`}function m(g,v,I,B,U){let z=B.fog,k=U.geometry,Z=g.isMeshStandardMaterial?B.environment:null,V=(g.isMeshStandardMaterial?e:t).get(g.envMap||Z),$=V&&V.mapping===xa?V.image.height:null,rt=y[g.type];g.precision!==null&&(A=s.getMaxPrecision(g.precision),A!==g.precision&&console.warn("THREE.WebGLProgram.getParameters:",g.precision,"not supported, using",A,"instead."));let ot=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,Tt=ot!==void 0?ot.length:0,Bt=0;k.morphAttributes.position!==void 0&&(Bt=1),k.morphAttributes.normal!==void 0&&(Bt=2),k.morphAttributes.color!==void 0&&(Bt=3);let tt,L,G,N;if(rt){let He=Cn[rt];tt=He.vertexShader,L=He.fragmentShader}else tt=g.vertexShader,L=g.fragmentShader,l.update(g),G=l.getVertexShaderID(g),N=l.getFragmentShaderID(g);let q=n.getRenderTarget(),Y=U.isInstancedMesh===!0,it=U.isBatchedMesh===!0,ft=!!g.map,ct=!!g.matcap,D=!!V,Gt=!!g.aoMap,ut=!!g.lightMap,Dt=!!g.bumpMap,bt=!!g.normalMap,qt=!!g.displacementMap,It=!!g.emissiveMap,R=!!g.metalnessMap,b=!!g.roughnessMap,X=g.anisotropy>0,nt=g.clearcoat>0,at=g.dispersion>0,et=g.iridescence>0,wt=g.sheen>0,dt=g.transmission>0,At=X&&!!g.anisotropyMap,Vt=nt&&!!g.clearcoatMap,lt=nt&&!!g.clearcoatNormalMap,vt=nt&&!!g.clearcoatRoughnessMap,Ut=et&&!!g.iridescenceMap,Lt=et&&!!g.iridescenceThicknessMap,Mt=wt&&!!g.sheenColorMap,Wt=wt&&!!g.sheenRoughnessMap,Ft=!!g.specularMap,Yt=!!g.specularColorMap,F=!!g.specularIntensityMap,gt=dt&&!!g.transmissionMap,J=dt&&!!g.thicknessMap,st=!!g.gradientMap,xt=!!g.alphaMap,_t=g.alphaTest>0,Xt=!!g.alphaHash,ge=!!g.extensions,ke=ni;g.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(ke=n.toneMapping);let jt={shaderID:rt,shaderType:g.type,shaderName:g.name,vertexShader:tt,fragmentShader:L,defines:g.defines,customVertexShaderID:G,customFragmentShaderID:N,isRawShaderMaterial:g.isRawShaderMaterial===!0,glslVersion:g.glslVersion,precision:A,batching:it,batchingColor:it&&U._colorsTexture!==null,instancing:Y,instancingColor:Y&&U.instanceColor!==null,instancingMorph:Y&&U.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:q===null?n.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:ri,alphaToCoverage:!!g.alphaToCoverage,map:ft,matcap:ct,envMap:D,envMapMode:D&&V.mapping,envMapCubeUVHeight:$,aoMap:Gt,lightMap:ut,bumpMap:Dt,normalMap:bt,displacementMap:f&&qt,emissiveMap:It,normalMapObjectSpace:bt&&g.normalMapType===md,normalMapTangentSpace:bt&&g.normalMapType===gc,metalnessMap:R,roughnessMap:b,anisotropy:X,anisotropyMap:At,clearcoat:nt,clearcoatMap:Vt,clearcoatNormalMap:lt,clearcoatRoughnessMap:vt,dispersion:at,iridescence:et,iridescenceMap:Ut,iridescenceThicknessMap:Lt,sheen:wt,sheenColorMap:Mt,sheenRoughnessMap:Wt,specularMap:Ft,specularColorMap:Yt,specularIntensityMap:F,transmission:dt,transmissionMap:gt,thicknessMap:J,gradientMap:st,opaque:g.transparent===!1&&g.blending===ts&&g.alphaToCoverage===!1,alphaMap:xt,alphaTest:_t,alphaHash:Xt,combine:g.combine,mapUv:ft&&p(g.map.channel),aoMapUv:Gt&&p(g.aoMap.channel),lightMapUv:ut&&p(g.lightMap.channel),bumpMapUv:Dt&&p(g.bumpMap.channel),normalMapUv:bt&&p(g.normalMap.channel),displacementMapUv:qt&&p(g.displacementMap.channel),emissiveMapUv:It&&p(g.emissiveMap.channel),metalnessMapUv:R&&p(g.metalnessMap.channel),roughnessMapUv:b&&p(g.roughnessMap.channel),anisotropyMapUv:At&&p(g.anisotropyMap.channel),clearcoatMapUv:Vt&&p(g.clearcoatMap.channel),clearcoatNormalMapUv:lt&&p(g.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:vt&&p(g.clearcoatRoughnessMap.channel),iridescenceMapUv:Ut&&p(g.iridescenceMap.channel),iridescenceThicknessMapUv:Lt&&p(g.iridescenceThicknessMap.channel),sheenColorMapUv:Mt&&p(g.sheenColorMap.channel),sheenRoughnessMapUv:Wt&&p(g.sheenRoughnessMap.channel),specularMapUv:Ft&&p(g.specularMap.channel),specularColorMapUv:Yt&&p(g.specularColorMap.channel),specularIntensityMapUv:F&&p(g.specularIntensityMap.channel),transmissionMapUv:gt&&p(g.transmissionMap.channel),thicknessMapUv:J&&p(g.thicknessMap.channel),alphaMapUv:xt&&p(g.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(bt||X),vertexColors:g.vertexColors,vertexAlphas:g.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!k.attributes.uv&&(ft||xt),fog:!!z,useFog:g.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:g.flatShading===!0,sizeAttenuation:g.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:d,skinning:U.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:Tt,morphTextureStride:Bt,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:g.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:ke,decodeVideoTexture:ft&&g.map.isVideoTexture===!0&&Kt.getTransfer(g.map.colorSpace)===ne,premultipliedAlpha:g.premultipliedAlpha,doubleSided:g.side===Fe,flipSided:g.side===Re,useDepthPacking:g.depthPacking>=0,depthPacking:g.depthPacking||0,index0AttributeName:g.index0AttributeName,extensionClipCullDistance:ge&&g.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ge&&g.extensions.multiDraw===!0||it)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:g.customProgramCacheKey()};return jt.vertexUv1s=c.has(1),jt.vertexUv2s=c.has(2),jt.vertexUv3s=c.has(3),c.clear(),jt}function M(g){let v=[];if(g.shaderID?v.push(g.shaderID):(v.push(g.customVertexShaderID),v.push(g.customFragmentShaderID)),g.defines!==void 0)for(let I in g.defines)v.push(I),v.push(g.defines[I]);return g.isRawShaderMaterial===!1&&(x(v,g),_(v,g),v.push(n.outputColorSpace)),v.push(g.customProgramCacheKey),v.join()}function x(g,v){g.push(v.precision),g.push(v.outputColorSpace),g.push(v.envMapMode),g.push(v.envMapCubeUVHeight),g.push(v.mapUv),g.push(v.alphaMapUv),g.push(v.lightMapUv),g.push(v.aoMapUv),g.push(v.bumpMapUv),g.push(v.normalMapUv),g.push(v.displacementMapUv),g.push(v.emissiveMapUv),g.push(v.metalnessMapUv),g.push(v.roughnessMapUv),g.push(v.anisotropyMapUv),g.push(v.clearcoatMapUv),g.push(v.clearcoatNormalMapUv),g.push(v.clearcoatRoughnessMapUv),g.push(v.iridescenceMapUv),g.push(v.iridescenceThicknessMapUv),g.push(v.sheenColorMapUv),g.push(v.sheenRoughnessMapUv),g.push(v.specularMapUv),g.push(v.specularColorMapUv),g.push(v.specularIntensityMapUv),g.push(v.transmissionMapUv),g.push(v.thicknessMapUv),g.push(v.combine),g.push(v.fogExp2),g.push(v.sizeAttenuation),g.push(v.morphTargetsCount),g.push(v.morphAttributeCount),g.push(v.numDirLights),g.push(v.numPointLights),g.push(v.numSpotLights),g.push(v.numSpotLightMaps),g.push(v.numHemiLights),g.push(v.numRectAreaLights),g.push(v.numDirLightShadows),g.push(v.numPointLightShadows),g.push(v.numSpotLightShadows),g.push(v.numSpotLightShadowsWithMaps),g.push(v.numLightProbes),g.push(v.shadowMapType),g.push(v.toneMapping),g.push(v.numClippingPlanes),g.push(v.numClipIntersection),g.push(v.depthPacking)}function _(g,v){o.disableAll(),v.supportsVertexTextures&&o.enable(0),v.instancing&&o.enable(1),v.instancingColor&&o.enable(2),v.instancingMorph&&o.enable(3),v.matcap&&o.enable(4),v.envMap&&o.enable(5),v.normalMapObjectSpace&&o.enable(6),v.normalMapTangentSpace&&o.enable(7),v.clearcoat&&o.enable(8),v.iridescence&&o.enable(9),v.alphaTest&&o.enable(10),v.vertexColors&&o.enable(11),v.vertexAlphas&&o.enable(12),v.vertexUv1s&&o.enable(13),v.vertexUv2s&&o.enable(14),v.vertexUv3s&&o.enable(15),v.vertexTangents&&o.enable(16),v.anisotropy&&o.enable(17),v.alphaHash&&o.enable(18),v.batching&&o.enable(19),v.dispersion&&o.enable(20),v.batchingColor&&o.enable(21),g.push(o.mask),o.disableAll(),v.fog&&o.enable(0),v.useFog&&o.enable(1),v.flatShading&&o.enable(2),v.logarithmicDepthBuffer&&o.enable(3),v.reverseDepthBuffer&&o.enable(4),v.skinning&&o.enable(5),v.morphTargets&&o.enable(6),v.morphNormals&&o.enable(7),v.morphColors&&o.enable(8),v.premultipliedAlpha&&o.enable(9),v.shadowMapEnabled&&o.enable(10),v.doubleSided&&o.enable(11),v.flipSided&&o.enable(12),v.useDepthPacking&&o.enable(13),v.dithering&&o.enable(14),v.transmission&&o.enable(15),v.sheen&&o.enable(16),v.opaque&&o.enable(17),v.pointsUvs&&o.enable(18),v.decodeVideoTexture&&o.enable(19),v.alphaToCoverage&&o.enable(20),g.push(o.mask)}function P(g){let v=y[g.type],I;if(v){let B=Cn[v];I=bn.clone(B.uniforms)}else I=g.uniforms;return I}function S(g,v){let I;for(let B=0,U=h.length;B<U;B++){let z=h[B];if(z.cacheKey===v){I=z,++I.usedTimes;break}}return I===void 0&&(I=new hA(n,v,g,r),h.push(I)),I}function w(g){if(--g.usedTimes===0){let v=h.indexOf(g);h[v]=h[h.length-1],h.pop(),g.destroy()}}function T(g){l.remove(g)}function C(){l.dispose()}return{getParameters:m,getProgramCacheKey:M,getUniforms:P,acquireProgram:S,releaseProgram:w,releaseShaderCache:T,programs:h,dispose:C}}function dA(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function pA(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function pu(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function mu(){let n=[],t=0,e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(u,d,f,A,y,p){let m=n[t];return m===void 0?(m={id:u.id,object:u,geometry:d,material:f,groupOrder:A,renderOrder:u.renderOrder,z:y,group:p},n[t]=m):(m.id=u.id,m.object=u,m.geometry=d,m.material=f,m.groupOrder=A,m.renderOrder=u.renderOrder,m.z=y,m.group=p),t++,m}function o(u,d,f,A,y,p){let m=a(u,d,f,A,y,p);f.transmission>0?i.push(m):f.transparent===!0?s.push(m):e.push(m)}function l(u,d,f,A,y,p){let m=a(u,d,f,A,y,p);f.transmission>0?i.unshift(m):f.transparent===!0?s.unshift(m):e.unshift(m)}function c(u,d){e.length>1&&e.sort(u||pA),i.length>1&&i.sort(d||pu),s.length>1&&s.sort(d||pu)}function h(){for(let u=t,d=n.length;u<d;u++){let f=n[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function mA(){let n=new WeakMap;function t(i,s){let r=n.get(i),a;return r===void 0?(a=new mu,n.set(i,[a])):s>=r.length?(a=new mu,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function gA(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new O,color:new Pt};break;case"SpotLight":e={position:new O,direction:new O,color:new Pt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new O,color:new Pt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new O,skyColor:new Pt,groundColor:new Pt};break;case"RectAreaLight":e={color:new Pt,position:new O,halfWidth:new O,halfHeight:new O};break}return n[t.id]=e,e}}}function AA(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var vA=0;function xA(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function yA(n){let t=new gA,e=AA(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new O);let s=new O,r=new te,a=new te;function o(c){let h=0,u=0,d=0;for(let C=0;C<9;C++)i.probe[C].set(0,0,0);let f=0,A=0,y=0,p=0,m=0,M=0,x=0,_=0,P=0,S=0,w=0;c.sort(xA);for(let C=0,g=c.length;C<g;C++){let v=c[C],I=v.color,B=v.intensity,U=v.distance,z=v.shadow&&v.shadow.map?v.shadow.map.texture:null;if(v.isAmbientLight)h+=I.r*B,u+=I.g*B,d+=I.b*B;else if(v.isLightProbe){for(let k=0;k<9;k++)i.probe[k].addScaledVector(v.sh.coefficients[k],B);w++}else if(v.isDirectionalLight){let k=t.get(v);if(k.color.copy(v.color).multiplyScalar(v.intensity),v.castShadow){let Z=v.shadow,V=e.get(v);V.shadowIntensity=Z.intensity,V.shadowBias=Z.bias,V.shadowNormalBias=Z.normalBias,V.shadowRadius=Z.radius,V.shadowMapSize=Z.mapSize,i.directionalShadow[f]=V,i.directionalShadowMap[f]=z,i.directionalShadowMatrix[f]=v.shadow.matrix,M++}i.directional[f]=k,f++}else if(v.isSpotLight){let k=t.get(v);k.position.setFromMatrixPosition(v.matrixWorld),k.color.copy(I).multiplyScalar(B),k.distance=U,k.coneCos=Math.cos(v.angle),k.penumbraCos=Math.cos(v.angle*(1-v.penumbra)),k.decay=v.decay,i.spot[y]=k;let Z=v.shadow;if(v.map&&(i.spotLightMap[P]=v.map,P++,Z.updateMatrices(v),v.castShadow&&S++),i.spotLightMatrix[y]=Z.matrix,v.castShadow){let V=e.get(v);V.shadowIntensity=Z.intensity,V.shadowBias=Z.bias,V.shadowNormalBias=Z.normalBias,V.shadowRadius=Z.radius,V.shadowMapSize=Z.mapSize,i.spotShadow[y]=V,i.spotShadowMap[y]=z,_++}y++}else if(v.isRectAreaLight){let k=t.get(v);k.color.copy(I).multiplyScalar(B),k.halfWidth.set(v.width*.5,0,0),k.halfHeight.set(0,v.height*.5,0),i.rectArea[p]=k,p++}else if(v.isPointLight){let k=t.get(v);if(k.color.copy(v.color).multiplyScalar(v.intensity),k.distance=v.distance,k.decay=v.decay,v.castShadow){let Z=v.shadow,V=e.get(v);V.shadowIntensity=Z.intensity,V.shadowBias=Z.bias,V.shadowNormalBias=Z.normalBias,V.shadowRadius=Z.radius,V.shadowMapSize=Z.mapSize,V.shadowCameraNear=Z.camera.near,V.shadowCameraFar=Z.camera.far,i.pointShadow[A]=V,i.pointShadowMap[A]=z,i.pointShadowMatrix[A]=v.shadow.matrix,x++}i.point[A]=k,A++}else if(v.isHemisphereLight){let k=t.get(v);k.skyColor.copy(v.color).multiplyScalar(B),k.groundColor.copy(v.groundColor).multiplyScalar(B),i.hemi[m]=k,m++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=pt.LTC_FLOAT_1,i.rectAreaLTC2=pt.LTC_FLOAT_2):(i.rectAreaLTC1=pt.LTC_HALF_1,i.rectAreaLTC2=pt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=d;let T=i.hash;(T.directionalLength!==f||T.pointLength!==A||T.spotLength!==y||T.rectAreaLength!==p||T.hemiLength!==m||T.numDirectionalShadows!==M||T.numPointShadows!==x||T.numSpotShadows!==_||T.numSpotMaps!==P||T.numLightProbes!==w)&&(i.directional.length=f,i.spot.length=y,i.rectArea.length=p,i.point.length=A,i.hemi.length=m,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=_,i.spotShadowMap.length=_,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=_+P-S,i.spotLightMap.length=P,i.numSpotLightShadowsWithMaps=S,i.numLightProbes=w,T.directionalLength=f,T.pointLength=A,T.spotLength=y,T.rectAreaLength=p,T.hemiLength=m,T.numDirectionalShadows=M,T.numPointShadows=x,T.numSpotShadows=_,T.numSpotMaps=P,T.numLightProbes=w,i.version=vA++)}function l(c,h){let u=0,d=0,f=0,A=0,y=0,p=h.matrixWorldInverse;for(let m=0,M=c.length;m<M;m++){let x=c[m];if(x.isDirectionalLight){let _=i.directional[u];_.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(p),u++}else if(x.isSpotLight){let _=i.spot[f];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(p),_.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(p),f++}else if(x.isRectAreaLight){let _=i.rectArea[A];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(p),a.identity(),r.copy(x.matrixWorld),r.premultiply(p),a.extractRotation(r),_.halfWidth.set(x.width*.5,0,0),_.halfHeight.set(0,x.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),A++}else if(x.isPointLight){let _=i.point[d];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(p),d++}else if(x.isHemisphereLight){let _=i.hemi[y];_.direction.setFromMatrixPosition(x.matrixWorld),_.direction.transformDirection(p),y++}}}return{setup:o,setupView:l,state:i}}function gu(n){let t=new yA(n),e=[],i=[];function s(h){c.camera=h,e.length=0,i.length=0}function r(h){e.push(h)}function a(h){i.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}let c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function _A(n){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new gu(n),t.set(s,[o])):r>=a.length?(o=new gu(n),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}var js=class extends Vn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=pd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Il=class extends Vn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},MA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,bA=`uniform sampler2D shadow_pass;
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
}`;function SA(n,t,e){let i=new Ks,s=new mt,r=new mt,a=new fe,o=new js({depthPacking:mc}),l=new Il,c={},h=e.maxTextureSize,u={[Rn]:Re,[Re]:Rn,[Fe]:Fe},d=new ve({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new mt},radius:{value:4}},vertexShader:MA,fragmentShader:bA}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let A=new se;A.setAttribute("position",new _e(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new ie(A,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Mu;let m=this.type;this.render=function(S,w,T){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||S.length===0)return;let C=n.getRenderTarget(),g=n.getActiveCubeFace(),v=n.getActiveMipmapLevel(),I=n.state;I.setBlending(pe),I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);let B=m!==Bn&&this.type===Bn,U=m===Bn&&this.type!==Bn;for(let z=0,k=S.length;z<k;z++){let Z=S[z],V=Z.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);let $=V.getFrameExtents();if(s.multiply($),r.copy(V.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/$.x),s.x=r.x*$.x,V.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/$.y),s.y=r.y*$.y,V.mapSize.y=r.y)),V.map===null||B===!0||U===!0){let ot=this.type!==Bn?{minFilter:Ce,magFilter:Ce}:{};V.map!==null&&V.map.dispose(),V.map=new Ue(s.x,s.y,ot),V.map.texture.name=Z.name+".shadowMap",V.camera.updateProjectionMatrix()}n.setRenderTarget(V.map),n.clear();let rt=V.getViewportCount();for(let ot=0;ot<rt;ot++){let Tt=V.getViewport(ot);a.set(r.x*Tt.x,r.y*Tt.y,r.x*Tt.z,r.y*Tt.w),I.viewport(a),V.updateMatrices(Z,ot),i=V.getFrustum(),_(w,T,V.camera,Z,this.type)}V.isPointLightShadow!==!0&&this.type===Bn&&M(V,T),V.needsUpdate=!1}m=this.type,p.needsUpdate=!1,n.setRenderTarget(C,g,v)};function M(S,w){let T=t.update(y);d.defines.VSM_SAMPLES!==S.blurSamples&&(d.defines.VSM_SAMPLES=S.blurSamples,f.defines.VSM_SAMPLES=S.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new Ue(s.x,s.y)),d.uniforms.shadow_pass.value=S.map.texture,d.uniforms.resolution.value=S.mapSize,d.uniforms.radius.value=S.radius,n.setRenderTarget(S.mapPass),n.clear(),n.renderBufferDirect(w,null,T,d,y,null),f.uniforms.shadow_pass.value=S.mapPass.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,n.setRenderTarget(S.map),n.clear(),n.renderBufferDirect(w,null,T,f,y,null)}function x(S,w,T,C){let g=null,v=T.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(v!==void 0)g=v;else if(g=T.isPointLight===!0?l:o,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){let I=g.uuid,B=w.uuid,U=c[I];U===void 0&&(U={},c[I]=U);let z=U[B];z===void 0&&(z=g.clone(),U[B]=z,w.addEventListener("dispose",P)),g=z}if(g.visible=w.visible,g.wireframe=w.wireframe,C===Bn?g.side=w.shadowSide!==null?w.shadowSide:w.side:g.side=w.shadowSide!==null?w.shadowSide:u[w.side],g.alphaMap=w.alphaMap,g.alphaTest=w.alphaTest,g.map=w.map,g.clipShadows=w.clipShadows,g.clippingPlanes=w.clippingPlanes,g.clipIntersection=w.clipIntersection,g.displacementMap=w.displacementMap,g.displacementScale=w.displacementScale,g.displacementBias=w.displacementBias,g.wireframeLinewidth=w.wireframeLinewidth,g.linewidth=w.linewidth,T.isPointLight===!0&&g.isMeshDistanceMaterial===!0){let I=n.properties.get(g);I.light=T}return g}function _(S,w,T,C,g){if(S.visible===!1)return;if(S.layers.test(w.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&g===Bn)&&(!S.frustumCulled||i.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,S.matrixWorld);let B=t.update(S),U=S.material;if(Array.isArray(U)){let z=B.groups;for(let k=0,Z=z.length;k<Z;k++){let V=z[k],$=U[V.materialIndex];if($&&$.visible){let rt=x(S,$,C,g);S.onBeforeShadow(n,S,w,T,B,rt,V),n.renderBufferDirect(T,null,B,rt,S,V),S.onAfterShadow(n,S,w,T,B,rt,V)}}}else if(U.visible){let z=x(S,U,C,g);S.onBeforeShadow(n,S,w,T,B,z,null),n.renderBufferDirect(T,null,B,z,S,null),S.onAfterShadow(n,S,w,T,B,z,null)}}let I=S.children;for(let B=0,U=I.length;B<U;B++)_(I[B],w,T,C,g)}function P(S){S.target.removeEventListener("dispose",P);for(let T in c){let C=c[T],g=S.target.uuid;g in C&&(C[g].dispose(),delete C[g])}}}var wA={[Bo]:Fo,[zo]:Vo,[ko]:Go,[ss]:Ho,[Fo]:Bo,[Vo]:zo,[Go]:ko,[Ho]:ss};function EA(n){function t(){let F=!1,gt=new fe,J=null,st=new fe(0,0,0,0);return{setMask:function(xt){J!==xt&&!F&&(n.colorMask(xt,xt,xt,xt),J=xt)},setLocked:function(xt){F=xt},setClear:function(xt,_t,Xt,ge,ke){ke===!0&&(xt*=ge,_t*=ge,Xt*=ge),gt.set(xt,_t,Xt,ge),st.equals(gt)===!1&&(n.clearColor(xt,_t,Xt,ge),st.copy(gt))},reset:function(){F=!1,J=null,st.set(-1,0,0,0)}}}function e(){let F=!1,gt=!1,J=null,st=null,xt=null;return{setReversed:function(_t){gt=_t},setTest:function(_t){_t?G(n.DEPTH_TEST):N(n.DEPTH_TEST)},setMask:function(_t){J!==_t&&!F&&(n.depthMask(_t),J=_t)},setFunc:function(_t){if(gt&&(_t=wA[_t]),st!==_t){switch(_t){case Bo:n.depthFunc(n.NEVER);break;case Fo:n.depthFunc(n.ALWAYS);break;case zo:n.depthFunc(n.LESS);break;case ss:n.depthFunc(n.LEQUAL);break;case ko:n.depthFunc(n.EQUAL);break;case Ho:n.depthFunc(n.GEQUAL);break;case Vo:n.depthFunc(n.GREATER);break;case Go:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}st=_t}},setLocked:function(_t){F=_t},setClear:function(_t){xt!==_t&&(n.clearDepth(_t),xt=_t)},reset:function(){F=!1,J=null,st=null,xt=null}}}function i(){let F=!1,gt=null,J=null,st=null,xt=null,_t=null,Xt=null,ge=null,ke=null;return{setTest:function(jt){F||(jt?G(n.STENCIL_TEST):N(n.STENCIL_TEST))},setMask:function(jt){gt!==jt&&!F&&(n.stencilMask(jt),gt=jt)},setFunc:function(jt,He,In){(J!==jt||st!==He||xt!==In)&&(n.stencilFunc(jt,He,In),J=jt,st=He,xt=In)},setOp:function(jt,He,In){(_t!==jt||Xt!==He||ge!==In)&&(n.stencilOp(jt,He,In),_t=jt,Xt=He,ge=In)},setLocked:function(jt){F=jt},setClear:function(jt){ke!==jt&&(n.clearStencil(jt),ke=jt)},reset:function(){F=!1,gt=null,J=null,st=null,xt=null,_t=null,Xt=null,ge=null,ke=null}}}let s=new t,r=new e,a=new i,o=new WeakMap,l=new WeakMap,c={},h={},u=new WeakMap,d=[],f=null,A=!1,y=null,p=null,m=null,M=null,x=null,_=null,P=null,S=new Pt(0,0,0),w=0,T=!1,C=null,g=null,v=null,I=null,B=null,U=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),z=!1,k=0,Z=n.getParameter(n.VERSION);Z.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(Z)[1]),z=k>=1):Z.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),z=k>=2);let V=null,$={},rt=n.getParameter(n.SCISSOR_BOX),ot=n.getParameter(n.VIEWPORT),Tt=new fe().fromArray(rt),Bt=new fe().fromArray(ot);function tt(F,gt,J,st){let xt=new Uint8Array(4),_t=n.createTexture();n.bindTexture(F,_t),n.texParameteri(F,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(F,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Xt=0;Xt<J;Xt++)F===n.TEXTURE_3D||F===n.TEXTURE_2D_ARRAY?n.texImage3D(gt,0,n.RGBA,1,1,st,0,n.RGBA,n.UNSIGNED_BYTE,xt):n.texImage2D(gt+Xt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,xt);return _t}let L={};L[n.TEXTURE_2D]=tt(n.TEXTURE_2D,n.TEXTURE_2D,1),L[n.TEXTURE_CUBE_MAP]=tt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),L[n.TEXTURE_2D_ARRAY]=tt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),L[n.TEXTURE_3D]=tt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),a.setClear(0),G(n.DEPTH_TEST),r.setFunc(ss),ut(!1),Dt(_h),G(n.CULL_FACE),D(pe);function G(F){c[F]!==!0&&(n.enable(F),c[F]=!0)}function N(F){c[F]!==!1&&(n.disable(F),c[F]=!1)}function q(F,gt){return h[F]!==gt?(n.bindFramebuffer(F,gt),h[F]=gt,F===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=gt),F===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=gt),!0):!1}function Y(F,gt){let J=d,st=!1;if(F){J=u.get(gt),J===void 0&&(J=[],u.set(gt,J));let xt=F.textures;if(J.length!==xt.length||J[0]!==n.COLOR_ATTACHMENT0){for(let _t=0,Xt=xt.length;_t<Xt;_t++)J[_t]=n.COLOR_ATTACHMENT0+_t;J.length=xt.length,st=!0}}else J[0]!==n.BACK&&(J[0]=n.BACK,st=!0);st&&n.drawBuffers(J)}function it(F){return f!==F?(n.useProgram(F),f=F,!0):!1}let ft={[rn]:n.FUNC_ADD,[Zf]:n.FUNC_SUBTRACT,[Qf]:n.FUNC_REVERSE_SUBTRACT};ft[Jf]=n.MIN,ft[$f]=n.MAX;let ct={[ps]:n.ZERO,[td]:n.ONE,[ed]:n.SRC_COLOR,[No]:n.SRC_ALPHA,[rd]:n.SRC_ALPHA_SATURATE,[va]:n.DST_COLOR,[Aa]:n.DST_ALPHA,[nd]:n.ONE_MINUS_SRC_COLOR,[Oo]:n.ONE_MINUS_SRC_ALPHA,[sd]:n.ONE_MINUS_DST_COLOR,[id]:n.ONE_MINUS_DST_ALPHA,[ad]:n.CONSTANT_COLOR,[od]:n.ONE_MINUS_CONSTANT_COLOR,[ld]:n.CONSTANT_ALPHA,[cd]:n.ONE_MINUS_CONSTANT_ALPHA};function D(F,gt,J,st,xt,_t,Xt,ge,ke,jt){if(F===pe){A===!0&&(N(n.BLEND),A=!1);return}if(A===!1&&(G(n.BLEND),A=!0),F!==ic){if(F!==y||jt!==T){if((p!==rn||x!==rn)&&(n.blendEquation(n.FUNC_ADD),p=rn,x=rn),jt)switch(F){case ts:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Mh:n.blendFunc(n.ONE,n.ONE);break;case bh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Sh:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case ts:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Mh:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case bh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Sh:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}m=null,M=null,_=null,P=null,S.set(0,0,0),w=0,y=F,T=jt}return}xt=xt||gt,_t=_t||J,Xt=Xt||st,(gt!==p||xt!==x)&&(n.blendEquationSeparate(ft[gt],ft[xt]),p=gt,x=xt),(J!==m||st!==M||_t!==_||Xt!==P)&&(n.blendFuncSeparate(ct[J],ct[st],ct[_t],ct[Xt]),m=J,M=st,_=_t,P=Xt),(ge.equals(S)===!1||ke!==w)&&(n.blendColor(ge.r,ge.g,ge.b,ke),S.copy(ge),w=ke),y=F,T=!1}function Gt(F,gt){F.side===Fe?N(n.CULL_FACE):G(n.CULL_FACE);let J=F.side===Re;gt&&(J=!J),ut(J),F.blending===ts&&F.transparent===!1?D(pe):D(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),r.setFunc(F.depthFunc),r.setTest(F.depthTest),r.setMask(F.depthWrite),s.setMask(F.colorWrite);let st=F.stencilWrite;a.setTest(st),st&&(a.setMask(F.stencilWriteMask),a.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),a.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),qt(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?G(n.SAMPLE_ALPHA_TO_COVERAGE):N(n.SAMPLE_ALPHA_TO_COVERAGE)}function ut(F){C!==F&&(F?n.frontFace(n.CW):n.frontFace(n.CCW),C=F)}function Dt(F){F!==Kf?(G(n.CULL_FACE),F!==g&&(F===_h?n.cullFace(n.BACK):F===jf?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):N(n.CULL_FACE),g=F}function bt(F){F!==v&&(z&&n.lineWidth(F),v=F)}function qt(F,gt,J){F?(G(n.POLYGON_OFFSET_FILL),(I!==gt||B!==J)&&(n.polygonOffset(gt,J),I=gt,B=J)):N(n.POLYGON_OFFSET_FILL)}function It(F){F?G(n.SCISSOR_TEST):N(n.SCISSOR_TEST)}function R(F){F===void 0&&(F=n.TEXTURE0+U-1),V!==F&&(n.activeTexture(F),V=F)}function b(F,gt,J){J===void 0&&(V===null?J=n.TEXTURE0+U-1:J=V);let st=$[J];st===void 0&&(st={type:void 0,texture:void 0},$[J]=st),(st.type!==F||st.texture!==gt)&&(V!==J&&(n.activeTexture(J),V=J),n.bindTexture(F,gt||L[F]),st.type=F,st.texture=gt)}function X(){let F=$[V];F!==void 0&&F.type!==void 0&&(n.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function nt(){try{n.compressedTexImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function at(){try{n.compressedTexImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function et(){try{n.texSubImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function wt(){try{n.texSubImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function dt(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function At(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Vt(){try{n.texStorage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function lt(){try{n.texStorage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function vt(){try{n.texImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ut(){try{n.texImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Lt(F){Tt.equals(F)===!1&&(n.scissor(F.x,F.y,F.z,F.w),Tt.copy(F))}function Mt(F){Bt.equals(F)===!1&&(n.viewport(F.x,F.y,F.z,F.w),Bt.copy(F))}function Wt(F,gt){let J=l.get(gt);J===void 0&&(J=new WeakMap,l.set(gt,J));let st=J.get(F);st===void 0&&(st=n.getUniformBlockIndex(gt,F.name),J.set(F,st))}function Ft(F,gt){let st=l.get(gt).get(F);o.get(gt)!==st&&(n.uniformBlockBinding(gt,st,F.__bindingPointIndex),o.set(gt,st))}function Yt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),c={},V=null,$={},h={},u=new WeakMap,d=[],f=null,A=!1,y=null,p=null,m=null,M=null,x=null,_=null,P=null,S=new Pt(0,0,0),w=0,T=!1,C=null,g=null,v=null,I=null,B=null,Tt.set(0,0,n.canvas.width,n.canvas.height),Bt.set(0,0,n.canvas.width,n.canvas.height),s.reset(),r.reset(),a.reset()}return{buffers:{color:s,depth:r,stencil:a},enable:G,disable:N,bindFramebuffer:q,drawBuffers:Y,useProgram:it,setBlending:D,setMaterial:Gt,setFlipSided:ut,setCullFace:Dt,setLineWidth:bt,setPolygonOffset:qt,setScissorTest:It,activeTexture:R,bindTexture:b,unbindTexture:X,compressedTexImage2D:nt,compressedTexImage3D:at,texImage2D:vt,texImage3D:Ut,updateUBOMapping:Wt,uniformBlockBinding:Ft,texStorage2D:Vt,texStorage3D:lt,texSubImage2D:et,texSubImage3D:wt,compressedTexSubImage2D:dt,compressedTexSubImage3D:At,scissor:Lt,viewport:Mt,reset:Yt}}function Au(n,t,e,i){let s=TA(i);switch(e){case Cu:return n*t;case Pu:return n*t;case Iu:return n*t*2;case Du:return n*t/s.components*s.byteLength;case fc:return n*t/s.components*s.byteLength;case Uu:return n*t*2/s.components*s.byteLength;case dc:return n*t*2/s.components*s.byteLength;case Ru:return n*t*3/s.components*s.byteLength;case Je:return n*t*4/s.components*s.byteLength;case pc:return n*t*4/s.components*s.byteLength;case Vr:case Gr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Wr:case Xr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ko:case Zo:return Math.max(n,16)*Math.max(t,8)/4;case Yo:case jo:return Math.max(n,8)*Math.max(t,8)/2;case Qo:case Jo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case $o:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case tl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case el:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case nl:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case il:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case sl:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case rl:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case al:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case ol:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case ll:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case cl:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case hl:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case ul:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case fl:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case dl:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case qr:case pl:case ml:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Lu:case gl:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Al:case vl:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function TA(n){switch(n){case vn:case wu:return{byteLength:1,components:1};case Ws:case Eu:case on:return{byteLength:2,components:1};case hc:case uc:return{byteLength:2,components:4};case Ei:case cc:case zn:return{byteLength:4,components:1};case Tu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function CA(n,t,e,i,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new mt,h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function A(R,b){return f?new OffscreenCanvas(R,b):$r("canvas")}function y(R,b,X){let nt=1,at=It(R);if((at.width>X||at.height>X)&&(nt=X/Math.max(at.width,at.height)),nt<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let et=Math.floor(nt*at.width),wt=Math.floor(nt*at.height);u===void 0&&(u=A(et,wt));let dt=b?A(et,wt):u;return dt.width=et,dt.height=wt,dt.getContext("2d").drawImage(R,0,0,et,wt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+at.width+"x"+at.height+") to ("+et+"x"+wt+")."),dt}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+at.width+"x"+at.height+")."),R;return R}function p(R){return R.generateMipmaps&&R.minFilter!==Ce&&R.minFilter!==An}function m(R){n.generateMipmap(R)}function M(R,b,X,nt,at=!1){if(R!==null){if(n[R]!==void 0)return n[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let et=b;if(b===n.RED&&(X===n.FLOAT&&(et=n.R32F),X===n.HALF_FLOAT&&(et=n.R16F),X===n.UNSIGNED_BYTE&&(et=n.R8)),b===n.RED_INTEGER&&(X===n.UNSIGNED_BYTE&&(et=n.R8UI),X===n.UNSIGNED_SHORT&&(et=n.R16UI),X===n.UNSIGNED_INT&&(et=n.R32UI),X===n.BYTE&&(et=n.R8I),X===n.SHORT&&(et=n.R16I),X===n.INT&&(et=n.R32I)),b===n.RG&&(X===n.FLOAT&&(et=n.RG32F),X===n.HALF_FLOAT&&(et=n.RG16F),X===n.UNSIGNED_BYTE&&(et=n.RG8)),b===n.RG_INTEGER&&(X===n.UNSIGNED_BYTE&&(et=n.RG8UI),X===n.UNSIGNED_SHORT&&(et=n.RG16UI),X===n.UNSIGNED_INT&&(et=n.RG32UI),X===n.BYTE&&(et=n.RG8I),X===n.SHORT&&(et=n.RG16I),X===n.INT&&(et=n.RG32I)),b===n.RGB_INTEGER&&(X===n.UNSIGNED_BYTE&&(et=n.RGB8UI),X===n.UNSIGNED_SHORT&&(et=n.RGB16UI),X===n.UNSIGNED_INT&&(et=n.RGB32UI),X===n.BYTE&&(et=n.RGB8I),X===n.SHORT&&(et=n.RGB16I),X===n.INT&&(et=n.RGB32I)),b===n.RGBA_INTEGER&&(X===n.UNSIGNED_BYTE&&(et=n.RGBA8UI),X===n.UNSIGNED_SHORT&&(et=n.RGBA16UI),X===n.UNSIGNED_INT&&(et=n.RGBA32UI),X===n.BYTE&&(et=n.RGBA8I),X===n.SHORT&&(et=n.RGBA16I),X===n.INT&&(et=n.RGBA32I)),b===n.RGB&&X===n.UNSIGNED_INT_5_9_9_9_REV&&(et=n.RGB9_E5),b===n.RGBA){let wt=at?jr:Kt.getTransfer(nt);X===n.FLOAT&&(et=n.RGBA32F),X===n.HALF_FLOAT&&(et=n.RGBA16F),X===n.UNSIGNED_BYTE&&(et=wt===ne?n.SRGB8_ALPHA8:n.RGBA8),X===n.UNSIGNED_SHORT_4_4_4_4&&(et=n.RGBA4),X===n.UNSIGNED_SHORT_5_5_5_1&&(et=n.RGB5_A1)}return(et===n.R16F||et===n.R32F||et===n.RG16F||et===n.RG32F||et===n.RGBA16F||et===n.RGBA32F)&&t.get("EXT_color_buffer_float"),et}function x(R,b){let X;return R?b===null||b===Ei||b===ii?X=n.DEPTH24_STENCIL8:b===zn?X=n.DEPTH32F_STENCIL8:b===Ws&&(X=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Ei||b===ii?X=n.DEPTH_COMPONENT24:b===zn?X=n.DEPTH_COMPONENT32F:b===Ws&&(X=n.DEPTH_COMPONENT16),X}function _(R,b){return p(R)===!0||R.isFramebufferTexture&&R.minFilter!==Ce&&R.minFilter!==An?Math.log2(Math.max(b.width,b.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?b.mipmaps.length:1}function P(R){let b=R.target;b.removeEventListener("dispose",P),w(b),b.isVideoTexture&&h.delete(b)}function S(R){let b=R.target;b.removeEventListener("dispose",S),C(b)}function w(R){let b=i.get(R);if(b.__webglInit===void 0)return;let X=R.source,nt=d.get(X);if(nt){let at=nt[b.__cacheKey];at.usedTimes--,at.usedTimes===0&&T(R),Object.keys(nt).length===0&&d.delete(X)}i.remove(R)}function T(R){let b=i.get(R);n.deleteTexture(b.__webglTexture);let X=R.source,nt=d.get(X);delete nt[b.__cacheKey],a.memory.textures--}function C(R){let b=i.get(R);if(R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let nt=0;nt<6;nt++){if(Array.isArray(b.__webglFramebuffer[nt]))for(let at=0;at<b.__webglFramebuffer[nt].length;at++)n.deleteFramebuffer(b.__webglFramebuffer[nt][at]);else n.deleteFramebuffer(b.__webglFramebuffer[nt]);b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer[nt])}else{if(Array.isArray(b.__webglFramebuffer))for(let nt=0;nt<b.__webglFramebuffer.length;nt++)n.deleteFramebuffer(b.__webglFramebuffer[nt]);else n.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&n.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let nt=0;nt<b.__webglColorRenderbuffer.length;nt++)b.__webglColorRenderbuffer[nt]&&n.deleteRenderbuffer(b.__webglColorRenderbuffer[nt]);b.__webglDepthRenderbuffer&&n.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let X=R.textures;for(let nt=0,at=X.length;nt<at;nt++){let et=i.get(X[nt]);et.__webglTexture&&(n.deleteTexture(et.__webglTexture),a.memory.textures--),i.remove(X[nt])}i.remove(R)}let g=0;function v(){g=0}function I(){let R=g;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),g+=1,R}function B(R){let b=[];return b.push(R.wrapS),b.push(R.wrapT),b.push(R.wrapR||0),b.push(R.magFilter),b.push(R.minFilter),b.push(R.anisotropy),b.push(R.internalFormat),b.push(R.format),b.push(R.type),b.push(R.generateMipmaps),b.push(R.premultiplyAlpha),b.push(R.flipY),b.push(R.unpackAlignment),b.push(R.colorSpace),b.join()}function U(R,b){let X=i.get(R);if(R.isVideoTexture&&bt(R),R.isRenderTargetTexture===!1&&R.version>0&&X.__version!==R.version){let nt=R.image;if(nt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(nt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Bt(X,R,b);return}}e.bindTexture(n.TEXTURE_2D,X.__webglTexture,n.TEXTURE0+b)}function z(R,b){let X=i.get(R);if(R.version>0&&X.__version!==R.version){Bt(X,R,b);return}e.bindTexture(n.TEXTURE_2D_ARRAY,X.__webglTexture,n.TEXTURE0+b)}function k(R,b){let X=i.get(R);if(R.version>0&&X.__version!==R.version){Bt(X,R,b);return}e.bindTexture(n.TEXTURE_3D,X.__webglTexture,n.TEXTURE0+b)}function Z(R,b){let X=i.get(R);if(R.version>0&&X.__version!==R.version){tt(X,R,b);return}e.bindTexture(n.TEXTURE_CUBE_MAP,X.__webglTexture,n.TEXTURE0+b)}let V={[an]:n.REPEAT,[Fn]:n.CLAMP_TO_EDGE,[qo]:n.MIRRORED_REPEAT},$={[Ce]:n.NEAREST,[dd]:n.NEAREST_MIPMAP_NEAREST,[xr]:n.NEAREST_MIPMAP_LINEAR,[An]:n.LINEAR,[eo]:n.LINEAR_MIPMAP_NEAREST,[wi]:n.LINEAR_MIPMAP_LINEAR},rt={[gd]:n.NEVER,[Md]:n.ALWAYS,[Ad]:n.LESS,[Nu]:n.LEQUAL,[vd]:n.EQUAL,[_d]:n.GEQUAL,[xd]:n.GREATER,[yd]:n.NOTEQUAL};function ot(R,b){if(b.type===zn&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===An||b.magFilter===eo||b.magFilter===xr||b.magFilter===wi||b.minFilter===An||b.minFilter===eo||b.minFilter===xr||b.minFilter===wi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(R,n.TEXTURE_WRAP_S,V[b.wrapS]),n.texParameteri(R,n.TEXTURE_WRAP_T,V[b.wrapT]),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,V[b.wrapR]),n.texParameteri(R,n.TEXTURE_MAG_FILTER,$[b.magFilter]),n.texParameteri(R,n.TEXTURE_MIN_FILTER,$[b.minFilter]),b.compareFunction&&(n.texParameteri(R,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(R,n.TEXTURE_COMPARE_FUNC,rt[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Ce||b.minFilter!==xr&&b.minFilter!==wi||b.type===zn&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||i.get(b).__currentAnisotropy){let X=t.get("EXT_texture_filter_anisotropic");n.texParameterf(R,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),i.get(b).__currentAnisotropy=b.anisotropy}}}function Tt(R,b){let X=!1;R.__webglInit===void 0&&(R.__webglInit=!0,b.addEventListener("dispose",P));let nt=b.source,at=d.get(nt);at===void 0&&(at={},d.set(nt,at));let et=B(b);if(et!==R.__cacheKey){at[et]===void 0&&(at[et]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,X=!0),at[et].usedTimes++;let wt=at[R.__cacheKey];wt!==void 0&&(at[R.__cacheKey].usedTimes--,wt.usedTimes===0&&T(b)),R.__cacheKey=et,R.__webglTexture=at[et].texture}return X}function Bt(R,b,X){let nt=n.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(nt=n.TEXTURE_2D_ARRAY),b.isData3DTexture&&(nt=n.TEXTURE_3D);let at=Tt(R,b),et=b.source;e.bindTexture(nt,R.__webglTexture,n.TEXTURE0+X);let wt=i.get(et);if(et.version!==wt.__version||at===!0){e.activeTexture(n.TEXTURE0+X);let dt=Kt.getPrimaries(Kt.workingColorSpace),At=b.colorSpace===ti?null:Kt.getPrimaries(b.colorSpace),Vt=b.colorSpace===ti||dt===At?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Vt);let lt=y(b.image,!1,s.maxTextureSize);lt=qt(b,lt);let vt=r.convert(b.format,b.colorSpace),Ut=r.convert(b.type),Lt=M(b.internalFormat,vt,Ut,b.colorSpace,b.isVideoTexture);ot(nt,b);let Mt,Wt=b.mipmaps,Ft=b.isVideoTexture!==!0,Yt=wt.__version===void 0||at===!0,F=et.dataReady,gt=_(b,lt);if(b.isDepthTexture)Lt=x(b.format===si,b.type),Yt&&(Ft?e.texStorage2D(n.TEXTURE_2D,1,Lt,lt.width,lt.height):e.texImage2D(n.TEXTURE_2D,0,Lt,lt.width,lt.height,0,vt,Ut,null));else if(b.isDataTexture)if(Wt.length>0){Ft&&Yt&&e.texStorage2D(n.TEXTURE_2D,gt,Lt,Wt[0].width,Wt[0].height);for(let J=0,st=Wt.length;J<st;J++)Mt=Wt[J],Ft?F&&e.texSubImage2D(n.TEXTURE_2D,J,0,0,Mt.width,Mt.height,vt,Ut,Mt.data):e.texImage2D(n.TEXTURE_2D,J,Lt,Mt.width,Mt.height,0,vt,Ut,Mt.data);b.generateMipmaps=!1}else Ft?(Yt&&e.texStorage2D(n.TEXTURE_2D,gt,Lt,lt.width,lt.height),F&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,lt.width,lt.height,vt,Ut,lt.data)):e.texImage2D(n.TEXTURE_2D,0,Lt,lt.width,lt.height,0,vt,Ut,lt.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Ft&&Yt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,gt,Lt,Wt[0].width,Wt[0].height,lt.depth);for(let J=0,st=Wt.length;J<st;J++)if(Mt=Wt[J],b.format!==Je)if(vt!==null)if(Ft){if(F)if(b.layerUpdates.size>0){let xt=Au(Mt.width,Mt.height,b.format,b.type);for(let _t of b.layerUpdates){let Xt=Mt.data.subarray(_t*xt/Mt.data.BYTES_PER_ELEMENT,(_t+1)*xt/Mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,_t,Mt.width,Mt.height,1,vt,Xt,0,0)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,Mt.width,Mt.height,lt.depth,vt,Mt.data,0,0)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,J,Lt,Mt.width,Mt.height,lt.depth,0,Mt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ft?F&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,Mt.width,Mt.height,lt.depth,vt,Ut,Mt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,J,Lt,Mt.width,Mt.height,lt.depth,0,vt,Ut,Mt.data)}else{Ft&&Yt&&e.texStorage2D(n.TEXTURE_2D,gt,Lt,Wt[0].width,Wt[0].height);for(let J=0,st=Wt.length;J<st;J++)Mt=Wt[J],b.format!==Je?vt!==null?Ft?F&&e.compressedTexSubImage2D(n.TEXTURE_2D,J,0,0,Mt.width,Mt.height,vt,Mt.data):e.compressedTexImage2D(n.TEXTURE_2D,J,Lt,Mt.width,Mt.height,0,Mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ft?F&&e.texSubImage2D(n.TEXTURE_2D,J,0,0,Mt.width,Mt.height,vt,Ut,Mt.data):e.texImage2D(n.TEXTURE_2D,J,Lt,Mt.width,Mt.height,0,vt,Ut,Mt.data)}else if(b.isDataArrayTexture)if(Ft){if(Yt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,gt,Lt,lt.width,lt.height,lt.depth),F)if(b.layerUpdates.size>0){let J=Au(lt.width,lt.height,b.format,b.type);for(let st of b.layerUpdates){let xt=lt.data.subarray(st*J/lt.data.BYTES_PER_ELEMENT,(st+1)*J/lt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,st,lt.width,lt.height,1,vt,Ut,xt)}b.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,lt.width,lt.height,lt.depth,vt,Ut,lt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Lt,lt.width,lt.height,lt.depth,0,vt,Ut,lt.data);else if(b.isData3DTexture)Ft?(Yt&&e.texStorage3D(n.TEXTURE_3D,gt,Lt,lt.width,lt.height,lt.depth),F&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,lt.width,lt.height,lt.depth,vt,Ut,lt.data)):e.texImage3D(n.TEXTURE_3D,0,Lt,lt.width,lt.height,lt.depth,0,vt,Ut,lt.data);else if(b.isFramebufferTexture){if(Yt)if(Ft)e.texStorage2D(n.TEXTURE_2D,gt,Lt,lt.width,lt.height);else{let J=lt.width,st=lt.height;for(let xt=0;xt<gt;xt++)e.texImage2D(n.TEXTURE_2D,xt,Lt,J,st,0,vt,Ut,null),J>>=1,st>>=1}}else if(Wt.length>0){if(Ft&&Yt){let J=It(Wt[0]);e.texStorage2D(n.TEXTURE_2D,gt,Lt,J.width,J.height)}for(let J=0,st=Wt.length;J<st;J++)Mt=Wt[J],Ft?F&&e.texSubImage2D(n.TEXTURE_2D,J,0,0,vt,Ut,Mt):e.texImage2D(n.TEXTURE_2D,J,Lt,vt,Ut,Mt);b.generateMipmaps=!1}else if(Ft){if(Yt){let J=It(lt);e.texStorage2D(n.TEXTURE_2D,gt,Lt,J.width,J.height)}F&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,vt,Ut,lt)}else e.texImage2D(n.TEXTURE_2D,0,Lt,vt,Ut,lt);p(b)&&m(nt),wt.__version=et.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function tt(R,b,X){if(b.image.length!==6)return;let nt=Tt(R,b),at=b.source;e.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+X);let et=i.get(at);if(at.version!==et.__version||nt===!0){e.activeTexture(n.TEXTURE0+X);let wt=Kt.getPrimaries(Kt.workingColorSpace),dt=b.colorSpace===ti?null:Kt.getPrimaries(b.colorSpace),At=b.colorSpace===ti||wt===dt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,At);let Vt=b.isCompressedTexture||b.image[0].isCompressedTexture,lt=b.image[0]&&b.image[0].isDataTexture,vt=[];for(let st=0;st<6;st++)!Vt&&!lt?vt[st]=y(b.image[st],!0,s.maxCubemapSize):vt[st]=lt?b.image[st].image:b.image[st],vt[st]=qt(b,vt[st]);let Ut=vt[0],Lt=r.convert(b.format,b.colorSpace),Mt=r.convert(b.type),Wt=M(b.internalFormat,Lt,Mt,b.colorSpace),Ft=b.isVideoTexture!==!0,Yt=et.__version===void 0||nt===!0,F=at.dataReady,gt=_(b,Ut);ot(n.TEXTURE_CUBE_MAP,b);let J;if(Vt){Ft&&Yt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,gt,Wt,Ut.width,Ut.height);for(let st=0;st<6;st++){J=vt[st].mipmaps;for(let xt=0;xt<J.length;xt++){let _t=J[xt];b.format!==Je?Lt!==null?Ft?F&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,xt,0,0,_t.width,_t.height,Lt,_t.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,xt,Wt,_t.width,_t.height,0,_t.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ft?F&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,xt,0,0,_t.width,_t.height,Lt,Mt,_t.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,xt,Wt,_t.width,_t.height,0,Lt,Mt,_t.data)}}}else{if(J=b.mipmaps,Ft&&Yt){J.length>0&&gt++;let st=It(vt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,gt,Wt,st.width,st.height)}for(let st=0;st<6;st++)if(lt){Ft?F&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,vt[st].width,vt[st].height,Lt,Mt,vt[st].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,Wt,vt[st].width,vt[st].height,0,Lt,Mt,vt[st].data);for(let xt=0;xt<J.length;xt++){let Xt=J[xt].image[st].image;Ft?F&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,xt+1,0,0,Xt.width,Xt.height,Lt,Mt,Xt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,xt+1,Wt,Xt.width,Xt.height,0,Lt,Mt,Xt.data)}}else{Ft?F&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,Lt,Mt,vt[st]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,Wt,Lt,Mt,vt[st]);for(let xt=0;xt<J.length;xt++){let _t=J[xt];Ft?F&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,xt+1,0,0,Lt,Mt,_t.image[st]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+st,xt+1,Wt,Lt,Mt,_t.image[st])}}}p(b)&&m(n.TEXTURE_CUBE_MAP),et.__version=at.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function L(R,b,X,nt,at,et){let wt=r.convert(X.format,X.colorSpace),dt=r.convert(X.type),At=M(X.internalFormat,wt,dt,X.colorSpace);if(!i.get(b).__hasExternalTextures){let lt=Math.max(1,b.width>>et),vt=Math.max(1,b.height>>et);at===n.TEXTURE_3D||at===n.TEXTURE_2D_ARRAY?e.texImage3D(at,et,At,lt,vt,b.depth,0,wt,dt,null):e.texImage2D(at,et,At,lt,vt,0,wt,dt,null)}e.bindFramebuffer(n.FRAMEBUFFER,R),Dt(b)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,nt,at,i.get(X).__webglTexture,0,ut(b)):(at===n.TEXTURE_2D||at>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&at<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,nt,at,i.get(X).__webglTexture,et),e.bindFramebuffer(n.FRAMEBUFFER,null)}function G(R,b,X){if(n.bindRenderbuffer(n.RENDERBUFFER,R),b.depthBuffer){let nt=b.depthTexture,at=nt&&nt.isDepthTexture?nt.type:null,et=x(b.stencilBuffer,at),wt=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,dt=ut(b);Dt(b)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,dt,et,b.width,b.height):X?n.renderbufferStorageMultisample(n.RENDERBUFFER,dt,et,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,et,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,wt,n.RENDERBUFFER,R)}else{let nt=b.textures;for(let at=0;at<nt.length;at++){let et=nt[at],wt=r.convert(et.format,et.colorSpace),dt=r.convert(et.type),At=M(et.internalFormat,wt,dt,et.colorSpace),Vt=ut(b);X&&Dt(b)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Vt,At,b.width,b.height):Dt(b)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Vt,At,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,At,b.width,b.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function N(R,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,R),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(b.depthTexture).__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),U(b.depthTexture,0);let nt=i.get(b.depthTexture).__webglTexture,at=ut(b);if(b.depthTexture.format===es)Dt(b)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,nt,0,at):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,nt,0);else if(b.depthTexture.format===si)Dt(b)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,nt,0,at):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,nt,0);else throw new Error("Unknown depthTexture format")}function q(R){let b=i.get(R),X=R.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==R.depthTexture){let nt=R.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),nt){let at=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,nt.removeEventListener("dispose",at)};nt.addEventListener("dispose",at),b.__depthDisposeCallback=at}b.__boundDepthTexture=nt}if(R.depthTexture&&!b.__autoAllocateDepthBuffer){if(X)throw new Error("target.depthTexture not supported in Cube render targets");N(b.__webglFramebuffer,R)}else if(X){b.__webglDepthbuffer=[];for(let nt=0;nt<6;nt++)if(e.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[nt]),b.__webglDepthbuffer[nt]===void 0)b.__webglDepthbuffer[nt]=n.createRenderbuffer(),G(b.__webglDepthbuffer[nt],R,!1);else{let at=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,et=b.__webglDepthbuffer[nt];n.bindRenderbuffer(n.RENDERBUFFER,et),n.framebufferRenderbuffer(n.FRAMEBUFFER,at,n.RENDERBUFFER,et)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=n.createRenderbuffer(),G(b.__webglDepthbuffer,R,!1);else{let nt=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,at=b.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,at),n.framebufferRenderbuffer(n.FRAMEBUFFER,nt,n.RENDERBUFFER,at)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Y(R,b,X){let nt=i.get(R);b!==void 0&&L(nt.__webglFramebuffer,R,R.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),X!==void 0&&q(R)}function it(R){let b=R.texture,X=i.get(R),nt=i.get(b);R.addEventListener("dispose",S);let at=R.textures,et=R.isWebGLCubeRenderTarget===!0,wt=at.length>1;if(wt||(nt.__webglTexture===void 0&&(nt.__webglTexture=n.createTexture()),nt.__version=b.version,a.memory.textures++),et){X.__webglFramebuffer=[];for(let dt=0;dt<6;dt++)if(b.mipmaps&&b.mipmaps.length>0){X.__webglFramebuffer[dt]=[];for(let At=0;At<b.mipmaps.length;At++)X.__webglFramebuffer[dt][At]=n.createFramebuffer()}else X.__webglFramebuffer[dt]=n.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){X.__webglFramebuffer=[];for(let dt=0;dt<b.mipmaps.length;dt++)X.__webglFramebuffer[dt]=n.createFramebuffer()}else X.__webglFramebuffer=n.createFramebuffer();if(wt)for(let dt=0,At=at.length;dt<At;dt++){let Vt=i.get(at[dt]);Vt.__webglTexture===void 0&&(Vt.__webglTexture=n.createTexture(),a.memory.textures++)}if(R.samples>0&&Dt(R)===!1){X.__webglMultisampledFramebuffer=n.createFramebuffer(),X.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let dt=0;dt<at.length;dt++){let At=at[dt];X.__webglColorRenderbuffer[dt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,X.__webglColorRenderbuffer[dt]);let Vt=r.convert(At.format,At.colorSpace),lt=r.convert(At.type),vt=M(At.internalFormat,Vt,lt,At.colorSpace,R.isXRRenderTarget===!0),Ut=ut(R);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ut,vt,R.width,R.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+dt,n.RENDERBUFFER,X.__webglColorRenderbuffer[dt])}n.bindRenderbuffer(n.RENDERBUFFER,null),R.depthBuffer&&(X.__webglDepthRenderbuffer=n.createRenderbuffer(),G(X.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(et){e.bindTexture(n.TEXTURE_CUBE_MAP,nt.__webglTexture),ot(n.TEXTURE_CUBE_MAP,b);for(let dt=0;dt<6;dt++)if(b.mipmaps&&b.mipmaps.length>0)for(let At=0;At<b.mipmaps.length;At++)L(X.__webglFramebuffer[dt][At],R,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,At);else L(X.__webglFramebuffer[dt],R,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0);p(b)&&m(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(wt){for(let dt=0,At=at.length;dt<At;dt++){let Vt=at[dt],lt=i.get(Vt);e.bindTexture(n.TEXTURE_2D,lt.__webglTexture),ot(n.TEXTURE_2D,Vt),L(X.__webglFramebuffer,R,Vt,n.COLOR_ATTACHMENT0+dt,n.TEXTURE_2D,0),p(Vt)&&m(n.TEXTURE_2D)}e.unbindTexture()}else{let dt=n.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(dt=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(dt,nt.__webglTexture),ot(dt,b),b.mipmaps&&b.mipmaps.length>0)for(let At=0;At<b.mipmaps.length;At++)L(X.__webglFramebuffer[At],R,b,n.COLOR_ATTACHMENT0,dt,At);else L(X.__webglFramebuffer,R,b,n.COLOR_ATTACHMENT0,dt,0);p(b)&&m(dt),e.unbindTexture()}R.depthBuffer&&q(R)}function ft(R){let b=R.textures;for(let X=0,nt=b.length;X<nt;X++){let at=b[X];if(p(at)){let et=R.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,wt=i.get(at).__webglTexture;e.bindTexture(et,wt),m(et),e.unbindTexture()}}}let ct=[],D=[];function Gt(R){if(R.samples>0){if(Dt(R)===!1){let b=R.textures,X=R.width,nt=R.height,at=n.COLOR_BUFFER_BIT,et=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,wt=i.get(R),dt=b.length>1;if(dt)for(let At=0;At<b.length;At++)e.bindFramebuffer(n.FRAMEBUFFER,wt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+At,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,wt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+At,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,wt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,wt.__webglFramebuffer);for(let At=0;At<b.length;At++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(at|=n.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(at|=n.STENCIL_BUFFER_BIT)),dt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,wt.__webglColorRenderbuffer[At]);let Vt=i.get(b[At]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Vt,0)}n.blitFramebuffer(0,0,X,nt,0,0,X,nt,at,n.NEAREST),l===!0&&(ct.length=0,D.length=0,ct.push(n.COLOR_ATTACHMENT0+At),R.depthBuffer&&R.resolveDepthBuffer===!1&&(ct.push(et),D.push(et),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,D)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ct))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),dt)for(let At=0;At<b.length;At++){e.bindFramebuffer(n.FRAMEBUFFER,wt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+At,n.RENDERBUFFER,wt.__webglColorRenderbuffer[At]);let Vt=i.get(b[At]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,wt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+At,n.TEXTURE_2D,Vt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,wt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){let b=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[b])}}}function ut(R){return Math.min(s.maxSamples,R.samples)}function Dt(R){let b=i.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function bt(R){let b=a.render.frame;h.get(R)!==b&&(h.set(R,b),R.update())}function qt(R,b){let X=R.colorSpace,nt=R.format,at=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||X!==ri&&X!==ti&&(Kt.getTransfer(X)===ne?(nt!==Je||at!==vn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",X)),b}function It(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=I,this.resetTextureUnits=v,this.setTexture2D=U,this.setTexture2DArray=z,this.setTexture3D=k,this.setTextureCube=Z,this.rebindTextures=Y,this.setupRenderTarget=it,this.updateRenderTargetMipmap=ft,this.updateMultisampleRenderTarget=Gt,this.setupDepthRenderbuffer=q,this.setupFrameBufferTexture=L,this.useMultisampledRTT=Dt}function RA(n,t){function e(i,s=ti){let r,a=Kt.getTransfer(s);if(i===vn)return n.UNSIGNED_BYTE;if(i===hc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===uc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Tu)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===wu)return n.BYTE;if(i===Eu)return n.SHORT;if(i===Ws)return n.UNSIGNED_SHORT;if(i===cc)return n.INT;if(i===Ei)return n.UNSIGNED_INT;if(i===zn)return n.FLOAT;if(i===on)return n.HALF_FLOAT;if(i===Cu)return n.ALPHA;if(i===Ru)return n.RGB;if(i===Je)return n.RGBA;if(i===Pu)return n.LUMINANCE;if(i===Iu)return n.LUMINANCE_ALPHA;if(i===es)return n.DEPTH_COMPONENT;if(i===si)return n.DEPTH_STENCIL;if(i===Du)return n.RED;if(i===fc)return n.RED_INTEGER;if(i===Uu)return n.RG;if(i===dc)return n.RG_INTEGER;if(i===pc)return n.RGBA_INTEGER;if(i===Vr||i===Gr||i===Wr||i===Xr)if(a===ne)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Vr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Gr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Xr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Vr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Gr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Wr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Xr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Yo||i===Ko||i===jo||i===Zo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Yo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ko)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===jo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Zo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Qo||i===Jo||i===$o)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Qo||i===Jo)return a===ne?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===$o)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===tl||i===el||i===nl||i===il||i===sl||i===rl||i===al||i===ol||i===ll||i===cl||i===hl||i===ul||i===fl||i===dl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===tl)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===el)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===nl)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===il)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===sl)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===rl)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===al)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ol)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ll)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===cl)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===hl)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ul)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===fl)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===dl)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===qr||i===pl||i===ml)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===qr)return a===ne?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===pl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ml)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Lu||i===gl||i===Al||i===vl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===qr)return r.COMPRESSED_RED_RGTC1_EXT;if(i===gl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Al)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===vl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ii?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}var Dl=class extends Be{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},ei=class extends We{constructor(){super(),this.isGroup=!0,this.type="Group"}},PA={type:"move"},Hs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ei,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ei,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ei,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let y of t.hand.values()){let p=e.getJointPose(y,i),m=this._getHandJoint(c,y);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,A=.005;c.inputState.pinching&&d>f+A?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-A&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(PA)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new ei;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},IA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,DA=`
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

}`,Ul=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){let s=new Ge,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new ve({vertexShader:IA,fragmentShader:DA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ie(new Wn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ll=class extends Hn{constructor(t,e){super();let i=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,A=null,y=new Ul,p=e.getContextAttributes(),m=null,M=null,x=[],_=[],P=new mt,S=null,w=new Be;w.layers.enable(1),w.viewport=new fe;let T=new Be;T.layers.enable(2),T.viewport=new fe;let C=[w,T],g=new Dl;g.layers.enable(1),g.layers.enable(2);let v=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(tt){let L=x[tt];return L===void 0&&(L=new Hs,x[tt]=L),L.getTargetRaySpace()},this.getControllerGrip=function(tt){let L=x[tt];return L===void 0&&(L=new Hs,x[tt]=L),L.getGripSpace()},this.getHand=function(tt){let L=x[tt];return L===void 0&&(L=new Hs,x[tt]=L),L.getHandSpace()};function B(tt){let L=_.indexOf(tt.inputSource);if(L===-1)return;let G=x[L];G!==void 0&&(G.update(tt.inputSource,tt.frame,c||a),G.dispatchEvent({type:tt.type,data:tt.inputSource}))}function U(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",U),s.removeEventListener("inputsourceschange",z);for(let tt=0;tt<x.length;tt++){let L=_[tt];L!==null&&(_[tt]=null,x[tt].disconnect(L))}v=null,I=null,y.reset(),t.setRenderTarget(m),f=null,d=null,u=null,s=null,M=null,Bt.stop(),i.isPresenting=!1,t.setPixelRatio(S),t.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(tt){r=tt,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(tt){o=tt,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(tt){c=tt},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return A},this.getSession=function(){return s},this.setSession=async function(tt){if(s=tt,s!==null){if(m=t.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",U),s.addEventListener("inputsourceschange",z),p.xrCompatible!==!0&&await e.makeXRCompatible(),S=t.getPixelRatio(),t.getSize(P),s.renderState.layers===void 0){let L={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,L),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new Ue(f.framebufferWidth,f.framebufferHeight,{format:Je,type:vn,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let L=null,G=null,N=null;p.depth&&(N=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,L=p.stencil?si:es,G=p.stencil?ii:Ei);let q={colorFormat:e.RGBA8,depthFormat:N,scaleFactor:r};u=new XRWebGLBinding(s,e),d=u.createProjectionLayer(q),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),M=new Ue(d.textureWidth,d.textureHeight,{format:Je,type:vn,depthTexture:new hs(d.textureWidth,d.textureHeight,G,void 0,void 0,void 0,void 0,void 0,void 0,L),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Bt.setContext(s),Bt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function z(tt){for(let L=0;L<tt.removed.length;L++){let G=tt.removed[L],N=_.indexOf(G);N>=0&&(_[N]=null,x[N].disconnect(G))}for(let L=0;L<tt.added.length;L++){let G=tt.added[L],N=_.indexOf(G);if(N===-1){for(let Y=0;Y<x.length;Y++)if(Y>=_.length){_.push(G),N=Y;break}else if(_[Y]===null){_[Y]=G,N=Y;break}if(N===-1)break}let q=x[N];q&&q.connect(G)}}let k=new O,Z=new O;function V(tt,L,G){k.setFromMatrixPosition(L.matrixWorld),Z.setFromMatrixPosition(G.matrixWorld);let N=k.distanceTo(Z),q=L.projectionMatrix.elements,Y=G.projectionMatrix.elements,it=q[14]/(q[10]-1),ft=q[14]/(q[10]+1),ct=(q[9]+1)/q[5],D=(q[9]-1)/q[5],Gt=(q[8]-1)/q[0],ut=(Y[8]+1)/Y[0],Dt=it*Gt,bt=it*ut,qt=N/(-Gt+ut),It=qt*-Gt;if(L.matrixWorld.decompose(tt.position,tt.quaternion,tt.scale),tt.translateX(It),tt.translateZ(qt),tt.matrixWorld.compose(tt.position,tt.quaternion,tt.scale),tt.matrixWorldInverse.copy(tt.matrixWorld).invert(),q[10]===-1)tt.projectionMatrix.copy(L.projectionMatrix),tt.projectionMatrixInverse.copy(L.projectionMatrixInverse);else{let R=it+qt,b=ft+qt,X=Dt-It,nt=bt+(N-It),at=ct*ft/b*R,et=D*ft/b*R;tt.projectionMatrix.makePerspective(X,nt,at,et,R,b),tt.projectionMatrixInverse.copy(tt.projectionMatrix).invert()}}function $(tt,L){L===null?tt.matrixWorld.copy(tt.matrix):tt.matrixWorld.multiplyMatrices(L.matrixWorld,tt.matrix),tt.matrixWorldInverse.copy(tt.matrixWorld).invert()}this.updateCamera=function(tt){if(s===null)return;let L=tt.near,G=tt.far;y.texture!==null&&(y.depthNear>0&&(L=y.depthNear),y.depthFar>0&&(G=y.depthFar)),g.near=T.near=w.near=L,g.far=T.far=w.far=G,(v!==g.near||I!==g.far)&&(s.updateRenderState({depthNear:g.near,depthFar:g.far}),v=g.near,I=g.far);let N=tt.parent,q=g.cameras;$(g,N);for(let Y=0;Y<q.length;Y++)$(q[Y],N);q.length===2?V(g,w,T):g.projectionMatrix.copy(w.projectionMatrix),rt(tt,g,N)};function rt(tt,L,G){G===null?tt.matrix.copy(L.matrixWorld):(tt.matrix.copy(G.matrixWorld),tt.matrix.invert(),tt.matrix.multiply(L.matrixWorld)),tt.matrix.decompose(tt.position,tt.quaternion,tt.scale),tt.updateMatrixWorld(!0),tt.projectionMatrix.copy(L.projectionMatrix),tt.projectionMatrixInverse.copy(L.projectionMatrixInverse),tt.isPerspectiveCamera&&(tt.fov=Xs*2*Math.atan(1/tt.projectionMatrix.elements[5]),tt.zoom=1)}this.getCamera=function(){return g},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(tt){l=tt,d!==null&&(d.fixedFoveation=tt),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=tt)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(g)};let ot=null;function Tt(tt,L){if(h=L.getViewerPose(c||a),A=L,h!==null){let G=h.views;f!==null&&(t.setRenderTargetFramebuffer(M,f.framebuffer),t.setRenderTarget(M));let N=!1;G.length!==g.cameras.length&&(g.cameras.length=0,N=!0);for(let Y=0;Y<G.length;Y++){let it=G[Y],ft=null;if(f!==null)ft=f.getViewport(it);else{let D=u.getViewSubImage(d,it);ft=D.viewport,Y===0&&(t.setRenderTargetTextures(M,D.colorTexture,d.ignoreDepthValues?void 0:D.depthStencilTexture),t.setRenderTarget(M))}let ct=C[Y];ct===void 0&&(ct=new Be,ct.layers.enable(Y),ct.viewport=new fe,C[Y]=ct),ct.matrix.fromArray(it.transform.matrix),ct.matrix.decompose(ct.position,ct.quaternion,ct.scale),ct.projectionMatrix.fromArray(it.projectionMatrix),ct.projectionMatrixInverse.copy(ct.projectionMatrix).invert(),ct.viewport.set(ft.x,ft.y,ft.width,ft.height),Y===0&&(g.matrix.copy(ct.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale)),N===!0&&g.cameras.push(ct)}let q=s.enabledFeatures;if(q&&q.includes("depth-sensing")){let Y=u.getDepthInformation(G[0]);Y&&Y.isValid&&Y.texture&&y.init(t,Y,s.renderState)}}for(let G=0;G<x.length;G++){let N=_[G],q=x[G];N!==null&&q!==void 0&&q.update(N,L,c||a)}ot&&ot(tt,L),L.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:L}),A=null}let Bt=new zu;Bt.setAnimationLoop(Tt),this.setAnimationLoop=function(tt){ot=tt},this.dispose=function(){}}},_i=new Pn,UA=new te;function LA(n,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function i(p,m){m.color.getRGB(p.fogColor.value,Fu(n)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,M,x,_){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(p,m):m.isMeshToonMaterial?(r(p,m),u(p,m)):m.isMeshPhongMaterial?(r(p,m),h(p,m)):m.isMeshStandardMaterial?(r(p,m),d(p,m),m.isMeshPhysicalMaterial&&f(p,m,_)):m.isMeshMatcapMaterial?(r(p,m),A(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),y(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?l(p,m,M,x):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Re&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Re&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);let M=t.get(m),x=M.envMap,_=M.envMapRotation;x&&(p.envMap.value=x,_i.copy(_),_i.x*=-1,_i.y*=-1,_i.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(_i.y*=-1,_i.z*=-1),p.envMapRotation.value.setFromMatrix4(UA.makeRotationFromEuler(_i)),p.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,M,x){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*M,p.scale.value=x*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function u(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function d(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,M){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Re&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=M.texture,p.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function A(p,m){m.matcap&&(p.matcap.value=m.matcap)}function y(p,m){let M=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(M.matrixWorld),p.nearDistance.value=M.shadow.camera.near,p.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function NA(n,t,e,i){let s={},r={},a=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,x){let _=x.program;i.uniformBlockBinding(M,_)}function c(M,x){let _=s[M.id];_===void 0&&(A(M),_=h(M),s[M.id]=_,M.addEventListener("dispose",p));let P=x.program;i.updateUBOMapping(M,P);let S=t.render.frame;r[M.id]!==S&&(d(M),r[M.id]=S)}function h(M){let x=u();M.__bindingPointIndex=x;let _=n.createBuffer(),P=M.__size,S=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,_),n.bufferData(n.UNIFORM_BUFFER,P,S),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,x,_),_}function u(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){let x=s[M.id],_=M.uniforms,P=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,x);for(let S=0,w=_.length;S<w;S++){let T=Array.isArray(_[S])?_[S]:[_[S]];for(let C=0,g=T.length;C<g;C++){let v=T[C];if(f(v,S,C,P)===!0){let I=v.__offset,B=Array.isArray(v.value)?v.value:[v.value],U=0;for(let z=0;z<B.length;z++){let k=B[z],Z=y(k);typeof k=="number"||typeof k=="boolean"?(v.__data[0]=k,n.bufferSubData(n.UNIFORM_BUFFER,I+U,v.__data)):k.isMatrix3?(v.__data[0]=k.elements[0],v.__data[1]=k.elements[1],v.__data[2]=k.elements[2],v.__data[3]=0,v.__data[4]=k.elements[3],v.__data[5]=k.elements[4],v.__data[6]=k.elements[5],v.__data[7]=0,v.__data[8]=k.elements[6],v.__data[9]=k.elements[7],v.__data[10]=k.elements[8],v.__data[11]=0):(k.toArray(v.__data,U),U+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,I,v.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(M,x,_,P){let S=M.value,w=x+"_"+_;if(P[w]===void 0)return typeof S=="number"||typeof S=="boolean"?P[w]=S:P[w]=S.clone(),!0;{let T=P[w];if(typeof S=="number"||typeof S=="boolean"){if(T!==S)return P[w]=S,!0}else if(T.equals(S)===!1)return T.copy(S),!0}return!1}function A(M){let x=M.uniforms,_=0,P=16;for(let w=0,T=x.length;w<T;w++){let C=Array.isArray(x[w])?x[w]:[x[w]];for(let g=0,v=C.length;g<v;g++){let I=C[g],B=Array.isArray(I.value)?I.value:[I.value];for(let U=0,z=B.length;U<z;U++){let k=B[U],Z=y(k),V=_%P,$=V%Z.boundary,rt=V+$;_+=$,rt!==0&&P-rt<Z.storage&&(_+=P-rt),I.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=_,_+=Z.storage}}}let S=_%P;return S>0&&(_+=P-S),M.__size=_,M.__cache={},this}function y(M){let x={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(x.boundary=4,x.storage=4):M.isVector2?(x.boundary=8,x.storage=8):M.isVector3||M.isColor?(x.boundary=16,x.storage=12):M.isVector4?(x.boundary=16,x.storage=16):M.isMatrix3?(x.boundary=48,x.storage=48):M.isMatrix4?(x.boundary=64,x.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),x}function p(M){let x=M.target;x.removeEventListener("dispose",p);let _=a.indexOf(x.__bindingPointIndex);a.splice(_,1),n.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function m(){for(let M in s)n.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:l,update:c,dispose:m}}var oa=class{constructor(t={}){let{canvas:e=zd(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let d;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=i.getContextAttributes().alpha}else d=a;let f=new Uint32Array(4),A=new Int32Array(4),y=null,p=null,m=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ve,this.toneMapping=ni,this.toneMappingExposure=1;let x=this,_=!1,P=0,S=0,w=null,T=-1,C=null,g=new fe,v=new fe,I=null,B=new Pt(0),U=0,z=e.width,k=e.height,Z=1,V=null,$=null,rt=new fe(0,0,z,k),ot=new fe(0,0,z,k),Tt=!1,Bt=new Ks,tt=!1,L=!1,G=new te,N=new te,q=new O,Y=new fe,it={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ft=!1;function ct(){return w===null?Z:1}let D=i;function Gt(E,H){return e.getContext(E,H)}try{let E={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine","three.js r169"),e.addEventListener("webglcontextlost",st,!1),e.addEventListener("webglcontextrestored",xt,!1),e.addEventListener("webglcontextcreationerror",_t,!1),D===null){let H="webgl2";if(D=Gt(H,E),D===null)throw Gt(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let ut,Dt,bt,qt,It,R,b,X,nt,at,et,wt,dt,At,Vt,lt,vt,Ut,Lt,Mt,Wt,Ft,Yt,F;function gt(){ut=new Qg(D),ut.init(),Ft=new RA(D,ut),Dt=new Xg(D,ut,t,Ft),bt=new EA(D),Dt.reverseDepthBuffer&&bt.buffers.depth.setReversed(!0),qt=new t0(D),It=new dA,R=new CA(D,ut,bt,It,Dt,Ft,qt),b=new Yg(x),X=new Zg(x),nt=new op(D),Yt=new Gg(D,nt),at=new Jg(D,nt,qt,Yt),et=new n0(D,at,nt,qt),Lt=new e0(D,Dt,R),lt=new qg(It),wt=new fA(x,b,X,ut,Dt,Yt,lt),dt=new LA(x,It),At=new mA,Vt=new _A(ut),Ut=new Vg(x,b,X,bt,et,d,l),vt=new SA(x,et,Dt),F=new NA(D,qt,Dt,bt),Mt=new Wg(D,ut,qt),Wt=new $g(D,ut,qt),qt.programs=wt.programs,x.capabilities=Dt,x.extensions=ut,x.properties=It,x.renderLists=At,x.shadowMap=vt,x.state=bt,x.info=qt}gt();let J=new Ll(x,D);this.xr=J,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){let E=ut.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=ut.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return Z},this.setPixelRatio=function(E){E!==void 0&&(Z=E,this.setSize(z,k,!1))},this.getSize=function(E){return E.set(z,k)},this.setSize=function(E,H,K=!0){if(J.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=E,k=H,e.width=Math.floor(E*Z),e.height=Math.floor(H*Z),K===!0&&(e.style.width=E+"px",e.style.height=H+"px"),this.setViewport(0,0,E,H)},this.getDrawingBufferSize=function(E){return E.set(z*Z,k*Z).floor()},this.setDrawingBufferSize=function(E,H,K){z=E,k=H,Z=K,e.width=Math.floor(E*K),e.height=Math.floor(H*K),this.setViewport(0,0,E,H)},this.getCurrentViewport=function(E){return E.copy(g)},this.getViewport=function(E){return E.copy(rt)},this.setViewport=function(E,H,K,j){E.isVector4?rt.set(E.x,E.y,E.z,E.w):rt.set(E,H,K,j),bt.viewport(g.copy(rt).multiplyScalar(Z).round())},this.getScissor=function(E){return E.copy(ot)},this.setScissor=function(E,H,K,j){E.isVector4?ot.set(E.x,E.y,E.z,E.w):ot.set(E,H,K,j),bt.scissor(v.copy(ot).multiplyScalar(Z).round())},this.getScissorTest=function(){return Tt},this.setScissorTest=function(E){bt.setScissorTest(Tt=E)},this.setOpaqueSort=function(E){V=E},this.setTransparentSort=function(E){$=E},this.getClearColor=function(E){return E.copy(Ut.getClearColor())},this.setClearColor=function(){Ut.setClearColor.apply(Ut,arguments)},this.getClearAlpha=function(){return Ut.getClearAlpha()},this.setClearAlpha=function(){Ut.setClearAlpha.apply(Ut,arguments)},this.clear=function(E=!0,H=!0,K=!0){let j=0;if(E){let W=!1;if(w!==null){let ht=w.texture.format;W=ht===pc||ht===dc||ht===fc}if(W){let ht=w.texture.type,yt=ht===vn||ht===Ei||ht===Ws||ht===ii||ht===hc||ht===uc,St=Ut.getClearColor(),Et=Ut.getClearAlpha(),Nt=St.r,Ot=St.g,Ct=St.b;yt?(f[0]=Nt,f[1]=Ot,f[2]=Ct,f[3]=Et,D.clearBufferuiv(D.COLOR,0,f)):(A[0]=Nt,A[1]=Ot,A[2]=Ct,A[3]=Et,D.clearBufferiv(D.COLOR,0,A))}else j|=D.COLOR_BUFFER_BIT}H&&(j|=D.DEPTH_BUFFER_BIT,D.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),K&&(j|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",st,!1),e.removeEventListener("webglcontextrestored",xt,!1),e.removeEventListener("webglcontextcreationerror",_t,!1),At.dispose(),Vt.dispose(),It.dispose(),b.dispose(),X.dispose(),et.dispose(),Yt.dispose(),F.dispose(),wt.dispose(),J.dispose(),J.removeEventListener("sessionstart",lh),J.removeEventListener("sessionend",ch),mi.stop()};function st(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),_=!0}function xt(){console.log("THREE.WebGLRenderer: Context Restored."),_=!1;let E=qt.autoReset,H=vt.enabled,K=vt.autoUpdate,j=vt.needsUpdate,W=vt.type;gt(),qt.autoReset=E,vt.enabled=H,vt.autoUpdate=K,vt.needsUpdate=j,vt.type=W}function _t(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Xt(E){let H=E.target;H.removeEventListener("dispose",Xt),ge(H)}function ge(E){ke(E),It.remove(E)}function ke(E){let H=It.get(E).programs;H!==void 0&&(H.forEach(function(K){wt.releaseProgram(K)}),E.isShaderMaterial&&wt.releaseShaderCache(E))}this.renderBufferDirect=function(E,H,K,j,W,ht){H===null&&(H=it);let yt=W.isMesh&&W.matrixWorld.determinant()<0,St=Of(E,H,K,j,W);bt.setMaterial(j,yt);let Et=K.index,Nt=1;if(j.wireframe===!0){if(Et=at.getWireframeAttribute(K),Et===void 0)return;Nt=2}let Ot=K.drawRange,Ct=K.attributes.position,$t=Ot.start*Nt,ae=(Ot.start+Ot.count)*Nt;ht!==null&&($t=Math.max($t,ht.start*Nt),ae=Math.min(ae,(ht.start+ht.count)*Nt)),Et!==null?($t=Math.max($t,0),ae=Math.min(ae,Et.count)):Ct!=null&&($t=Math.max($t,0),ae=Math.min(ae,Ct.count));let ue=ae-$t;if(ue<0||ue===1/0)return;Yt.setup(W,j,St,K,Et);let Ke,Qt=Mt;if(Et!==null&&(Ke=nt.get(Et),Qt=Wt,Qt.setIndex(Ke)),W.isMesh)j.wireframe===!0?(bt.setLineWidth(j.wireframeLinewidth*ct()),Qt.setMode(D.LINES)):Qt.setMode(D.TRIANGLES);else if(W.isLine){let Rt=j.linewidth;Rt===void 0&&(Rt=1),bt.setLineWidth(Rt*ct()),W.isLineSegments?Qt.setMode(D.LINES):W.isLineLoop?Qt.setMode(D.LINE_LOOP):Qt.setMode(D.LINE_STRIP)}else W.isPoints?Qt.setMode(D.POINTS):W.isSprite&&Qt.setMode(D.TRIANGLES);if(W.isBatchedMesh)if(W._multiDrawInstances!==null)Qt.renderMultiDrawInstances(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount,W._multiDrawInstances);else if(ut.get("WEBGL_multi_draw"))Qt.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{let Rt=W._multiDrawStarts,Te=W._multiDrawCounts,Jt=W._multiDrawCount,fn=Et?nt.get(Et).bytesPerElement:1,Bi=It.get(j).currentProgram.getUniforms();for(let je=0;je<Jt;je++)Bi.setValue(D,"_gl_DrawID",je),Qt.render(Rt[je]/fn,Te[je])}else if(W.isInstancedMesh)Qt.renderInstances($t,ue,W.count);else if(K.isInstancedBufferGeometry){let Rt=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,Te=Math.min(K.instanceCount,Rt);Qt.renderInstances($t,ue,Te)}else Qt.render($t,ue)};function jt(E,H,K){E.transparent===!0&&E.side===Fe&&E.forceSinglePass===!1?(E.side=Re,E.needsUpdate=!0,vr(E,H,K),E.side=Rn,E.needsUpdate=!0,vr(E,H,K),E.side=Fe):vr(E,H,K)}this.compile=function(E,H,K=null){K===null&&(K=E),p=Vt.get(K),p.init(H),M.push(p),K.traverseVisible(function(W){W.isLight&&W.layers.test(H.layers)&&(p.pushLight(W),W.castShadow&&p.pushShadow(W))}),E!==K&&E.traverseVisible(function(W){W.isLight&&W.layers.test(H.layers)&&(p.pushLight(W),W.castShadow&&p.pushShadow(W))}),p.setupLights();let j=new Set;return E.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;let ht=W.material;if(ht)if(Array.isArray(ht))for(let yt=0;yt<ht.length;yt++){let St=ht[yt];jt(St,K,W),j.add(St)}else jt(ht,K,W),j.add(ht)}),M.pop(),p=null,j},this.compileAsync=function(E,H,K=null){let j=this.compile(E,H,K);return new Promise(W=>{function ht(){if(j.forEach(function(yt){It.get(yt).currentProgram.isReady()&&j.delete(yt)}),j.size===0){W(E);return}setTimeout(ht,10)}ut.get("KHR_parallel_shader_compile")!==null?ht():setTimeout(ht,10)})};let He=null;function In(E){He&&He(E)}function lh(){mi.stop()}function ch(){mi.start()}let mi=new zu;mi.setAnimationLoop(In),typeof self<"u"&&mi.setContext(self),this.setAnimationLoop=function(E){He=E,J.setAnimationLoop(E),E===null?mi.stop():mi.start()},J.addEventListener("sessionstart",lh),J.addEventListener("sessionend",ch),this.render=function(E,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(_===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),J.enabled===!0&&J.isPresenting===!0&&(J.cameraAutoUpdate===!0&&J.updateCamera(H),H=J.getCamera()),E.isScene===!0&&E.onBeforeRender(x,E,H,w),p=Vt.get(E,M.length),p.init(H),M.push(p),N.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),Bt.setFromProjectionMatrix(N),L=this.localClippingEnabled,tt=lt.init(this.clippingPlanes,L),y=At.get(E,m.length),y.init(),m.push(y),J.enabled===!0&&J.isPresenting===!0){let ht=x.xr.getDepthSensingMesh();ht!==null&&Qa(ht,H,-1/0,x.sortObjects)}Qa(E,H,0,x.sortObjects),y.finish(),x.sortObjects===!0&&y.sort(V,$),ft=J.enabled===!1||J.isPresenting===!1||J.hasDepthSensing()===!1,ft&&Ut.addToRenderList(y,E),this.info.render.frame++,tt===!0&&lt.beginShadows();let K=p.state.shadowsArray;vt.render(K,E,H),tt===!0&&lt.endShadows(),this.info.autoReset===!0&&this.info.reset();let j=y.opaque,W=y.transmissive;if(p.setupLights(),H.isArrayCamera){let ht=H.cameras;if(W.length>0)for(let yt=0,St=ht.length;yt<St;yt++){let Et=ht[yt];uh(j,W,E,Et)}ft&&Ut.render(E);for(let yt=0,St=ht.length;yt<St;yt++){let Et=ht[yt];hh(y,E,Et,Et.viewport)}}else W.length>0&&uh(j,W,E,H),ft&&Ut.render(E),hh(y,E,H);w!==null&&(R.updateMultisampleRenderTarget(w),R.updateRenderTargetMipmap(w)),E.isScene===!0&&E.onAfterRender(x,E,H),Yt.resetDefaultState(),T=-1,C=null,M.pop(),M.length>0?(p=M[M.length-1],tt===!0&&lt.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,m.pop(),m.length>0?y=m[m.length-1]:y=null};function Qa(E,H,K,j){if(E.visible===!1)return;if(E.layers.test(H.layers)){if(E.isGroup)K=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(H);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Bt.intersectsSprite(E)){j&&Y.setFromMatrixPosition(E.matrixWorld).applyMatrix4(N);let yt=et.update(E),St=E.material;St.visible&&y.push(E,yt,St,K,Y.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Bt.intersectsObject(E))){let yt=et.update(E),St=E.material;if(j&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Y.copy(E.boundingSphere.center)):(yt.boundingSphere===null&&yt.computeBoundingSphere(),Y.copy(yt.boundingSphere.center)),Y.applyMatrix4(E.matrixWorld).applyMatrix4(N)),Array.isArray(St)){let Et=yt.groups;for(let Nt=0,Ot=Et.length;Nt<Ot;Nt++){let Ct=Et[Nt],$t=St[Ct.materialIndex];$t&&$t.visible&&y.push(E,yt,$t,K,Y.z,Ct)}}else St.visible&&y.push(E,yt,St,K,Y.z,null)}}let ht=E.children;for(let yt=0,St=ht.length;yt<St;yt++)Qa(ht[yt],H,K,j)}function hh(E,H,K,j){let W=E.opaque,ht=E.transmissive,yt=E.transparent;p.setupLightsView(K),tt===!0&&lt.setGlobalState(x.clippingPlanes,K),j&&bt.viewport(g.copy(j)),W.length>0&&Ar(W,H,K),ht.length>0&&Ar(ht,H,K),yt.length>0&&Ar(yt,H,K),bt.buffers.depth.setTest(!0),bt.buffers.depth.setMask(!0),bt.buffers.color.setMask(!0),bt.setPolygonOffset(!1)}function uh(E,H,K,j){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[j.id]===void 0&&(p.state.transmissionRenderTarget[j.id]=new Ue(1,1,{generateMipmaps:!0,type:ut.has("EXT_color_buffer_half_float")||ut.has("EXT_color_buffer_float")?on:vn,minFilter:wi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Kt.workingColorSpace}));let ht=p.state.transmissionRenderTarget[j.id],yt=j.viewport||g;ht.setSize(yt.z,yt.w);let St=x.getRenderTarget();x.setRenderTarget(ht),x.getClearColor(B),U=x.getClearAlpha(),U<1&&x.setClearColor(16777215,.5),x.clear(),ft&&Ut.render(K);let Et=x.toneMapping;x.toneMapping=ni;let Nt=j.viewport;if(j.viewport!==void 0&&(j.viewport=void 0),p.setupLightsView(j),tt===!0&&lt.setGlobalState(x.clippingPlanes,j),Ar(E,K,j),R.updateMultisampleRenderTarget(ht),R.updateRenderTargetMipmap(ht),ut.has("WEBGL_multisampled_render_to_texture")===!1){let Ot=!1;for(let Ct=0,$t=H.length;Ct<$t;Ct++){let ae=H[Ct],ue=ae.object,Ke=ae.geometry,Qt=ae.material,Rt=ae.group;if(Qt.side===Fe&&ue.layers.test(j.layers)){let Te=Qt.side;Qt.side=Re,Qt.needsUpdate=!0,fh(ue,K,j,Ke,Qt,Rt),Qt.side=Te,Qt.needsUpdate=!0,Ot=!0}}Ot===!0&&(R.updateMultisampleRenderTarget(ht),R.updateRenderTargetMipmap(ht))}x.setRenderTarget(St),x.setClearColor(B,U),Nt!==void 0&&(j.viewport=Nt),x.toneMapping=Et}function Ar(E,H,K){let j=H.isScene===!0?H.overrideMaterial:null;for(let W=0,ht=E.length;W<ht;W++){let yt=E[W],St=yt.object,Et=yt.geometry,Nt=j===null?yt.material:j,Ot=yt.group;St.layers.test(K.layers)&&fh(St,H,K,Et,Nt,Ot)}}function fh(E,H,K,j,W,ht){E.onBeforeRender(x,H,K,j,W,ht),E.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),W.onBeforeRender(x,H,K,j,E,ht),W.transparent===!0&&W.side===Fe&&W.forceSinglePass===!1?(W.side=Re,W.needsUpdate=!0,x.renderBufferDirect(K,H,j,W,E,ht),W.side=Rn,W.needsUpdate=!0,x.renderBufferDirect(K,H,j,W,E,ht),W.side=Fe):x.renderBufferDirect(K,H,j,W,E,ht),E.onAfterRender(x,H,K,j,W,ht)}function vr(E,H,K){H.isScene!==!0&&(H=it);let j=It.get(E),W=p.state.lights,ht=p.state.shadowsArray,yt=W.state.version,St=wt.getParameters(E,W.state,ht,H,K),Et=wt.getProgramCacheKey(St),Nt=j.programs;j.environment=E.isMeshStandardMaterial?H.environment:null,j.fog=H.fog,j.envMap=(E.isMeshStandardMaterial?X:b).get(E.envMap||j.environment),j.envMapRotation=j.environment!==null&&E.envMap===null?H.environmentRotation:E.envMapRotation,Nt===void 0&&(E.addEventListener("dispose",Xt),Nt=new Map,j.programs=Nt);let Ot=Nt.get(Et);if(Ot!==void 0){if(j.currentProgram===Ot&&j.lightsStateVersion===yt)return ph(E,St),Ot}else St.uniforms=wt.getUniforms(E),E.onBeforeCompile(St,x),Ot=wt.acquireProgram(St,Et),Nt.set(Et,Ot),j.uniforms=St.uniforms;let Ct=j.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ct.clippingPlanes=lt.uniform),ph(E,St),j.needsLights=Ff(E),j.lightsStateVersion=yt,j.needsLights&&(Ct.ambientLightColor.value=W.state.ambient,Ct.lightProbe.value=W.state.probe,Ct.directionalLights.value=W.state.directional,Ct.directionalLightShadows.value=W.state.directionalShadow,Ct.spotLights.value=W.state.spot,Ct.spotLightShadows.value=W.state.spotShadow,Ct.rectAreaLights.value=W.state.rectArea,Ct.ltc_1.value=W.state.rectAreaLTC1,Ct.ltc_2.value=W.state.rectAreaLTC2,Ct.pointLights.value=W.state.point,Ct.pointLightShadows.value=W.state.pointShadow,Ct.hemisphereLights.value=W.state.hemi,Ct.directionalShadowMap.value=W.state.directionalShadowMap,Ct.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Ct.spotShadowMap.value=W.state.spotShadowMap,Ct.spotLightMatrix.value=W.state.spotLightMatrix,Ct.spotLightMap.value=W.state.spotLightMap,Ct.pointShadowMap.value=W.state.pointShadowMap,Ct.pointShadowMatrix.value=W.state.pointShadowMatrix),j.currentProgram=Ot,j.uniformsList=null,Ot}function dh(E){if(E.uniformsList===null){let H=E.currentProgram.getUniforms();E.uniformsList=is.seqWithValue(H.seq,E.uniforms)}return E.uniformsList}function ph(E,H){let K=It.get(E);K.outputColorSpace=H.outputColorSpace,K.batching=H.batching,K.batchingColor=H.batchingColor,K.instancing=H.instancing,K.instancingColor=H.instancingColor,K.instancingMorph=H.instancingMorph,K.skinning=H.skinning,K.morphTargets=H.morphTargets,K.morphNormals=H.morphNormals,K.morphColors=H.morphColors,K.morphTargetsCount=H.morphTargetsCount,K.numClippingPlanes=H.numClippingPlanes,K.numIntersection=H.numClipIntersection,K.vertexAlphas=H.vertexAlphas,K.vertexTangents=H.vertexTangents,K.toneMapping=H.toneMapping}function Of(E,H,K,j,W){H.isScene!==!0&&(H=it),R.resetTextureUnits();let ht=H.fog,yt=j.isMeshStandardMaterial?H.environment:null,St=w===null?x.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:ri,Et=(j.isMeshStandardMaterial?X:b).get(j.envMap||yt),Nt=j.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,Ot=!!K.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),Ct=!!K.morphAttributes.position,$t=!!K.morphAttributes.normal,ae=!!K.morphAttributes.color,ue=ni;j.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(ue=x.toneMapping);let Ke=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Qt=Ke!==void 0?Ke.length:0,Rt=It.get(j),Te=p.state.lights;if(tt===!0&&(L===!0||E!==C)){let nn=E===C&&j.id===T;lt.setState(j,E,nn)}let Jt=!1;j.version===Rt.__version?(Rt.needsLights&&Rt.lightsStateVersion!==Te.state.version||Rt.outputColorSpace!==St||W.isBatchedMesh&&Rt.batching===!1||!W.isBatchedMesh&&Rt.batching===!0||W.isBatchedMesh&&Rt.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&Rt.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&Rt.instancing===!1||!W.isInstancedMesh&&Rt.instancing===!0||W.isSkinnedMesh&&Rt.skinning===!1||!W.isSkinnedMesh&&Rt.skinning===!0||W.isInstancedMesh&&Rt.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Rt.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Rt.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Rt.instancingMorph===!1&&W.morphTexture!==null||Rt.envMap!==Et||j.fog===!0&&Rt.fog!==ht||Rt.numClippingPlanes!==void 0&&(Rt.numClippingPlanes!==lt.numPlanes||Rt.numIntersection!==lt.numIntersection)||Rt.vertexAlphas!==Nt||Rt.vertexTangents!==Ot||Rt.morphTargets!==Ct||Rt.morphNormals!==$t||Rt.morphColors!==ae||Rt.toneMapping!==ue||Rt.morphTargetsCount!==Qt)&&(Jt=!0):(Jt=!0,Rt.__version=j.version);let fn=Rt.currentProgram;Jt===!0&&(fn=vr(j,H,W));let Bi=!1,je=!1,Ja=!1,de=fn.getUniforms(),Yn=Rt.uniforms;if(bt.useProgram(fn.program)&&(Bi=!0,je=!0,Ja=!0),j.id!==T&&(T=j.id,je=!0),Bi||C!==E){Dt.reverseDepthBuffer?(G.copy(E.projectionMatrix),Hd(G),Vd(G),de.setValue(D,"projectionMatrix",G)):de.setValue(D,"projectionMatrix",E.projectionMatrix),de.setValue(D,"viewMatrix",E.matrixWorldInverse);let nn=de.map.cameraPosition;nn!==void 0&&nn.setValue(D,q.setFromMatrixPosition(E.matrixWorld)),Dt.logarithmicDepthBuffer&&de.setValue(D,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&de.setValue(D,"isOrthographic",E.isOrthographicCamera===!0),C!==E&&(C=E,je=!0,Ja=!0)}if(W.isSkinnedMesh){de.setOptional(D,W,"bindMatrix"),de.setOptional(D,W,"bindMatrixInverse");let nn=W.skeleton;nn&&(nn.boneTexture===null&&nn.computeBoneTexture(),de.setValue(D,"boneTexture",nn.boneTexture,R))}W.isBatchedMesh&&(de.setOptional(D,W,"batchingTexture"),de.setValue(D,"batchingTexture",W._matricesTexture,R),de.setOptional(D,W,"batchingIdTexture"),de.setValue(D,"batchingIdTexture",W._indirectTexture,R),de.setOptional(D,W,"batchingColorTexture"),W._colorsTexture!==null&&de.setValue(D,"batchingColorTexture",W._colorsTexture,R));let $a=K.morphAttributes;if(($a.position!==void 0||$a.normal!==void 0||$a.color!==void 0)&&Lt.update(W,K,fn),(je||Rt.receiveShadow!==W.receiveShadow)&&(Rt.receiveShadow=W.receiveShadow,de.setValue(D,"receiveShadow",W.receiveShadow)),j.isMeshGouraudMaterial&&j.envMap!==null&&(Yn.envMap.value=Et,Yn.flipEnvMap.value=Et.isCubeTexture&&Et.isRenderTargetTexture===!1?-1:1),j.isMeshStandardMaterial&&j.envMap===null&&H.environment!==null&&(Yn.envMapIntensity.value=H.environmentIntensity),je&&(de.setValue(D,"toneMappingExposure",x.toneMappingExposure),Rt.needsLights&&Bf(Yn,Ja),ht&&j.fog===!0&&dt.refreshFogUniforms(Yn,ht),dt.refreshMaterialUniforms(Yn,j,Z,k,p.state.transmissionRenderTarget[E.id]),is.upload(D,dh(Rt),Yn,R)),j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(is.upload(D,dh(Rt),Yn,R),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&de.setValue(D,"center",W.center),de.setValue(D,"modelViewMatrix",W.modelViewMatrix),de.setValue(D,"normalMatrix",W.normalMatrix),de.setValue(D,"modelMatrix",W.matrixWorld),j.isShaderMaterial||j.isRawShaderMaterial){let nn=j.uniformsGroups;for(let to=0,zf=nn.length;to<zf;to++){let mh=nn[to];F.update(mh,fn),F.bind(mh,fn)}}return fn}function Bf(E,H){E.ambientLightColor.needsUpdate=H,E.lightProbe.needsUpdate=H,E.directionalLights.needsUpdate=H,E.directionalLightShadows.needsUpdate=H,E.pointLights.needsUpdate=H,E.pointLightShadows.needsUpdate=H,E.spotLights.needsUpdate=H,E.spotLightShadows.needsUpdate=H,E.rectAreaLights.needsUpdate=H,E.hemisphereLights.needsUpdate=H}function Ff(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return S},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(E,H,K){It.get(E.texture).__webglTexture=H,It.get(E.depthTexture).__webglTexture=K;let j=It.get(E);j.__hasExternalTextures=!0,j.__autoAllocateDepthBuffer=K===void 0,j.__autoAllocateDepthBuffer||ut.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),j.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,H){let K=It.get(E);K.__webglFramebuffer=H,K.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(E,H=0,K=0){w=E,P=H,S=K;let j=!0,W=null,ht=!1,yt=!1;if(E){let Et=It.get(E);if(Et.__useDefaultFramebuffer!==void 0)bt.bindFramebuffer(D.FRAMEBUFFER,null),j=!1;else if(Et.__webglFramebuffer===void 0)R.setupRenderTarget(E);else if(Et.__hasExternalTextures)R.rebindTextures(E,It.get(E.texture).__webglTexture,It.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let Ct=E.depthTexture;if(Et.__boundDepthTexture!==Ct){if(Ct!==null&&It.has(Ct)&&(E.width!==Ct.image.width||E.height!==Ct.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(E)}}let Nt=E.texture;(Nt.isData3DTexture||Nt.isDataArrayTexture||Nt.isCompressedArrayTexture)&&(yt=!0);let Ot=It.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Ot[H])?W=Ot[H][K]:W=Ot[H],ht=!0):E.samples>0&&R.useMultisampledRTT(E)===!1?W=It.get(E).__webglMultisampledFramebuffer:Array.isArray(Ot)?W=Ot[K]:W=Ot,g.copy(E.viewport),v.copy(E.scissor),I=E.scissorTest}else g.copy(rt).multiplyScalar(Z).floor(),v.copy(ot).multiplyScalar(Z).floor(),I=Tt;if(bt.bindFramebuffer(D.FRAMEBUFFER,W)&&j&&bt.drawBuffers(E,W),bt.viewport(g),bt.scissor(v),bt.setScissorTest(I),ht){let Et=It.get(E.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+H,Et.__webglTexture,K)}else if(yt){let Et=It.get(E.texture),Nt=H||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,Et.__webglTexture,K||0,Nt)}T=-1},this.readRenderTargetPixels=function(E,H,K,j,W,ht,yt){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let St=It.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&yt!==void 0&&(St=St[yt]),St){bt.bindFramebuffer(D.FRAMEBUFFER,St);try{let Et=E.texture,Nt=Et.format,Ot=Et.type;if(!Dt.textureFormatReadable(Nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Dt.textureTypeReadable(Ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=E.width-j&&K>=0&&K<=E.height-W&&D.readPixels(H,K,j,W,Ft.convert(Nt),Ft.convert(Ot),ht)}finally{let Et=w!==null?It.get(w).__webglFramebuffer:null;bt.bindFramebuffer(D.FRAMEBUFFER,Et)}}},this.readRenderTargetPixelsAsync=async function(E,H,K,j,W,ht,yt){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let St=It.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&yt!==void 0&&(St=St[yt]),St){let Et=E.texture,Nt=Et.format,Ot=Et.type;if(!Dt.textureFormatReadable(Nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Dt.textureTypeReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(H>=0&&H<=E.width-j&&K>=0&&K<=E.height-W){bt.bindFramebuffer(D.FRAMEBUFFER,St);let Ct=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Ct),D.bufferData(D.PIXEL_PACK_BUFFER,ht.byteLength,D.STREAM_READ),D.readPixels(H,K,j,W,Ft.convert(Nt),Ft.convert(Ot),0);let $t=w!==null?It.get(w).__webglFramebuffer:null;bt.bindFramebuffer(D.FRAMEBUFFER,$t);let ae=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await kd(D,ae,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Ct),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,ht),D.deleteBuffer(Ct),D.deleteSync(ae),ht}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,H=null,K=0){E.isTexture!==!0&&(Yr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),H=arguments[0]||null,E=arguments[1]);let j=Math.pow(2,-K),W=Math.floor(E.image.width*j),ht=Math.floor(E.image.height*j),yt=H!==null?H.x:0,St=H!==null?H.y:0;R.setTexture2D(E,0),D.copyTexSubImage2D(D.TEXTURE_2D,K,0,0,yt,St,W,ht),bt.unbindTexture()},this.copyTextureToTexture=function(E,H,K=null,j=null,W=0){E.isTexture!==!0&&(Yr("WebGLRenderer: copyTextureToTexture function signature has changed."),j=arguments[0]||null,E=arguments[1],H=arguments[2],W=arguments[3]||0,K=null);let ht,yt,St,Et,Nt,Ot;K!==null?(ht=K.max.x-K.min.x,yt=K.max.y-K.min.y,St=K.min.x,Et=K.min.y):(ht=E.image.width,yt=E.image.height,St=0,Et=0),j!==null?(Nt=j.x,Ot=j.y):(Nt=0,Ot=0);let Ct=Ft.convert(H.format),$t=Ft.convert(H.type);R.setTexture2D(H,0),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,H.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,H.unpackAlignment);let ae=D.getParameter(D.UNPACK_ROW_LENGTH),ue=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Ke=D.getParameter(D.UNPACK_SKIP_PIXELS),Qt=D.getParameter(D.UNPACK_SKIP_ROWS),Rt=D.getParameter(D.UNPACK_SKIP_IMAGES),Te=E.isCompressedTexture?E.mipmaps[W]:E.image;D.pixelStorei(D.UNPACK_ROW_LENGTH,Te.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Te.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,St),D.pixelStorei(D.UNPACK_SKIP_ROWS,Et),E.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,W,Nt,Ot,ht,yt,Ct,$t,Te.data):E.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,W,Nt,Ot,Te.width,Te.height,Ct,Te.data):D.texSubImage2D(D.TEXTURE_2D,W,Nt,Ot,ht,yt,Ct,$t,Te),D.pixelStorei(D.UNPACK_ROW_LENGTH,ae),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ue),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Ke),D.pixelStorei(D.UNPACK_SKIP_ROWS,Qt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Rt),W===0&&H.generateMipmaps&&D.generateMipmap(D.TEXTURE_2D),bt.unbindTexture()},this.copyTextureToTexture3D=function(E,H,K=null,j=null,W=0){E.isTexture!==!0&&(Yr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),K=arguments[0]||null,j=arguments[1]||null,E=arguments[2],H=arguments[3],W=arguments[4]||0);let ht,yt,St,Et,Nt,Ot,Ct,$t,ae,ue=E.isCompressedTexture?E.mipmaps[W]:E.image;K!==null?(ht=K.max.x-K.min.x,yt=K.max.y-K.min.y,St=K.max.z-K.min.z,Et=K.min.x,Nt=K.min.y,Ot=K.min.z):(ht=ue.width,yt=ue.height,St=ue.depth,Et=0,Nt=0,Ot=0),j!==null?(Ct=j.x,$t=j.y,ae=j.z):(Ct=0,$t=0,ae=0);let Ke=Ft.convert(H.format),Qt=Ft.convert(H.type),Rt;if(H.isData3DTexture)R.setTexture3D(H,0),Rt=D.TEXTURE_3D;else if(H.isDataArrayTexture||H.isCompressedArrayTexture)R.setTexture2DArray(H,0),Rt=D.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,H.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,H.unpackAlignment);let Te=D.getParameter(D.UNPACK_ROW_LENGTH),Jt=D.getParameter(D.UNPACK_IMAGE_HEIGHT),fn=D.getParameter(D.UNPACK_SKIP_PIXELS),Bi=D.getParameter(D.UNPACK_SKIP_ROWS),je=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,ue.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ue.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Et),D.pixelStorei(D.UNPACK_SKIP_ROWS,Nt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Ot),E.isDataTexture||E.isData3DTexture?D.texSubImage3D(Rt,W,Ct,$t,ae,ht,yt,St,Ke,Qt,ue.data):H.isCompressedArrayTexture?D.compressedTexSubImage3D(Rt,W,Ct,$t,ae,ht,yt,St,Ke,ue.data):D.texSubImage3D(Rt,W,Ct,$t,ae,ht,yt,St,Ke,Qt,ue),D.pixelStorei(D.UNPACK_ROW_LENGTH,Te),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Jt),D.pixelStorei(D.UNPACK_SKIP_PIXELS,fn),D.pixelStorei(D.UNPACK_SKIP_ROWS,Bi),D.pixelStorei(D.UNPACK_SKIP_IMAGES,je),W===0&&H.generateMipmaps&&D.generateMipmap(Rt),bt.unbindTexture()},this.initRenderTarget=function(E){It.get(E).__webglFramebuffer===void 0&&R.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?R.setTextureCube(E,0):E.isData3DTexture?R.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?R.setTexture2DArray(E,0):R.setTexture2D(E,0),bt.unbindTexture()},this.resetState=function(){P=0,S=0,w=null,bt.reset(),Yt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return kn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=t===Ac?"display-p3":"srgb",e.unpackColorSpace=Kt.workingColorSpace===ya?"display-p3":"srgb"}};var Zs=class extends We{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Pn,this.environmentIntensity=1,this.environmentRotation=new Pn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var us=class extends Ge{constructor(t=null,e=1,i=1,s,r,a,o,l,c=Ce,h=Ce,u,d){super(null,a,o,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var yn=class extends Ge{constructor(t,e,i,s,r,a,o,l,c){super(t,e,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},_n=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],i,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)i=this.getPoint(a/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let i=this.getLengths(),s=0,r=i.length,a;e?a=e:a=t*i[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=i[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===a)return s/(r-1);let h=i[s],d=i[s+1]-h,f=(a-h)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new mt:new O);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){let i=new O,s=[],r=[],a=[],o=new O,l=new te;for(let f=0;f<=t;f++){let A=f/t;s[f]=this.getTangentAt(A,new O)}r[0]=new O,a[0]=new O;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,i.set(1,0,0)),u<=c&&(c=u,i.set(0,1,0)),d<=c&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();let A=Math.acos(ye(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,A))}a[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(ye(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let A=1;A<=t;A++)r[A].applyMatrix4(l.makeRotationAxis(s[A],f*A)),a[A].crossVectors(s[A],r[A])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},la=class extends _n{constructor(t=0,e=0,i=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new mt){let i=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Nl=class extends la{constructor(t,e,i,s,r,a){super(t,e,i,i,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function yc(){let n=0,t=0,e=0,i=0;function s(r,a,o,l){n=r,t=o,e=-3*r+3*a-2*o-l,i=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let d=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,f*=h,s(a,o,d,f)},calc:function(r){let a=r*r,o=a*r;return n+t*r+e*a+i*o}}}var kr=new O,Io=new yc,Do=new yc,Uo=new yc,Ri=class extends _n{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new O){let i=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(kr.subVectors(s[0],s[1]).add(s[0]),c=kr);let u=s[o%r],d=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(kr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=kr),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,A=Math.pow(c.distanceToSquared(u),f),y=Math.pow(u.distanceToSquared(d),f),p=Math.pow(d.distanceToSquared(h),f);y<1e-4&&(y=1),A<1e-4&&(A=y),p<1e-4&&(p=y),Io.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,A,y,p),Do.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,A,y,p),Uo.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,A,y,p)}else this.curveType==="catmullrom"&&(Io.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Do.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Uo.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return i.set(Io.calc(l),Do.calc(l),Uo.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new O().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function vu(n,t,e,i,s){let r=(i-t)*.5,a=(s-e)*.5,o=n*n,l=n*o;return(2*e-2*i+r+a)*l+(-3*e+3*i-2*r-a)*o+r*n+e}function OA(n,t){let e=1-n;return e*e*t}function BA(n,t){return 2*(1-n)*n*t}function FA(n,t){return n*n*t}function Vs(n,t,e,i){return OA(n,t)+BA(n,e)+FA(n,i)}function zA(n,t){let e=1-n;return e*e*e*t}function kA(n,t){let e=1-n;return 3*e*e*n*t}function HA(n,t){return 3*(1-n)*n*n*t}function VA(n,t){return n*n*n*t}function Gs(n,t,e,i,s){return zA(n,t)+kA(n,e)+HA(n,i)+VA(n,s)}var Ol=class extends _n{constructor(t=new mt,e=new mt,i=new mt,s=new mt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new mt){let i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(Gs(t,s.x,r.x,a.x,o.x),Gs(t,s.y,r.y,a.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Bl=class extends _n{constructor(t=new O,e=new O,i=new O,s=new O){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new O){let i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(Gs(t,s.x,r.x,a.x,o.x),Gs(t,s.y,r.y,a.y,o.y),Gs(t,s.z,r.z,a.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Fl=class extends _n{constructor(t=new mt,e=new mt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new mt){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new mt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},zl=class extends _n{constructor(t=new O,e=new O){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new O){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new O){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},kl=class extends _n{constructor(t=new mt,e=new mt,i=new mt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new mt){let i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(Vs(t,s.x,r.x,a.x),Vs(t,s.y,r.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ca=class extends _n{constructor(t=new O,e=new O,i=new O){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new O){let i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(Vs(t,s.x,r.x,a.x),Vs(t,s.y,r.y,a.y),Vs(t,s.z,r.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Hl=class extends _n{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new mt){let i=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return i.set(vu(o,l.x,c.x,h.x,u.x),vu(o,l.y,c.y,h.y,u.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new mt().fromArray(s))}return this}},GA=Object.freeze({__proto__:null,ArcCurve:Nl,CatmullRomCurve3:Ri,CubicBezierCurve:Ol,CubicBezierCurve3:Bl,EllipseCurve:la,LineCurve:Fl,LineCurve3:zl,QuadraticBezierCurve:kl,QuadraticBezierCurve3:ca,SplineCurve:Hl});var ha=class n extends se{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let l=Math.min(a+o,Math.PI),c=0,h=[],u=new O,d=new O,f=[],A=[],y=[],p=[];for(let m=0;m<=i;m++){let M=[],x=m/i,_=0;m===0&&a===0?_=.5/e:m===i&&l===Math.PI&&(_=-.5/e);for(let P=0;P<=e;P++){let S=P/e;u.x=-t*Math.cos(s+S*r)*Math.sin(a+x*o),u.y=t*Math.cos(a+x*o),u.z=t*Math.sin(s+S*r)*Math.sin(a+x*o),A.push(u.x,u.y,u.z),d.copy(u).normalize(),y.push(d.x,d.y,d.z),p.push(S+_,1-x),M.push(c++)}h.push(M)}for(let m=0;m<i;m++)for(let M=0;M<e;M++){let x=h[m][M+1],_=h[m][M],P=h[m+1][M],S=h[m+1][M+1];(m!==0||a>0)&&f.push(x,_,S),(m!==i-1||l<Math.PI)&&f.push(_,P,S)}this.setIndex(f),this.setAttribute("position",new ce(A,3)),this.setAttribute("normal",new ce(y,3)),this.setAttribute("uv",new ce(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Qs=class n extends se{constructor(t=new ca(new O(-1,-1,0),new O(-1,1,0),new O(1,1,0)),e=64,i=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:i,radialSegments:s,closed:r};let a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new O,l=new O,c=new mt,h=new O,u=[],d=[],f=[],A=[];y(),this.setIndex(A),this.setAttribute("position",new ce(u,3)),this.setAttribute("normal",new ce(d,3)),this.setAttribute("uv",new ce(f,2));function y(){for(let x=0;x<e;x++)p(x);p(r===!1?e:0),M(),m()}function p(x){h=t.getPointAt(x/e,h);let _=a.normals[x],P=a.binormals[x];for(let S=0;S<=s;S++){let w=S/s*Math.PI*2,T=Math.sin(w),C=-Math.cos(w);l.x=C*_.x+T*P.x,l.y=C*_.y+T*P.y,l.z=C*_.z+T*P.z,l.normalize(),d.push(l.x,l.y,l.z),o.x=h.x+i*l.x,o.y=h.y+i*l.y,o.z=h.z+i*l.z,u.push(o.x,o.y,o.z)}}function m(){for(let x=1;x<=e;x++)for(let _=1;_<=s;_++){let P=(s+1)*(x-1)+(_-1),S=(s+1)*x+(_-1),w=(s+1)*x+_,T=(s+1)*(x-1)+_;A.push(P,S,T),A.push(S,w,T)}}function M(){for(let x=0;x<=e;x++)for(let _=0;_<=s;_++)c.x=x/e,c.y=_/s,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new n(new GA[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};var ua=class extends Vn{constructor(t){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Pt(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}},fa=class extends ve{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Vl=class extends Vn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Pt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Pt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=gc,this.normalScale=new mt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Xn=class extends Vl{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new mt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ye(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Pt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Pt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Pt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};var fs=class extends Vn{constructor(t){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=gc,this.normalScale=new mt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(t)}copy(t){return super.copy(t),this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.flatShading=t.flatShading,this}};function Hr(n,t,e){return!n||!e&&n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function WA(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}var ds=class{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,s=e[i],r=e[i-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=i+2;;){if(s===void 0){if(t<r)break i;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=e[++i],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=e[--i-1],t>=r)break t}a=i,i=0;break e}break n}for(;i<a;){let o=i+a>>>1;t<e[o]?a=o:i=o+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=i[r+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Gl=class extends ds{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:wh,endingEnd:wh}}intervalChanged_(t,e,i){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Eh:r=t,o=2*e-i;break;case Th:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Eh:a=t,l=2*i-e;break;case Th:a=1,l=i+s[1]-s[0];break;default:a=t-1,l=e}let c=(i-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,A=(i-e)/(s-e),y=A*A,p=y*A,m=-d*p+2*d*y-d*A,M=(1+d)*p+(-1.5-2*d)*y+(-.5+d)*A+1,x=(-1-f)*p+(1.5+f)*y+.5*A,_=f*p-f*y;for(let P=0;P!==o;++P)r[P]=m*a[h+P]+M*a[c+P]+x*a[l+P]+_*a[u+P];return r}},Wl=class extends ds{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(i-e)/(s-e),u=1-h;for(let d=0;d!==o;++d)r[d]=a[c+d]*u+a[l+d]*h;return r}},Xl=class extends ds{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Mn=class{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Hr(e,this.TimeBufferType),this.values=Hr(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:Hr(t.times,Array),values:Hr(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new Xl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Wl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Gl(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Kr:e=this.InterpolantFactoryMethodDiscrete;break;case xl:e=this.InterpolantFactoryMethodLinear;break;case no:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Kr;case this.InterpolantFactoryMethodLinear:return xl;case this.InterpolantFactoryMethodSmooth:return no}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t}return this}trim(t,e){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<t;)++r;for(;a!==-1&&i[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&WA(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===no,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(s)l=!0;else{let u=o*i,d=u-i,f=u+i;for(let A=0;A!==i;++A){let y=e[u+A];if(y!==e[d+A]||y!==e[f+A]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let u=o*i,d=a*i;for(let f=0;f!==i;++f)e[d+f]=e[u+f]}++a}}if(r>0){t[a]=t[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};Mn.prototype.TimeBufferType=Float32Array;Mn.prototype.ValueBufferType=Float32Array;Mn.prototype.DefaultInterpolation=xl;var Pi=class extends Mn{constructor(t,e,i){super(t,e,i)}};Pi.prototype.ValueTypeName="bool";Pi.prototype.ValueBufferType=Array;Pi.prototype.DefaultInterpolation=Kr;Pi.prototype.InterpolantFactoryMethodLinear=void 0;Pi.prototype.InterpolantFactoryMethodSmooth=void 0;var ql=class extends Mn{};ql.prototype.ValueTypeName="color";var Yl=class extends Mn{};Yl.prototype.ValueTypeName="number";var Kl=class extends ds{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-e)/(s-e),c=t*o;for(let h=c+o;c!==h;c+=4)xn.slerpFlat(r,0,a,c-o,a,c,l);return r}},da=class extends Mn{InterpolantFactoryMethodLinear(t){return new Kl(this.times,this.values,this.getValueSize(),t)}};da.prototype.ValueTypeName="quaternion";da.prototype.InterpolantFactoryMethodSmooth=void 0;var Ii=class extends Mn{constructor(t,e,i){super(t,e,i)}};Ii.prototype.ValueTypeName="string";Ii.prototype.ValueBufferType=Array;Ii.prototype.DefaultInterpolation=Kr;Ii.prototype.InterpolantFactoryMethodLinear=void 0;Ii.prototype.InterpolantFactoryMethodSmooth=void 0;var jl=class extends Mn{};jl.prototype.ValueTypeName="vector";var Zl=class{constructor(t,e,i){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],A=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return A}return null}}},XA=new Zl,Ql=class{constructor(t){this.manager=t!==void 0?t:XA,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};Ql.DEFAULT_MATERIAL_NAME="__DEFAULT";var Jl=class extends We{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Pt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}};var Lo=new te,xu=new O,yu=new O,$l=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new mt(512,512),this.map=null,this.mapPass=null,this.matrix=new te,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ks,this._frameExtents=new mt(1,1),this._viewportCount=1,this._viewports=[new fe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,i=this.matrix;xu.setFromMatrixPosition(t.matrixWorld),e.position.copy(xu),yu.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(yu),e.updateMatrixWorld(),Lo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Lo),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Lo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var tc=class extends $l{constructor(){super(new ls(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},pa=class extends Jl{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(We.DEFAULT_UP),this.updateMatrix(),this.target=new We,this.shadow=new tc}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var ma=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=_u(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=_u();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};function _u(){return performance.now()}var _c="\\[\\]\\.:\\/",qA=new RegExp("["+_c+"]","g"),Mc="[^"+_c+"]",YA="[^"+_c.replace("\\.","")+"]",KA=/((?:WC+[\/:])*)/.source.replace("WC",Mc),jA=/(WCOD+)?/.source.replace("WCOD",YA),ZA=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Mc),QA=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Mc),JA=new RegExp("^"+KA+jA+ZA+QA+"$"),$A=["material","materials","bones","map"],ec=class{constructor(t,e,i){let s=i||oe.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},oe=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(qA,"")}static parseTrackName(t){let e=JA.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);$A.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=i(o.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};oe.Composite=ec;oe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};oe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};oe.prototype.GetterByBindingType=[oe.prototype._getValue_direct,oe.prototype._getValue_array,oe.prototype._getValue_arrayElement,oe.prototype._getValue_toArray];oe.prototype.SetterByBindingTypeAndVersioning=[[oe.prototype._setValue_direct,oe.prototype._setValue_direct_setNeedsUpdate,oe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[oe.prototype._setValue_array,oe.prototype._setValue_array_setNeedsUpdate,oe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[oe.prototype._setValue_arrayElement,oe.prototype._setValue_arrayElement_setNeedsUpdate,oe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[oe.prototype._setValue_fromArray,oe.prototype._setValue_fromArray_setNeedsUpdate,oe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var hx=new Float32Array(1);var Js=class{constructor(t=1,e=0,i=0){return this.radius=t,this.phi=e,this.theta=i,this}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(ye(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var ga=class extends Hn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"169"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="169");var Wu={type:"change"},Sc={type:"start"},qu={type:"end"},ba=new Ys,Xu=new gn,ev=Math.cos(70*_a.DEG2RAD),Se=new O,Xe=2*Math.PI,ee={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},bc=1e-6,Sa=class extends ga{constructor(t,e=null){super(t,e),this.state=ee.NONE,this.enabled=!0,this.target=new O,this.cursor=new O,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Di.ROTATE,MIDDLE:Di.DOLLY,RIGHT:Di.PAN},this.touches={ONE:Ui.ROTATE,TWO:Ui.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new O,this._lastQuaternion=new xn,this._lastTargetPosition=new O,this._quat=new xn().setFromUnitVectors(t.up,new O(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Js,this._sphericalDelta=new Js,this._scale=1,this._panOffset=new O,this._rotateStart=new mt,this._rotateEnd=new mt,this._rotateDelta=new mt,this._panStart=new mt,this._panEnd=new mt,this._panDelta=new mt,this._dollyStart=new mt,this._dollyEnd=new mt,this._dollyDelta=new mt,this._dollyDirection=new O,this._mouse=new mt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=iv.bind(this),this._onPointerDown=nv.bind(this),this._onPointerUp=sv.bind(this),this._onContextMenu=uv.bind(this),this._onMouseWheel=ov.bind(this),this._onKeyDown=lv.bind(this),this._onTouchStart=cv.bind(this),this._onTouchMove=hv.bind(this),this._onMouseDown=rv.bind(this),this._onMouseMove=av.bind(this),this._interceptControlDown=fv.bind(this),this._interceptControlUp=dv.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Wu),this.update(),this.state=ee.NONE}update(t=null){let e=this.object.position;Se.copy(e).sub(this.target),Se.applyQuaternion(this._quat),this._spherical.setFromVector3(Se),this.autoRotate&&this.state===ee.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=Xe:i>Math.PI&&(i-=Xe),s<-Math.PI?s+=Xe:s>Math.PI&&(s-=Xe),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Se.setFromSpherical(this._spherical),Se.applyQuaternion(this._quatInverse),e.copy(this.target).add(Se),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Se.length();a=this._clampDistance(o*this._scale);let l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let o=new O(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new O(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Se.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(ba.origin.copy(this.object.position),ba.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ba.direction))<ev?this.object.lookAt(this.target):(Xu.setFromNormalAndCoplanarPoint(this.object.up,this.target),ba.intersectPlane(Xu,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>bc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>bc||this._lastTargetPosition.distanceToSquared(this.target)>bc?(this.dispatchEvent(Wu),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Xe/60*this.autoRotateSpeed*t:Xe/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Se.setFromMatrixColumn(e,0),Se.multiplyScalar(-t),this._panOffset.add(Se)}_panUp(t,e){this.screenSpacePanning===!0?Se.setFromMatrixColumn(e,1):(Se.setFromMatrixColumn(e,0),Se.crossVectors(this.object.up,Se)),Se.multiplyScalar(t),this._panOffset.add(Se)}_pan(t,e){let i=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Se.copy(s).sub(this.target);let r=Se.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Xe*this._rotateDelta.x/e.clientHeight),this._rotateUp(Xe*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(Xe*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-Xe*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(Xe*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-Xe*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Xe*this._rotateDelta.x/e.clientHeight),this._rotateUp(Xe*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new mt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}};function nv(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function iv(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function sv(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(qu),this.state=ee.NONE;break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function rv(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Di.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=ee.DOLLY;break;case Di.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ee.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ee.ROTATE}break;case Di.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ee.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ee.PAN}break;default:this.state=ee.NONE}this.state!==ee.NONE&&this.dispatchEvent(Sc)}function av(n){switch(this.state){case ee.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case ee.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case ee.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function ov(n){this.enabled===!1||this.enableZoom===!1||this.state!==ee.NONE||(n.preventDefault(),this.dispatchEvent(Sc),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(qu))}function lv(n){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(n)}function cv(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Ui.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=ee.TOUCH_ROTATE;break;case Ui.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=ee.TOUCH_PAN;break;default:this.state=ee.NONE}break;case 2:switch(this.touches.TWO){case Ui.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=ee.TOUCH_DOLLY_PAN;break;case Ui.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=ee.TOUCH_DOLLY_ROTATE;break;default:this.state=ee.NONE}break;default:this.state=ee.NONE}this.state!==ee.NONE&&this.dispatchEvent(Sc)}function hv(n){switch(this._trackPointer(n),this.state){case ee.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case ee.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case ee.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case ee.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=ee.NONE}}function uv(n){this.enabled!==!1&&n.preventDefault()}function fv(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function dv(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function wa(n,t=!1){let e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},a={},o=n[0].morphTargetsRelative,l=new se,c=0;for(let h=0;h<n.length;++h){let u=n[h],d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let f in u.attributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let f in u.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(u.morphAttributes[f])}if(t){let f;if(e)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(e){let h=0,u=[];for(let d=0;d<n.length;++d){let f=n[d].index;for(let A=0;A<f.count;++A)u.push(f.getX(A)+h);h+=n[d].attributes.position.count}l.setIndex(u)}for(let h in r){let u=Yu(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(let h in a){let u=a[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){let f=[];for(let y=0;y<a[h].length;++y)f.push(a[h][y][d]);let A=Yu(f);if(!A)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(A)}}return l}function Yu(n){let t,e,i,s=-1,r=0;for(let c=0;c<n.length;++c){let h=n[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let a=new t(r),o=new _e(a,e,i),l=0;for(let c=0;c<n.length;++c){let h=n[c];if(h.isInterleavedBufferAttribute){let u=l/e;for(let d=0,f=h.count;d<f;d++)for(let A=0;A<e;A++){let y=h.getComponent(d,A);o.setComponent(d+u,A,y)}}else a.set(h.array,l);l+=h.count*e}return s!==void 0&&(o.gpuType=s),o}var As={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};var $e=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},pv=new ls(-1,1,1,-1,0,1),wc=class extends se{constructor(){super(),this.setAttribute("position",new ce([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ce([0,2,0,0,2,0],2))}},mv=new wc,ai=class{constructor(t){this._mesh=new ie(mv,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,pv)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}};var Ea=class extends $e{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof ve?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=bn.clone(t.uniforms),this.material=new ve({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new ai(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var tr=class extends $e{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){let s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},Ta=class extends $e{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}};var Ca=class{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){let i=t.getSize(new mt);this._width=i.width,this._height=i.height,e=new Ue(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:on}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Ea(As),this.copyPass.material.blending=pe,this.clock=new ma}swapBuffers(){let t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){let e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());let e=this.renderer.getRenderTarget(),i=!1;for(let s=0,r=this.passes.length;s<r;s++){let a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),a.needsSwap){if(i){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}tr!==void 0&&(a instanceof tr?i=!0:a instanceof Ta&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){let e=this.renderer.getSize(new mt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;let i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var Ra=class extends $e{constructor(t,e,i=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Pt}render(t,e,i){let s=t.autoClear;t.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=s}};var er={name:"GTAOShader",defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new mt},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new te},cameraProjectionMatrixInverse:{value:new te},cameraWorldMatrix:{value:new te},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new O(-1,-1,-1)},sceneBoxMax:{value:new O(1,1,1)}},vertexShader:`

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
		}`},nr={name:"GTAODepthShader",defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
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

		}`},Pa={name:"GTAOBlendShader",uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
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
		}`};function Ku(n=5){let t=Math.floor(n)%2===0?Math.floor(n)+1:Math.floor(n),e=gv(t),i=e.length,s=new Uint8Array(i*4);for(let a=0;a<i;++a){let o=e[a],l=2*Math.PI*o/i,c=new O(Math.cos(l),Math.sin(l),0).normalize();s[a*4]=(c.x*.5+.5)*255,s[a*4+1]=(c.y*.5+.5)*255,s[a*4+2]=127,s[a*4+3]=255}let r=new us(s,t,t);return r.wrapS=an,r.wrapT=an,r.needsUpdate=!0,r}function gv(n){let t=Math.floor(n)%2===0?Math.floor(n)+1:Math.floor(n),e=t*t,i=Array(e).fill(0),s=Math.floor(t/2),r=t-1;for(let a=1;a<=e;){if(s===-1&&r===t?(r=t-2,s=0):(r===t&&(r=0),s<0&&(s=t-1)),i[s*t+r]!==0){r-=2,s++;continue}else i[s*t+r]=a++;r++,s--}return i}var ir={name:"PoissonDenoiseShader",defines:{SAMPLES:16,SAMPLE_VECTORS:Ec(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new mt},cameraProjectionMatrixInverse:{value:new te},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

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
		}`};function Ec(n,t,e){let i=Av(n,t,e),s="vec3[SAMPLES](";for(let r=0;r<n;r++){let a=i[r];s+=`vec3(${a.x}, ${a.y}, ${a.z})${r<n-1?",":")"}`}return s}function Av(n,t,e){let i=[];for(let s=0;s<n;s++){let r=2*Math.PI*t*s/n,a=Math.pow(s/(n-1),e);i.push(new O(Math.cos(r),Math.sin(r),a))}return i}var Ia=class{constructor(t=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let e=0;e<256;e++)this.p[e]=Math.floor(t.random()*256);this.perm=[];for(let e=0;e<512;e++)this.perm[e]=this.p[e&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}dot(t,e,i){return t[0]*e+t[1]*i}dot3(t,e,i,s){return t[0]*e+t[1]*i+t[2]*s}dot4(t,e,i,s,r){return t[0]*e+t[1]*i+t[2]*s+t[3]*r}noise(t,e){let i,s,r,a=.5*(Math.sqrt(3)-1),o=(t+e)*a,l=Math.floor(t+o),c=Math.floor(e+o),h=(3-Math.sqrt(3))/6,u=(l+c)*h,d=l-u,f=c-u,A=t-d,y=e-f,p,m;A>y?(p=1,m=0):(p=0,m=1);let M=A-p+h,x=y-m+h,_=A-1+2*h,P=y-1+2*h,S=l&255,w=c&255,T=this.perm[S+this.perm[w]]%12,C=this.perm[S+p+this.perm[w+m]]%12,g=this.perm[S+1+this.perm[w+1]]%12,v=.5-A*A-y*y;v<0?i=0:(v*=v,i=v*v*this.dot(this.grad3[T],A,y));let I=.5-M*M-x*x;I<0?s=0:(I*=I,s=I*I*this.dot(this.grad3[C],M,x));let B=.5-_*_-P*P;return B<0?r=0:(B*=B,r=B*B*this.dot(this.grad3[g],_,P)),70*(i+s+r)}noise3d(t,e,i){let s,r,a,o,c=(t+e+i)*.3333333333333333,h=Math.floor(t+c),u=Math.floor(e+c),d=Math.floor(i+c),f=1/6,A=(h+u+d)*f,y=h-A,p=u-A,m=d-A,M=t-y,x=e-p,_=i-m,P,S,w,T,C,g;M>=x?x>=_?(P=1,S=0,w=0,T=1,C=1,g=0):M>=_?(P=1,S=0,w=0,T=1,C=0,g=1):(P=0,S=0,w=1,T=1,C=0,g=1):x<_?(P=0,S=0,w=1,T=0,C=1,g=1):M<_?(P=0,S=1,w=0,T=0,C=1,g=1):(P=0,S=1,w=0,T=1,C=1,g=0);let v=M-P+f,I=x-S+f,B=_-w+f,U=M-T+2*f,z=x-C+2*f,k=_-g+2*f,Z=M-1+3*f,V=x-1+3*f,$=_-1+3*f,rt=h&255,ot=u&255,Tt=d&255,Bt=this.perm[rt+this.perm[ot+this.perm[Tt]]]%12,tt=this.perm[rt+P+this.perm[ot+S+this.perm[Tt+w]]]%12,L=this.perm[rt+T+this.perm[ot+C+this.perm[Tt+g]]]%12,G=this.perm[rt+1+this.perm[ot+1+this.perm[Tt+1]]]%12,N=.6-M*M-x*x-_*_;N<0?s=0:(N*=N,s=N*N*this.dot3(this.grad3[Bt],M,x,_));let q=.6-v*v-I*I-B*B;q<0?r=0:(q*=q,r=q*q*this.dot3(this.grad3[tt],v,I,B));let Y=.6-U*U-z*z-k*k;Y<0?a=0:(Y*=Y,a=Y*Y*this.dot3(this.grad3[L],U,z,k));let it=.6-Z*Z-V*V-$*$;return it<0?o=0:(it*=it,o=it*it*this.dot3(this.grad3[G],Z,V,$)),32*(s+r+a+o)}noise4d(t,e,i,s){let r=this.grad4,a=this.simplex,o=this.perm,l=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20,h,u,d,f,A,y=(t+e+i+s)*l,p=Math.floor(t+y),m=Math.floor(e+y),M=Math.floor(i+y),x=Math.floor(s+y),_=(p+m+M+x)*c,P=p-_,S=m-_,w=M-_,T=x-_,C=t-P,g=e-S,v=i-w,I=s-T,B=C>g?32:0,U=C>v?16:0,z=g>v?8:0,k=C>I?4:0,Z=g>I?2:0,V=v>I?1:0,$=B+U+z+k+Z+V,rt=a[$][0]>=3?1:0,ot=a[$][1]>=3?1:0,Tt=a[$][2]>=3?1:0,Bt=a[$][3]>=3?1:0,tt=a[$][0]>=2?1:0,L=a[$][1]>=2?1:0,G=a[$][2]>=2?1:0,N=a[$][3]>=2?1:0,q=a[$][0]>=1?1:0,Y=a[$][1]>=1?1:0,it=a[$][2]>=1?1:0,ft=a[$][3]>=1?1:0,ct=C-rt+c,D=g-ot+c,Gt=v-Tt+c,ut=I-Bt+c,Dt=C-tt+2*c,bt=g-L+2*c,qt=v-G+2*c,It=I-N+2*c,R=C-q+3*c,b=g-Y+3*c,X=v-it+3*c,nt=I-ft+3*c,at=C-1+4*c,et=g-1+4*c,wt=v-1+4*c,dt=I-1+4*c,At=p&255,Vt=m&255,lt=M&255,vt=x&255,Ut=o[At+o[Vt+o[lt+o[vt]]]]%32,Lt=o[At+rt+o[Vt+ot+o[lt+Tt+o[vt+Bt]]]]%32,Mt=o[At+tt+o[Vt+L+o[lt+G+o[vt+N]]]]%32,Wt=o[At+q+o[Vt+Y+o[lt+it+o[vt+ft]]]]%32,Ft=o[At+1+o[Vt+1+o[lt+1+o[vt+1]]]]%32,Yt=.6-C*C-g*g-v*v-I*I;Yt<0?h=0:(Yt*=Yt,h=Yt*Yt*this.dot4(r[Ut],C,g,v,I));let F=.6-ct*ct-D*D-Gt*Gt-ut*ut;F<0?u=0:(F*=F,u=F*F*this.dot4(r[Lt],ct,D,Gt,ut));let gt=.6-Dt*Dt-bt*bt-qt*qt-It*It;gt<0?d=0:(gt*=gt,d=gt*gt*this.dot4(r[Mt],Dt,bt,qt,It));let J=.6-R*R-b*b-X*X-nt*nt;J<0?f=0:(J*=J,f=J*J*this.dot4(r[Wt],R,b,X,nt));let st=.6-at*at-et*et-wt*wt-dt*dt;return st<0?A=0:(st*=st,A=st*st*this.dot4(r[Ft],at,et,wt,dt)),27*(h+u+d+f+A)}};var sr=class n extends $e{constructor(t,e,i,s,r,a,o){super(),this.width=i!==void 0?i:512,this.height=s!==void 0?s:512,this.clear=!0,this.camera=e,this.scene=t,this.output=0,this._renderGBuffer=!0,this._visibilityCache=new Map,this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=Ku(),this.pdNoiseTexture=this.generateNoise(),this.gtaoRenderTarget=new Ue(this.width,this.height,{type:on}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new ve({defines:Object.assign({},er.defines),uniforms:bn.clone(er.uniforms),vertexShader:er.vertexShader,fragmentShader:er.fragmentShader,blending:pe,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new fs,this.normalMaterial.blending=pe,this.pdMaterial=new ve({defines:Object.assign({},ir.defines),uniforms:bn.clone(ir.uniforms),vertexShader:ir.vertexShader,fragmentShader:ir.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new ve({defines:Object.assign({},nr.defines),uniforms:bn.clone(nr.uniforms),vertexShader:nr.vertexShader,fragmentShader:nr.fragmentShader,blending:pe}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new ve({uniforms:bn.clone(As.uniforms),vertexShader:As.vertexShader,fragmentShader:As.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:va,blendDst:ps,blendEquation:rn,blendSrcAlpha:Aa,blendDstAlpha:ps,blendEquationAlpha:rn}),this.blendMaterial=new ve({uniforms:bn.clone(Pa.uniforms),vertexShader:Pa.vertexShader,fragmentShader:Pa.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:ic,blendSrc:va,blendDst:ps,blendEquation:rn,blendSrcAlpha:Aa,blendDstAlpha:ps,blendEquationAlpha:rn}),this.fsQuad=new ai(null),this.originalClearColor=new Pt,this.setGBuffer(r?r.depthTexture:void 0,r?r.normalTexture:void 0),a!==void 0&&this.updateGtaoMaterial(a),o!==void 0&&this.updatePdMaterial(o)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this.fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(t,e){t!==void 0?(this.depthTexture=t,this.normalTexture=e,this._renderGBuffer=!1):(this.depthTexture=new hs,this.depthTexture.format=si,this.depthTexture.type=ii,this.normalRenderTarget=new Ue(this.width,this.height,{minFilter:Ce,magFilter:Ce,type:on,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);let i=this.normalTexture?1:0,s=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=i,this.gtaoMaterial.defines.DEPTH_SWIZZLING=s,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=i,this.pdMaterial.defines.DEPTH_SWIZZLING=s,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(t){t?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(t.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(t.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(t){t.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=t.radius),t.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=t.distanceExponent),t.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=t.thickness),t.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=t.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),t.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=t.scale),t.samples!==void 0&&t.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=t.samples,this.gtaoMaterial.needsUpdate=!0),t.screenSpaceRadius!==void 0&&(t.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=t.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(t){let e=!1;t.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=t.lumaPhi),t.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=t.depthPhi),t.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=t.normalPhi),t.radius!==void 0&&t.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=t.radius),t.radiusExponent!==void 0&&t.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=t.radiusExponent,e=!0),t.rings!==void 0&&t.rings!==this.pdRings&&(this.pdRings=t.rings,e=!0),t.samples!==void 0&&t.samples!==this.pdSamples&&(this.pdSamples=t.samples,e=!0),e&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=Ec(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(t,e,i){switch(this._renderGBuffer&&(this.overrideVisibility(),this.renderOverride(t,this.normalMaterial,this.normalRenderTarget,7829503,1),this.restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this.renderPass(t,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.renderPass(t,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case n.OUTPUT.Off:break;case n.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=i.texture,this.copyMaterial.blending=pe,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case n.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=pe,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case n.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=pe,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case n.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.renderPass(t,this.depthRenderMaterial,this.renderToScreen?null:e);break;case n.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=pe,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case n.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=i.texture,this.copyMaterial.blending=pe,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.renderPass(t,this.blendMaterial,this.renderToScreen?null:e);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}renderPass(t,e,i,s,r){t.getClearColor(this.originalClearColor);let a=t.getClearAlpha(),o=t.autoClear;t.setRenderTarget(i),t.autoClear=!1,s!=null&&(t.setClearColor(s),t.setClearAlpha(r||0),t.clear()),this.fsQuad.material=e,this.fsQuad.render(t),t.autoClear=o,t.setClearColor(this.originalClearColor),t.setClearAlpha(a)}renderOverride(t,e,i,s,r){t.getClearColor(this.originalClearColor);let a=t.getClearAlpha(),o=t.autoClear;t.setRenderTarget(i),t.autoClear=!1,s=e.clearColor||s,r=e.clearAlpha||r,s!=null&&(t.setClearColor(s),t.setClearAlpha(r||0),t.clear()),this.scene.overrideMaterial=e,t.render(this.scene,this.camera),this.scene.overrideMaterial=null,t.autoClear=o,t.setClearColor(this.originalClearColor),t.setClearAlpha(a)}setSize(t,e){this.width=t,this.height=e,this.gtaoRenderTarget.setSize(t,e),this.normalRenderTarget.setSize(t,e),this.pdRenderTarget.setSize(t,e),this.gtaoMaterial.uniforms.resolution.value.set(t,e),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(t,e),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}overrideVisibility(){let t=this.scene,e=this._visibilityCache;t.traverse(function(i){e.set(i,i.visible),(i.isPoints||i.isLine)&&(i.visible=!1)})}restoreVisibility(){let t=this.scene,e=this._visibilityCache;t.traverse(function(i){let s=e.get(i);i.visible=s}),e.clear()}generateNoise(t=64){let e=new Ia,i=t*t*4,s=new Uint8Array(i);for(let a=0;a<t;a++)for(let o=0;o<t;o++){let l=a,c=o;s[(a*t+o)*4]=(e.noise(l,c)*.5+.5)*255,s[(a*t+o)*4+1]=(e.noise(l+t,c)*.5+.5)*255,s[(a*t+o)*4+2]=(e.noise(l,c+t)*.5+.5)*255,s[(a*t+o)*4+3]=(e.noise(l+t,c+t)*.5+.5)*255}let r=new us(s,t,t,Je,vn);return r.wrapS=an,r.wrapT=an,r.needsUpdate=!0,r}};sr.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};var ju={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};var Da=class extends $e{constructor(){super();let t=ju;this.uniforms=bn.clone(t.uniforms),this.material=new fa({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new ai(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},Kt.getTransfer(this._outputColorSpace)===ne&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===sc?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===rc?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ac?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===oc?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===lc?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===$s&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};window.qrcode=of.default;var vv="data:image/png;base64,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",he=.01,cr=1.04,lf=[["Red","#d42a1f"],["Orange","#e8641c"],["Yellow","#efbf2a"],["Green","#2e7d3c"],["Royal","#2350b8"],["Navy","#1f2b4d"],["Black","#1d1d20"],["Grey","#8c8e92"],["White","#efeee9"],["Kraft","#bd9665"],["Olive","#a2ad48"]],xv=[["Black","#1b1c20"],["Match fabric","match"],["White","#eceae4"],["Navy","#1f2b4d"],["Blue","#2b4db5"],["Red","#ec5534"]],cf=[["Black","#1a1a1a"],["Dark grey","#4a4a4c"],["Grey","#7a7a7c"],["White","#f4f3ef"],["Gold","#c49a3c"],["Silver","#a9adb2"],["KOBAGS green","#7d9c44"],["Green","#4c8a3f"],["Dark green","#2f3b1c"],["Orange","#e2683a"],["Red","#d33a2c"],["Maroon","#7a1f18"],["Teal","#2fa58a"],["Navy","#1f2b4d"]],Dc={"sans-900":["Montserrat",900,"Montserrat Black"],"sans-800":["Montserrat",800,"Montserrat Extra Bold"],"sans-700":["Montserrat",700,"Montserrat Bold"],"sans-600":["Montserrat",600,"Montserrat Semi Bold"],"sans-500":["Montserrat",500,"Montserrat Medium"],"sans-300":["Montserrat",300,"Montserrat Light"],"cond-700":["Oswald",700,"Oswald Bold (condensed)"],"script-700":["Dancing Script",700,"Script"],"serif-700":["Playfair Display",700,"Serif Bold"]},re={box:{name:"Box bag",fill:.28,sub:"Side gusset \xB7 welded handles",gusset:"side",handles:"loop",strap:"webbing",hem:3.2,py:.51,ps:.85,handle:"#1b1c20",sizes:[["XS",20,26,12,"3,800"],["S",25,26,12,"3,300"],["M",32,29.5,15,"5,300"],["L",40,38.5,17,"4,400"],["XL",47,42,20,"3,800"]]},handle:{name:"Handle bag",fill:.12,sub:"Bottom gusset \xB7 fabric loop handles",gusset:"bottom",handles:"loop",strap:"fabric",close:.35,hem:3,py:.53,ps:.8,handle:"match",sizes:[["XS",20,25,5,"5,000"],["S",25,29.5,5,"4,000"],["M",35,33,8,"2,800"],["L",45,42,10,"4,000"],["XL",55,44.5,15,"\u22483,500"]]},dcut:{name:"D-cut bag",fill:.08,sub:"Die-cut handle with reinforcement patch",gusset:"bottom",handles:"dcut",close:.85,hem:0,py:.6,ps:.72,sizes:[["XS",20,25,0,"5,000"],["S",25,27.5,5,"4,000"],["M",35,31,8,"2,800"],["L",45,39,10,"4,000"],["XL",55,44.5,10,"\u22483,500"]]},tshirt:{name:"T-shirt bag",fill:.15,sub:"Vest handles \xB7 side gusset",gusset:"side",handles:"tshirt",hem:0,py:.68,ps:.66,sizes:[["S",27,40,12,"5,000"],["M",27,50,12,"4,000"],["L",32,60,17,"3,300"]]},bottle:{name:"Bottle bag",sub:"Side gusset \xB7 die-cut handle",gusset:"side",handles:"dcut",hem:0,topFold:.97,foldPow:1,fill:.2,sizes:[["Std",14,38,9,"on request"]]},string:{name:"String bag",fill:.12,sub:"Drawstring backpack \xB7 cord channel",gusset:"bottom",handles:"string",close:.6,hem:3,py:.55,ps:.72,handle:"#1b1c20",sizes:[["XS",20,27,5,"5,000"],["S",25,32.5,5,"4,000"],["M",35,36,8,"2,800"],["L",45,45,10,"4,000"],["XL",55,47.5,15,"\u22483,500"]]}},Q={type:"box",size:"XS",W:20,H:26,D:12,hem:3.2,drop:12,full:.35,pose:"upright",strap:"fabric",bag:"#d42a1f",handle:"#1b1c20"},Oa=document.getElementById("stage"),hi=!0,Pe=new oa({antialias:!0,preserveDrawingBuffer:!0});Pe.setPixelRatio(Math.min(devicePixelRatio,innerWidth<760?1.5:2));Pe.outputColorSpace=Ve;Pe.toneMapping=$s;Pe.shadowMap.enabled=!0;Pe.shadowMap.type=nc;Oa.prepend(Pe.domElement);var en=new Zs,yv=new cs(Pe);function _v(){let n=new Zs,t=new ie(new Ci(12,8,12),new Gn({color:11842744,side:Re}));t.position.y=3,n.add(t);let e=new ie(new Wn(12,12),new Gn({color:9079436}));e.rotation.x=-Math.PI/2,e.position.y=-.98,n.add(e);let i=(s,r,a,o,l,c)=>{let h=new ie(new Wn(s,r),new Gn({color:new Pt(a,a,a),side:Fe}));h.position.set(o,l,c),h.lookAt(0,.4,0),n.add(h)};return i(3.4,2.6,6,-2.6,2.8,2.6),i(2.6,2.2,2.6,3.2,1.4,2.4),i(.8,4.2,5,2.6,2,-2.8),i(.8,4.2,4,-2.8,2,-2.4),i(5,5,1.2,0,6.8,0),yv.fromScene(n,.02).texture}en.environment=_v();en.environmentIntensity=.7;var ze=new Be(30,1,.01,20),tn=new Sa(ze,Pe.domElement);tn.enableDamping=!0;tn.minDistance=.25;tn.maxDistance=3;tn.maxPolarAngle=Math.PI*.51;var ui=new pa(16774892,1.25);ui.castShadow=!0;ui.shadow.mapSize.set(2048,2048);ui.shadow.bias=-3e-4;ui.shadow.normalBias=.0015;Object.assign(ui.shadow.camera,{left:-.45,right:.45,top:.6,bottom:-.3,near:.1,far:3});en.add(ui,ui.target);var qc=new ie(new Wn(6,6),new ua({opacity:.2}));qc.rotation.x=-Math.PI/2;qc.receiveShadow=!0;en.add(qc);var Mv=(()=>{let n=document.createElement("canvas");n.width=n.height=256;let t=n.getContext("2d");for(let s=18;s>=0;s--){let r=40+s*4.2,a=18+s*4;t.fillStyle=`rgba(0,0,0,${.075})`,t.beginPath(),t.roundRect(r,r,256-2*r,256-2*r,a),t.fill()}let e=new yn(n),i=new ie(new Wn(1,1),new Gn({map:e,transparent:!0,depthWrite:!1,color:0,opacity:.85}));return i.rotation.x=-Math.PI/2,i.position.y=1e-4,i.renderOrder=1,en.add(i),i})();function Uc(n){return getComputedStyle(document.documentElement).getPropertyValue(n).trim()}function Yc(){en.background=new Pt(Uc("--stage")||"#e9e7e3").lerp(new Pt(16777215),.12),hi=!0}Yc();matchMedia("(prefers-color-scheme: dark)").addEventListener("change",Yc);new MutationObserver(Yc).observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]});var ln=(n,t,e)=>{let i=Math.min(1,Math.max(0,(e-n)/(t-n)));return i*i*(3-2*i)};function Ua(n,t,e){let i=Math.sin(n*127.1+t*311.7+e*74.7)*43758.5453;return i-Math.floor(i)}function Li(n,t,e){let i=Math.floor(n),s=Math.floor(t),r=n-i,a=t-s,o=r*r*(3-2*r),l=a*a*(3-2*a),c=Ua(i,s,e),h=Ua(i+1,s,e),u=Ua(i,s+1,e),d=Ua(i+1,s+1,e);return(c+(h-c)*o+(u-c)*l+(c-h-u+d)*o*l)*2-1}var Lc=(n,t,e)=>Li(n,t,e)*.6+Li(n*2.1,t*2.1,e+3)*.3+Li(n*4.3,t*4.3,e+7)*.1;function Kc(){let{W:n,H:t,D:e}=Q,i=2,s=[i,i,e,t],r=[2*i+e,i,n,t],a=[3*i+e+n,i,e,t],o=[4*i+2*e+n,i,n,t],l=[r[0],2*i+t,n,e];return{left:s,front:r,right:a,back:o,bottom:l,AW:5*i+2*e+2*n,AH:3*i+t+e}}var kt=Kc();function bs(n){let t=re[Q.type],e=Q.D/2,i=Q.H;if(t.gusset==="bottom")return{d:e*(1-ln(0,hf(),n)),s:0};let s=Math.min(e,i*.45),r=(t.topFold??.82-.6*Q.full)*Math.pow(ln(s,i,n),t.foldPow??1.4);if(t.handles==="tshirt"){let o=Ss().yb,l=(.5+3*Q.full)*ln(0,i*.18,n)*(1-ln(i*.3,o-1,n)),c=.12+Math.min(l,e*.9);return{d:c,s:Math.sqrt(Math.max(e*e-c*c,0))}}let a=e*Math.min(r,1);return{d:Math.max(Math.sqrt(Math.max(e*e-a*a,0)),.12),s:a}}function hf(){return Math.min(Q.H*.5,Math.max(Q.D*1.25,2))}function Ss(){let{W:n,H:t,D:e}=Q,i=Math.min(n*.4,Math.max(e/2+.8,n*.29)),s=n/2-i;return{hw:i,c:s,yb:t*.73,r:Math.min(s*.35,2.5)}}function Ba(){let{W:n}=Q;return Q.type==="bottle"?{w:n*.5,h:2.4,top:2.2,pad:1}:{w:Math.min(9,n*.62),h:3,top:2.6,pad:1.4}}function hr(n,t,e){let{W:i,H:s,hem:r,full:a}=Q,o=re[Q.type],l=1-Math.pow(2*n/i,2),c=Math.sin(Math.PI*Math.min(1,Math.max(0,t/s))),h=ln(0,1.4,i/2-Math.abs(n)),u=o.handles==="tshirt"?1-ln(Ss().yb-5,Ss().yb-.5,t):1,d=(.12+1.3*a)*l*Math.pow(c,.8)*u,f=((.3-.18*a)*Lc(n*.15,t*.07,e)*l*c+.035*Lc(n*.7,t*.5,e+20)*l*c)*u,A=Math.min(Q.D/2,s*.45),y=o.gusset==="side"&&o.handles!=="tshirt"?-.07*Math.exp(-(((t-A)/.3)**2))*l:0,p=0,m=Math.min(s*.42,11),M=Math.hypot(.5,1);for(let _ of[-1,1]){let P=-_*.5/M,S=-1/M,w=n-_*i/2,T=t-(s-.4),C=w*P+T*S;if(C>0&&C<m){let g=w*-S+T*P;p-=.24*(1-.7*a)*Math.exp(-((g/.8)**2))*Math.sin(Math.PI*C/m)}}let x=r>0?(o.handles==="string"?.22:.05)*ln(s-r-.06,s-r+.06,t):0;if(o.gusset==="bottom"){let _=bs(t).d,P=Q.D/2,S=Math.pow(Math.max(l,0),.6),w=(.3+2*a)*S*ln(0,3,t)*(.5+.5*c),T=1-(o.close||0)*(1-.5*a)*ln(s*.45,s,t);return(_+(P-_)*S+w)*T+.1*S*ln(0,3,t)+f+x*h}return bs(t).d+d+f+y+((o.handles==="tshirt"?0:p)+x)*h}function La(n,t,e,i){let s=(n+1)*(t+1),r=new Float32Array(s*3),a=new Float32Array(s*2),o=new Float32Array(s*2),l=new Float32Array(s*3),c=0;for(let p=0;p<=t;p++)for(let m=0;m<=n;m++,c++){let M=e(m/n,p/t);r[c*3]=M.p[0]*he,r[c*3+1]=M.p[1]*he,r[c*3+2]=M.p[2]*he,a[c*2]=M.a[0]/kt.AW,a[c*2+1]=1-M.a[1]/kt.AH,o[c*2]=M.a[0]/cr,o[c*2+1]=-M.a[1]/cr;let x=.5+.5*Math.pow(Math.min(1,Math.max(0,M.p[1]/Q.H)),.75);l[c*3]=l[c*3+1]=l[c*3+2]=x}let h=[],u=(p,m)=>Math.abs(r[p*3]-r[m*3])+Math.abs(r[p*3+1]-r[m*3+1])+Math.abs(r[p*3+2]-r[m*3+2])<1e-9,d=(p,m,M)=>{!u(p,m)&&!u(m,M)&&!u(M,p)&&h.push(p,m,M)};for(let p=0;p<t;p++)for(let m=0;m<n;m++){let M=p*(n+1)+m,x=M+1,_=M+n+1,P=_+1;d(M,x,P),d(M,P,_)}let f=new se;f.setAttribute("position",new _e(r,3)),f.setAttribute("uv",new _e(a,2)),f.setAttribute("uv1",new _e(o,2)),f.setAttribute("color",new _e(l,3)),f.setIndex(h),f.computeVertexNormals();let A=f.getAttribute("normal"),y=Math.floor(t/2)*(n+1)+Math.floor(n/2);if(A.getX(y)*i[0]+A.getY(y)*i[1]+A.getZ(y)*i[2]<0){for(let p=0;p<h.length;p+=3){let m=h[p+1];h[p+1]=h[p+2],h[p+2]=m}f.setIndex(h),f.computeVertexNormals()}return f}function bv(){let{W:n,H:t,D:e}=Q,i=e/2,s=110,r=[];r.push(La(80,s,(l,c)=>{let h=-n/2+l*n,u=c*t;return{p:[h,u,hr(h,u,1)],a:[kt.front[0]+l*n,kt.front[1]+(1-c)*t]}},[0,0,1])),r.push(La(80,s,(l,c)=>{let h=n/2-l*n,u=c*t;return{p:[h,u,-hr(h,u,2)],a:[kt.back[0]+l*n,kt.back[1]+(1-c)*t]}},[0,0,-1]));let a=re[Q.type].gusset==="bottom"?Math.min(s,Math.ceil(hf()/(t/s))):s;if(e>=.5)for(let l of[1,-1])for(let c of["f","b"]){let h=l>0?kt.right:kt.left;r.push(La(16,a,(u,d)=>{let f=d*a*t/s,{d:A,s:y}=bs(f),p=((.12+.35*Q.full)*(1-.6*y/i)*Math.sin(Math.PI*u)+.06*Lc(u*3,f*.3,l*3+(c==="f"?1:2))*Math.sin(Math.PI*u))*(A/i)*ln(0,2.5,f),m=[l*(n/2-y*u+p),f,(c==="f"?A:-A)*(1-u)],M=c==="f"?u*i:e-u*i;return{p:m,a:[h[0]+(l>0?M:e-M),h[1]+t-f]}},[l,0,0]))}let o=re[Q.type].handles==="tshirt"?bs(0).d:i;return e>=.5&&r.push(La(80,re[Q.type].handles==="tshirt"?2:32,(l,c)=>({p:[-n/2+l*n,0,o-c*2*o],a:[kt.bottom[0]+l*n,kt.bottom[1]+c*e]}),[0,-1,0])),wa(r)}function jc(){return Math.min(.28*Q.W,Q.W/2-2,6.2)}function Sv(n){let{W:t,H:e,hem:i,drop:s}=Q,r=jc(),a=Q.strap!=="webbing",o=2.5,l=a?.075:.06,c=Q.pose==="relaxed"?n>0?.62:.85:.1,h=Z=>n*(bs(Math.min(Z,e)).d-.2),u=(Z,V)=>{if(V<=e)return new O(Z,V,h(V));let $=V-e,rt=c*Math.pow(Math.min(1,$/s),.75);return new O(Z,e+$*Math.cos(rt),h(e)+n*$*Math.sin(rt))},d=e-i+.45,f=Q.pose==="relaxed"?.6:0,A=Q.pose==="relaxed"?.74:.88,y=new Ri([u(-r,d),u(-r,e-.3),u(-r-f,e+.3*s),u(-r*A,e+.84*s),u(0,e+s),u(r*A,e+.84*s),u(r+f,e+.3*s),u(r,e-.3),u(r,d)],!1,"centripetal"),p=200,m=y.getSpacedPoints(p),M=14,x=new O(0,-Math.sin(c),n*Math.cos(c)),_=[];for(let Z=0;Z<=M;Z++){let V=Math.PI/2+Z/M*Math.PI*2,$=Math.cos(V),rt=Math.sin(V);_.push([Math.sign($)*Math.abs($)**.35,Math.sign(rt)*Math.abs(rt)**.7])}let P=[],S=[],w=[],T=[],C=[],g=new O,v=new O,I=new O,B=new O,U=new O,z=0;for(let Z=0;Z<=p;Z++){let V=m[Z];g.subVectors(m[Math.min(p,Z+1)],m[Math.max(0,Z-1)]).normalize(),Z>0&&(z+=V.distanceTo(m[Z-1])),v.crossVectors(x,g).normalize(),I.copy(x).addScaledVector(g,-x.dot(g)).normalize();let $=V.y>e?Math.hypot(V.y-e,V.z-h(e)):0,rt=.2*Math.sin($*.32+n*1.7)*ln(.08,.45,$/s);B.copy(v).multiplyScalar(Math.cos(rt)).addScaledVector(I,Math.sin(rt)),U.crossVectors(g,B).normalize();for(let[ot,Tt]of _)P.push((V.x+B.x*ot*o/2+U.x*Tt*l)*he,(V.y+B.y*ot*o/2+U.y*Tt*l)*he,(V.z+B.z*ot*o/2+U.z*Tt*l)*he),w.push(z,(ot+1)/2),T.push(z/cr,(ot*o/2+(Tt<0?o:0))/cr);if(Z<p)for(let ot=0;ot<M;ot++){let Tt=Z*(M+1)+ot,Bt=Tt+M+1;C.push(Tt,Bt,Tt+1,Tt+1,Bt,Bt+1)}}let k=new se;return k.setAttribute("position",new ce(P,3)),k.setAttribute("uv",new ce(w,2)),k.setAttribute("uv1",new ce(T,2)),k.setIndex(C),k.computeVertexNormals(),k}function wv(){let{W:n,H:t,D:e}=Q,i=re[Q.type],s=t-.02,{d:r,s:a}=bs(s),o=i.gusset==="side"&&e>=.5,l=[[],[]];for(let c=0;c<=60;c++){let h=-n/2+n*c/60;l[0].push([h,s,hr(h,s,1)]),l[1].push([h,s,-hr(h,s,2)])}if(o)for(let c of[1,-1])for(let h of[1,-1]){let u=[];for(let d=0;d<=8;d++){let f=d/8;u.push([c*(n/2-a*f),s,h*r*(1-f)])}l.push(u)}return wa(l.map(c=>{let h=new Ri(c.map(([u,d,f])=>new O(u*he,d*he,f*he)),!1,"centripetal");return new Qs(h,c.length*2,.065*he,6,!1)}))}function Ev(n){let{W:t,H:e,hem:i}=Q,s=n*(t/2-1.6),r=1.6,a=-(hr(s,r,2)+.25),o=[[n*(t/2-.2),e-i/2,0],[n*(t/2+.9),e-i/2-1.4,-.3],[n*(t/2+1.9),e*.62,-1.2],[n*(t/2+1.5),e*.3,-1.9],[n*(t/2-.3),2.4,a-.7],[s,r,a]].map(([f,A,y])=>new O(f*he,A*he,y*he)),l=new Ri(o,!1,"centripetal"),c=new Qs(l,180,.22*he,10,!1),h=c.getAttribute("uv"),u=l.getLength()/he;for(let f=0;f<h.count;f++)h.setX(f,h.getX(f)*u);let d=new ha(.42*he,16,12);return d.translate(s*he,r*he,(a-.2)*he),wa([c.toNonIndexed(),d.toNonIndexed()])}function uf(n,t,e,i){let s=document.createElement("canvas");s.width=t,s.height=e;let r=s.getContext("2d"),a=r.createImageData(t,e);for(let o=0;o<e;o++)for(let l=0;l<t;l++){let c=(n[o*t+(l+1)%t]-n[o*t+(l-1+t)%t])*i,h=(n[(o+1)%e*t+l]-n[(o-1+e)%e*t+l])*i,u=Math.hypot(c,h,1),d=(o*t+l)*4;a.data[d]=(-c/u*.5+.5)*255,a.data[d+1]=(h/u*.5+.5)*255,a.data[d+2]=(1/u*.5+.5)*255,a.data[d+3]=255}return r.putImageData(a,0,0),s}function Tv(){let t=new Float32Array(65536),e=7,i=8,s=256/e,r=256/i,a=s*.26,o=a;for(let c=0;c<256;c++)for(let h=0;h<256;h++){let u=0;for(let d=-1;d<=i;d++){let f=(d+.5)*r,A=d&1?s/2:0;if(!(Math.abs(c-f)>r))for(let y=-1;y<=e;y++){let p=(y+.5)*s+A,m=(h-p)/a,M=(c-f)/o;u-=Math.exp(-(m*m+M*M))}}t[c*256+h]=u+(Math.random()-.5)*.35}let l=new yn(uf(t,256,256,1.6));return l.wrapS=l.wrapT=an,l.channel=1,l.anisotropy=8,l}function Cv(){let e=new Float32Array(10240),i=document.createElement("canvas");i.width=64,i.height=160;let s=i.getContext("2d"),r=s.createImageData(64,160);for(let l=0;l<160;l++)for(let c=0;c<64;c++){let h=l<9||l>150,u=l<160/2?1:-1,d=h?.5+.5*Math.sin(2*Math.PI*c/64*12):.5+.5*Math.sin(2*Math.PI*(c/64*7+u*l/160*14));e[l*64+c]=d+(Math.random()-.5)*.15;let f=(.78+.22*d)*255,A=(l*64+c)*4;r.data[A]=r.data[A+1]=r.data[A+2]=f,r.data[A+3]=255}s.putImageData(r,0,0);let a=new yn(i);a.colorSpace=Ve;let o=new yn(uf(e,64,160,1.2));for(let l of[a,o])l.wrapS=an,l.wrapT=Fn,l.anisotropy=8;return{map:a,nm:o}}function Rv(){let t=document.createElement("canvas");t.width=t.height=512;let e=t.getContext("2d");e.fillStyle="#808080",e.fillRect(0,0,512,512),e.lineWidth=1,e.lineCap="round";for(let i=0;i<9e3;i++){let s=Math.random()*512,r=Math.random()*512,a=Math.random()*Math.PI*2,o=6+Math.random()*26,l=(Math.random()-.5)*.9;e.strokeStyle=Math.random()<.5?"rgba(255,255,255,0.10)":"rgba(0,0,0,0.10)",e.beginPath();for(let c of[-512,0,512])for(let h of[-512,0,512])e.moveTo(s+c,r+h),e.quadraticCurveTo(s+c+Math.cos(a+l)*o/2,r+h+Math.sin(a+l)*o/2,s+c+Math.cos(a)*o,r+h+Math.sin(a)*o);e.stroke()}return t}function Pv(){let t=document.createElement("canvas");t.width=t.height=256;let e=t.getContext("2d"),i=e.createImageData(256,256);for(let s=0;s<256;s++)for(let r=0;r<256;r++){let a=128+70*(Li(r/16,s/16,11)*.5+Li(r/4,s/4,5)*.5),o=(s*256+r)*4;i.data[o]=i.data[o+1]=i.data[o+2]=a,i.data[o+3]=255}return e.putImageData(i,0,0),t}var ys=document.createElement("canvas"),ws=new yn(ys);ws.colorSpace=Ve;ws.anisotropy=Pe.capabilities.getMaxAnisotropy();var Zu=Pv();function Iv(n){let t=new Pt(n),e=.2126*t.r+.7152*t.g+.0722*t.b,i=e<.08?1.7:.78,s=Math.min(1,t.r*i+(e<.08?.03:0)),r=Math.min(1,t.g*i+(e<.08?.03:0)),a=Math.min(1,t.b*i+(e<.08?.03:0));return`rgb(${s*255|0},${r*255|0},${a*255|0})`}function Ee(n,t,e,i,s,r){let a=Math.hypot(s-e,r-i),o=(s-e)/a,l=(r-i)/a,c=-l,h=o,u=.19,d=.3;n.beginPath();for(let A=u/2;A<a;A+=u){let y=e+o*A,p=i+l*A;n.moveTo((y-c*d/2)*t,(p-h*d/2)*t),n.lineTo((y+c*d/2)*t,(p+h*d/2)*t)}n.lineWidth=.055*t,n.stroke();let f=n.globalAlpha;n.globalAlpha=f*.35,n.beginPath(),n.moveTo(e*t,i*t),n.lineTo(s*t,r*t),n.lineWidth=.03*t,n.stroke(),n.globalAlpha=f}function Dv(n,t,e,i,s){let r=s/2,a=s*.16;n.lineWidth=.05*t,n.beginPath();for(let l=0;l<6;l++){let c=-r*.6+l*(s*.6/5);for(let[h,u,d,f]of[[c,-r,0,1],[c,r,0,-1],[-r,c,1,0],[r,c,-1,0]])n.moveTo((e+h)*t,(i+u)*t),n.lineTo((e+h+d*a)*t,(i+u+f*a)*t)}for(let[l,c]of[[-1,-1],[1,-1],[-1,1],[1,1]])n.moveTo((e+l*r)*t,(i+c*r)*t),n.lineTo((e+l*r*.72)*t,(i+c*r*.72)*t);n.stroke();let o=s*.24;n.beginPath(),n.arc(e*t,i*t,o*t,0,Math.PI*2),n.lineWidth=.04*t,n.stroke(),n.beginPath();for(let l=0;l<5;l++){let c=l*Math.PI*2/5-Math.PI/2;n.ellipse((e+Math.cos(c)*o*.45)*t,(i+Math.sin(c)*o*.45)*t,o*.42*t,o*.2*t,c,0,Math.PI*2)}n.lineWidth=.03*t,n.stroke()}var le={front:[],back:[]},xe="front",fi=null,Rs=1,Es=new Map,li={},ci=new Map,Qu=new WeakMap;function Ju(n,t){let e=Qu.get(n);if(e||Qu.set(n,e=new Map),!e.has(t)){let i=document.createElement("canvas");i.width=n.width,i.height=n.height;let s=i.getContext("2d");s.fillStyle=t,s.fillRect(0,0,i.width,i.height),s.globalCompositeOperation="destination-in",s.drawImage(n,0,0),e.set(t,i)}return e.get(t)}function Uv(n){let t=`t|${n.style}|${n.track||0}|${n.text}`;if(ci.has(t))return ci.get(t);let[e,i]=Dc[n.style]||Dc["sans-800"],s=160,r=(n.track||0)*s,a=i>=800?900:i>=500?800:700,o=(n.text||" ").split(`
`).map(y=>y.split("**").map((p,m)=>[p,m%2?a:i]).filter(([p])=>p)),l=document.createElement("canvas"),c=l.getContext("2d"),h=y=>{c.font=`${y} ${s}px "${e}", "Helvetica Neue", Arial, sans-serif`,"letterSpacing"in c&&(c.letterSpacing=r+"px")},u=y=>y.reduce((p,[m,M])=>(h(M),p+c.measureText(m).width),0)||s*.3,d=o.map(u),f=s*1.12,A=s*.14;return l.width=Math.ceil(Math.max(...d)+A*2),l.height=Math.ceil(o.length*f+A),c.fillStyle="#fff",c.textBaseline="middle",o.forEach((y,p)=>{let m=(l.width-d[p])/2+r/2;for(let[M,x]of y)h(x),c.fillText(M,m,A/2+f*(p+.5)),m+=c.measureText(M).width}),ci.set(t,l),l}function Lv(n){let t="q|"+n;if(ci.has(t))return ci.get(t);if(!window.qrcode)return null;let e=window.qrcode(0,"M");e.addData(n||" "),e.make();let i=e.getModuleCount(),s=2,r=16,a=document.createElement("canvas");a.width=a.height=(i+s*2)*r;let o=a.getContext("2d");o.fillStyle="#fff";for(let l=0;l<i;l++)for(let c=0;c<i;c++)e.isDark(l,c)&&o.fillRect((c+s)*r,(l+s)*r,r,r);return ci.set(t,a),a}function ff(n){return n.kind==="text"?Uv(n):n.kind==="qr"?Lv(n.data):n.kind==="logo"?Es.get(n.asset)?.mask||null:li[n.graphic]||null}function Ts(n){let t=ff(n);return[n.w,t?n.w*t.height/t.width:n.w*.4]}var df=n=>n.kind==="qr"?3:1;function Nv(){let n=re[Q.type];if(n.handles==="tshirt")return Q.H-Ss().yb+1;if(n.handles==="dcut"){let t=Ba();return t.top+t.h+t.pad+.6}return Q.hem}function Ps(){let{W:n,H:t}=Q,e=re[Q.type].handles==="tshirt"?2:1.2;return{x0:1,x1:n-1,y0:Nv()+.4,y1:t-e}}function hn(n){let t=Ps(),[e,i]=Ts(n),s=Math.min(1,(t.x1-t.x0)/e,(t.y1-t.y0)/i);s<1&&(n.w*=s,e*=s,i*=s),n.x=Math.min(Math.max(n.x,t.x0+e/2),t.x1-e/2),n.y=Math.min(Math.max(n.y,t.y0+i/2),t.y1-i/2)}var Ov=(()=>{let t=document.createElement("canvas");t.width=t.height=128;let e=t.getContext("2d"),i=128/7,s=128/8;for(let r=-1;r<=8;r++)for(let a=-1;a<=7;a++){let o=(a+.5)*i+(r&1?i/2:0),l=(r+.5)*s,c=e.createRadialGradient(o,l,0,o,l,i*.32);c.addColorStop(0,"rgba(0,0,0,1)"),c.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=c,e.fillRect(o-i,l-s,i*2,s*2)}return t})(),Bv=(()=>{let t=document.createElement("canvas");t.width=t.height=256;let e=t.getContext("2d"),i=e.createImageData(256,256);for(let s=0;s<256;s++)for(let r=0;r<256;r++){let a=Li(r/9,s/9,31)*.55+Li(r/3,s/3,37)*.45,o=(s*256+r)*4;i.data[o+3]=Math.max(0,Math.min(255,(a*.5+.5)**2.2*255))}return e.putImageData(i,0,0),t})(),vs=document.createElement("canvas");function $u(n,t,e,i,s){if(!s.length)return;vs.width=Math.ceil(Q.W*t),vs.height=Math.ceil(Q.H*t);let r=vs.getContext("2d");ur(r,t,0,0,s),r.save(),r.globalCompositeOperation="destination-out";for(let[a,o,l]of[[Ov,cr,.32],[Bv,6,.22]]){let c=r.createPattern(a,"repeat");c.setTransform(new DOMMatrix().translate(-e*t,-i*t).scale(o*t/a.width)),r.globalAlpha=l,r.fillStyle=c,r.fillRect(0,0,vs.width,vs.height)}r.restore(),n.drawImage(vs,e*t,i*t)}function ur(n,t,e,i,s,r=null){let a=n.globalAlpha;for(let o of s){let l=ff(o);if(!l)continue;let[c,h]=Ts(o),u=r?Ju(l,r):null,d=1;u||(o.kind==="logo"&&o.method==="full"?u=Es.get(o.asset).color:(u=Ju(l,o.ink),d=.9)),n.save(),n.globalAlpha=a*d,n.drawImage(u,(e+o.x-c/2)*t,(i+o.y-h/2)*t,c*t,h*t),n.restore()}}var Na=document.createElement("canvas"),oi=document.createElement("canvas"),_s=document.createElement("canvas"),Nc=new yn(Na),Oc=new yn(oi),Cs=new yn(_s),Fv=Rv(),zv="#bd9665",kv=(()=>{let t=document.createElement("canvas");t.width=t.height=512;let e=t.getContext("2d");e.fillStyle="#fff",e.fillRect(0,0,512,512);for(let i=0;i<2600;i++){let s=Math.random()*512,r=Math.random()*512,a=.4+Math.random()**3*2.2,o=120+Math.random()*90;e.fillStyle=`rgba(${o*.75|0},${o*.55|0},${o*.35|0},${.35+Math.random()*.5})`;for(let l of[-512,0,512])for(let c of[-512,0,512])e.beginPath(),e.ellipse(s+l,r+c,a,a*(.4+Math.random()*.6),Math.random()*3,0,Math.PI*2),e.fill()}e.lineWidth=.8,e.strokeStyle="rgba(120,80,45,0.25)";for(let i=0;i<700;i++){let s=Math.random()*512,r=Math.random()*512,a=Math.random()*6.3,o=6+Math.random()*18;e.beginPath(),e.moveTo(s,r),e.lineTo(s+Math.cos(a)*o,r+Math.sin(a)*o),e.stroke()}return t})();function Tc(n,t){let{W:e,H:i,D:s,hem:r}=Q,a=re[Q.type],o=jc(),l=Math.min(2.2,r*.72);for(let c of[kt.front,kt.back]){let[h,u]=c;if(r>0&&Ee(n,t,h,u+r,h+e,u+r),a.handles==="loop")for(let d of[-1,1])Dv(n,t,h+e/2+d*o,u+r*.52,l);if(a.gusset==="bottom"&&(Ee(n,t,h+.5,u,h+.5,u+i),Ee(n,t,h+e-.5,u,h+e-.5,u+i)),a.handles==="tshirt"){let d=Ss();Ee(n,t,h,u+i-1.1,h+e,u+i-1.1),Ee(n,t,h,u+.9,h+d.hw,u+.9),Ee(n,t,h+e-d.hw,u+.9,h+e,u+.9)}}if(s>=.5)for(let c of[kt.left,kt.right]){let[h,u]=c;if(a.gusset==="side"&&a.handles==="tshirt")Ee(n,t,h,u+.9,h+s,u+.9),Ee(n,t,h,u+i-1.1,h+s,u+i-1.1);else if(a.gusset==="side"){let d=u+i-Math.min(s/2,i*.45);r>0&&Ee(n,t,h,u+r,h+s,u+r),Ee(n,t,h+.15,u+r,h+.15,u+i),Ee(n,t,h+s-.15,u+r,h+s-.15,u+i),Ee(n,t,h,d,h+s,d),Ee(n,t,h+s/2,d,h,u+i),Ee(n,t,h+s/2,d,h+s,u+i)}else{let d=Math.min(i*.5,Math.max(s*1.25,2));Ee(n,t,h+s/2,u+i-d,h+s/2,u+i)}}if(s>=.5&&a.handles!=="tshirt"){let[c,h]=kt.bottom;Ee(n,t,c+.4,h,c+.4,h+s),Ee(n,t,c+e-.4,h,c+e-.4,h+s)}if(a.handles==="string"){let[c,h]=kt.back,u=Math.min(4,e*.15);for(let[d,f]of[[c,1],[c+e,-1]])Ee(n,t,d,h+i-u,d+f*u,h+i),n.beginPath(),n.arc((d+f*1.6)*t,(h+i-1.6)*t,.4*t,0,Math.PI*2),n.stroke()}}function pf(n,t,e,i){let s=re[Q.type],{W:r,H:a}=Q;if(n.beginPath(),s.handles==="dcut"){let o=Ba();n.roundRect((e+r/2-o.w/2)*t,(i+o.top)*t,o.w*t,o.h*t,o.h/2*t)}if(s.handles==="tshirt"){let o=Ss(),l=e+r/2,c=i+a-o.yb,h=o.c*.9,u=Math.min(2.4,a*.06),d=Math.min(h/2,u)*.92,f=.35,A=(y,p)=>[y*t,p*t];n.moveTo(...A(l-o.c,i-1)),n.arcTo(...A(l-o.c,c),...A(l-h/2,c),o.r*t),n.arcTo(...A(l-h/2,c),...A(l-h/2,c-u),f*t),n.arcTo(...A(l-h/2,c-u),...A(l,c-u),d*t),n.arcTo(...A(l+h/2,c-u),...A(l+h/2,c),d*t),n.arcTo(...A(l+h/2,c),...A(l+o.c,c),f*t),n.arcTo(...A(l+o.c,c),...A(l+o.c,i-1),o.r*t),n.lineTo(...A(l+o.c,i-1)),n.closePath()}}function Hv(n,t){n.fillStyle="#000";for(let e of[kt.front,kt.back])pf(n,t,e[0],e[1]),n.fill()}var tf=40;function pi(){kt=Kc(),tf=Math.min(40,4e3/kt.AW,4e3/kt.AH);let n=tf,t=Math.round(kt.AW*n),e=Math.round(kt.AH*n),{W:i,hem:s}=Q;if(ys.width!==t||ys.height!==e)for(let f of[ws,Nc,Oc,Cs])f.dispose();ys.width=t,ys.height=e;let r=ys.getContext("2d");r.fillStyle=Q.bag,r.fillRect(0,0,t,e);let a=(f,A,y,p)=>{let m=r.createPattern(f,"repeat");m.setTransform(new DOMMatrix().scale(A)),r.save(),r.globalCompositeOperation=y,r.globalAlpha=p,r.fillStyle=m,r.fillRect(0,0,t,e),r.restore()};if(a(Zu,n/40,"soft-light",.16),a(Fv,n/40,"soft-light",.55),Q.bag===zv&&(a(kv,n/40,"multiply",.3),a(Zu,n/90,"soft-light",.22)),re[Q.type].handles==="dcut"){let f=Ba();r.save(),r.fillStyle="rgba(0,0,0,0.025)";for(let A of[kt.front,kt.back])r.fillRect((A[0]+i/2-f.w/2-f.pad)*n,(A[1]+f.top-f.pad)*n,(f.w+2*f.pad)*n,(f.h+2*f.pad)*n);r.restore()}let o=new Pt(Q.bag).getHSL({}).l,l=o>.75?.3:o>.45?.14:.05;if(re[Q.type].handles==="loop"&&Q.handle!=="match"&&l>.1){let f=jc(),A=2.5;r.save(),r.fillStyle=Q.handle,r.globalAlpha=l*1.25;for(let y of[kt.front,kt.back])for(let p of[-1,1])r.fillRect((y[0]+i/2+p*f-A/2)*n,y[1]*n,A*n,(s-.45)*n);r.restore()}r.save(),r.strokeStyle=Iv(Q.bag),r.lineCap="butt",r.globalAlpha=.6,Tc(r,n),r.restore(),$u(r,n,kt.front[0],kt.front[1],le.front),$u(r,n,kt.back[0],kt.back[1],le.back),ws.needsUpdate=!0,Na.width=t,Na.height=e;let c=Na.getContext("2d");c.fillStyle="#808080",c.fillRect(0,0,t,e),c.fillStyle="#8c8c8c";for(let f of[kt.front,kt.back])c.fillRect(f[0]*n,f[1]*n,i*n,s*n);for(let f of[kt.left,kt.right])c.fillRect(f[0]*n,f[1]*n,Q.D*n,s*n);if(re[Q.type].handles==="dcut"){let f=Ba();for(let A of[kt.front,kt.back])c.fillRect((A[0]+i/2-f.w/2-f.pad)*n,(A[1]+f.top-f.pad)*n,(f.w+2*f.pad)*n,(f.h+2*f.pad)*n)}c.strokeStyle="#3c3c3c",c.lineCap="butt",Tc(c,n),Nc.needsUpdate=!0;let h=.5;oi.width=Math.round(t*h),oi.height=Math.round(e*h);let u=oi.getContext("2d");u.fillStyle="rgb(214,214,214)",u.fillRect(0,0,oi.width,oi.height),u.strokeStyle="rgb(150,150,150)",u.lineCap="butt",Tc(u,n*h),ur(u,n*h,kt.front[0],kt.front[1],le.front,"#a6a6a6"),ur(u,n*h,kt.back[0],kt.back[1],le.back,"#a6a6a6"),Oc.needsUpdate=!0,_s.width=oi.width,_s.height=oi.height;let d=_s.getContext("2d");d.fillStyle="#fff",d.fillRect(0,0,_s.width,_s.height),Hv(d,n*h),Cs.needsUpdate=!0,Af.value=l,dr.transmission=l>.2?.45:l>.1?.26:.06,mf.value=l>.2?.55:l>.1?.32:.08,pr.emissive.set(Q.bag).multiplyScalar(l*.38),hi=!0}var Zc=Tv(),Fa=Cv(),mf={value:.3};function gf(n){n.uniforms.backLight=mf,n.fragmentShader=n.fragmentShader.replace("#include <lights_physical_pars_fragment>",`#include <lights_physical_pars_fragment>
uniform float backLight;
void RE_Direct_Thin( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir,
    const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
  RE_Direct_Physical( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
  float through = saturate( dot( - geometryNormal, directLight.direction ) );
  reflectedLight.directDiffuse += through * directLight.color * material.diffuseColor * backLight;
}
#undef RE_Direct
#define RE_Direct RE_Direct_Thin`)}var dr=new Xn({map:ws,normalMap:Zc,normalScale:new mt(.36,.36),bumpMap:Nc,bumpScale:2.2,roughnessMap:Oc,roughness:1,alphaMap:Cs,alphaTest:.5,sheen:.18,sheenRoughness:.6,sheenColor:16777215,side:Rn,transmission:.1,thickness:0});dr.onBeforeCompile=n=>{gf(n),n.fragmentShader=n.fragmentShader.replace("#include <transmission_fragment>",zt.transmission_fragment.replace("n, v, material.roughness, material.diffuseColor","n, v, material.roughness * 0.5, material.diffuseColor")),n.fragmentShader=n.fragmentShader.replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
#if defined( USE_BUMPMAP ) && defined( USE_NORMALMAP_TANGENTSPACE )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`)};dr.customProgramCacheKey=()=>"bag-outer-bump";var Af={value:.05},pr=new Xn({color:16777215,vertexColors:!0,map:ws,normalMap:Zc,normalScale:new mt(.45,.45),alphaMap:Cs,alphaTest:.5,roughness:.9,sheen:.3,sheenRoughness:.6,side:Re});pr.onBeforeCompile=n=>{gf(n),n.uniforms.showThrough=Af,n.fragmentShader=`uniform float showThrough;
`+n.fragmentShader.replace("#include <map_fragment>",`#ifdef USE_MAP
	diffuseColor.rgb = mix( diffuseColor.rgb, texture2D( map, vMapUv ).rgb * 0.92, showThrough );
#endif`)};pr.customProgramCacheKey=()=>"bag-inner-through";var za=new Xn({map:Fa.map,normalMap:Fa.nm,normalScale:new mt(.9,.9),roughness:.6,sheen:.45,sheenRoughness:.45,sheenColor:9079434,side:Fe}),ef=new Xn({normalMap:Zc,normalScale:new mt(.45,.45),roughness:.9,sheen:.25,sheenRoughness:.6,side:Fe}),Bc=new Xn({map:Fa.map,normalMap:Fa.nm,normalScale:new mt(1.2,1.2),roughness:.7,sheen:.5,sheenRoughness:.4}),Qc=new ei;en.add(Qc);Qc.position.y=4e-4;var di=new ie(new se,dr),qa=new ie(new se,pr),mr=[new ie(new se,za),new ie(new se,za)],Ya=[new ie(new se,Bc),new ie(new se,Bc)],Fc=new Xn({roughness:.82,sheen:.35,sheenRoughness:.5}),Ms=new ie(new se,Fc);di.castShadow=di.receiveShadow=!0;qa.receiveShadow=!0;di.customDepthMaterial=new js({depthPacking:mc,alphaMap:Cs,alphaTest:.5});for(let n of[...mr,...Ya])n.castShadow=n.receiveShadow=!0;Qc.add(di,qa,Ms,...mr,...Ya);function Oi(){pr.color.set(Q.bag).multiplyScalar(.92),Fc.color.set(Q.bag),Fc.sheenColor.set(Q.bag).lerp(new Pt(16777215),.2),dr.sheenColor.set(Q.bag).lerp(new Pt(16777215),.2);let n=Q.handle==="match"?Q.bag:Q.handle;za.color.set(n),ef.color.set(n),Bc.color.set(n),mr.forEach(t=>{t.material=Q.strap==="webbing"?za:ef}),document.documentElement.style.setProperty("--bagc",Q.bag),hi=!0}function Is(){kt=Kc();let n=bv();di.geometry.dispose(),di.geometry=n,qa.geometry=n;let t=re[Q.type];mr.forEach((e,i)=>{e.visible=t.handles==="loop",e.geometry.dispose(),e.geometry=e.visible?Sv(i===0?1:-1):new se}),Ms.visible=re[Q.type].handles!=="tshirt",Ms.geometry.dispose(),Ms.geometry=Ms.visible?wv():new se,Ya.forEach((e,i)=>{e.visible=t.handles==="string",e.geometry.dispose(),e.geometry=e.visible?Ev(i===0?-1:1):new se}),Mv.scale.set(Q.W*he/.69*1.04,Math.max(Q.D,2)*he/.69*1.1,1),pi(),document.getElementById("dimsHud").textContent=`${En(Q.W)} \xD7 ${En(Q.H)} \xD7 ${En(Q.D)} cm`}var En=n=>(Math.round(n*10)/10).toString(),Vv={34:{dir:[.62,.3,.73],ty:.5},front:{dir:[0,.12,1],ty:.5},side:{dir:[1,.12,.02],ty:.5},top:{dir:[.08,1.5,.62],ty:.55},back:{dir:[-.62,.3,-.73],ty:.5}},wn=null;function Gv(n){let t=Vv[n],e=Q.H+(re[Q.type].handles==="loop"?Q.drop*.7:0),i=Math.max(e,Q.W*1.1)*he,s=new O(0,(n==="top"?Q.H*t.ty:e*t.ty)*he,0),r=i/(2*Math.tan(_a.degToRad(ze.fov/2)))*(ze.aspect<1?1.35/ze.aspect:1.35);return{pos:new O(...t.dir).normalize().multiplyScalar(r).add(s),target:s}}function qn(n,t=!0){document.querySelectorAll("#views button").forEach(i=>i.classList.toggle("on",i.dataset.view===n));let e=Gv(n);if(!t||matchMedia("(prefers-reduced-motion: reduce)").matches){ze.position.copy(e.pos),tn.target.copy(e.target),wn=null;return}wn={t0:performance.now(),p0:ze.position.clone(),q0:tn.target.clone(),to:e}}document.getElementById("views").addEventListener("click",n=>{let t=n.target.closest("button");t&&qn(t.dataset.view)});tn.addEventListener("start",()=>{wn=null,document.querySelectorAll("#views button").forEach(n=>n.classList.remove("on"))});function vf(n,t,e,i){let s=document.getElementById(n),r=document.createElement("span");r.className="swname";let a=()=>{s.querySelectorAll(".sw").forEach(l=>l.classList.toggle("on",l.dataset.v===Q[e]));let o=t.find(([,l])=>l===Q[e]);r.textContent=o?o[0]:Q[e]};for(let[o,l]of t){let c=document.createElement("button");c.className="sw",c.dataset.v=l,c.title=o,c.setAttribute("aria-label",o),l!=="match"&&(c.style.background=l),c.onclick=()=>{Q[e]=l,a(),i()},s.appendChild(c)}return s.appendChild(r),a(),a}var Ka=vf("handleSw",xv,"handle",()=>{Oi(),pi(),Ds()}),xf=vf("bagSw",lf,"bag",()=>{Oi(),Ka(),pi(),un(),Ye(),Ds()}),yf={};function Wv(n,t,e,i){let s=document.getElementById(n),r=document.getElementById("o-"+n),a=()=>{r.textContent=e(+s.value)};s.value=Q[t],a(),yf[t]=()=>{s.value=Q[t],a()},s.addEventListener("input",()=>{Q[t]=+s.value,a(),i()})}var _f=()=>Object.values(yf).forEach(n=>n()),Xv=n=>En(n)+" cm";Wv("drop","drop",Xv,Is);function Mf(n){document.querySelectorAll("#tabs button").forEach(t=>{let e=t.dataset.tab===n;t.classList.toggle("on",e),t.setAttribute("aria-selected",e)}),document.querySelectorAll(".pane").forEach(t=>{t.hidden=t.dataset.pane!==n}),document.getElementById("panes").scrollTop=0,n==="design"&&un()}document.getElementById("tabs").addEventListener("click",n=>{let t=n.target.closest("button");t&&Mf(t.dataset.tab)});document.querySelectorAll("[data-go]").forEach(n=>{n.onclick=()=>Mf(n.dataset.go)});function Jc(){document.querySelectorAll("#strapSeg button").forEach(n=>n.classList.toggle("on",n.dataset.v===Q.strap))}document.getElementById("strapSeg").addEventListener("click",n=>{let t=n.target.closest("button");t&&(Q.strap=t.dataset.v,Jc(),Oi(),Is(),Ds())});document.getElementById("poseSeg").addEventListener("click",n=>{let t=n.target.closest("button");t&&(Q.pose=t.dataset.v,document.querySelectorAll("#poseSeg button").forEach(e=>e.classList.toggle("on",e===t)),Is())});var zc=document.getElementById("sizeSeg"),qv=document.getElementById("moq");function Yv(){let n=re[Q.type];zc.querySelectorAll("button").forEach(i=>i.classList.toggle("on",i.dataset.v===Q.size));let t=n.sizes.find(i=>i[0]===Q.size),e=/\d/.test(t[4])?t[4]+" pcs":t[4];qv.innerHTML=`${En(t[1])} \xD7 ${En(t[2])} \xD7 ${En(t[3])} cm \xB7 minimum order <b>${e}</b>`,document.getElementById("sumType").textContent=`${n.name} \xB7 ${t[0]}`,document.getElementById("sumDims").textContent=`${En(t[1])} \xD7 ${En(t[2])} \xD7 ${En(t[3])} cm`,document.getElementById("sumMoq").textContent=`Minimum order ${e}`}function ka(n){let t=re[Q.type].sizes.find(s=>s[0]===n);if(!t)return;let e=Q.W,i=Q.H;Object.assign(Q,{size:n,W:t[1],H:t[2],D:t[3]}),re[Q.type].handles==="loop"&&(Q.drop=Math.min(30,Math.max(10,Math.round(Q.H*.46))));for(let s of["front","back"])for(let r of le[s])r.x*=Q.W/e,r.y*=Q.H/i,r.w*=Q.W/e,hn(r);_f(),Yv(),Is(),un(),Ye(),qn(xe==="back"?"back":"34")}function gr(n){let t=re[n];Q.type=n,document.querySelectorAll("#typeSeg button").forEach(s=>s.classList.toggle("on",s.dataset.v===n)),document.getElementById("typeSub").textContent=t.sub,Q.hem=t.hem,Q.full=t.fill??.2,t.handle&&(Q.handle=t.handle,Ka(),Oi()),zc.innerHTML="";for(let[s,r,a,o]of t.sizes){let l=document.createElement("button");l.dataset.v=s,l.textContent=s,l.title=`${s}: ${r} \xD7 ${a} \xD7 ${o} cm`,l.onclick=()=>{ka(s),Ds()},zc.appendChild(l)}let e=t.handles==="loop",i=t.handles==="string";document.getElementById("handlesSec").hidden=!(e||i),document.getElementById("handlesTitle").textContent=i?"Cords":"Handles",document.getElementById("poseSeg").hidden=!e,document.getElementById("dropRow").hidden=!e,ka(t.sizes.some(s=>s[0]===Q.size)?Q.size:t.sizes[0][0])}document.getElementById("typeSeg").addEventListener("click",n=>{let t=n.target.closest("button");t&&(gr(t.dataset.v),Ds())});var kc=document.getElementById("envRot"),Hc=document.getElementById("expo");function $c(){let n=+kc.value*Math.PI/180;en.environmentRotation.y=n,ui.position.set(Math.sin(n-Math.PI/4)*1.25,1,Math.cos(n-Math.PI/4)*1.25),Pe.toneMappingExposure=+Hc.value,document.getElementById("o-envRot").textContent=kc.value+"\xB0",document.getElementById("o-expo").textContent=(+Hc.value).toFixed(2),hi=!0}kc.oninput=$c;Hc.oninput=$c;$c();function Ha(n){return new Promise((t,e)=>{let i=new Image;i.onload=()=>t(i),i.onerror=e,i.src=n})}function Kv(n,t){let e=Math.min(1,2400/Math.max(n.width,n.height)),i=Math.max(1,Math.round(n.width*e)),s=Math.max(1,Math.round(n.height*e)),r=document.createElement("canvas");r.width=i,r.height=s;let a=r.getContext("2d");a.drawImage(n,0,0,i,s);let o=a.getImageData(0,0,i,s),l=o.data,c=0,h=new Float32Array(i*s);for(let A=0;A<i*s;A++)l[A*4+3]<250&&c++,h[A]=.2126*l[A*4]+.7152*l[A*4+1]+.0722*l[A*4+2];let u=document.createElement("canvas");u.width=i,u.height=s;let d=u.getContext("2d"),f=d.createImageData(i,s);if(c>i*s*.02)for(let A=0;A<i*s;A++)f.data[A*4+3]=l[A*4+3];else{let A=Float32Array.from(h).sort(),y=A[Math.floor(A.length*.5)],p=y>127,m=p?A[Math.floor(A.length*.02)]:A[Math.floor(A.length*.98)],M=(y+m)/2;for(let x=0;x<i*s;x++){let _=Math.min(1,Math.max(0,(p?M-h[x]:h[x]-M)/40+.5));f.data[x*4+3]=_*255,l[x*4+3]=_*255}a.putImageData(o,0,0)}return d.putImageData(f,0,0),{mask:u,color:r,name:t}}var Le=(n,t)=>[{text:"ENHANCE",style:"sans-600",track:.05,fx:.5,fy:.35,fw:.58,ink:n},{kind:"graphic",graphic:"your",fx:.5,fy:.452,fw:.38,ink:n},{text:"BRAND",style:"sans-800",track:.02,fx:.5,fy:.565,fw:.64,ink:n},{text:"WITH **KOBAGS**",style:"sans-500",track:.04,fx:.5,fy:.66,fw:.4,ink:n},{text:"www.kobags-group.com",style:"sans-500",track:.02,fx:.5,fy:.712,fw:.28,ink:t}],Cc=(n,t)=>[{text:"PUT YOUR",style:"sans-800",fx:.5,fy:.36,fw:.42,ink:n},{text:"BRAND",style:"sans-900",fx:.5,fy:.475,fw:.6,ink:t},{text:"IN THEIR HAND.",style:"sans-800",fx:.5,fy:.585,fw:.5,ink:n},{text:"\u2014\u2014\u2014  CONTACT US  \u2014\u2014\u2014",style:"sans-700",fx:.5,fy:.67,fw:.42,ink:n},{text:"www.kobags-group.com   |   Kobags   |   kobags_group",style:"sans-500",fx:.5,fy:.735,fw:.74,ink:n}],nf=n=>n.map(t=>({...t,fy:.69+(t.fy-.53)*.74,fw:t.fw*1.05})),xs=n=>[{kind:"graphic",graphic:"heart",fx:.5,fy:.665,fw:.66,ink:n}],rr="#d33a2c",th=[{name:"Enhance your brand",sub:"Box bag L \xB7 white",type:"box",size:"L",bag:"#efeee9",handle:"#2b4db5",ink:"#7d9c44",front:Le("#7d9c44","#4a4a4c"),back:Le("#7d9c44","#4a4a4c")},{name:"Black & gold",sub:"Box bag L \xB7 black",type:"box",size:"L",bag:"#1d1d20",handle:"#1b1c20",ink:"#c49a3c",front:Le("#c49a3c","#c49a3c"),back:Le("#c49a3c","#c49a3c")},{name:"Olive & red",sub:"Box bag M \xB7 olive",type:"box",size:"M",bag:"#a2ad48",handle:"#ec5534",strap:"webbing",ink:"#2f3b1c",front:Le("#2f3b1c","#2f3b1c"),back:Le("#2f3b1c","#2f3b1c")},{name:"Black \xB7 white ink",sub:"Box bag M \xB7 black",type:"box",size:"M",bag:"#1d1d20",handle:"#1b1c20",ink:"#f4f3ef",front:Le("#f4f3ef","#f4f3ef"),back:Le("#f4f3ef","#f4f3ef")},{name:"Grey \xB7 white ink",sub:"Box bag L \xB7 grey",type:"box",size:"L",bag:"#8c8e92",handle:"#1b1c20",ink:"#f4f3ef",front:Le("#f4f3ef","#f4f3ef"),back:Le("#f4f3ef","#f4f3ef")},{name:"Two-sided kraft",sub:"Box bag M \xB7 kraft",type:"box",size:"M",bag:"#bd9665",handle:"match",ink:"#e2683a",front:Cc("#3a3a3c","#e2683a"),back:Le("#1a1a1a","#1a1a1a")},{name:"Saray",sub:"Box bag M \xB7 red",type:"box",size:"M",bag:"#d42a1f",handle:"#1b1c20",ink:"#7a1f18",front:[{text:"Saray",style:"serif-700",fx:.5,fy:.47,fw:.56,ink:"#7a1f18"}],back:[{text:"Saray",style:"serif-700",fx:.5,fy:.47,fw:.56,ink:"#7a1f18"}]},{name:"American Beauty Clinic",sub:"Box bag XL \xB7 white",type:"box",size:"XL",bag:"#efeee9",handle:"#1b1c20",ink:"#4a4a4c",front:[{kind:"graphic",graphic:"crescent",fx:.255,fy:.5,fw:.075,ink:"#4a4a4c"},{text:"AMERICAN",style:"serif-700",track:.04,fx:.535,fy:.49,fw:.44,ink:"#4a4a4c"},{text:"BEAUTY CLINIC",style:"sans-500",track:.25,fx:.535,fy:.56,fw:.25,ink:"#4a4a4c"}],back:[]},{name:"Papirun",sub:"Box bag M \xB7 kraft",type:"box",size:"M",bag:"#bd9665",handle:"match",ink:"#1a1a1a",front:[{kind:"graphic",graphic:"papirun",fx:.5,fy:.4,fw:.2,ink:"#1a1a1a"},{text:"PAPIRUN",style:"sans-700",track:.14,fx:.5,fy:.625,fw:.58,ink:"#1a1a1a"},{text:"\u2014\u2014\u2014  LIMITED EDITION  \u2014\u2014\u2014",style:"sans-600",track:.12,fx:.5,fy:.69,fw:.36,ink:"#1a1a1a"}],back:[]},{name:"Full-panel M",sub:"Box bag L \xB7 kraft",type:"box",size:"L",bag:"#bd9665",handle:"match",ink:"#e2683a",front:[{text:"M",style:"sans-900",fx:.5,fy:.56,fw:.86,ink:"#e2683a"}],back:[{text:"M",style:"sans-900",fx:.5,fy:.56,fw:.86,ink:"#e2683a"}]},{name:"Dina \xB7 two designs",sub:"Box bag L \xB7 kraft",type:"box",size:"L",bag:"#bd9665",handle:"match",ink:rr,front:[{text:"Dina",style:"sans-900",fx:.5,fy:.48,fw:.88,ink:rr},{text:"Dina-R SUPERMARKET",style:"sans-800",fx:.5,fy:.75,fw:.62,ink:rr}],back:[{text:"Mbushur me",style:"sans-900",fx:.5,fy:.42,fw:.78,ink:"#3a3a3c"},{text:"t'mira!",style:"sans-900",fx:.5,fy:.6,fw:.56,ink:rr},{text:"Dina-R",style:"sans-900",fx:.76,fy:.84,fw:.22,ink:rr}]},{name:"Put your brand",sub:"D-cut L \xB7 white",type:"dcut",size:"L",bag:"#efeee9",ink:"#e2683a",front:Cc("#4a4a4c","#e2683a"),back:Cc("#4a4a4c","#e2683a")},{name:"Black D-cut",sub:"D-cut L \xB7 gold ink",type:"dcut",size:"L",bag:"#1d1d20",ink:"#c49a3c",front:Le("#c49a3c","#c49a3c"),back:Le("#c49a3c","#c49a3c")},{name:"ECO bottle bag",sub:"Bottle bag \xB7 kraft",type:"bottle",size:"Std",bag:"#bd9665",ink:"#4c8a3f",front:[{kind:"graphic",graphic:"eco",fx:.5,fy:.6,fw:.78,ink:"#4c8a3f"}],back:[{kind:"graphic",graphic:"eco",fx:.5,fy:.6,fw:.78,ink:"#4c8a3f"}]},{name:"Enhance \xB7 navy",sub:"T-shirt S \xB7 white",type:"tshirt",size:"S",bag:"#efeee9",ink:"#1f2b4d",front:nf(Le("#1f2b4d","#1f2b4d")),back:nf(Le("#1f2b4d","#1f2b4d"))},{name:"Thank you \xB7 orange",sub:"T-shirt S \xB7 white",type:"tshirt",size:"S",bag:"#efeee9",ink:"#e2683a",front:xs("#e2683a"),back:xs("#e2683a")},{name:"Thank you \xB7 grey",sub:"T-shirt S \xB7 white",type:"tshirt",size:"S",bag:"#efeee9",ink:"#7a7a7c",front:xs("#7a7a7c"),back:xs("#7a7a7c")},{name:"Thank you \xB7 teal",sub:"T-shirt S \xB7 white",type:"tshirt",size:"S",bag:"#efeee9",ink:"#2fa58a",front:xs("#2fa58a"),back:xs("#2fa58a")},{name:"Drawstring",sub:"String bag M \xB7 white",type:"string",size:"M",bag:"#efeee9",handle:"#eceae4",ink:"#c49a3c",front:Le("#c49a3c","#c49a3c"),back:[]},{name:"KIVO",sub:"Box bag XS \xB7 red",type:"box",size:"XS",bag:"#d42a1f",handle:"#1b1c20",strap:"webbing",ink:"#1a1a1a",front:[{kind:"graphic",graphic:"kivo",fx:.5,fy:.53,fw:.85,ink:"#1a1a1a"}],back:[]}],Va=document.getElementById("samples"),jv=n=>(lf.find(([,t])=>t===n)||["Custom"])[0];for(let n of[...document.querySelectorAll("#typeSeg button")].map(t=>t.dataset.v)){let t=th.map((s,r)=>[s,r]).filter(([s])=>s.type===n);if(!t.length)continue;let e=document.createElement("h3");e.textContent=re[n].name+"s";let i=document.createElement("span");i.textContent=t.length,e.appendChild(i),Va.appendChild(e);for(let[s,r]of t){let a=document.createElement("button");a.className="sample",a.dataset.i=r,a.innerHTML='<i class="dot"></i><span><b></b><small></small></span>',a.querySelector(".dot").style.background=`linear-gradient(135deg, ${s.bag} 58%, ${s.ink} 58%)`,a.querySelector("b").textContent=s.name,a.querySelector("small").textContent=`${s.size} \xB7 ${jv(s.bag)}`,a.onclick=()=>eh(r),Va.appendChild(a)}}function Ds(){Va.querySelectorAll(".sample").forEach(n=>n.classList.remove("on"))}function eh(n){let t=th[n];Object.assign(Q,{bag:t.bag,size:t.size}),le.front=[],le.back=[],gr(t.type),t.handle&&(Q.handle=t.handle),Q.strap=t.strap||"fabric",Jc();for(let e of["front","back"])le[e]=t[e].map(({fx:i,fy:s,fw:r,...a})=>{let o={kind:"text",...a,id:Rs++,x:i*Q.W,y:s*Q.H,w:r*Q.W};return hn(o),o});xf(),Ka(),Oi(),xe="front",fi=null,sh(),Va.querySelectorAll(".sample").forEach(e=>e.classList.toggle("on",+e.dataset.i===n)),pi(),un(),Ye(),qn("34")}var me=document.getElementById("editor"),Zt=me.getContext("2d"),Zv=document.getElementById("props"),Vc=document.getElementById("designNote"),ar=document.getElementById("pText"),fr=document.getElementById("pStyle"),or=document.getElementById("pQr"),Gc=document.getElementById("pMethod"),Ga=document.getElementById("pInk"),lr=document.getElementById("pSize"),Rc=document.getElementById("pNote"),bf=document.getElementById("copySide"),Wa=10,Sn=null,Pc=!1,Tn=()=>le[xe].find(n=>n.id===fi)||null;function qe(){un(),Pc||(Pc=!0,requestAnimationFrame(()=>{Pc=!1,pi()}))}var Ic={};function Qv(n){if(!Ic[n]){let t=document.createElement("canvas");t.width=t.height=10;let e=t.getContext("2d");e.fillStyle=n?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.05)",e.fillRect(0,0,10,10),e.strokeStyle=n?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.22)",e.lineWidth=1.2,e.beginPath(),e.moveTo(-2,12),e.lineTo(12,-2),e.moveTo(-2,2),e.lineTo(2,-2),e.moveTo(8,12),e.lineTo(12,8),e.stroke(),Ic[n]=t}return Ic[n]}function un(){let{W:n,H:t}=Q,i=Math.max(120,me.parentElement.clientWidth-18)/n;t*i>340&&(i=340/t);let s=Math.min(window.devicePixelRatio||1,2),r=Math.round(n*i),a=Math.round(t*i);(me.width!==Math.round(r*s)||me.height!==Math.round(a*s))&&(me.width=Math.round(r*s),me.height=Math.round(a*s)),me.style.width=r+"px",me.style.height=a+"px",Wa=i;let o=i*s,l=Ps(),c=new Pt(Q.bag).getHSL({}).l<.5;Zt.setTransform(1,0,0,1,0,0),Zt.fillStyle=Q.bag,Zt.fillRect(0,0,me.width,me.height),Zt.save(),Zt.beginPath(),Zt.rect(0,0,me.width,me.height),Zt.rect(l.x0*o,l.y0*o,(l.x1-l.x0)*o,(l.y1-l.y0)*o),Zt.fillStyle=Zt.createPattern(Qv(c),"repeat"),Zt.fill("evenodd"),Zt.setLineDash([4*s,4*s]),Zt.strokeStyle=c?"rgba(255,255,255,0.45)":"rgba(0,0,0,0.3)",Zt.lineWidth=s,Zt.strokeRect(l.x0*o,l.y0*o,(l.x1-l.x0)*o,(l.y1-l.y0)*o),Zt.restore(),Zt.save(),Zt.fillStyle=Uc("--chip")||"#fff",pf(Zt,o,0,0),Zt.fill(),Zt.restore(),ur(Zt,o,0,0,le[xe]);let h=Tn();if(h){let[u,d]=Ts(h),f=(h.x-u/2)*o,A=(h.y-d/2)*o,y=10*s;Zt.save(),Zt.strokeStyle=Uc("--focus")||"#2b59c3",Zt.lineWidth=1.5*s,Zt.setLineDash([5*s,3*s]),Zt.strokeRect(f,A,u*o,d*o),Zt.setLineDash([]),Zt.fillStyle="#fff",Zt.fillRect(f+u*o-y/2,A+d*o-y/2,y,y),Zt.strokeRect(f+u*o-y/2,A+d*o-y/2,y,y),Zt.restore()}}new ResizeObserver(()=>un()).observe(me.parentElement);matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>un());var Sf=n=>{let t=me.getBoundingClientRect();return[(n.clientX-t.left)/Wa,(n.clientY-t.top)/Wa]};function wf(n,t){let e=Tn(),i=12/Wa;if(e){let[r,a]=Ts(e);if(Math.abs(n-(e.x+r/2))<i&&Math.abs(t-(e.y+a/2))<i)return[e,"resize"]}let s=le[xe];for(let r=s.length-1;r>=0;r--){let a=s[r],[o,l]=Ts(a);if(Math.abs(n-a.x)<=o/2&&Math.abs(t-a.y)<=l/2)return[a,"move"]}return[null,null]}me.addEventListener("pointerdown",n=>{let[t,e]=Sf(n),[i,s]=wf(t,e);if(!i){Wc(null);return}Wc(i.id),me.setPointerCapture(n.pointerId),Sn={mode:s,el:i,x0:t,y0:e,ex:i.x,ey:i.y,w0:i.w}});me.addEventListener("pointermove",n=>{let[t,e]=Sf(n);if(!Sn){let[s,r]=wf(t,e);me.style.cursor=r==="resize"?"nwse-resize":s?"move":"default";return}let i=Sn.el;Sn.mode==="move"?(i.x=Sn.ex+t-Sn.x0,i.y=Sn.ey+e-Sn.y0):i.w=Math.max(df(i),Sn.w0+2*(t-Sn.x0)),hn(i),Ye(),qe()});var Ef=()=>{Sn=null};me.addEventListener("pointerup",Ef);me.addEventListener("pointercancel",Ef);me.addEventListener("keydown",n=>{let t=Tn();if(!t)return;let e=n.shiftKey?1:.2,i={ArrowLeft:[-e,0],ArrowRight:[e,0],ArrowUp:[0,-e],ArrowDown:[0,e]}[n.key];i&&(t.x+=i[0],t.y+=i[1],hn(t),Ye(),qe(),n.preventDefault()),(n.key==="Delete"||n.key==="Backspace")&&(Tf(),n.preventDefault())});function Wc(n){fi=n,Ye(),un()}function Tf(){le[xe]=le[xe].filter(n=>n.id!==fi),fi=null,Ye(),qe()}for(let[n,[,,t]]of Object.entries(Dc))fr.add(new Option(t,n));var nh=document.createElement("span");nh.className="swname";for(let[n,t]of cf){let e=document.createElement("button");e.className="sw",e.dataset.v=t,e.title=n,e.setAttribute("aria-label",n),e.style.background=t,e.onclick=()=>{let i=Tn();i&&(i.ink=t,Ye(),qe())},Ga.appendChild(e)}Ga.appendChild(nh);var Xc=n=>{let t=new Pt(n);return .2126*t.r+.7152*t.g+.0722*t.b};function Ye(){let n=Tn();if(Zv.hidden=!n,!n)return;document.getElementById("propsTitle").textContent={text:"Text",logo:"Logo",qr:"QR code",graphic:"Artwork"}[n.kind],ar.hidden=fr.hidden=n.kind!=="text",n.kind==="text"&&(document.activeElement!==ar&&(ar.value=n.text),fr.value=n.style),or.hidden=n.kind!=="qr",n.kind==="qr"&&document.activeElement!==or&&(or.value=n.data),Gc.hidden=n.kind!=="logo",Gc.querySelectorAll("button").forEach(s=>s.classList.toggle("on",s.dataset.v===(n.method||"mono"))),Ga.hidden=n.kind==="logo"&&n.method==="full",Ga.querySelectorAll(".sw").forEach(s=>s.classList.toggle("on",s.dataset.v===n.ink)),nh.textContent=(cf.find(([,s])=>s===n.ink)||[n.ink])[0];let t=Ps();lr.min=df(n),lr.max=(t.x1-t.x0).toFixed(1),lr.value=n.w,document.getElementById("o-pSize").textContent=En(n.w)+" cm";let e="",i=!1;if(n.kind==="qr"){let s=Xc(n.ink),r=Xc(Q.bag),a=(Math.max(s,r)+.05)/(Math.min(s,r)+.05);window.qrcode?a<3?(e="Low contrast with the fabric, so phones may not read this QR code. Pick a darker or lighter ink.",i=!0):s>r?(e="Light ink on dark fabric makes an inverted QR code, which some phones cannot read. Scan a sample before ordering.",i=!0):n.w<3.5?(e="Make it at least 3.5 cm wide so phones read it through the fabric texture.",i=!0):e="Scannable size and contrast. Phones read it best on a flat, well-lit panel.":(e="The QR code generator did not load. Check the internet connection and reload the page.",i=!0)}else n.kind==="logo"&&n.method==="full"?e="Full-colour logos are printed as a heat transfer, so they keep their own colours.":n.kind==="text"&&(e="Put **double asterisks** around words to make them bold. Press Enter for a new line.");Rc.textContent=e,Rc.classList.toggle("warn",i),Rc.hidden=!e}ar.addEventListener("input",()=>{let n=Tn();n&&(n.text=ar.value||" ",hn(n),Ye(),qe())});fr.addEventListener("change",()=>{let n=Tn();n&&(n.style=fr.value,hn(n),qe())});or.addEventListener("input",()=>{let n=Tn();n&&(n.data=or.value.trim()||" ",hn(n),qe())});Gc.addEventListener("click",n=>{let t=n.target.closest("button"),e=Tn();t&&e&&(e.method=t.dataset.v,Ye(),qe())});lr.addEventListener("input",()=>{let n=Tn();n&&(n.w=+lr.value,hn(n),Ye(),qe())});document.getElementById("pCenter").onclick=()=>{let n=Tn();n&&(n.x=Q.W/2,hn(n),qe())};document.getElementById("delItem").onclick=Tf;var Jv=()=>Xc(Q.bag)>.3?"#1a1a1a":"#f4f3ef";function ih(n){let t=Ps();n={id:Rs++,x:(t.x0+t.x1)/2,y:(t.y0+t.y1)/2,ink:Jv(),...n},hn(n),le[xe].push(n),fi=n.id,Ye(),qe()}document.getElementById("addText").onclick=()=>ih({kind:"text",text:"Your text",style:"sans-800",track:.02,w:Math.min(14,Q.W*.5)});document.getElementById("addQr").onclick=()=>{let n=Ps();ih({kind:"qr",data:"https://www.kobags-group.com",w:4.5,x:n.x1-2.25,y:n.y1-2.25})};document.getElementById("addLogo").onchange=async n=>{let t=n.target.files[0];if(t){try{let e=await Ha(URL.createObjectURL(t)),i="logo"+Rs++;Es.set(i,Kv(e,t.name)),ih({kind:"logo",asset:i,method:"mono",w:Math.min(12,Q.W*.45)}),Vc.textContent=`Added ${t.name}. Drag it into place.`}catch{Vc.textContent="That file could not be read as an image. Try a PNG, JPG or SVG."}n.target.value=""}};function sh(){document.querySelectorAll("#sideSeg button[data-v]").forEach(n=>n.classList.toggle("on",n.dataset.v===xe)),bf.textContent=xe==="front"?"Copy to back":"Copy to front"}document.getElementById("sideSeg").addEventListener("click",n=>{let t=n.target.closest("button[data-v]");t&&(xe=t.dataset.v,fi=null,sh(),Ye(),un(),qn(xe==="back"?"back":"34"))});bf.onclick=()=>{let n=xe==="front"?"back":"front";le[n]=le[xe].map(t=>({...t,id:Rs++})),qe(),Vc.textContent=`The ${n} now has the same design as the ${xe}.`};function Cf(){let e=document.createElement("canvas"),i=e.getContext("2d"),s=()=>{i.font='300 200px "Montserrat", "Helvetica Neue", Arial, sans-serif',"letterSpacing"in i&&(i.letterSpacing="20px")};s();let r=i.measureText("Y").width,a=i.measureText("UR").width,o=i.measureText("H").actualBoundingBoxAscent||200*.7,l=o*1.04,c=200*.14;e.width=Math.ceil(r+l+20+a+c*2),e.height=Math.ceil(200*1.12+c),s(),i.fillStyle=i.strokeStyle="#fff",i.textBaseline="alphabetic";let h=e.height/2+o/2;i.fillText("Y",c,h);let u=c+r+l/2,d=h-o/2,f=l/2;i.lineWidth=200*.045,i.lineCap="round";for(let A=0;A<3;A++)i.save(),i.translate(u,d),i.rotate(A*Math.PI*2/3-Math.PI/2),i.beginPath(),i.arc(0,0,f*.94,-.95,1.15),i.quadraticCurveTo(f*.2,f*.25,f*.55,-f*.76),i.stroke(),i.beginPath(),i.moveTo(f*.83,f*.42),i.quadraticCurveTo(f*.55,0,f*.62,-f*.55),i.stroke(),i.restore();return i.fillText("UR",c+r+l+20,h),e}function rh(n,t,e){let i=document.createElement("canvas");i.width=n,i.height=t;let s=i.getContext("2d");return s.fillStyle=s.strokeStyle="#fff",e(s),i}var $v=()=>rh(520,560,n=>{for(let t=0;t<4;t++)n.beginPath(),n.roundRect(40+t*115,20,85,220,[42,42,8,8]),n.fill();n.beginPath(),n.moveTo(20,268),n.lineTo(500,268),n.lineTo(500,318),n.lineTo(20,318),n.closePath(),n.fill(),n.beginPath(),n.moveTo(40,350),n.lineTo(480,350),n.arc(260,350,220,0,Math.PI),n.closePath(),n.fill()}),tx=()=>rh(400,400,n=>{n.beginPath(),n.arc(200,200,180,0,Math.PI*2),n.fill(),n.globalCompositeOperation="destination-out",n.beginPath(),n.arc(250,185,150,0,Math.PI*2),n.fill(),n.globalCompositeOperation="source-over",n.beginPath(),n.ellipse(215,215,70,34,-.8,0,Math.PI*2),n.fill()}),Rf=()=>rh(600,1500,n=>{n.lineWidth=12,n.lineCap=n.lineJoin="round";for(let[t,e,i]of[[300,170,95],[215,230,80],[385,230,80],[300,290,85]])n.beginPath(),n.arc(t,e,i,0,Math.PI*2),n.stroke();n.beginPath(),n.moveTo(300,370),n.lineTo(300,470),n.moveTo(300,420),n.lineTo(255,380),n.moveTo(300,405),n.lineTo(340,370),n.stroke(),n.font='700 190px "Montserrat", sans-serif',n.textAlign="center",n.lineWidth=10,n.strokeText("ECO",300,700),n.lineWidth=12,n.beginPath(),n.arc(300,900,85,0,Math.PI*2),n.stroke();for(let t=0;t<12;t++){let e=t*Math.PI/6;n.beginPath(),n.moveTo(300+Math.cos(e)*115,900+Math.sin(e)*115),n.lineTo(300+Math.cos(e)*160,900+Math.sin(e)*160),n.stroke()}n.beginPath(),n.arc(170,1300,95,0,Math.PI*2),n.moveTo(525,1300),n.arc(430,1300,95,0,Math.PI*2),n.stroke(),n.beginPath(),n.moveTo(170,1300),n.lineTo(270,1170),n.lineTo(390,1170),n.lineTo(430,1300),n.moveTo(170,1300),n.lineTo(300,1300),n.lineTo(390,1170),n.moveTo(270,1170),n.lineTo(300,1300),n.moveTo(250,1140),n.lineTo(300,1140),n.moveTo(390,1170),n.lineTo(380,1120),n.lineTo(420,1110),n.stroke();for(let[t,e,i]of[[110,560,-.6],[500,1020,.6],[100,1050,-.4]])n.save(),n.translate(t,e),n.rotate(i),n.beginPath(),n.ellipse(0,0,70,28,0,0,Math.PI*2),n.moveTo(-70,0),n.lineTo(70,0),n.stroke(),n.restore()});function Pf(){let t=document.createElement("canvas");t.width=1400,t.height=1400;let e=t.getContext("2d"),i=[];for(let U=0;U<480;U++){let z=U/480*Math.PI*2;i.push([16*Math.sin(z)**3,-(13*Math.cos(z)-5*Math.cos(2*z)-2*Math.cos(3*z)-Math.cos(4*z))])}let s=Math.min(...i.map(U=>U[1])),r=1400*.92/32,a=i.map(([U,z])=>[1400/2+U*r,(z-s)*r+1400*.02]),o=U=>{let z=1/0,k=-1/0;for(let Z=0;Z<a.length;Z++){let V=a[Z],$=a[(Z+1)%a.length];if((V[1]-U)*($[1]-U)<=0&&V[1]!==$[1]){let rt=V[0]+(U-V[1])/($[1]-V[1])*($[0]-V[0]);z=Math.min(z,rt),k=Math.max(k,rt)}}return[z,k]},l=[{words:[["Gracias","s"],["XIEXIE","b"],["Merci","s"]],k:1},{words:[["DANKE","b"],["SHUKRAN","b"]],k:1.3},{big:"THANK",left:["HVALA","KIITOS"],right:["OBRIGADO","TERIMA KASIH"],k:2.1},{big:"YOU",left:["ARIGATO","DEKUJI"],right:["SALAMAT","TACK"],k:1.9},{words:[["FALEMINDERIT","b"]],k:1.1},{words:[["KOSZONOM","b"],["MULTUMESC","b"]],k:.75},{words:[["TESEKKUR EDERIM","b"]],k:.65},{words:[["DANK U","b"]],k:.6}],c=(U,z)=>U==="s"?`700 ${z*1.2}px "Dancing Script", cursive`:`700 ${z}px "Oswald", "Arial Narrow", sans-serif`,h=(U,z,k)=>(e.font=c(z,k),e.measureText(U).width),u=.46,d=.22,f=(U,z)=>Math.max(...U.map(k=>h(k,"b",z*u))),A=(U,z)=>U.big?f(U.left,z)+h(U.big,"b",z)+f(U.right,z)+2*d*z:U.words.reduce((k,[Z,V])=>k+h(Z,V,z),0)+(U.words.length-1)*z*.26;e.font=c("b",100);let y=e.measureText("H").actualBoundingBoxAscent/100||.78,p=1.14,m=Math.min(...a.map(U=>U[1])),M=Math.max(...a.map(U=>U[1])),x=M-m,_=m+x*.08,P=m+x*.9,S=(P-_)/l.reduce((U,z)=>U+z.k*y*p,0),w=[];for(let U=0;U<8;U++){w=[];let z=_;for(let k of l){let Z=k.k*S,[V,$]=o(z+Z*y*.5);if(!($>V)){z+=Z*y*p;continue}let rt=($-V)*.96/A(k,1),ot=Math.min(Math.max(rt,Z*.6),Z*1.6),Tt=Math.min(Math.max(($-V)*.96/A(k,ot),.8),1.25);w.push({row:k,size:ot,sx:Tt,cx:(V+$)/2,base:z+ot*y}),z+=ot*y*p}S*=(P-_)/(z-_)}e.fillStyle="#fff";for(let{row:U,size:z,sx:k,cx:Z,base:V}of w){e.save(),e.translate(Z,0),e.scale(k,1);let $=-A(U,z)/2;if(U.big){let rt=z*u,ot=f(U.left,z),Tt=V-z*y*.56;e.textAlign="right",e.font=c("b",rt),e.fillText(U.left[0],$+ot,Tt),e.fillText(U.left[1],$+ot,V),$+=ot+d*z,e.textAlign="left",e.font=c("b",z),e.fillText(U.big,$,V),$+=h(U.big,"b",z)+d*z,e.font=c("b",rt),e.fillText(U.right[0],$,Tt),e.fillText(U.right[1],$,V)}else for(let[rt,ot]of U.words)e.font=c(ot,z),e.fillText(rt,$,V),$+=e.measureText(rt).width+z*.26;e.restore()}let T=e.getImageData(0,0,1400,1400).data,C=1400,g=1400,v=0,I=0;for(let U=0;U<1400;U+=2)for(let z=0;z<1400;z+=2)T[(U*1400+z)*4+3]>20&&(C=Math.min(C,z),v=Math.max(v,z),g=Math.min(g,U),I=Math.max(I,U));let B=document.createElement("canvas");return B.width=v-C+12,B.height=I-g+12,B.getContext("2d").drawImage(t,C-6,g-6,B.width,B.height,0,0,B.width,B.height),B}function ex(n){let t=document.createElement("canvas");return t.width=n.width,t.height=n.height,t.getContext("2d").drawImage(n,0,0),t}function nx(){let n=document.querySelector('link[href*="fonts.googleapis.com/css2"]'),t=new Promise(i=>{!n||n.sheet?i():(n.addEventListener("load",i,{once:!0}),n.addEventListener("error",i,{once:!0}))}),e=["300","500","600","700","800","900"].map(i=>`${i} 40px "Montserrat"`).concat(['700 40px "Oswald"','700 40px "Dancing Script"','700 40px "Playfair Display"']);return Promise.race([t.then(()=>Promise.all(e.map(i=>document.fonts.load(i)))),new Promise(i=>setTimeout(i,5e3))]).catch(()=>{})}document.fonts?.addEventListener?.("loadingdone",()=>{if(window.__ready){ci.clear(),li.heart=Pf(),li.eco=Rf(),li.your=Cf();for(let n of["front","back"])le[n].forEach(hn);pi(),un()}});var ix=window.claude?.use?window.claude.use("downloads"):Promise.resolve(null);document.getElementById("shot").onclick=async()=>{Za(!0);let n=await new Promise(s=>Pe.domElement.toBlob(s,"image/png")),t=`${re[Q.type].name.toLowerCase().replace(/[^a-z]+/g,"-")}-${Q.size}-${xe}.png`,e=await ix;if(e){try{await e.save({filename:t,data:n})}catch{}return}let i=document.createElement("a");i.href=URL.createObjectURL(n),i.download=t,i.click(),setTimeout(()=>URL.revokeObjectURL(i.href),5e3)};var Ni=new Ca(Pe,new Ue(1,1,{type:on,samples:4}));Ni.addPass(new Ra(en,ze));var cn=new sr(en,ze,1,1);cn.normalMaterial.side=Fe;cn.updateGtaoMaterial({radius:.045,distanceExponent:1.6,thickness:.03,scale:1.15,samples:16,distanceFallOff:1});cn.updatePdMaterial({lumaPhi:10,depthPhi:2,normalPhi:3,radius:5,rings:2,samples:16});cn.blendIntensity=.9;var ja=new fs({side:Fe,blending:pe});ja.alphaMap=Cs;ja.onBeforeCompile=n=>{n.fragmentShader=n.fragmentShader.replace("#include <uv_pars_fragment>",`#include <uv_pars_fragment>
#include <alphamap_pars_fragment>`).replace("#include <normal_fragment_begin>",`#ifdef USE_ALPHAMAP
	if ( texture2D( alphaMap, vAlphaMapUv ).g < 0.5 ) discard;
#endif
#include <normal_fragment_begin>`)};ja.customProgramCacheKey=()=>"bag-cut-normals";var sx=cn.renderOverride.bind(cn),sf=new Pt;cn.renderOverride=(n,t,e,i,s)=>{if(t!==cn.normalMaterial)return sx(n,t,e,i,s);let r=[];en.traverse(l=>{l.isMesh&&(r.push([l,l.material]),l.material=l===di||l===qa?ja:cn.normalMaterial)}),n.getClearColor(sf);let a=n.getClearAlpha(),o=n.autoClear;n.setRenderTarget(e),n.autoClear=!1,n.setClearColor(i),n.setClearAlpha(s||0),n.clear(),n.render(en,ze),n.autoClear=o,n.setClearColor(sf),n.setClearAlpha(a);for(let[l,c]of r)l.material=c};Ni.addPass(cn);Ni.addPass(new Da);function If(){let n=Oa.clientWidth,t=Oa.clientHeight;Pe.setSize(n,t,!1),ze.aspect=n/t,ze.updateProjectionMatrix(),Ni.setPixelRatio(Pe.getPixelRatio()),Ni.setSize(n,t),hi=!0}new ResizeObserver(If).observe(Oa);If();function Za(n=!1){let t=!1;if(wn){t=!0;let e=Math.min(1,(performance.now()-wn.t0)/650),i=1-Math.pow(1-e,3);ze.position.lerpVectors(wn.p0,wn.to.pos,i),tn.target.lerpVectors(wn.q0,wn.to.target,i),e===1&&(wn=null)}t=tn.update()||t,(t||hi||n)&&(Ni.render(),hi=!1)}Pe.setAnimationLoop(()=>Za());Oi();gr("box");qn("34",!1);window.qrcode?.stringToBytesFuncs?.["UTF-8"]&&(window.qrcode.stringToBytes=window.qrcode.stringToBytesFuncs["UTF-8"]);Promise.all([nx(),Ha(vv)]).then(([,n])=>{li.kivo=ex(n),li.heart=Pf(),Object.assign(li,{papirun:$v(),crescent:tx(),eco:Rf(),your:Cf()}),ci.clear(),eh(0),qn("34",!1),window.__ready=!0});window.__api={renderer:Pe,render:()=>Za(!0),gtao:cn,applyType:gr,applySize:ka,loadSample:eh,SAMPLES:th,design:le,select:Wc,drawEditor:un,printArea:Ps,elementSize:Ts,getSide:()=>xe,outer:di,rim:Ms,straps:mr,cords:Ya,TYPES:re,state:Q,setView:qn,rebuild:Is,redrawAtlas:pi,camera:ze,controls:tn,composer:Ni,gtao:cn,scene:en};var Df=document.documentElement.dataset.embed==="preview",Uf="kobags-reference-studio-v1",ah=!1;function Xa(n,t={}){window.parent!==window&&window.parent.postMessage({type:n,...t},location.origin)}function Lf(){if(!(!ah||Df))try{let n=[...Es.entries()].map(([t,e])=>[t,{name:e.name,mask:e.mask.toDataURL(),color:e.color.toDataURL()}]);localStorage.setItem(Uf,JSON.stringify({version:1,state:Q,design:le,side:xe,nextId:Rs,uploaded:n}))}catch{Xa("kobags:storage-unavailable")}}var rf;function Nf(){clearTimeout(rf),rf=setTimeout(Lf,350)}for(let n of["input","change","click","pointerup"])document.addEventListener(n,Nf,{passive:!0});var rx=qe;qe=function(){rx(),Nf()};function oh(n){let t=n.toDataURL("image/png");if(t.length<=8e4)return t;for(let i of[.9,.8,.65])if(t=n.toDataURL("image/webp",i),t.length<=8e4)return t;if(n.width<=180)throw Error("IMAGE_TOO_LARGE");let e=document.createElement("canvas");return e.width=Math.round(n.width*.75),e.height=Math.round(n.height*.75),e.getContext("2d").drawImage(n,0,0,e.width,e.height),oh(e)}function af(n){if(!le[n].length)return"";let t=document.createElement("canvas");t.width=900,t.height=Math.round(900*Q.H/Q.W);let e=t.getContext("2d");return ur(e,900/Q.W,0,0,le[n]),oh(t)}function ax(){let n=ze.position.clone(),t=tn.target.clone(),e={};try{for(let i of["front","back"]){qn(i,!1),Za(!0);let s=document.createElement("canvas"),r=Pe.domElement,a=Math.min(1,800/Math.max(r.width,r.height));s.width=Math.round(r.width*a),s.height=Math.round(r.height*a),s.getContext("2d").drawImage(r,0,0,s.width,s.height),e[i]=oh(s)}}finally{wn=null,ze.position.copy(n),tn.target.copy(t),tn.update(),hi=!0}return{source:"ariongj-mo-b23cd8f",productName:re[Q.type].name,size:Q.size,dimensions:`${Q.W} \xD7 ${Q.H} \xD7 ${Q.D} cm`,fabric:Q.bag,...e}}window.addEventListener("message",n=>{if(!(n.source!==window.parent||n.origin!==location.origin||!ah)&&n.data?.type==="kobags:request-quote"){Lf();try{Xa("kobags:quote-design",{bag:{...Q},front:af("front"),back:af("back"),referenceStudio:ax()})}catch{Xa("kobags:quote-error")}}});async function ox(){if(!Df)try{let n=JSON.parse(localStorage.getItem(Uf)||"null");if(n?.version!==1||!Object.hasOwn(re,n.state?.type))return;let t=n.state;if(!re[t.type].sizes.some(e=>e[0]===t.size)||!/^#[\da-f]{6}$/i.test(t.bag)||!Array.isArray(n.design?.front)||!Array.isArray(n.design?.back)||n.design.front.length+n.design.back.length>100)return;for(let[e,i]of(n.uploaded||[]).slice(0,32)){if(typeof e!="string"||e.length>100||!i.mask?.startsWith("data:image/png;base64,")||!i.color?.startsWith("data:image/png;base64,")||i.mask.length+i.color.length>8e6)continue;let[s,r]=await Promise.all([Ha(i.mask),Ha(i.color)]);if([s,r].some(o=>o.width>4096||o.height>4096))continue;let a=o=>{let l=document.createElement("canvas");return l.width=o.width,l.height=o.height,l.getContext("2d").drawImage(o,0,0),l};Es.set(e,{name:String(i.name||"Logo").slice(0,200),mask:a(s),color:a(r)})}le.front=[],le.back=[],gr(t.type),ka(t.size),Object.assign(Q,{bag:t.bag,handle:t.handle==="match"||/^#[\da-f]{6}$/i.test(t.handle)?t.handle:"match",strap:t.strap==="webbing"?"webbing":"fabric",pose:t.pose==="relaxed"?"relaxed":"upright"}),Number.isFinite(t.drop)&&(Q.drop=Math.max(6,Math.min(35,t.drop)));for(let e of["front","back"])le[e]=n.design[e].filter(i=>["text","logo","graphic","qr"].includes(i.kind)&&[i.x,i.y,i.w].every(Number.isFinite)&&/^#[\da-f]{6}$/i.test(i.ink)&&(i.kind!=="logo"||Es.has(i.asset))&&(i.kind!=="graphic"||Object.hasOwn(li,i.graphic))).map(i=>{let s={...i,id:Rs++,text:String(i.text||"").slice(0,2e3),data:String(i.data||"").slice(0,2e3)};return hn(s),s});xe=n.side==="back"?"back":"front",fi=null,xf(),Ka(),Jc(),_f(),sh(),document.querySelectorAll("#poseSeg button").forEach(e=>e.classList.toggle("on",e.dataset.v===Q.pose)),Oi(),Is(),pi(),un(),Ye(),Ds(),qn(xe==="back"?"back":"34",!1)}catch{}}var lx=setInterval(async()=>{window.__ready&&(clearInterval(lx),await ox(),ah=!0,document.documentElement.dataset.studioSource="ariongj-mo-b23cd8f",Xa("kobags:studio-ready"))},50);
