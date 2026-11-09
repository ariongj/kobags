/*! QR Code Generator for JavaScript: Copyright (c) 2009 Kazuhiko Arase. MIT license. Full notices: /documents/third-party-notices.txt */
var Vd=Object.create;var Sh=Object.defineProperty;var Gd=Object.getOwnPropertyDescriptor;var Wd=Object.getOwnPropertyNames;var qd=Object.getPrototypeOf,Xd=Object.prototype.hasOwnProperty;var Yd=(n,t)=>()=>{try{return t||n((t={exports:{}}).exports,t),t.exports}catch(e){throw t=0,e}};var Kd=(n,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Wd(t))!Xd.call(n,s)&&s!==e&&Sh(n,s,{get:()=>t[s],enumerable:!(i=Gd(t,s))||i.enumerable});return n};var jd=(n,t,e)=>(e=n!=null?Vd(qd(n)):{},Kd(t||!n||!n.__esModule?Sh(e,"default",{value:n,enumerable:!0}):e,n));var Rh=Yd((Th,Ch)=>{var Eh=(function(){var n=function(_,x){var M=236,R=17,b=_,w=e[x],E=null,T=0,g=null,v=[],I={},N=function(L,G){T=b*4+17,E=(function(O){for(var X=new Array(O),j=0;j<O;j+=1){X[j]=new Array(O);for(var nt=0;nt<O;nt+=1)X[j][nt]=null}return X})(T),U(0,0),U(T-7,0),U(0,T-7),K(),z(),tt(L,G),b>=7&&F(L),g==null&&(g=Et(b,w,v)),at(g,G)},U=function(L,G){for(var O=-1;O<=7;O+=1)if(!(L+O<=-1||T<=L+O))for(var X=-1;X<=7;X+=1)G+X<=-1||T<=G+X||(0<=O&&O<=6&&(X==0||X==6)||0<=X&&X<=6&&(O==0||O==6)||2<=O&&O<=4&&2<=X&&X<=4?E[L+O][G+X]=!0:E[L+O][G+X]=!1)},k=function(){for(var L=0,G=0,O=0;O<8;O+=1){N(!0,O);var X=s.getLostPoint(I);(O==0||L>X)&&(L=X,G=O)}return G},z=function(){for(var L=8;L<T-8;L+=1)E[L][6]==null&&(E[L][6]=L%2==0);for(var G=8;G<T-8;G+=1)E[6][G]==null&&(E[6][G]=G%2==0)},K=function(){for(var L=s.getPatternPosition(b),G=0;G<L.length;G+=1)for(var O=0;O<L.length;O+=1){var X=L[G],j=L[O];if(E[X][j]==null)for(var nt=-2;nt<=2;nt+=1)for(var ft=-2;ft<=2;ft+=1)nt==-2||nt==2||ft==-2||ft==2||nt==0&&ft==0?E[X+nt][j+ft]=!0:E[X+nt][j+ft]=!1}},F=function(L){for(var G=s.getBCHTypeNumber(b),O=0;O<18;O+=1){var X=!L&&(G>>O&1)==1;E[Math.floor(O/3)][O%3+T-8-3]=X}for(var O=0;O<18;O+=1){var X=!L&&(G>>O&1)==1;E[O%3+T-8-3][Math.floor(O/3)]=X}},tt=function(L,G){for(var O=w<<3|G,X=s.getBCHTypeInfo(O),j=0;j<15;j+=1){var nt=!L&&(X>>j&1)==1;j<6?E[j][8]=nt:j<8?E[j+1][8]=nt:E[T-15+j][8]=nt}for(var j=0;j<15;j+=1){var nt=!L&&(X>>j&1)==1;j<8?E[8][T-j-1]=nt:j<9?E[8][15-j-1+1]=nt:E[8][15-j-1]=nt}E[T-8][8]=!L},at=function(L,G){for(var O=-1,X=T-1,j=7,nt=0,ft=s.getMaskFunction(G),lt=T-1;lt>0;lt-=2)for(lt==6&&(lt-=1);;){for(var D=0;D<2;D+=1)if(E[X][lt-D]==null){var Gt=!1;nt<L.length&&(Gt=(L[nt]>>>j&1)==1);var ut=ft(X,lt-D);ut&&(Gt=!Gt),E[X][lt-D]=Gt,j-=1,j==-1&&(nt+=1,j=7)}if(X+=O,X<0||T<=X){X-=O,O=-O;break}}},ct=function(L,G){for(var O=0,X=0,j=0,nt=new Array(G.length),ft=new Array(G.length),lt=0;lt<G.length;lt+=1){var D=G[lt].dataCount,Gt=G[lt].totalCount-D;X=Math.max(X,D),j=Math.max(j,Gt),nt[lt]=new Array(D);for(var ut=0;ut<nt[lt].length;ut+=1)nt[lt][ut]=255&L.getBuffer()[ut+O];O+=D;var Ut=s.getErrorCorrectPolynomial(Gt),Y=a(nt[lt],Ut.getLength()-1),pt=Y.mod(Ut);ft[lt]=new Array(Ut.getLength()-1);for(var ut=0;ut<ft[lt].length;ut+=1){var mt=ut+pt.getLength()-ft[lt].length;ft[lt][ut]=mt>=0?pt.getAt(mt):0}}for(var P=0,ut=0;ut<G.length;ut+=1)P+=G[ut].totalCount;for(var S=new Array(P),W=0,ut=0;ut<X;ut+=1)for(var lt=0;lt<G.length;lt+=1)ut<nt[lt].length&&(S[W]=nt[lt][ut],W+=1);for(var ut=0;ut<j;ut+=1)for(var lt=0;lt<G.length;lt+=1)ut<ft[lt].length&&(S[W]=ft[lt][ut],W+=1);return S},Et=function(L,G,O){for(var X=o.getRSBlocks(L,G),j=l(),nt=0;nt<O.length;nt+=1){var ft=O[nt];j.put(ft.getMode(),4),j.put(ft.getLength(),s.getLengthInBits(ft.getMode(),L)),ft.write(j)}for(var lt=0,nt=0;nt<X.length;nt+=1)lt+=X[nt].dataCount;if(j.getLengthInBits()>lt*8)throw"code length overflow. ("+j.getLengthInBits()+">"+lt*8+")";for(j.getLengthInBits()+4<=lt*8&&j.put(0,4);j.getLengthInBits()%8!=0;)j.putBit(!1);for(;!(j.getLengthInBits()>=lt*8||(j.put(M,8),j.getLengthInBits()>=lt*8));)j.put(R,8);return ct(j,X)};I.addData=function(L,G){G=G||"Byte";var O=null;switch(G){case"Numeric":O=c(L);break;case"Alphanumeric":O=h(L);break;case"Byte":O=u(L);break;case"Kanji":O=f(L);break;default:throw"mode:"+G}v.push(O),g=null},I.isDark=function(L,G){if(L<0||T<=L||G<0||T<=G)throw L+","+G;return E[L][G]},I.getModuleCount=function(){return T},I.make=function(){if(b<1){for(var L=1;L<40;L++){for(var G=o.getRSBlocks(L,w),O=l(),X=0;X<v.length;X++){var j=v[X];O.put(j.getMode(),4),O.put(j.getLength(),s.getLengthInBits(j.getMode(),L)),j.write(O)}for(var nt=0,X=0;X<G.length;X++)nt+=G[X].dataCount;if(O.getLengthInBits()<=nt*8)break}b=L}N(!1,k())},I.createTableTag=function(L,G){L=L||2,G=typeof G>"u"?L*4:G;var O="";O+='<table style="',O+=" border-width: 0px; border-style: none;",O+=" border-collapse: collapse;",O+=" padding: 0px; margin: "+G+"px;",O+='">',O+="<tbody>";for(var X=0;X<I.getModuleCount();X+=1){O+="<tr>";for(var j=0;j<I.getModuleCount();j+=1)O+='<td style="',O+=" border-width: 0px; border-style: none;",O+=" border-collapse: collapse;",O+=" padding: 0px; margin: 0px;",O+=" width: "+L+"px;",O+=" height: "+L+"px;",O+=" background-color: ",O+=I.isDark(X,j)?"#000000":"#ffffff",O+=";",O+='"/>';O+="</tr>"}return O+="</tbody>",O+="</table>",O},I.createSvgTag=function(L,G,O,X){var j={};typeof arguments[0]=="object"&&(j=arguments[0],L=j.cellSize,G=j.margin,O=j.alt,X=j.title),L=L||2,G=typeof G>"u"?L*4:G,O=typeof O=="string"?{text:O}:O||{},O.text=O.text||null,O.id=O.text?O.id||"qrcode-description":null,X=typeof X=="string"?{text:X}:X||{},X.text=X.text||null,X.id=X.text?X.id||"qrcode-title":null;var nt=I.getModuleCount()*L+G*2,ft,lt,D,Gt,ut="",Ut;for(Ut="l"+L+",0 0,"+L+" -"+L+",0 0,-"+L+"z ",ut+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',ut+=j.scalable?"":' width="'+nt+'px" height="'+nt+'px"',ut+=' viewBox="0 0 '+nt+" "+nt+'" ',ut+=' preserveAspectRatio="xMinYMin meet"',ut+=X.text||O.text?' role="img" aria-labelledby="'+Dt([X.id,O.id].join(" ").trim())+'"':"",ut+=">",ut+=X.text?'<title id="'+Dt(X.id)+'">'+Dt(X.text)+"</title>":"",ut+=O.text?'<description id="'+Dt(O.id)+'">'+Dt(O.text)+"</description>":"",ut+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',ut+='<path d="',D=0;D<I.getModuleCount();D+=1)for(Gt=D*L+G,ft=0;ft<I.getModuleCount();ft+=1)I.isDark(D,ft)&&(lt=ft*L+G,ut+="M"+lt+","+Gt+Ut);return ut+='" stroke="transparent" fill="black"/>',ut+="</svg>",ut},I.createDataURL=function(L,G){L=L||2,G=typeof G>"u"?L*4:G;var O=I.getModuleCount()*L+G*2,X=G,j=O-G;return m(O,O,function(nt,ft){if(X<=nt&&nt<j&&X<=ft&&ft<j){var lt=Math.floor((nt-X)/L),D=Math.floor((ft-X)/L);return I.isDark(D,lt)?0:1}else return 1})},I.createImgTag=function(L,G,O){L=L||2,G=typeof G>"u"?L*4:G;var X=I.getModuleCount()*L+G*2,j="";return j+="<img",j+=' src="',j+=I.createDataURL(L,G),j+='"',j+=' width="',j+=X,j+='"',j+=' height="',j+=X,j+='"',O&&(j+=' alt="',j+=Dt(O),j+='"'),j+="/>",j};var Dt=function(L){for(var G="",O=0;O<L.length;O+=1){var X=L.charAt(O);switch(X){case"<":G+="&lt;";break;case">":G+="&gt;";break;case"&":G+="&amp;";break;case'"':G+="&quot;";break;default:G+=X;break}}return G},et=function(L){var G=1;L=typeof L>"u"?G*2:L;var O=I.getModuleCount()*G+L*2,X=L,j=O-L,nt,ft,lt,D,Gt,ut={"\u2588\u2588":"\u2588","\u2588 ":"\u2580"," \u2588":"\u2584","  ":" "},Ut={"\u2588\u2588":"\u2580","\u2588 ":"\u2580"," \u2588":" ","  ":" "},Y="";for(nt=0;nt<O;nt+=2){for(lt=Math.floor((nt-X)/G),D=Math.floor((nt+1-X)/G),ft=0;ft<O;ft+=1)Gt="\u2588",X<=ft&&ft<j&&X<=nt&&nt<j&&I.isDark(lt,Math.floor((ft-X)/G))&&(Gt=" "),X<=ft&&ft<j&&X<=nt+1&&nt+1<j&&I.isDark(D,Math.floor((ft-X)/G))?Gt+=" ":Gt+="\u2588",Y+=L<1&&nt+1>=j?Ut[Gt]:ut[Gt];Y+=`
`}return O%2&&L>0?Y.substring(0,Y.length-O-1)+Array(O+1).join("\u2580"):Y.substring(0,Y.length-1)};return I.createASCII=function(L,G){if(L=L||1,L<2)return et(G);L-=1,G=typeof G>"u"?L*2:G;var O=I.getModuleCount()*L+G*2,X=G,j=O-G,nt,ft,lt,D,Gt=Array(L+1).join("\u2588\u2588"),ut=Array(L+1).join("  "),Ut="",Y="";for(nt=0;nt<O;nt+=1){for(lt=Math.floor((nt-X)/L),Y="",ft=0;ft<O;ft+=1)D=1,X<=ft&&ft<j&&X<=nt&&nt<j&&I.isDark(lt,Math.floor((ft-X)/L))&&(D=0),Y+=D?Gt:ut;for(lt=0;lt<L;lt+=1)Ut+=Y+`
`}return Ut.substring(0,Ut.length-1)},I.renderTo2dContext=function(L,G){G=G||2;for(var O=I.getModuleCount(),X=0;X<O;X++)for(var j=0;j<O;j++)L.fillStyle=I.isDark(X,j)?"black":"white",L.fillRect(X*G,j*G,G,G)},I};n.stringToBytesFuncs={default:function(_){for(var x=[],M=0;M<_.length;M+=1){var R=_.charCodeAt(M);x.push(R&255)}return x}},n.stringToBytes=n.stringToBytesFuncs.default,n.createStringToBytes=function(_,x){var M=(function(){for(var b=y(_),w=function(){var z=b.read();if(z==-1)throw"eof";return z},E=0,T={};;){var g=b.read();if(g==-1)break;var v=w(),I=w(),N=w(),U=String.fromCharCode(g<<8|v),k=I<<8|N;T[U]=k,E+=1}if(E!=x)throw E+" != "+x;return T})(),R=63;return function(b){for(var w=[],E=0;E<b.length;E+=1){var T=b.charCodeAt(E);if(T<128)w.push(T);else{var g=M[b.charAt(E)];typeof g=="number"?(g&255)==g?w.push(g):(w.push(g>>>8),w.push(g&255)):w.push(R)}}return w}};var t={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},e={L:1,M:0,Q:3,H:2},i={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},s=(function(){var _=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],x=1335,M=7973,R=21522,b={},w=function(E){for(var T=0;E!=0;)T+=1,E>>>=1;return T};return b.getBCHTypeInfo=function(E){for(var T=E<<10;w(T)-w(x)>=0;)T^=x<<w(T)-w(x);return(E<<10|T)^R},b.getBCHTypeNumber=function(E){for(var T=E<<12;w(T)-w(M)>=0;)T^=M<<w(T)-w(M);return E<<12|T},b.getPatternPosition=function(E){return _[E-1]},b.getMaskFunction=function(E){switch(E){case i.PATTERN000:return function(T,g){return(T+g)%2==0};case i.PATTERN001:return function(T,g){return T%2==0};case i.PATTERN010:return function(T,g){return g%3==0};case i.PATTERN011:return function(T,g){return(T+g)%3==0};case i.PATTERN100:return function(T,g){return(Math.floor(T/2)+Math.floor(g/3))%2==0};case i.PATTERN101:return function(T,g){return T*g%2+T*g%3==0};case i.PATTERN110:return function(T,g){return(T*g%2+T*g%3)%2==0};case i.PATTERN111:return function(T,g){return(T*g%3+(T+g)%2)%2==0};default:throw"bad maskPattern:"+E}},b.getErrorCorrectPolynomial=function(E){for(var T=a([1],0),g=0;g<E;g+=1)T=T.multiply(a([1,r.gexp(g)],0));return T},b.getLengthInBits=function(E,T){if(1<=T&&T<10)switch(E){case t.MODE_NUMBER:return 10;case t.MODE_ALPHA_NUM:return 9;case t.MODE_8BIT_BYTE:return 8;case t.MODE_KANJI:return 8;default:throw"mode:"+E}else if(T<27)switch(E){case t.MODE_NUMBER:return 12;case t.MODE_ALPHA_NUM:return 11;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 10;default:throw"mode:"+E}else if(T<41)switch(E){case t.MODE_NUMBER:return 14;case t.MODE_ALPHA_NUM:return 13;case t.MODE_8BIT_BYTE:return 16;case t.MODE_KANJI:return 12;default:throw"mode:"+E}else throw"type:"+T},b.getLostPoint=function(E){for(var T=E.getModuleCount(),g=0,v=0;v<T;v+=1)for(var I=0;I<T;I+=1){for(var N=0,U=E.isDark(v,I),k=-1;k<=1;k+=1)if(!(v+k<0||T<=v+k))for(var z=-1;z<=1;z+=1)I+z<0||T<=I+z||k==0&&z==0||U==E.isDark(v+k,I+z)&&(N+=1);N>5&&(g+=3+N-5)}for(var v=0;v<T-1;v+=1)for(var I=0;I<T-1;I+=1){var K=0;E.isDark(v,I)&&(K+=1),E.isDark(v+1,I)&&(K+=1),E.isDark(v,I+1)&&(K+=1),E.isDark(v+1,I+1)&&(K+=1),(K==0||K==4)&&(g+=3)}for(var v=0;v<T;v+=1)for(var I=0;I<T-6;I+=1)E.isDark(v,I)&&!E.isDark(v,I+1)&&E.isDark(v,I+2)&&E.isDark(v,I+3)&&E.isDark(v,I+4)&&!E.isDark(v,I+5)&&E.isDark(v,I+6)&&(g+=40);for(var I=0;I<T;I+=1)for(var v=0;v<T-6;v+=1)E.isDark(v,I)&&!E.isDark(v+1,I)&&E.isDark(v+2,I)&&E.isDark(v+3,I)&&E.isDark(v+4,I)&&!E.isDark(v+5,I)&&E.isDark(v+6,I)&&(g+=40);for(var F=0,I=0;I<T;I+=1)for(var v=0;v<T;v+=1)E.isDark(v,I)&&(F+=1);var tt=Math.abs(100*F/T/T-50)/5;return g+=tt*10,g},b})(),r=(function(){for(var _=new Array(256),x=new Array(256),M=0;M<8;M+=1)_[M]=1<<M;for(var M=8;M<256;M+=1)_[M]=_[M-4]^_[M-5]^_[M-6]^_[M-8];for(var M=0;M<255;M+=1)x[_[M]]=M;var R={};return R.glog=function(b){if(b<1)throw"glog("+b+")";return x[b]},R.gexp=function(b){for(;b<0;)b+=255;for(;b>=256;)b-=255;return _[b]},R})();function a(_,x){if(typeof _.length>"u")throw _.length+"/"+x;var M=(function(){for(var b=0;b<_.length&&_[b]==0;)b+=1;for(var w=new Array(_.length-b+x),E=0;E<_.length-b;E+=1)w[E]=_[E+b];return w})(),R={};return R.getAt=function(b){return M[b]},R.getLength=function(){return M.length},R.multiply=function(b){for(var w=new Array(R.getLength()+b.getLength()-1),E=0;E<R.getLength();E+=1)for(var T=0;T<b.getLength();T+=1)w[E+T]^=r.gexp(r.glog(R.getAt(E))+r.glog(b.getAt(T)));return a(w,0)},R.mod=function(b){if(R.getLength()-b.getLength()<0)return R;for(var w=r.glog(R.getAt(0))-r.glog(b.getAt(0)),E=new Array(R.getLength()),T=0;T<R.getLength();T+=1)E[T]=R.getAt(T);for(var T=0;T<b.getLength();T+=1)E[T]^=r.gexp(r.glog(b.getAt(T))+w);return a(E,0).mod(b)},R}var o=(function(){var _=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],x=function(b,w){var E={};return E.totalCount=b,E.dataCount=w,E},M={},R=function(b,w){switch(w){case e.L:return _[(b-1)*4+0];case e.M:return _[(b-1)*4+1];case e.Q:return _[(b-1)*4+2];case e.H:return _[(b-1)*4+3];default:return}};return M.getRSBlocks=function(b,w){var E=R(b,w);if(typeof E>"u")throw"bad rs block @ typeNumber:"+b+"/errorCorrectionLevel:"+w;for(var T=E.length/3,g=[],v=0;v<T;v+=1)for(var I=E[v*3+0],N=E[v*3+1],U=E[v*3+2],k=0;k<I;k+=1)g.push(x(N,U));return g},M})(),l=function(){var _=[],x=0,M={};return M.getBuffer=function(){return _},M.getAt=function(R){var b=Math.floor(R/8);return(_[b]>>>7-R%8&1)==1},M.put=function(R,b){for(var w=0;w<b;w+=1)M.putBit((R>>>b-w-1&1)==1)},M.getLengthInBits=function(){return x},M.putBit=function(R){var b=Math.floor(x/8);_.length<=b&&_.push(0),R&&(_[b]|=128>>>x%8),x+=1},M},c=function(_){var x=t.MODE_NUMBER,M=_,R={};R.getMode=function(){return x},R.getLength=function(E){return M.length},R.write=function(E){for(var T=M,g=0;g+2<T.length;)E.put(b(T.substring(g,g+3)),10),g+=3;g<T.length&&(T.length-g==1?E.put(b(T.substring(g,g+1)),4):T.length-g==2&&E.put(b(T.substring(g,g+2)),7))};var b=function(E){for(var T=0,g=0;g<E.length;g+=1)T=T*10+w(E.charAt(g));return T},w=function(E){if("0"<=E&&E<="9")return E.charCodeAt(0)-48;throw"illegal char :"+E};return R},h=function(_){var x=t.MODE_ALPHA_NUM,M=_,R={};R.getMode=function(){return x},R.getLength=function(w){return M.length},R.write=function(w){for(var E=M,T=0;T+1<E.length;)w.put(b(E.charAt(T))*45+b(E.charAt(T+1)),11),T+=2;T<E.length&&w.put(b(E.charAt(T)),6)};var b=function(w){if("0"<=w&&w<="9")return w.charCodeAt(0)-48;if("A"<=w&&w<="Z")return w.charCodeAt(0)-65+10;switch(w){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+w}};return R},u=function(_){var x=t.MODE_8BIT_BYTE,M=_,R=n.stringToBytes(_),b={};return b.getMode=function(){return x},b.getLength=function(w){return R.length},b.write=function(w){for(var E=0;E<R.length;E+=1)w.put(R[E],8)},b},f=function(_){var x=t.MODE_KANJI,M=_,R=n.stringToBytesFuncs.SJIS;if(!R)throw"sjis not supported.";(function(E,T){var g=R(E);if(g.length!=2||(g[0]<<8|g[1])!=T)throw"sjis not supported."})("\u53CB",38726);var b=R(_),w={};return w.getMode=function(){return x},w.getLength=function(E){return~~(b.length/2)},w.write=function(E){for(var T=b,g=0;g+1<T.length;){var v=(255&T[g])<<8|255&T[g+1];if(33088<=v&&v<=40956)v-=33088;else if(57408<=v&&v<=60351)v-=49472;else throw"illegal char at "+(g+1)+"/"+v;v=(v>>>8&255)*192+(v&255),E.put(v,13),g+=2}if(g<T.length)throw"illegal char at "+(g+1)},w},d=function(){var _=[],x={};return x.writeByte=function(M){_.push(M&255)},x.writeShort=function(M){x.writeByte(M),x.writeByte(M>>>8)},x.writeBytes=function(M,R,b){R=R||0,b=b||M.length;for(var w=0;w<b;w+=1)x.writeByte(M[w+R])},x.writeString=function(M){for(var R=0;R<M.length;R+=1)x.writeByte(M.charCodeAt(R))},x.toByteArray=function(){return _},x.toString=function(){var M="";M+="[";for(var R=0;R<_.length;R+=1)R>0&&(M+=","),M+=_[R];return M+="]",M},x},A=function(){var _=0,x=0,M=0,R="",b={},w=function(T){R+=String.fromCharCode(E(T&63))},E=function(T){if(!(T<0)){if(T<26)return 65+T;if(T<52)return 97+(T-26);if(T<62)return 48+(T-52);if(T==62)return 43;if(T==63)return 47}throw"n:"+T};return b.writeByte=function(T){for(_=_<<8|T&255,x+=8,M+=1;x>=6;)w(_>>>x-6),x-=6},b.flush=function(){if(x>0&&(w(_<<6-x),_=0,x=0),M%3!=0)for(var T=3-M%3,g=0;g<T;g+=1)R+="="},b.toString=function(){return R},b},y=function(_){var x=_,M=0,R=0,b=0,w={};w.read=function(){for(;b<8;){if(M>=x.length){if(b==0)return-1;throw"unexpected end of file./"+b}var T=x.charAt(M);if(M+=1,T=="=")return b=0,-1;if(T.match(/^\s$/))continue;R=R<<6|E(T.charCodeAt(0)),b+=6}var g=R>>>b-8&255;return b-=8,g};var E=function(T){if(65<=T&&T<=90)return T-65;if(97<=T&&T<=122)return T-97+26;if(48<=T&&T<=57)return T-48+52;if(T==43)return 62;if(T==47)return 63;throw"c:"+T};return w},p=function(_,x){var M=_,R=x,b=new Array(_*x),w={};w.setPixel=function(v,I,N){b[I*M+v]=N},w.write=function(v){v.writeString("GIF87a"),v.writeShort(M),v.writeShort(R),v.writeByte(128),v.writeByte(0),v.writeByte(0),v.writeByte(0),v.writeByte(0),v.writeByte(0),v.writeByte(255),v.writeByte(255),v.writeByte(255),v.writeString(","),v.writeShort(0),v.writeShort(0),v.writeShort(M),v.writeShort(R),v.writeByte(0);var I=2,N=T(I);v.writeByte(I);for(var U=0;N.length-U>255;)v.writeByte(255),v.writeBytes(N,U,255),U+=255;v.writeByte(N.length-U),v.writeBytes(N,U,N.length-U),v.writeByte(0),v.writeString(";")};var E=function(v){var I=v,N=0,U=0,k={};return k.write=function(z,K){if(z>>>K)throw"length over";for(;N+K>=8;)I.writeByte(255&(z<<N|U)),K-=8-N,z>>>=8-N,U=0,N=0;U=z<<N|U,N=N+K},k.flush=function(){N>0&&I.writeByte(U)},k},T=function(v){for(var I=1<<v,N=(1<<v)+1,U=v+1,k=g(),z=0;z<I;z+=1)k.add(String.fromCharCode(z));k.add(String.fromCharCode(I)),k.add(String.fromCharCode(N));var K=d(),F=E(K);F.write(I,U);var tt=0,at=String.fromCharCode(b[tt]);for(tt+=1;tt<b.length;){var ct=String.fromCharCode(b[tt]);tt+=1,k.contains(at+ct)?at=at+ct:(F.write(k.indexOf(at),U),k.size()<4095&&(k.size()==1<<U&&(U+=1),k.add(at+ct)),at=ct)}return F.write(k.indexOf(at),U),F.write(N,U),F.flush(),K.toByteArray()},g=function(){var v={},I=0,N={};return N.add=function(U){if(N.contains(U))throw"dup key:"+U;v[U]=I,I+=1},N.size=function(){return I},N.indexOf=function(U){return v[U]},N.contains=function(U){return typeof v[U]<"u"},N};return w},m=function(_,x,M){for(var R=p(_,x),b=0;b<x;b+=1)for(var w=0;w<_;w+=1)R.setPixel(w,b,M(w,b));var E=d();R.write(E);for(var T=A(),g=E.toByteArray(),v=0;v<g.length;v+=1)T.writeByte(g[v]);return T.flush(),"data:image/gif;base64,"+T};return n})();(function(){Eh.stringToBytesFuncs["UTF-8"]=function(n){function t(e){for(var i=[],s=0;s<e.length;s++){var r=e.charCodeAt(s);r<128?i.push(r):r<2048?i.push(192|r>>6,128|r&63):r<55296||r>=57344?i.push(224|r>>12,128|r>>6&63,128|r&63):(s++,r=65536+((r&1023)<<10|e.charCodeAt(s)&1023),i.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63))}return i}return t(n)}})();(function(n){typeof define=="function"&&define.amd?define([],n):typeof Th=="object"&&(Ch.exports=n())})(function(){return Eh})});var md=jd(Rh());/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */var Bi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Fi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Zd=0,Ph=1,Qd=2;var Iu=1,pc=2,zn=3,Dn=0,Le=1,We=2,ge=0,us=1,Ih=2,Dh=3,Uh=4,mc=5,un=100,Jd=101,$d=102,tf=103,ef=104,Ss=200,nf=201,sf=202,rf=203,Yo=204,Ko=205,ba=206,af=207,wa=208,of=209,lf=210,cf=211,hf=212,uf=213,df=214,jo=0,Zo=1,Qo=2,ms=3,Jo=4,$o=5,tl=6,el=7,Du=0,ff=1,pf=2,ai=0,gc=1,Ac=2,vc=3,xc=4,mf=5,yc=6,lr=7;var Uu=300,gs=301,As=302,nl=303,il=304,Sa=306,an=1e3,Hn=1001,sl=1002,Ue=1003,gf=1004;var Sr=1005;var bn=1006,po=1007;var Pi=1008;var wn=1009,Lu=1010,Nu=1011,$s=1012,_c=1013,Ii=1014,Vn=1015,fn=1016,Mc=1017,bc=1018,oi=1020,Ou=35902,Bu=1021,Fu=1022,rn=1023,ku=1024,zu=1025,ds=1026,li=1027,Hu=1028,wc=1029,Vu=1030,Sc=1031;var Ec=1033,Kr=33776,jr=33777,Zr=33778,Qr=33779,rl=35840,al=35841,ol=35842,ll=35843,cl=36196,hl=37492,ul=37496,dl=37808,fl=37809,pl=37810,ml=37811,gl=37812,Al=37813,vl=37814,xl=37815,yl=37816,_l=37817,Ml=37818,bl=37819,wl=37820,Sl=37821,Jr=36492,El=36494,Tl=36495,Gu=36283,Cl=36284,Rl=36285,Pl=36286;var ta=2300,Il=2301,mo=2302,Lh=2400,Nh=2401,Oh=2402;var Af=3200,Tc=3201;var Cc=0,vf=1,si="",Ve="srgb",ci="srgb-linear",Rc="display-p3",Ea="display-p3-linear",ea="linear",re="srgb",na="rec709",ia="p3";var ji=7680;var Bh=519,xf=512,yf=513,_f=514,Wu=515,Mf=516,bf=517,wf=518,Sf=519,Fh=35044;var kh="300 es",Gn=2e3,sa=2001,Wn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let i=this._listeners[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},Ne=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],zh=1234567,Ks=Math.PI/180,tr=180/Math.PI;function Es(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ne[n&255]+Ne[n>>8&255]+Ne[n>>16&255]+Ne[n>>24&255]+"-"+Ne[t&255]+Ne[t>>8&255]+"-"+Ne[t>>16&15|64]+Ne[t>>24&255]+"-"+Ne[e&63|128]+Ne[e>>8&255]+"-"+Ne[e>>16&255]+Ne[e>>24&255]+Ne[i&255]+Ne[i>>8&255]+Ne[i>>16&255]+Ne[i>>24&255]).toLowerCase()}function ye(n,t,e){return Math.max(t,Math.min(e,n))}function Pc(n,t){return(n%t+t)%t}function Ef(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function Tf(n,t,e){return n!==t?(e-n)/(t-n):0}function js(n,t,e){return(1-e)*n+e*t}function Cf(n,t,e,i){return js(n,t,1-Math.exp(-e*i))}function Rf(n,t=1){return t-Math.abs(Pc(n,t*2)-t)}function Pf(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function If(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function Df(n,t){return n+Math.floor(Math.random()*(t-n+1))}function Uf(n,t){return n+Math.random()*(t-n)}function Lf(n){return n*(.5-Math.random())}function Nf(n){n!==void 0&&(zh=n);let t=zh+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Of(n){return n*Ks}function Bf(n){return n*tr}function Ff(n){return(n&n-1)===0&&n!==0}function kf(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function zf(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Hf(n,t,e,i,s){let r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+i)/2),h=a((t+i)/2),u=r((t-i)/2),f=a((t-i)/2),d=r((i-t)/2),A=a((i-t)/2);switch(s){case"XYX":n.set(o*h,l*u,l*f,o*c);break;case"YZY":n.set(l*f,o*h,l*u,o*c);break;case"ZXZ":n.set(l*u,l*f,o*h,o*c);break;case"XZX":n.set(o*h,l*A,l*d,o*c);break;case"YXY":n.set(l*d,o*h,l*A,o*c);break;case"ZYZ":n.set(l*A,l*d,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function cs(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function ze(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var Ta={DEG2RAD:Ks,RAD2DEG:tr,generateUUID:Es,clamp:ye,euclideanModulo:Pc,mapLinear:Ef,inverseLerp:Tf,lerp:js,damp:Cf,pingpong:Rf,smoothstep:Pf,smootherstep:If,randInt:Df,randFloat:Uf,randFloatSpread:Lf,seededRandom:Nf,degToRad:Of,radToDeg:Bf,isPowerOfTwo:Ff,ceilPowerOfTwo:kf,floorPowerOfTwo:zf,setQuaternionFromProperEuler:Hf,normalize:ze,denormalize:cs},vt=class n{constructor(t=0,e=0){n.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(ye(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Vt=class n{constructor(t,e,i,s,r,a,o,l,c){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c)}set(t,e,i,s,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],u=i[7],f=i[2],d=i[5],A=i[8],y=s[0],p=s[3],m=s[6],_=s[1],x=s[4],M=s[7],R=s[2],b=s[5],w=s[8];return r[0]=a*y+o*_+l*R,r[3]=a*p+o*x+l*b,r[6]=a*m+o*M+l*w,r[1]=c*y+h*_+u*R,r[4]=c*p+h*x+u*b,r[7]=c*m+h*M+u*w,r[2]=f*y+d*_+A*R,r[5]=f*p+d*x+A*b,r[8]=f*m+d*M+A*w,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-i*r*h+i*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,f=o*l-h*r,d=c*r-a*l,A=e*u+i*f+s*d;if(A===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/A;return t[0]=u*y,t[1]=(s*c-h*i)*y,t[2]=(o*i-s*a)*y,t[3]=f*y,t[4]=(h*e-s*l)*y,t[5]=(s*r-o*e)*y,t[6]=d*y,t[7]=(i*l-c*e)*y,t[8]=(a*e-i*r)*y,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(go.makeScale(t,e)),this}rotate(t){return this.premultiply(go.makeRotation(-t)),this}translate(t,e){return this.premultiply(go.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},go=new Vt;function qu(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function ra(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Vf(){let n=ra("canvas");return n.style.display="block",n}var Hh={};function $r(n){n in Hh||(Hh[n]=!0,console.warn(n))}function Gf(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function Wf(n){let t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function qf(n){let t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var Vh=new Vt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Gh=new Vt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Vs={[ci]:{transfer:ea,primaries:na,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n,fromReference:n=>n},[Ve]:{transfer:re,primaries:na,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Ea]:{transfer:ea,primaries:ia,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.applyMatrix3(Gh),fromReference:n=>n.applyMatrix3(Vh)},[Rc]:{transfer:re,primaries:ia,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.convertSRGBToLinear().applyMatrix3(Gh),fromReference:n=>n.applyMatrix3(Vh).convertLinearToSRGB()}},Xf=new Set([ci,Ea]),jt={enabled:!0,_workingColorSpace:ci,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!Xf.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,t,e){if(this.enabled===!1||t===e||!t||!e)return n;let i=Vs[t].toReference,s=Vs[e].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,t){return this.convert(n,this._workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this._workingColorSpace)},getPrimaries:function(n){return Vs[n].primaries},getTransfer:function(n){return n===si?ea:Vs[n].transfer},getLuminanceCoefficients:function(n,t=this._workingColorSpace){return n.fromArray(Vs[t].luminanceCoefficients)}};function fs(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ao(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Zi,Dl=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Zi===void 0&&(Zi=ra("canvas")),Zi.width=t.width,Zi.height=t.height;let i=Zi.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=Zi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=ra("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=fs(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(fs(e[i]/255)*255):e[i]=fs(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Yf=0,aa=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Yf++}),this.uuid=Es(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(vo(s[a].image)):r.push(vo(s[a]))}else r=vo(s);i.url=r}return e||(t.images[this.uuid]=i),i}};function vo(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Dl.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Kf=0,Ke=class n extends Wn{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=Hn,s=Hn,r=bn,a=Pi,o=rn,l=wn,c=n.DEFAULT_ANISOTROPY,h=si){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Kf++}),this.uuid=Es(),this.name="",this.source=new aa(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new vt(0,0),this.repeat=new vt(1,1),this.center=new vt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Vt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Uu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case an:t.x=t.x-Math.floor(t.x);break;case Hn:t.x=t.x<0?0:1;break;case sl:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case an:t.y=t.y-Math.floor(t.y);break;case Hn:t.y=t.y<0?0:1;break;case sl:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Ke.DEFAULT_IMAGE=null;Ke.DEFAULT_MAPPING=Uu;Ke.DEFAULT_ANISOTROPY=1;var fe=class n{constructor(t=0,e=0,i=0,s=1){n.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r,l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],A=l[9],y=l[2],p=l[6],m=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-y)<.01&&Math.abs(A-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+y)<.1&&Math.abs(A+p)<.1&&Math.abs(c+d+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let x=(c+1)/2,M=(d+1)/2,R=(m+1)/2,b=(h+f)/4,w=(u+y)/4,E=(A+p)/4;return x>M&&x>R?x<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(x),s=b/i,r=w/i):M>R?M<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),i=b/s,r=E/s):R<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),i=w/r,s=E/r),this.set(i,s,r,e),this}let _=Math.sqrt((p-A)*(p-A)+(u-y)*(u-y)+(f-h)*(f-h));return Math.abs(_)<.001&&(_=1),this.x=(p-A)/_,this.y=(u-y)/_,this.z=(f-h)/_,this.w=Math.acos((c+d+m-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ul=class extends Wn{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new fe(0,0,t,e),this.scissorTest=!1,this.viewport=new fe(0,0,t,e);let s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:bn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);let r=new Ke(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];let a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new aa(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Be=class extends Ul{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},oa=class extends Ke{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ue,this.minFilter=Ue,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Ll=class extends Ke{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ue,this.minFilter=Ue,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Sn=class{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let l=i[s+0],c=i[s+1],h=i[s+2],u=i[s+3],f=r[a+0],d=r[a+1],A=r[a+2],y=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=f,t[e+1]=d,t[e+2]=A,t[e+3]=y;return}if(u!==y||l!==f||c!==d||h!==A){let p=1-o,m=l*f+c*d+h*A+u*y,_=m>=0?1:-1,x=1-m*m;if(x>Number.EPSILON){let R=Math.sqrt(x),b=Math.atan2(R,m*_);p=Math.sin(p*b)/R,o=Math.sin(o*b)/R}let M=o*_;if(l=l*p+f*M,c=c*p+d*M,h=h*p+A*M,u=u*p+y*M,p===1-o){let R=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=R,c*=R,h*=R,u*=R}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,a){let o=i[s],l=i[s+1],c=i[s+2],h=i[s+3],u=r[a],f=r[a+1],d=r[a+2],A=r[a+3];return t[e]=o*A+h*u+l*d-c*f,t[e+1]=l*A+h*f+c*u-o*d,t[e+2]=c*A+h*d+o*f-l*u,t[e+3]=h*A-o*u-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(s/2),u=o(r/2),f=l(i/2),d=l(s/2),A=l(r/2);switch(a){case"XYZ":this._x=f*h*u+c*d*A,this._y=c*d*u-f*h*A,this._z=c*h*A+f*d*u,this._w=c*h*u-f*d*A;break;case"YXZ":this._x=f*h*u+c*d*A,this._y=c*d*u-f*h*A,this._z=c*h*A-f*d*u,this._w=c*h*u+f*d*A;break;case"ZXY":this._x=f*h*u-c*d*A,this._y=c*d*u+f*h*A,this._z=c*h*A+f*d*u,this._w=c*h*u-f*d*A;break;case"ZYX":this._x=f*h*u-c*d*A,this._y=c*d*u+f*h*A,this._z=c*h*A-f*d*u,this._w=c*h*u+f*d*A;break;case"YZX":this._x=f*h*u+c*d*A,this._y=c*d*u+f*h*A,this._z=c*h*A-f*d*u,this._w=c*h*u-f*d*A;break;case"XZY":this._x=f*h*u-c*d*A,this._y=c*d*u-f*h*A,this._z=c*h*A+f*d*u,this._w=c*h*u+f*d*A;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=i+o+u;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(a-s)*d}else if(i>o&&i>u){let d=2*Math.sqrt(1+i-o-u);this._w=(h-l)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+c)/d}else if(o>u){let d=2*Math.sqrt(1+o-i-u);this._w=(r-c)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(l+h)/d}else{let d=2*Math.sqrt(1+u-i-o);this._w=(a-s)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ye(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-s*o,this._w=a*h-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let i=this._x,s=this._y,r=this._z,a=this._w,o=a*t._w+i*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;let l=1-o*o;if(l<=Number.EPSILON){let d=1-e;return this._w=d*a+e*this._w,this._x=d*i+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=a*u+this._w*f,this._x=i*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},B=class n{constructor(t=0,e=0,i=0){n.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Wh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Wh.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*i),h=2*(o*e-r*s),u=2*(r*i-a*e);return this.x=e+l*c+a*u-o*h,this.y=i+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return xo.copy(this).projectOnVector(t),this.sub(xo)}reflect(t){return this.sub(xo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(ye(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},xo=new B,Wh=new Sn,Di=class{constructor(t=new B(1/0,1/0,1/0),e=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(xn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(xn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=xn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,xn):xn.fromBufferAttribute(r,a),xn.applyMatrix4(t.matrixWorld),this.expandByPoint(xn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Er.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Er.copy(i.boundingBox)),Er.applyMatrix4(t.matrixWorld),this.union(Er)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,xn),xn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Gs),Tr.subVectors(this.max,Gs),Qi.subVectors(t.a,Gs),Ji.subVectors(t.b,Gs),$i.subVectors(t.c,Gs),Jn.subVectors(Ji,Qi),$n.subVectors($i,Ji),_i.subVectors(Qi,$i);let e=[0,-Jn.z,Jn.y,0,-$n.z,$n.y,0,-_i.z,_i.y,Jn.z,0,-Jn.x,$n.z,0,-$n.x,_i.z,0,-_i.x,-Jn.y,Jn.x,0,-$n.y,$n.x,0,-_i.y,_i.x,0];return!yo(e,Qi,Ji,$i,Tr)||(e=[1,0,0,0,1,0,0,0,1],!yo(e,Qi,Ji,$i,Tr))?!1:(Cr.crossVectors(Jn,$n),e=[Cr.x,Cr.y,Cr.z],yo(e,Qi,Ji,$i,Tr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,xn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(xn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Nn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Nn=[new B,new B,new B,new B,new B,new B,new B,new B],xn=new B,Er=new Di,Qi=new B,Ji=new B,$i=new B,Jn=new B,$n=new B,_i=new B,Gs=new B,Tr=new B,Cr=new B,Mi=new B;function yo(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Mi.fromArray(n,r);let o=s.x*Math.abs(Mi.x)+s.y*Math.abs(Mi.y)+s.z*Math.abs(Mi.z),l=t.dot(Mi),c=e.dot(Mi),h=i.dot(Mi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var jf=new Di,Ws=new B,_o=new B,er=class{constructor(t=new B,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):jf.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ws.subVectors(t,this.center);let e=Ws.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Ws,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(_o.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ws.copy(t.center).add(_o)),this.expandByPoint(Ws.copy(t.center).sub(_o))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},On=new B,Mo=new B,Rr=new B,ti=new B,bo=new B,Pr=new B,wo=new B,nr=class{constructor(t=new B,e=new B(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,On)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=On.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(On.copy(this.origin).addScaledVector(this.direction,e),On.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Mo.copy(t).add(e).multiplyScalar(.5),Rr.copy(e).sub(t).normalize(),ti.copy(this.origin).sub(Mo);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Rr),o=ti.dot(this.direction),l=-ti.dot(Rr),c=ti.lengthSq(),h=Math.abs(1-a*a),u,f,d,A;if(h>0)if(u=a*l-o,f=a*o-l,A=r*h,u>=0)if(f>=-A)if(f<=A){let y=1/h;u*=y,f*=y,d=u*(u+a*f+2*o)+f*(a*u+f+2*l)+c}else f=r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;else f<=-A?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c):f<=A?(u=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Mo).addScaledVector(Rr,f),d}intersectSphere(t,e){On.subVectors(t.center,this.origin);let i=On.dot(this.direction),s=On.dot(On)-i*i,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(i=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(i=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,On)!==null}intersectTriangle(t,e,i,s,r){bo.subVectors(e,t),Pr.subVectors(i,t),wo.crossVectors(bo,Pr);let a=this.direction.dot(wo),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ti.subVectors(this.origin,t);let l=o*this.direction.dot(Pr.crossVectors(ti,Pr));if(l<0)return null;let c=o*this.direction.dot(bo.cross(ti));if(c<0||l+c>a)return null;let h=-o*ti.dot(wo);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ie=class n{constructor(t,e,i,s,r,a,o,l,c,h,u,f,d,A,y,p){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c,h,u,f,d,A,y,p)}set(t,e,i,s,r,a,o,l,c,h,u,f,d,A,y,p){let m=this.elements;return m[0]=t,m[4]=e,m[8]=i,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=f,m[3]=d,m[7]=A,m[11]=y,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,i=t.elements,s=1/ts.setFromMatrixColumn(t,0).length(),r=1/ts.setFromMatrixColumn(t,1).length(),a=1/ts.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let f=a*h,d=a*u,A=o*h,y=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=d+A*c,e[5]=f-y*c,e[9]=-o*l,e[2]=y-f*c,e[6]=A+d*c,e[10]=a*l}else if(t.order==="YXZ"){let f=l*h,d=l*u,A=c*h,y=c*u;e[0]=f+y*o,e[4]=A*o-d,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=d*o-A,e[6]=y+f*o,e[10]=a*l}else if(t.order==="ZXY"){let f=l*h,d=l*u,A=c*h,y=c*u;e[0]=f-y*o,e[4]=-a*u,e[8]=A+d*o,e[1]=d+A*o,e[5]=a*h,e[9]=y-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let f=a*h,d=a*u,A=o*h,y=o*u;e[0]=l*h,e[4]=A*c-d,e[8]=f*c+y,e[1]=l*u,e[5]=y*c+f,e[9]=d*c-A,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let f=a*l,d=a*c,A=o*l,y=o*c;e[0]=l*h,e[4]=y-f*u,e[8]=A*u+d,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=d*u+A,e[10]=f-y*u}else if(t.order==="XZY"){let f=a*l,d=a*c,A=o*l,y=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+y,e[5]=a*h,e[9]=d*u-A,e[2]=A*u-d,e[6]=o*h,e[10]=y*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Zf,t,Qf)}lookAt(t,e,i){let s=this.elements;return nn.subVectors(t,e),nn.lengthSq()===0&&(nn.z=1),nn.normalize(),ei.crossVectors(i,nn),ei.lengthSq()===0&&(Math.abs(i.z)===1?nn.x+=1e-4:nn.z+=1e-4,nn.normalize(),ei.crossVectors(i,nn)),ei.normalize(),Ir.crossVectors(nn,ei),s[0]=ei.x,s[4]=Ir.x,s[8]=nn.x,s[1]=ei.y,s[5]=Ir.y,s[9]=nn.y,s[2]=ei.z,s[6]=Ir.z,s[10]=nn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],u=i[5],f=i[9],d=i[13],A=i[2],y=i[6],p=i[10],m=i[14],_=i[3],x=i[7],M=i[11],R=i[15],b=s[0],w=s[4],E=s[8],T=s[12],g=s[1],v=s[5],I=s[9],N=s[13],U=s[2],k=s[6],z=s[10],K=s[14],F=s[3],tt=s[7],at=s[11],ct=s[15];return r[0]=a*b+o*g+l*U+c*F,r[4]=a*w+o*v+l*k+c*tt,r[8]=a*E+o*I+l*z+c*at,r[12]=a*T+o*N+l*K+c*ct,r[1]=h*b+u*g+f*U+d*F,r[5]=h*w+u*v+f*k+d*tt,r[9]=h*E+u*I+f*z+d*at,r[13]=h*T+u*N+f*K+d*ct,r[2]=A*b+y*g+p*U+m*F,r[6]=A*w+y*v+p*k+m*tt,r[10]=A*E+y*I+p*z+m*at,r[14]=A*T+y*N+p*K+m*ct,r[3]=_*b+x*g+M*U+R*F,r[7]=_*w+x*v+M*k+R*tt,r[11]=_*E+x*I+M*z+R*at,r[15]=_*T+x*N+M*K+R*ct,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],d=t[14],A=t[3],y=t[7],p=t[11],m=t[15];return A*(+r*l*u-s*c*u-r*o*f+i*c*f+s*o*d-i*l*d)+y*(+e*l*d-e*c*f+r*a*f-s*a*d+s*c*h-r*l*h)+p*(+e*c*u-e*o*d-r*a*u+i*a*d+r*o*h-i*c*h)+m*(-s*o*h-e*l*u+e*o*f+s*a*u-i*a*f+i*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],d=t[11],A=t[12],y=t[13],p=t[14],m=t[15],_=u*p*c-y*f*c+y*l*d-o*p*d-u*l*m+o*f*m,x=A*f*c-h*p*c-A*l*d+a*p*d+h*l*m-a*f*m,M=h*y*c-A*u*c+A*o*d-a*y*d-h*o*m+a*u*m,R=A*u*l-h*y*l-A*o*f+a*y*f+h*o*p-a*u*p,b=e*_+i*x+s*M+r*R;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let w=1/b;return t[0]=_*w,t[1]=(y*f*r-u*p*r-y*s*d+i*p*d+u*s*m-i*f*m)*w,t[2]=(o*p*r-y*l*r+y*s*c-i*p*c-o*s*m+i*l*m)*w,t[3]=(u*l*r-o*f*r-u*s*c+i*f*c+o*s*d-i*l*d)*w,t[4]=x*w,t[5]=(h*p*r-A*f*r+A*s*d-e*p*d-h*s*m+e*f*m)*w,t[6]=(A*l*r-a*p*r-A*s*c+e*p*c+a*s*m-e*l*m)*w,t[7]=(a*f*r-h*l*r+h*s*c-e*f*c-a*s*d+e*l*d)*w,t[8]=M*w,t[9]=(A*u*r-h*y*r-A*i*d+e*y*d+h*i*m-e*u*m)*w,t[10]=(a*y*r-A*o*r+A*i*c-e*y*c-a*i*m+e*o*m)*w,t[11]=(h*o*r-a*u*r-h*i*c+e*u*c+a*i*d-e*o*d)*w,t[12]=R*w,t[13]=(h*y*s-A*u*s+A*i*f-e*y*f-h*i*p+e*u*p)*w,t[14]=(A*o*s-a*y*s-A*i*l+e*y*l+a*i*p-e*o*p)*w,t[15]=(a*u*s-h*o*s+h*i*l-e*u*l-a*i*f+e*o*f)*w,this}scale(t){let e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+i,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,f=r*c,d=r*h,A=r*u,y=a*h,p=a*u,m=o*u,_=l*c,x=l*h,M=l*u,R=i.x,b=i.y,w=i.z;return s[0]=(1-(y+m))*R,s[1]=(d+M)*R,s[2]=(A-x)*R,s[3]=0,s[4]=(d-M)*b,s[5]=(1-(f+m))*b,s[6]=(p+_)*b,s[7]=0,s[8]=(A+x)*w,s[9]=(p-_)*w,s[10]=(1-(f+y))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){let s=this.elements,r=ts.set(s[0],s[1],s[2]).length(),a=ts.set(s[4],s[5],s[6]).length(),o=ts.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],yn.copy(this);let c=1/r,h=1/a,u=1/o;return yn.elements[0]*=c,yn.elements[1]*=c,yn.elements[2]*=c,yn.elements[4]*=h,yn.elements[5]*=h,yn.elements[6]*=h,yn.elements[8]*=u,yn.elements[9]*=u,yn.elements[10]*=u,e.setFromRotationMatrix(yn),i.x=r,i.y=a,i.z=o,this}makePerspective(t,e,i,s,r,a,o=Gn){let l=this.elements,c=2*r/(e-t),h=2*r/(i-s),u=(e+t)/(e-t),f=(i+s)/(i-s),d,A;if(o===Gn)d=-(a+r)/(a-r),A=-2*a*r/(a-r);else if(o===sa)d=-a/(a-r),A=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=A,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=Gn){let l=this.elements,c=1/(e-t),h=1/(i-s),u=1/(a-r),f=(e+t)*c,d=(i+s)*h,A,y;if(o===Gn)A=(a+r)*u,y=-2*u;else if(o===sa)A=r*u,y=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=y,l[14]=-A,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}},ts=new B,yn=new ie,Zf=new B(0,0,0),Qf=new B(1,1,1),ei=new B,Ir=new B,nn=new B,qh=new ie,Xh=new Sn,Un=class n{constructor(t=0,e=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(ye(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ye(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(ye(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ye(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ye(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-ye(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return qh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(qh,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Xh.setFromEuler(this),this.setFromQuaternion(Xh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Un.DEFAULT_ORDER="XYZ";var la=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Jf=0,Yh=new B,es=new Sn,Bn=new ie,Dr=new B,qs=new B,$f=new B,tp=new Sn,Kh=new B(1,0,0),jh=new B(0,1,0),Zh=new B(0,0,1),Qh={type:"added"},ep={type:"removed"},ns={type:"childadded",child:null},So={type:"childremoved",child:null},je=class n extends Wn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Jf++}),this.uuid=Es(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new B,e=new Un,i=new Sn,s=new B(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ie},normalMatrix:{value:new Vt}}),this.matrix=new ie,this.matrixWorld=new ie,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new la,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return es.setFromAxisAngle(t,e),this.quaternion.multiply(es),this}rotateOnWorldAxis(t,e){return es.setFromAxisAngle(t,e),this.quaternion.premultiply(es),this}rotateX(t){return this.rotateOnAxis(Kh,t)}rotateY(t){return this.rotateOnAxis(jh,t)}rotateZ(t){return this.rotateOnAxis(Zh,t)}translateOnAxis(t,e){return Yh.copy(t).applyQuaternion(this.quaternion),this.position.add(Yh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Kh,t)}translateY(t){return this.translateOnAxis(jh,t)}translateZ(t){return this.translateOnAxis(Zh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Bn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Dr.copy(t):Dr.set(t,e,i);let s=this.parent;this.updateWorldMatrix(!0,!1),qs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Bn.lookAt(qs,Dr,this.up):Bn.lookAt(Dr,qs,this.up),this.quaternion.setFromRotationMatrix(Bn),s&&(Bn.extractRotation(s.matrixWorld),es.setFromRotationMatrix(Bn),this.quaternion.premultiply(es.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Qh),ns.child=t,this.dispatchEvent(ns),ns.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(ep),So.child=t,this.dispatchEvent(So),So.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Bn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Bn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Bn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Qh),ns.child=t,this.dispatchEvent(ns),ns.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qs,t,$f),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qs,tp,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),f=a(t.skeletons),d=a(t.animations),A=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),d.length>0&&(i.animations=d),A.length>0&&(i.nodes=A)}return i.object=s,i;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}};je.DEFAULT_UP=new B(0,1,0);je.DEFAULT_MATRIX_AUTO_UPDATE=!0;je.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var _n=new B,Fn=new B,Eo=new B,kn=new B,is=new B,ss=new B,Jh=new B,To=new B,Co=new B,Ro=new B,Po=new fe,Io=new fe,Do=new fe,Ci=class n{constructor(t=new B,e=new B,i=new B){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),_n.subVectors(t,e),s.cross(_n);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){_n.subVectors(s,e),Fn.subVectors(i,e),Eo.subVectors(t,e);let a=_n.dot(_n),o=_n.dot(Fn),l=_n.dot(Eo),c=Fn.dot(Fn),h=Fn.dot(Eo),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;let f=1/u,d=(c*l-o*h)*f,A=(a*h-o*l)*f;return r.set(1-d-A,A,d)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,kn)===null?!1:kn.x>=0&&kn.y>=0&&kn.x+kn.y<=1}static getInterpolation(t,e,i,s,r,a,o,l){return this.getBarycoord(t,e,i,s,kn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,kn.x),l.addScaledVector(a,kn.y),l.addScaledVector(o,kn.z),l)}static getInterpolatedAttribute(t,e,i,s,r,a){return Po.setScalar(0),Io.setScalar(0),Do.setScalar(0),Po.fromBufferAttribute(t,e),Io.fromBufferAttribute(t,i),Do.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Po,r.x),a.addScaledVector(Io,r.y),a.addScaledVector(Do,r.z),a}static isFrontFacing(t,e,i,s){return _n.subVectors(i,e),Fn.subVectors(t,e),_n.cross(Fn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return _n.subVectors(this.c,this.b),Fn.subVectors(this.a,this.b),_n.cross(Fn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,s=this.b,r=this.c,a,o;is.subVectors(s,i),ss.subVectors(r,i),To.subVectors(t,i);let l=is.dot(To),c=ss.dot(To);if(l<=0&&c<=0)return e.copy(i);Co.subVectors(t,s);let h=is.dot(Co),u=ss.dot(Co);if(h>=0&&u<=h)return e.copy(s);let f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(i).addScaledVector(is,a);Ro.subVectors(t,r);let d=is.dot(Ro),A=ss.dot(Ro);if(A>=0&&d<=A)return e.copy(r);let y=d*c-l*A;if(y<=0&&c>=0&&A<=0)return o=c/(c-A),e.copy(i).addScaledVector(ss,o);let p=h*A-d*u;if(p<=0&&u-h>=0&&d-A>=0)return Jh.subVectors(r,s),o=(u-h)/(u-h+(d-A)),e.copy(s).addScaledVector(Jh,o);let m=1/(p+y+f);return a=y*m,o=f*m,e.copy(i).addScaledVector(is,a).addScaledVector(ss,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Xu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ni={h:0,s:0,l:0},Ur={h:0,s:0,l:0};function Uo(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var Lt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ve){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,jt.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=jt.workingColorSpace){return this.r=t,this.g=e,this.b=i,jt.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=jt.workingColorSpace){if(t=Pc(t,1),e=ye(e,0,1),i=ye(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=Uo(a,r,t+1/3),this.g=Uo(a,r,t),this.b=Uo(a,r,t-1/3)}return jt.toWorkingColorSpace(this,s),this}setStyle(t,e=Ve){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ve){let i=Xu[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=fs(t.r),this.g=fs(t.g),this.b=fs(t.b),this}copyLinearToSRGB(t){return this.r=Ao(t.r),this.g=Ao(t.g),this.b=Ao(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ve){return jt.fromWorkingColorSpace(Oe.copy(this),t),Math.round(ye(Oe.r*255,0,255))*65536+Math.round(ye(Oe.g*255,0,255))*256+Math.round(ye(Oe.b*255,0,255))}getHexString(t=Ve){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=jt.workingColorSpace){jt.fromWorkingColorSpace(Oe.copy(this),e);let i=Oe.r,s=Oe.g,r=Oe.b,a=Math.max(i,s,r),o=Math.min(i,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case i:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-i)/u+2;break;case r:l=(i-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=jt.workingColorSpace){return jt.fromWorkingColorSpace(Oe.copy(this),e),t.r=Oe.r,t.g=Oe.g,t.b=Oe.b,t}getStyle(t=Ve){jt.fromWorkingColorSpace(Oe.copy(this),t);let e=Oe.r,i=Oe.g,s=Oe.b;return t!==Ve?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(ni),this.setHSL(ni.h+t,ni.s+e,ni.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(ni),t.getHSL(Ur);let i=js(ni.h,Ur.h,e),s=js(ni.s,Ur.s,e),r=js(ni.l,Ur.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Oe=new Lt;Lt.NAMES=Xu;var np=0,qn=class extends Wn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:np++}),this.uuid=Es(),this.name="",this.type="Material",this.blending=us,this.side=Dn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Yo,this.blendDst=Ko,this.blendEquation=un,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Lt(0,0,0),this.blendAlpha=0,this.depthFunc=ms,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Bh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ji,this.stencilZFail=ji,this.stencilZPass=ji,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==us&&(i.blending=this.blending),this.side!==Dn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Yo&&(i.blendSrc=this.blendSrc),this.blendDst!==Ko&&(i.blendDst=this.blendDst),this.blendEquation!==un&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ms&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Bh&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ji&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ji&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ji&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Xn=class extends qn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Lt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Un,this.combine=Du,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var ve=new B,Lr=new vt,_e=class{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Fh,this.updateRanges=[],this.gpuType=Vn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Lr.fromBufferAttribute(this,e),Lr.applyMatrix3(t),this.setXY(e,Lr.x,Lr.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix3(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix4(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ve.fromBufferAttribute(this,e),ve.applyNormalMatrix(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ve.fromBufferAttribute(this,e),ve.transformDirection(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=cs(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ze(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=cs(e,this.array)),e}setX(t,e){return this.normalized&&(e=ze(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=cs(e,this.array)),e}setY(t,e){return this.normalized&&(e=ze(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=cs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ze(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=cs(e,this.array)),e}setW(t,e){return this.normalized&&(e=ze(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=ze(e,this.array),i=ze(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=ze(e,this.array),i=ze(i,this.array),s=ze(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=ze(e,this.array),i=ze(i,this.array),s=ze(s,this.array),r=ze(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Fh&&(t.usage=this.usage),t}};var ca=class extends _e{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var ha=class extends _e{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var he=class extends _e{constructor(t,e,i){super(new Float32Array(t),e,i)}},ip=0,hn=new ie,Lo=new je,rs=new B,sn=new Di,Xs=new Di,Te=new B,oe=class n extends Wn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ip++}),this.uuid=Es(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(qu(t)?ha:ca)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Vt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return hn.makeRotationFromQuaternion(t),this.applyMatrix4(hn),this}rotateX(t){return hn.makeRotationX(t),this.applyMatrix4(hn),this}rotateY(t){return hn.makeRotationY(t),this.applyMatrix4(hn),this}rotateZ(t){return hn.makeRotationZ(t),this.applyMatrix4(hn),this}translate(t,e,i){return hn.makeTranslation(t,e,i),this.applyMatrix4(hn),this}scale(t,e,i){return hn.makeScale(t,e,i),this.applyMatrix4(hn),this}lookAt(t){return Lo.lookAt(t),Lo.updateMatrix(),this.applyMatrix4(Lo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(rs).negate(),this.translate(rs.x,rs.y,rs.z),this}setFromPoints(t){let e=[];for(let i=0,s=t.length;i<s;i++){let r=t[i];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new he(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Di);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){let r=e[i];sn.setFromBufferAttribute(r),this.morphTargetsRelative?(Te.addVectors(this.boundingBox.min,sn.min),this.boundingBox.expandByPoint(Te),Te.addVectors(this.boundingBox.max,sn.max),this.boundingBox.expandByPoint(Te)):(this.boundingBox.expandByPoint(sn.min),this.boundingBox.expandByPoint(sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new er);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(t){let i=this.boundingSphere.center;if(sn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];Xs.setFromBufferAttribute(o),this.morphTargetsRelative?(Te.addVectors(sn.min,Xs.min),sn.expandByPoint(Te),Te.addVectors(sn.max,Xs.max),sn.expandByPoint(Te)):(sn.expandByPoint(Xs.min),sn.expandByPoint(Xs.max))}sn.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)Te.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Te));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Te.fromBufferAttribute(o,c),l&&(rs.fromBufferAttribute(t,c),Te.add(rs)),s=Math.max(s,i.distanceToSquared(Te))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new _e(new Float32Array(4*i.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let E=0;E<i.count;E++)o[E]=new B,l[E]=new B;let c=new B,h=new B,u=new B,f=new vt,d=new vt,A=new vt,y=new B,p=new B;function m(E,T,g){c.fromBufferAttribute(i,E),h.fromBufferAttribute(i,T),u.fromBufferAttribute(i,g),f.fromBufferAttribute(r,E),d.fromBufferAttribute(r,T),A.fromBufferAttribute(r,g),h.sub(c),u.sub(c),d.sub(f),A.sub(f);let v=1/(d.x*A.y-A.x*d.y);isFinite(v)&&(y.copy(h).multiplyScalar(A.y).addScaledVector(u,-d.y).multiplyScalar(v),p.copy(u).multiplyScalar(d.x).addScaledVector(h,-A.x).multiplyScalar(v),o[E].add(y),o[T].add(y),o[g].add(y),l[E].add(p),l[T].add(p),l[g].add(p))}let _=this.groups;_.length===0&&(_=[{start:0,count:t.count}]);for(let E=0,T=_.length;E<T;++E){let g=_[E],v=g.start,I=g.count;for(let N=v,U=v+I;N<U;N+=3)m(t.getX(N+0),t.getX(N+1),t.getX(N+2))}let x=new B,M=new B,R=new B,b=new B;function w(E){R.fromBufferAttribute(s,E),b.copy(R);let T=o[E];x.copy(T),x.sub(R.multiplyScalar(R.dot(T))).normalize(),M.crossVectors(b,T);let v=M.dot(l[E])<0?-1:1;a.setXYZW(E,x.x,x.y,x.z,v)}for(let E=0,T=_.length;E<T;++E){let g=_[E],v=g.start,I=g.count;for(let N=v,U=v+I;N<U;N+=3)w(t.getX(N+0)),w(t.getX(N+1)),w(t.getX(N+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new _e(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,d=i.count;f<d;f++)i.setXYZ(f,0,0,0);let s=new B,r=new B,a=new B,o=new B,l=new B,c=new B,h=new B,u=new B;if(t)for(let f=0,d=t.count;f<d;f+=3){let A=t.getX(f+0),y=t.getX(f+1),p=t.getX(f+2);s.fromBufferAttribute(e,A),r.fromBufferAttribute(e,y),a.fromBufferAttribute(e,p),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(i,A),l.fromBufferAttribute(i,y),c.fromBufferAttribute(i,p),o.add(h),l.add(h),c.add(h),i.setXYZ(A,o.x,o.y,o.z),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Te.fromBufferAttribute(t,e),Te.normalize(),t.setXYZ(e,Te.x,Te.y,Te.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,u=o.normalized,f=new c.constructor(l.length*h),d=0,A=0;for(let y=0,p=l.length;y<p;y++){o.isInterleavedBufferAttribute?d=l[y]*o.data.stride+o.offset:d=l[y]*h;for(let m=0;m<h;m++)f[A++]=c[d++]}return new _e(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,i);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){let f=c[h],d=t(f,i);l.push(d)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){let d=c[u];h.push(d.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone(e));let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],u=r[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},$h=new ie,bi=new nr,Nr=new er,tu=new B,Or=new B,Br=new B,Fr=new B,No=new B,kr=new B,eu=new B,zr=new B,ae=class extends je{constructor(t=new oe,e=new Xn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){kr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],u=r[l];h!==0&&(No.fromBufferAttribute(u,t),a?kr.addScaledVector(No,h):kr.addScaledVector(No.sub(e),h))}e.add(kr)}return e}raycast(t,e){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Nr.copy(i.boundingSphere),Nr.applyMatrix4(r),bi.copy(t.ray).recast(t.near),!(Nr.containsPoint(bi.origin)===!1&&(bi.intersectSphere(Nr,tu)===null||bi.origin.distanceToSquared(tu)>(t.far-t.near)**2))&&($h.copy(r).invert(),bi.copy(t.ray).applyMatrix4($h),!(i.boundingBox!==null&&bi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,bi)))}_computeIntersections(t,e,i){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let A=0,y=f.length;A<y;A++){let p=f[A],m=a[p.materialIndex],_=Math.max(p.start,d.start),x=Math.min(o.count,Math.min(p.start+p.count,d.start+d.count));for(let M=_,R=x;M<R;M+=3){let b=o.getX(M),w=o.getX(M+1),E=o.getX(M+2);s=Hr(this,m,t,i,c,h,u,b,w,E),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let A=Math.max(0,d.start),y=Math.min(o.count,d.start+d.count);for(let p=A,m=y;p<m;p+=3){let _=o.getX(p),x=o.getX(p+1),M=o.getX(p+2);s=Hr(this,a,t,i,c,h,u,_,x,M),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let A=0,y=f.length;A<y;A++){let p=f[A],m=a[p.materialIndex],_=Math.max(p.start,d.start),x=Math.min(l.count,Math.min(p.start+p.count,d.start+d.count));for(let M=_,R=x;M<R;M+=3){let b=M,w=M+1,E=M+2;s=Hr(this,m,t,i,c,h,u,b,w,E),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let A=Math.max(0,d.start),y=Math.min(l.count,d.start+d.count);for(let p=A,m=y;p<m;p+=3){let _=p,x=p+1,M=p+2;s=Hr(this,a,t,i,c,h,u,_,x,M),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}};function sp(n,t,e,i,s,r,a,o){let l;if(t.side===Le?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,t.side===Dn,o),l===null)return null;zr.copy(o),zr.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(zr);return c<e.near||c>e.far?null:{distance:c,point:zr.clone(),object:n}}function Hr(n,t,e,i,s,r,a,o,l,c){n.getVertexPosition(o,Or),n.getVertexPosition(l,Br),n.getVertexPosition(c,Fr);let h=sp(n,t,e,i,Or,Br,Fr,eu);if(h){let u=new B;Ci.getBarycoord(eu,Or,Br,Fr,u),s&&(h.uv=Ci.getInterpolatedAttribute(s,o,l,c,u,new vt)),r&&(h.uv1=Ci.getInterpolatedAttribute(r,o,l,c,u,new vt)),a&&(h.normal=Ci.getInterpolatedAttribute(a,o,l,c,u,new B),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let f={a:o,b:l,c,normal:new B,materialIndex:0};Ci.getNormal(Or,Br,Fr,f.normal),h.face=f,h.barycoord=u}return h}var Ui=class n extends oe{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],u=[],f=0,d=0;A("z","y","x",-1,-1,i,e,t,a,r,0),A("z","y","x",1,-1,i,e,-t,a,r,1),A("x","z","y",1,1,t,i,e,s,a,2),A("x","z","y",1,-1,t,i,-e,s,a,3),A("x","y","z",1,-1,t,e,i,s,r,4),A("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new he(c,3)),this.setAttribute("normal",new he(h,3)),this.setAttribute("uv",new he(u,2));function A(y,p,m,_,x,M,R,b,w,E,T){let g=M/w,v=R/E,I=M/2,N=R/2,U=b/2,k=w+1,z=E+1,K=0,F=0,tt=new B;for(let at=0;at<z;at++){let ct=at*v-N;for(let Et=0;Et<k;Et++){let Dt=Et*g-I;tt[y]=Dt*_,tt[p]=ct*x,tt[m]=U,c.push(tt.x,tt.y,tt.z),tt[y]=0,tt[p]=0,tt[m]=b>0?1:-1,h.push(tt.x,tt.y,tt.z),u.push(Et/w),u.push(1-at/E),K+=1}}for(let at=0;at<E;at++)for(let ct=0;ct<w;ct++){let Et=f+ct+k*at,Dt=f+ct+k*(at+1),et=f+(ct+1)+k*(at+1),L=f+(ct+1)+k*at;l.push(Et,Dt,L),l.push(Dt,et,L),F+=6}o.addGroup(d,F,T),d+=F,f+=K}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function vs(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function He(n){let t={};for(let e=0;e<n.length;e++){let i=vs(n[e]);for(let s in i)t[s]=i[s]}return t}function rp(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Yu(n){let t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:jt.workingColorSpace}var Cn={clone:vs,merge:He},ap=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,op=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,xe=class extends qn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ap,this.fragmentShader=op,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=vs(t.uniforms),this.uniformsGroups=rp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}},ua=class extends je{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ie,this.projectionMatrix=new ie,this.projectionMatrixInverse=new ie,this.coordinateSystem=Gn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},ii=new B,nu=new vt,iu=new vt,Ge=class extends ua{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=tr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Ks*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return tr*2*Math.atan(Math.tan(Ks*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){ii.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ii.x,ii.y).multiplyScalar(-t/ii.z),ii.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ii.x,ii.y).multiplyScalar(-t/ii.z)}getViewSize(t,e){return this.getViewBounds(t,nu,iu),e.subVectors(iu,nu)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Ks*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},as=-90,os=1,Nl=class extends je{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ge(as,os,t,e);s.layers=this.layers,this.add(s);let r=new Ge(as,os,t,e);r.layers=this.layers,this.add(r);let a=new Ge(as,os,t,e);a.layers=this.layers,this.add(a);let o=new Ge(as,os,t,e);o.layers=this.layers,this.add(o);let l=new Ge(as,os,t,e);l.layers=this.layers,this.add(l);let c=new Ge(as,os,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===Gn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===sa)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),A=t.xr.enabled;t.xr.enabled=!1;let y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,a),t.setRenderTarget(i,2,s),t.render(e,o),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=y,t.setRenderTarget(i,5,s),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=A,i.texture.needsPMREMUpdate=!0}},da=class extends Ke{constructor(t,e,i,s,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:gs,super(t,e,i,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Ol=class extends Be{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new da(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:bn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ui(5,5,5),r=new xe({name:"CubemapFromEquirect",uniforms:vs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Le,blending:ge});r.uniforms.tEquirect.value=e;let a=new ae(s,r),o=e.minFilter;return e.minFilter===Pi&&(e.minFilter=bn),new Nl(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,i,s){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}},Oo=new B,lp=new B,cp=new Vt,Mn=class{constructor(t=new B(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let s=Oo.subVectors(i,e).cross(lp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let i=t.delta(Oo),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||cp.getNormalMatrix(t),s=this.coplanarPoint(Oo).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},wi=new er,Vr=new B,ir=class{constructor(t=new Mn,e=new Mn,i=new Mn,s=new Mn,r=new Mn,a=new Mn){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Gn){let i=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],u=s[6],f=s[7],d=s[8],A=s[9],y=s[10],p=s[11],m=s[12],_=s[13],x=s[14],M=s[15];if(i[0].setComponents(l-r,f-c,p-d,M-m).normalize(),i[1].setComponents(l+r,f+c,p+d,M+m).normalize(),i[2].setComponents(l+a,f+h,p+A,M+_).normalize(),i[3].setComponents(l-a,f-h,p-A,M-_).normalize(),i[4].setComponents(l-o,f-u,p-y,M-x).normalize(),e===Gn)i[5].setComponents(l+o,f+u,p+y,M+x).normalize();else if(e===sa)i[5].setComponents(o,u,y,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),wi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),wi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(wi)}intersectsSprite(t){return wi.center.set(0,0,0),wi.radius=.7071067811865476,wi.applyMatrix4(t.matrixWorld),this.intersectsSphere(wi)}intersectsSphere(t){let e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let s=e[i];if(Vr.x=s.normal.x>0?t.max.x:t.min.x,Vr.y=s.normal.y>0?t.max.y:t.min.y,Vr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Vr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Ku(){let n=null,t=!1,e=null,i=null;function s(r,a){e(r,a),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function hp(n){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,u=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,h),o.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,l,c){let h=l.array,u=l.updateRanges;if(n.bindBuffer(c,o),u.length===0)n.bufferSubData(c,0,h);else{u.sort((d,A)=>d.start-A.start);let f=0;for(let d=1;d<u.length;d++){let A=u[f],y=u[d];y.start<=A.start+A.count+1?A.count=Math.max(A.count,y.start+y.count-A.start):(++f,u[f]=y)}u.length=f+1;for(let d=0,A=u.length;d<A;d++){let y=u[d];n.bufferSubData(c,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(n.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Yn=class n extends oe{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(i),l=Math.floor(s),c=o+1,h=l+1,u=t/o,f=e/l,d=[],A=[],y=[],p=[];for(let m=0;m<h;m++){let _=m*f-a;for(let x=0;x<c;x++){let M=x*u-r;A.push(M,-_,0),y.push(0,0,1),p.push(x/o),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let _=0;_<o;_++){let x=_+c*m,M=_+c*(m+1),R=_+1+c*(m+1),b=_+1+c*m;d.push(x,M,b),d.push(M,R,b)}this.setIndex(d),this.setAttribute("position",new he(A,3)),this.setAttribute("normal",new he(y,3)),this.setAttribute("uv",new he(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}},up=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,dp=`#ifdef USE_ALPHAHASH
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
#endif`,fp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,pp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,mp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,gp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ap=`#ifdef USE_AOMAP
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
#endif`,vp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,xp=`#ifdef USE_BATCHING
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
#endif`,yp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,_p=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Mp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,wp=`#ifdef USE_IRIDESCENCE
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
#endif`,Sp=`#ifdef USE_BUMPMAP
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
#endif`,Ep=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Tp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Cp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Rp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Pp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ip=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Dp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Up=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Lp=`#define PI 3.141592653589793
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
} // validated`,Np=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Op=`vec3 transformedNormal = objectNormal;
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
#endif`,Bp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Fp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,kp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,zp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Hp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Vp=`
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
}`,Gp=`#ifdef USE_ENVMAP
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
#endif`,Wp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,qp=`#ifdef USE_ENVMAP
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
#endif`,Xp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Yp=`#ifdef USE_ENVMAP
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
#endif`,Kp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,jp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Zp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Qp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Jp=`#ifdef USE_GRADIENTMAP
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
}`,$p=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,tm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,em=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,nm=`uniform bool receiveShadow;
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
#endif`,im=`#ifdef USE_ENVMAP
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
#endif`,sm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,rm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,am=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,om=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lm=`PhysicalMaterial material;
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
#endif`,cm=`struct PhysicalMaterial {
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
}`,hm=`
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
#endif`,um=`#if defined( RE_IndirectDiffuse )
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
#endif`,dm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,fm=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,pm=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Am=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,vm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,xm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,ym=`#if defined( USE_POINTS_UV )
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
#endif`,_m=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Mm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,bm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,wm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Sm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Em=`#ifdef USE_MORPHTARGETS
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
#endif`,Tm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Cm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Rm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Pm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Im=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Dm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Um=`#ifdef USE_NORMALMAP
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
#endif`,Lm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Nm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Om=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Bm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Fm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,km=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,zm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Hm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Vm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Gm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Wm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,qm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Xm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ym=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Km=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,jm=`float getShadowMask() {
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
}`,Zm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Qm=`#ifdef USE_SKINNING
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
#endif`,Jm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,$m=`#ifdef USE_SKINNING
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
#endif`,tg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,eg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ng=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ig=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,sg=`#ifdef USE_TRANSMISSION
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
#endif`,rg=`#ifdef USE_TRANSMISSION
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
#endif`,ag=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,og=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,lg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,cg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,hg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ug=`uniform sampler2D t2D;
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
}`,dg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,pg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gg=`#include <common>
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
}`,Ag=`#if DEPTH_PACKING == 3200
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
}`,vg=`#define DISTANCE
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
}`,xg=`#define DISTANCE
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
}`,yg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,_g=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mg=`uniform float scale;
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
}`,bg=`uniform vec3 diffuse;
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
}`,wg=`#include <common>
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
}`,Sg=`uniform vec3 diffuse;
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
}`,Eg=`#define LAMBERT
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
}`,Tg=`#define LAMBERT
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
}`,Cg=`#define MATCAP
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
}`,Rg=`#define MATCAP
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
}`,Pg=`#define NORMAL
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
}`,Ig=`#define NORMAL
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
}`,Dg=`#define PHONG
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
}`,Ug=`#define PHONG
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
}`,Lg=`#define STANDARD
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
}`,Ng=`#define STANDARD
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
}`,Og=`#define TOON
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
}`,Bg=`#define TOON
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
}`,Fg=`uniform float size;
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
}`,kg=`uniform vec3 diffuse;
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
}`,zg=`#include <common>
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
}`,Hg=`uniform vec3 color;
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
}`,Vg=`uniform float rotation;
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
}`,Gg=`uniform vec3 diffuse;
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
}`,zt={alphahash_fragment:up,alphahash_pars_fragment:dp,alphamap_fragment:fp,alphamap_pars_fragment:pp,alphatest_fragment:mp,alphatest_pars_fragment:gp,aomap_fragment:Ap,aomap_pars_fragment:vp,batching_pars_vertex:xp,batching_vertex:yp,begin_vertex:_p,beginnormal_vertex:Mp,bsdfs:bp,iridescence_fragment:wp,bumpmap_pars_fragment:Sp,clipping_planes_fragment:Ep,clipping_planes_pars_fragment:Tp,clipping_planes_pars_vertex:Cp,clipping_planes_vertex:Rp,color_fragment:Pp,color_pars_fragment:Ip,color_pars_vertex:Dp,color_vertex:Up,common:Lp,cube_uv_reflection_fragment:Np,defaultnormal_vertex:Op,displacementmap_pars_vertex:Bp,displacementmap_vertex:Fp,emissivemap_fragment:kp,emissivemap_pars_fragment:zp,colorspace_fragment:Hp,colorspace_pars_fragment:Vp,envmap_fragment:Gp,envmap_common_pars_fragment:Wp,envmap_pars_fragment:qp,envmap_pars_vertex:Xp,envmap_physical_pars_fragment:im,envmap_vertex:Yp,fog_vertex:Kp,fog_pars_vertex:jp,fog_fragment:Zp,fog_pars_fragment:Qp,gradientmap_pars_fragment:Jp,lightmap_pars_fragment:$p,lights_lambert_fragment:tm,lights_lambert_pars_fragment:em,lights_pars_begin:nm,lights_toon_fragment:sm,lights_toon_pars_fragment:rm,lights_phong_fragment:am,lights_phong_pars_fragment:om,lights_physical_fragment:lm,lights_physical_pars_fragment:cm,lights_fragment_begin:hm,lights_fragment_maps:um,lights_fragment_end:dm,logdepthbuf_fragment:fm,logdepthbuf_pars_fragment:pm,logdepthbuf_pars_vertex:mm,logdepthbuf_vertex:gm,map_fragment:Am,map_pars_fragment:vm,map_particle_fragment:xm,map_particle_pars_fragment:ym,metalnessmap_fragment:_m,metalnessmap_pars_fragment:Mm,morphinstance_vertex:bm,morphcolor_vertex:wm,morphnormal_vertex:Sm,morphtarget_pars_vertex:Em,morphtarget_vertex:Tm,normal_fragment_begin:Cm,normal_fragment_maps:Rm,normal_pars_fragment:Pm,normal_pars_vertex:Im,normal_vertex:Dm,normalmap_pars_fragment:Um,clearcoat_normal_fragment_begin:Lm,clearcoat_normal_fragment_maps:Nm,clearcoat_pars_fragment:Om,iridescence_pars_fragment:Bm,opaque_fragment:Fm,packing:km,premultiplied_alpha_fragment:zm,project_vertex:Hm,dithering_fragment:Vm,dithering_pars_fragment:Gm,roughnessmap_fragment:Wm,roughnessmap_pars_fragment:qm,shadowmap_pars_fragment:Xm,shadowmap_pars_vertex:Ym,shadowmap_vertex:Km,shadowmask_pars_fragment:jm,skinbase_vertex:Zm,skinning_pars_vertex:Qm,skinning_vertex:Jm,skinnormal_vertex:$m,specularmap_fragment:tg,specularmap_pars_fragment:eg,tonemapping_fragment:ng,tonemapping_pars_fragment:ig,transmission_fragment:sg,transmission_pars_fragment:rg,uv_pars_fragment:ag,uv_pars_vertex:og,uv_vertex:lg,worldpos_vertex:cg,background_vert:hg,background_frag:ug,backgroundCube_vert:dg,backgroundCube_frag:fg,cube_vert:pg,cube_frag:mg,depth_vert:gg,depth_frag:Ag,distanceRGBA_vert:vg,distanceRGBA_frag:xg,equirect_vert:yg,equirect_frag:_g,linedashed_vert:Mg,linedashed_frag:bg,meshbasic_vert:wg,meshbasic_frag:Sg,meshlambert_vert:Eg,meshlambert_frag:Tg,meshmatcap_vert:Cg,meshmatcap_frag:Rg,meshnormal_vert:Pg,meshnormal_frag:Ig,meshphong_vert:Dg,meshphong_frag:Ug,meshphysical_vert:Lg,meshphysical_frag:Ng,meshtoon_vert:Og,meshtoon_frag:Bg,points_vert:Fg,points_frag:kg,shadow_vert:zg,shadow_frag:Hg,sprite_vert:Vg,sprite_frag:Gg},At={common:{diffuse:{value:new Lt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Vt}},envmap:{envMap:{value:null},envMapRotation:{value:new Vt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Vt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Vt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Vt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Vt},normalScale:{value:new vt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Vt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Vt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Vt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Vt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Lt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Lt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0},uvTransform:{value:new Vt}},sprite:{diffuse:{value:new Lt(16777215)},opacity:{value:1},center:{value:new vt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}}},In={basic:{uniforms:He([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.fog]),vertexShader:zt.meshbasic_vert,fragmentShader:zt.meshbasic_frag},lambert:{uniforms:He([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.fog,At.lights,{emissive:{value:new Lt(0)}}]),vertexShader:zt.meshlambert_vert,fragmentShader:zt.meshlambert_frag},phong:{uniforms:He([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.fog,At.lights,{emissive:{value:new Lt(0)},specular:{value:new Lt(1118481)},shininess:{value:30}}]),vertexShader:zt.meshphong_vert,fragmentShader:zt.meshphong_frag},standard:{uniforms:He([At.common,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.roughnessmap,At.metalnessmap,At.fog,At.lights,{emissive:{value:new Lt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag},toon:{uniforms:He([At.common,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.gradientmap,At.fog,At.lights,{emissive:{value:new Lt(0)}}]),vertexShader:zt.meshtoon_vert,fragmentShader:zt.meshtoon_frag},matcap:{uniforms:He([At.common,At.bumpmap,At.normalmap,At.displacementmap,At.fog,{matcap:{value:null}}]),vertexShader:zt.meshmatcap_vert,fragmentShader:zt.meshmatcap_frag},points:{uniforms:He([At.points,At.fog]),vertexShader:zt.points_vert,fragmentShader:zt.points_frag},dashed:{uniforms:He([At.common,At.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:zt.linedashed_vert,fragmentShader:zt.linedashed_frag},depth:{uniforms:He([At.common,At.displacementmap]),vertexShader:zt.depth_vert,fragmentShader:zt.depth_frag},normal:{uniforms:He([At.common,At.bumpmap,At.normalmap,At.displacementmap,{opacity:{value:1}}]),vertexShader:zt.meshnormal_vert,fragmentShader:zt.meshnormal_frag},sprite:{uniforms:He([At.sprite,At.fog]),vertexShader:zt.sprite_vert,fragmentShader:zt.sprite_frag},background:{uniforms:{uvTransform:{value:new Vt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:zt.background_vert,fragmentShader:zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Vt}},vertexShader:zt.backgroundCube_vert,fragmentShader:zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:zt.cube_vert,fragmentShader:zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:zt.equirect_vert,fragmentShader:zt.equirect_frag},distanceRGBA:{uniforms:He([At.common,At.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:zt.distanceRGBA_vert,fragmentShader:zt.distanceRGBA_frag},shadow:{uniforms:He([At.lights,At.fog,{color:{value:new Lt(0)},opacity:{value:1}}]),vertexShader:zt.shadow_vert,fragmentShader:zt.shadow_frag}};In.physical={uniforms:He([In.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Vt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Vt},clearcoatNormalScale:{value:new vt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Vt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Vt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Vt},sheen:{value:0},sheenColor:{value:new Lt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Vt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Vt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Vt},transmissionSamplerSize:{value:new vt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Vt},attenuationDistance:{value:0},attenuationColor:{value:new Lt(0)},specularColor:{value:new Lt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Vt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Vt},anisotropyVector:{value:new vt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Vt}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag};var Gr={r:0,b:0,g:0},Si=new Un,Wg=new ie;function qg(n,t,e,i,s,r,a){let o=new Lt(0),l=r===!0?0:1,c,h,u=null,f=0,d=null;function A(_){let x=_.isScene===!0?_.background:null;return x&&x.isTexture&&(x=(_.backgroundBlurriness>0?e:t).get(x)),x}function y(_){let x=!1,M=A(_);M===null?m(o,l):M&&M.isColor&&(m(M,1),x=!0);let R=n.xr.getEnvironmentBlendMode();R==="additive"?i.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||x)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function p(_,x){let M=A(x);M&&(M.isCubeTexture||M.mapping===Sa)?(h===void 0&&(h=new ae(new Ui(1,1,1),new xe({name:"BackgroundCubeMaterial",uniforms:vs(In.backgroundCube.uniforms),vertexShader:In.backgroundCube.vertexShader,fragmentShader:In.backgroundCube.fragmentShader,side:Le,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,b,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Si.copy(x.backgroundRotation),Si.x*=-1,Si.y*=-1,Si.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Si.y*=-1,Si.z*=-1),h.material.uniforms.envMap.value=M,h.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Wg.makeRotationFromEuler(Si)),h.material.toneMapped=jt.getTransfer(M.colorSpace)!==re,(u!==M||f!==M.version||d!==n.toneMapping)&&(h.material.needsUpdate=!0,u=M,f=M.version,d=n.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new ae(new Yn(2,2),new xe({name:"BackgroundMaterial",uniforms:vs(In.background.uniforms),vertexShader:In.background.vertexShader,fragmentShader:In.background.fragmentShader,side:Dn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=jt.getTransfer(M.colorSpace)!==re,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||f!==M.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,u=M,f=M.version,d=n.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function m(_,x){_.getRGB(Gr,Yu(n)),i.buffers.color.setClear(Gr.r,Gr.g,Gr.b,x,a)}return{getClearColor:function(){return o},setClearColor:function(_,x=1){o.set(_),l=x,m(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(_){l=_,m(o,l)},render:y,addToRenderList:p}}function Xg(n,t){let e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null),r=s,a=!1;function o(g,v,I,N,U){let k=!1,z=u(N,I,v);r!==z&&(r=z,c(r.object)),k=d(g,N,I,U),k&&A(g,N,I,U),U!==null&&t.update(U,n.ELEMENT_ARRAY_BUFFER),(k||a)&&(a=!1,M(g,v,I,N),U!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(U).buffer))}function l(){return n.createVertexArray()}function c(g){return n.bindVertexArray(g)}function h(g){return n.deleteVertexArray(g)}function u(g,v,I){let N=I.wireframe===!0,U=i[g.id];U===void 0&&(U={},i[g.id]=U);let k=U[v.id];k===void 0&&(k={},U[v.id]=k);let z=k[N];return z===void 0&&(z=f(l()),k[N]=z),z}function f(g){let v=[],I=[],N=[];for(let U=0;U<e;U++)v[U]=0,I[U]=0,N[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:v,enabledAttributes:I,attributeDivisors:N,object:g,attributes:{},index:null}}function d(g,v,I,N){let U=r.attributes,k=v.attributes,z=0,K=I.getAttributes();for(let F in K)if(K[F].location>=0){let at=U[F],ct=k[F];if(ct===void 0&&(F==="instanceMatrix"&&g.instanceMatrix&&(ct=g.instanceMatrix),F==="instanceColor"&&g.instanceColor&&(ct=g.instanceColor)),at===void 0||at.attribute!==ct||ct&&at.data!==ct.data)return!0;z++}return r.attributesNum!==z||r.index!==N}function A(g,v,I,N){let U={},k=v.attributes,z=0,K=I.getAttributes();for(let F in K)if(K[F].location>=0){let at=k[F];at===void 0&&(F==="instanceMatrix"&&g.instanceMatrix&&(at=g.instanceMatrix),F==="instanceColor"&&g.instanceColor&&(at=g.instanceColor));let ct={};ct.attribute=at,at&&at.data&&(ct.data=at.data),U[F]=ct,z++}r.attributes=U,r.attributesNum=z,r.index=N}function y(){let g=r.newAttributes;for(let v=0,I=g.length;v<I;v++)g[v]=0}function p(g){m(g,0)}function m(g,v){let I=r.newAttributes,N=r.enabledAttributes,U=r.attributeDivisors;I[g]=1,N[g]===0&&(n.enableVertexAttribArray(g),N[g]=1),U[g]!==v&&(n.vertexAttribDivisor(g,v),U[g]=v)}function _(){let g=r.newAttributes,v=r.enabledAttributes;for(let I=0,N=v.length;I<N;I++)v[I]!==g[I]&&(n.disableVertexAttribArray(I),v[I]=0)}function x(g,v,I,N,U,k,z){z===!0?n.vertexAttribIPointer(g,v,I,U,k):n.vertexAttribPointer(g,v,I,N,U,k)}function M(g,v,I,N){y();let U=N.attributes,k=I.getAttributes(),z=v.defaultAttributeValues;for(let K in k){let F=k[K];if(F.location>=0){let tt=U[K];if(tt===void 0&&(K==="instanceMatrix"&&g.instanceMatrix&&(tt=g.instanceMatrix),K==="instanceColor"&&g.instanceColor&&(tt=g.instanceColor)),tt!==void 0){let at=tt.normalized,ct=tt.itemSize,Et=t.get(tt);if(Et===void 0)continue;let Dt=Et.buffer,et=Et.type,L=Et.bytesPerElement,G=et===n.INT||et===n.UNSIGNED_INT||tt.gpuType===_c;if(tt.isInterleavedBufferAttribute){let O=tt.data,X=O.stride,j=tt.offset;if(O.isInstancedInterleavedBuffer){for(let nt=0;nt<F.locationSize;nt++)m(F.location+nt,O.meshPerAttribute);g.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=O.meshPerAttribute*O.count)}else for(let nt=0;nt<F.locationSize;nt++)p(F.location+nt);n.bindBuffer(n.ARRAY_BUFFER,Dt);for(let nt=0;nt<F.locationSize;nt++)x(F.location+nt,ct/F.locationSize,et,at,X*L,(j+ct/F.locationSize*nt)*L,G)}else{if(tt.isInstancedBufferAttribute){for(let O=0;O<F.locationSize;O++)m(F.location+O,tt.meshPerAttribute);g.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let O=0;O<F.locationSize;O++)p(F.location+O);n.bindBuffer(n.ARRAY_BUFFER,Dt);for(let O=0;O<F.locationSize;O++)x(F.location+O,ct/F.locationSize,et,at,ct*L,ct/F.locationSize*O*L,G)}}else if(z!==void 0){let at=z[K];if(at!==void 0)switch(at.length){case 2:n.vertexAttrib2fv(F.location,at);break;case 3:n.vertexAttrib3fv(F.location,at);break;case 4:n.vertexAttrib4fv(F.location,at);break;default:n.vertexAttrib1fv(F.location,at)}}}}_()}function R(){E();for(let g in i){let v=i[g];for(let I in v){let N=v[I];for(let U in N)h(N[U].object),delete N[U];delete v[I]}delete i[g]}}function b(g){if(i[g.id]===void 0)return;let v=i[g.id];for(let I in v){let N=v[I];for(let U in N)h(N[U].object),delete N[U];delete v[I]}delete i[g.id]}function w(g){for(let v in i){let I=i[v];if(I[g.id]===void 0)continue;let N=I[g.id];for(let U in N)h(N[U].object),delete N[U];delete I[g.id]}}function E(){T(),a=!0,r!==s&&(r=s,c(r.object))}function T(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:E,resetDefaultState:T,dispose:R,releaseStatesOfGeometry:b,releaseStatesOfProgram:w,initAttributes:y,enableAttribute:p,disableUnusedAttributes:_}}function Yg(n,t,e){let i;function s(c){i=c}function r(c,h){n.drawArrays(i,c,h),e.update(h,i,1)}function a(c,h,u){u!==0&&(n.drawArraysInstanced(i,c,h,u),e.update(h,i,u))}function o(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let d=0;for(let A=0;A<u;A++)d+=h[A];e.update(d,i,1)}function l(c,h,u,f){if(u===0)return;let d=t.get("WEBGL_multi_draw");if(d===null)for(let A=0;A<c.length;A++)a(c[A],h[A],f[A]);else{d.multiDrawArraysInstancedWEBGL(i,c,0,h,0,f,0,u);let A=0;for(let y=0;y<u;y++)A+=h[y];for(let y=0;y<f.length;y++)e.update(A,i,f[y])}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Kg(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let w=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(w){return!(w!==rn&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){let E=w===fn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==wn&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==Vn&&!E)}function l(w){if(w==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control");if(f===!0){let w=t.get("EXT_clip_control");w.clipControlEXT(w.LOWER_LEFT_EXT,w.ZERO_TO_ONE_EXT)}let d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),A=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),_=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),x=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=A>0,b=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:A,maxTextureSize:y,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:_,maxVaryings:x,maxFragmentUniforms:M,vertexTextures:R,maxSamples:b}}function jg(n){let t=this,e=null,i=0,s=!1,r=!1,a=new Mn,o=new Vt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let d=u.length!==0||f||i!==0||s;return s=f,i=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){let A=u.clippingPlanes,y=u.clipIntersection,p=u.clipShadows,m=n.get(u);if(!s||A===null||A.length===0||r&&!p)r?h(null):c();else{let _=r?0:i,x=_*4,M=m.clippingState||null;l.value=M,M=h(A,f,x,d);for(let R=0;R!==x;++R)M[R]=e[R];m.clippingState=M,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,f,d,A){let y=u!==null?u.length:0,p=null;if(y!==0){if(p=l.value,A!==!0||p===null){let m=d+y*4,_=f.matrixWorldInverse;o.getNormalMatrix(_),(p===null||p.length<m)&&(p=new Float32Array(m));for(let x=0,M=d;x!==y;++x,M+=4)a.copy(u[x]).applyMatrix4(_,o),a.normal.toArray(p,M),p[M+3]=a.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,p}}function Zg(n){let t=new WeakMap;function e(a,o){return o===nl?a.mapping=gs:o===il&&(a.mapping=As),a}function i(a){if(a&&a.isTexture){let o=a.mapping;if(o===nl||o===il)if(t.has(a)){let l=t.get(a).texture;return e(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new Ol(l.height);return c.fromEquirectangularTexture(n,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}var xs=class extends ua{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,a=i+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},hs=4,su=[.125,.215,.35,.446,.526,.582],Ri=20,Bo=new xs,ru=new Lt,Fo=null,ko=0,zo=0,Ho=!1,Ti=(1+Math.sqrt(5))/2,ls=1/Ti,au=[new B(-Ti,ls,0),new B(Ti,ls,0),new B(-ls,0,Ti),new B(ls,0,Ti),new B(0,Ti,-ls),new B(0,Ti,ls),new B(-1,1,-1),new B(1,1,-1),new B(-1,1,1),new B(1,1,1)],ys=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){Fo=this._renderer.getRenderTarget(),ko=this._renderer.getActiveCubeFace(),zo=this._renderer.getActiveMipmapLevel(),Ho=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=cu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=lu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Fo,ko,zo),this._renderer.xr.enabled=Ho,t.scissorTest=!1,Wr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===gs||t.mapping===As?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Fo=this._renderer.getRenderTarget(),ko=this._renderer.getActiveCubeFace(),zo=this._renderer.getActiveMipmapLevel(),Ho=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:bn,minFilter:bn,generateMipmaps:!1,type:fn,format:rn,colorSpace:ci,depthBuffer:!1},s=ou(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ou(t,e,i);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Qg(r)),this._blurMaterial=Jg(r,t,e)}return s}_compileMaterial(t){let e=new ae(this._lodPlanes[0],t);this._renderer.compile(e,Bo)}_sceneToCubeUV(t,e,i,s){let o=new Ge(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(ru),h.toneMapping=ai,h.autoClear=!1;let d=new Xn({name:"PMREM.Background",side:Le,depthWrite:!1,depthTest:!1}),A=new ae(new Ui,d),y=!1,p=t.background;p?p.isColor&&(d.color.copy(p),t.background=null,y=!0):(d.color.copy(ru),y=!0);for(let m=0;m<6;m++){let _=m%3;_===0?(o.up.set(0,l[m],0),o.lookAt(c[m],0,0)):_===1?(o.up.set(0,0,l[m]),o.lookAt(0,c[m],0)):(o.up.set(0,l[m],0),o.lookAt(0,0,c[m]));let x=this._cubeSize;Wr(s,_*x,m>2?x:0,x,x),h.setRenderTarget(s),y&&h.render(A,o),h.render(t,o)}A.geometry.dispose(),A.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=p}_textureToCubeUV(t,e){let i=this._renderer,s=t.mapping===gs||t.mapping===As;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=cu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=lu());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new ae(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;Wr(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,Bo)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=au[(s-r-1)%au.length];this._blur(t,r-1,r,a,o)}e.autoClear=i}_blur(t,e,i,s,r){let a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,s,"latitudinal",r),this._halfBlur(a,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new ae(this._lodPlanes[s],c),f=c.uniforms,d=this._sizeLods[i]-1,A=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Ri-1),y=r/A,p=isFinite(r)?1+Math.floor(h*y):Ri;p>Ri&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Ri}`);let m=[],_=0;for(let w=0;w<Ri;++w){let E=w/y,T=Math.exp(-E*E/2);m.push(T),w===0?_+=T:w<p&&(_+=2*T)}for(let w=0;w<m.length;w++)m[w]=m[w]/_;f.envMap.value=t.texture,f.samples.value=p,f.weights.value=m,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);let{_lodMax:x}=this;f.dTheta.value=A,f.mipInt.value=x-i;let M=this._sizeLods[s],R=3*M*(s>x-hs?s-x+hs:0),b=4*(this._cubeSize-M);Wr(e,R,b,3*M,2*M),l.setRenderTarget(e),l.render(u,Bo)}};function Qg(n){let t=[],e=[],i=[],s=n,r=n-hs+1+su.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);e.push(o);let l=1/o;a>n-hs?l=su[a-n+hs-1]:a===0&&(l=0),i.push(l);let c=1/(o-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,A=6,y=3,p=2,m=1,_=new Float32Array(y*A*d),x=new Float32Array(p*A*d),M=new Float32Array(m*A*d);for(let b=0;b<d;b++){let w=b%3*2/3-1,E=b>2?0:-1,T=[w,E,0,w+2/3,E,0,w+2/3,E+1,0,w,E,0,w+2/3,E+1,0,w,E+1,0];_.set(T,y*A*b),x.set(f,p*A*b);let g=[b,b,b,b,b,b];M.set(g,m*A*b)}let R=new oe;R.setAttribute("position",new _e(_,y)),R.setAttribute("uv",new _e(x,p)),R.setAttribute("faceIndex",new _e(M,m)),t.push(R),s>hs&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function ou(n,t,e){let i=new Be(n,t,e);return i.texture.mapping=Sa,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Wr(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function Jg(n,t,e){let i=new Float32Array(Ri),s=new B(0,1,0);return new xe({name:"SphericalGaussianBlur",defines:{n:Ri,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ic(),fragmentShader:`

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
		`,blending:ge,depthTest:!1,depthWrite:!1})}function lu(){return new xe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ic(),fragmentShader:`

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
		`,blending:ge,depthTest:!1,depthWrite:!1})}function cu(){return new xe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ic(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ge,depthTest:!1,depthWrite:!1})}function Ic(){return`

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
	`}function $g(n){let t=new WeakMap,e=null;function i(o){if(o&&o.isTexture){let l=o.mapping,c=l===nl||l===il,h=l===gs||l===As;if(c||h){let u=t.get(o),f=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new ys(n)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{let d=o.image;return c&&d&&d.height>0||h&&d&&s(d)?(e===null&&(e=new ys(n)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0,c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){let l=o.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:a}}function t0(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let s=e(i);return s===null&&$r("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function e0(n,t,e,i){let s={},r=new WeakMap;function a(u){let f=u.target;f.index!==null&&t.remove(f.index);for(let A in f.attributes)t.remove(f.attributes[A]);for(let A in f.morphAttributes){let y=f.morphAttributes[A];for(let p=0,m=y.length;p<m;p++)t.remove(y[p])}f.removeEventListener("dispose",a),delete s[f.id];let d=r.get(f);d&&(t.remove(d),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(u,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,e.memory.geometries++),f}function l(u){let f=u.attributes;for(let A in f)t.update(f[A],n.ARRAY_BUFFER);let d=u.morphAttributes;for(let A in d){let y=d[A];for(let p=0,m=y.length;p<m;p++)t.update(y[p],n.ARRAY_BUFFER)}}function c(u){let f=[],d=u.index,A=u.attributes.position,y=0;if(d!==null){let _=d.array;y=d.version;for(let x=0,M=_.length;x<M;x+=3){let R=_[x+0],b=_[x+1],w=_[x+2];f.push(R,b,b,w,w,R)}}else if(A!==void 0){let _=A.array;y=A.version;for(let x=0,M=_.length/3-1;x<M;x+=3){let R=x+0,b=x+1,w=x+2;f.push(R,b,b,w,w,R)}}else return;let p=new(qu(f)?ha:ca)(f,1);p.version=y;let m=r.get(u);m&&t.remove(m),r.set(u,p)}function h(u){let f=r.get(u);if(f){let d=u.index;d!==null&&f.version<d.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function n0(n,t,e){let i;function s(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,d){n.drawElements(i,d,r,f*a),e.update(d,i,1)}function c(f,d,A){A!==0&&(n.drawElementsInstanced(i,d,r,f*a,A),e.update(d,i,A))}function h(f,d,A){if(A===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,f,0,A);let p=0;for(let m=0;m<A;m++)p+=d[m];e.update(p,i,1)}function u(f,d,A,y){if(A===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<f.length;m++)c(f[m]/a,d[m],y[m]);else{p.multiDrawElementsInstancedWEBGL(i,d,0,r,f,0,y,0,A);let m=0;for(let _=0;_<A;_++)m+=d[_];for(let _=0;_<y.length;_++)e.update(m,i,y[_])}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function i0(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function s0(n,t,e){let i=new WeakMap,s=new fe;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,f=i.get(o);if(f===void 0||f.count!==u){let T=function(){w.dispose(),i.delete(o),o.removeEventListener("dispose",T)};f!==void 0&&f.texture.dispose();let d=o.morphAttributes.position!==void 0,A=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],_=o.morphAttributes.color||[],x=0;d===!0&&(x=1),A===!0&&(x=2),y===!0&&(x=3);let M=o.attributes.position.count*x,R=1;M>t.maxTextureSize&&(R=Math.ceil(M/t.maxTextureSize),M=t.maxTextureSize);let b=new Float32Array(M*R*4*u),w=new oa(b,M,R,u);w.type=Vn,w.needsUpdate=!0;let E=x*4;for(let g=0;g<u;g++){let v=p[g],I=m[g],N=_[g],U=M*R*4*g;for(let k=0;k<v.count;k++){let z=k*E;d===!0&&(s.fromBufferAttribute(v,k),b[U+z+0]=s.x,b[U+z+1]=s.y,b[U+z+2]=s.z,b[U+z+3]=0),A===!0&&(s.fromBufferAttribute(I,k),b[U+z+4]=s.x,b[U+z+5]=s.y,b[U+z+6]=s.z,b[U+z+7]=0),y===!0&&(s.fromBufferAttribute(N,k),b[U+z+8]=s.x,b[U+z+9]=s.y,b[U+z+10]=s.z,b[U+z+11]=N.itemSize===4?s.w:1)}}f={count:u,texture:w,size:new vt(M,R)},i.set(o,f),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let d=0;for(let y=0;y<c.length;y++)d+=c[y];let A=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(n,"morphTargetBaseInfluence",A),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function r0(n,t,e,i){let s=new WeakMap;function r(l){let c=i.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return u}function a(){s=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}var _s=class extends Ke{constructor(t,e,i,s,r,a,o,l,c,h=ds){if(h!==ds&&h!==li)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===ds&&(i=Ii),i===void 0&&h===li&&(i=oi),super(null,s,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Ue,this.minFilter=l!==void 0?l:Ue,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},ju=new Ke,hu=new _s(1,1),Zu=new oa,Qu=new Ll,Ju=new da,uu=[],du=[],fu=new Float32Array(16),pu=new Float32Array(9),mu=new Float32Array(4);function Ts(n,t,e){let i=n[0];if(i<=0||i>0)return n;let s=t*e,r=uu[s];if(r===void 0&&(r=new Float32Array(s),uu[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function Me(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function be(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Ca(n,t){let e=du[t];e===void 0&&(e=new Int32Array(t),du[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function a0(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function o0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;n.uniform2fv(this.addr,t),be(e,t)}}function l0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Me(e,t))return;n.uniform3fv(this.addr,t),be(e,t)}}function c0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;n.uniform4fv(this.addr,t),be(e,t)}}function h0(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Me(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),be(e,t)}else{if(Me(e,i))return;mu.set(i),n.uniformMatrix2fv(this.addr,!1,mu),be(e,i)}}function u0(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Me(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),be(e,t)}else{if(Me(e,i))return;pu.set(i),n.uniformMatrix3fv(this.addr,!1,pu),be(e,i)}}function d0(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Me(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),be(e,t)}else{if(Me(e,i))return;fu.set(i),n.uniformMatrix4fv(this.addr,!1,fu),be(e,i)}}function f0(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function p0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;n.uniform2iv(this.addr,t),be(e,t)}}function m0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Me(e,t))return;n.uniform3iv(this.addr,t),be(e,t)}}function g0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;n.uniform4iv(this.addr,t),be(e,t)}}function A0(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function v0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;n.uniform2uiv(this.addr,t),be(e,t)}}function x0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Me(e,t))return;n.uniform3uiv(this.addr,t),be(e,t)}}function y0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;n.uniform4uiv(this.addr,t),be(e,t)}}function _0(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(hu.compareFunction=Wu,r=hu):r=ju,e.setTexture2D(t||r,s)}function M0(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Qu,s)}function b0(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||Ju,s)}function w0(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Zu,s)}function S0(n){switch(n){case 5126:return a0;case 35664:return o0;case 35665:return l0;case 35666:return c0;case 35674:return h0;case 35675:return u0;case 35676:return d0;case 5124:case 35670:return f0;case 35667:case 35671:return p0;case 35668:case 35672:return m0;case 35669:case 35673:return g0;case 5125:return A0;case 36294:return v0;case 36295:return x0;case 36296:return y0;case 35678:case 36198:case 36298:case 36306:case 35682:return _0;case 35679:case 36299:case 36307:return M0;case 35680:case 36300:case 36308:case 36293:return b0;case 36289:case 36303:case 36311:case 36292:return w0}}function E0(n,t){n.uniform1fv(this.addr,t)}function T0(n,t){let e=Ts(t,this.size,2);n.uniform2fv(this.addr,e)}function C0(n,t){let e=Ts(t,this.size,3);n.uniform3fv(this.addr,e)}function R0(n,t){let e=Ts(t,this.size,4);n.uniform4fv(this.addr,e)}function P0(n,t){let e=Ts(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function I0(n,t){let e=Ts(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function D0(n,t){let e=Ts(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function U0(n,t){n.uniform1iv(this.addr,t)}function L0(n,t){n.uniform2iv(this.addr,t)}function N0(n,t){n.uniform3iv(this.addr,t)}function O0(n,t){n.uniform4iv(this.addr,t)}function B0(n,t){n.uniform1uiv(this.addr,t)}function F0(n,t){n.uniform2uiv(this.addr,t)}function k0(n,t){n.uniform3uiv(this.addr,t)}function z0(n,t){n.uniform4uiv(this.addr,t)}function H0(n,t,e){let i=this.cache,s=t.length,r=Ca(e,s);Me(i,r)||(n.uniform1iv(this.addr,r),be(i,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||ju,r[a])}function V0(n,t,e){let i=this.cache,s=t.length,r=Ca(e,s);Me(i,r)||(n.uniform1iv(this.addr,r),be(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Qu,r[a])}function G0(n,t,e){let i=this.cache,s=t.length,r=Ca(e,s);Me(i,r)||(n.uniform1iv(this.addr,r),be(i,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Ju,r[a])}function W0(n,t,e){let i=this.cache,s=t.length,r=Ca(e,s);Me(i,r)||(n.uniform1iv(this.addr,r),be(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Zu,r[a])}function q0(n){switch(n){case 5126:return E0;case 35664:return T0;case 35665:return C0;case 35666:return R0;case 35674:return P0;case 35675:return I0;case 35676:return D0;case 5124:case 35670:return U0;case 35667:case 35671:return L0;case 35668:case 35672:return N0;case 35669:case 35673:return O0;case 5125:return B0;case 36294:return F0;case 36295:return k0;case 36296:return z0;case 35678:case 36198:case 36298:case 36306:case 35682:return H0;case 35679:case 36299:case 36307:return V0;case 35680:case 36300:case 36308:case 36293:return G0;case 36289:case 36303:case 36311:case 36292:return W0}}var Bl=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=S0(e.type)}},Fl=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=q0(e.type)}},kl=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],i)}}},Vo=/(\w+)(\])?(\[|\.)?/g;function gu(n,t){n.seq.push(t),n.map[t.id]=t}function X0(n,t,e){let i=n.name,s=i.length;for(Vo.lastIndex=0;;){let r=Vo.exec(i),a=Vo.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){gu(e,c===void 0?new Bl(o,n,t):new Fl(o,n,t));break}else{let u=e.map[o];u===void 0&&(u=new kl(o),gu(e,u)),e=u}}}var ps=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);X0(r,a,this)}}setValue(t,e,i,s){let r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){let s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let i=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&i.push(a)}return i}};function Au(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var Y0=37297,K0=0;function j0(n,t){let e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}function Z0(n){let t=jt.getPrimaries(jt.workingColorSpace),e=jt.getPrimaries(n),i;switch(t===e?i="":t===ia&&e===na?i="LinearDisplayP3ToLinearSRGB":t===na&&e===ia&&(i="LinearSRGBToLinearDisplayP3"),n){case ci:case Ea:return[i,"LinearTransferOETF"];case Ve:case Rc:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function vu(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+j0(n.getShaderSource(t),a)}else return s}function Q0(n,t){let e=Z0(t);return`vec4 ${n}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function J0(n,t){let e;switch(t){case gc:e="Linear";break;case Ac:e="Reinhard";break;case vc:e="Cineon";break;case xc:e="ACESFilmic";break;case yc:e="AgX";break;case lr:e="Neutral";break;case mf:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var qr=new B;function $0(){jt.getLuminanceCoefficients(qr);let n=qr.x.toFixed(4),t=qr.y.toFixed(4),e=qr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function tA(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ys).join(`
`)}function eA(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function nA(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(t,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function Ys(n){return n!==""}function xu(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function yu(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var iA=/^[ \t]*#include +<([\w\d./]+)>/gm;function zl(n){return n.replace(iA,rA)}var sA=new Map;function rA(n,t){let e=zt[t];if(e===void 0){let i=sA.get(t);if(i!==void 0)e=zt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return zl(e)}var aA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function _u(n){return n.replace(aA,oA)}function oA(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Mu(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}function lA(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Iu?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===pc?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===zn&&(t="SHADOWMAP_TYPE_VSM"),t}function cA(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case gs:case As:t="ENVMAP_TYPE_CUBE";break;case Sa:t="ENVMAP_TYPE_CUBE_UV";break}return t}function hA(n){let t="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===As&&(t="ENVMAP_MODE_REFRACTION"),t}function uA(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Du:t="ENVMAP_BLENDING_MULTIPLY";break;case ff:t="ENVMAP_BLENDING_MIX";break;case pf:t="ENVMAP_BLENDING_ADD";break}return t}function dA(n){let t=n.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function fA(n,t,e,i){let s=n.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=lA(e),c=cA(e),h=hA(e),u=uA(e),f=dA(e),d=tA(e),A=eA(r),y=s.createProgram(),p,m,_=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,A].filter(Ys).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,A].filter(Ys).join(`
`),m.length>0&&(m+=`
`)):(p=[Mu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,A,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ys).join(`
`),m=[Mu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,A,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ai?"#define TONE_MAPPING":"",e.toneMapping!==ai?zt.tonemapping_pars_fragment:"",e.toneMapping!==ai?J0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",zt.colorspace_pars_fragment,Q0("linearToOutputTexel",e.outputColorSpace),$0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ys).join(`
`)),a=zl(a),a=xu(a,e),a=yu(a,e),o=zl(o),o=xu(o,e),o=yu(o,e),a=_u(a),o=_u(o),e.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,p=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",e.glslVersion===kh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===kh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let x=_+p+a,M=_+m+o,R=Au(s,s.VERTEX_SHADER,x),b=Au(s,s.FRAGMENT_SHADER,M);s.attachShader(y,R),s.attachShader(y,b),e.index0AttributeName!==void 0?s.bindAttribLocation(y,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function w(v){if(n.debug.checkShaderErrors){let I=s.getProgramInfoLog(y).trim(),N=s.getShaderInfoLog(R).trim(),U=s.getShaderInfoLog(b).trim(),k=!0,z=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(k=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,y,R,b);else{let K=vu(s,R,"vertex"),F=vu(s,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+v.name+`
Material Type: `+v.type+`

Program Info Log: `+I+`
`+K+`
`+F)}else I!==""?console.warn("THREE.WebGLProgram: Program Info Log:",I):(N===""||U==="")&&(z=!1);z&&(v.diagnostics={runnable:k,programLog:I,vertexShader:{log:N,prefix:p},fragmentShader:{log:U,prefix:m}})}s.deleteShader(R),s.deleteShader(b),E=new ps(s,y),T=nA(s,y)}let E;this.getUniforms=function(){return E===void 0&&w(this),E};let T;this.getAttributes=function(){return T===void 0&&w(this),T};let g=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return g===!1&&(g=s.getProgramParameter(y,Y0)),g},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=K0++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=R,this.fragmentShader=b,this}var pA=0,Hl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new Vl(t),e.set(t,i)),i}},Vl=class{constructor(t){this.id=pA++,this.code=t,this.usedTimes=0}};function mA(n,t,e,i,s,r,a){let o=new la,l=new Hl,c=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.reverseDepthBuffer,d=s.vertexTextures,A=s.precision,y={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(g){return c.add(g),g===0?"uv":`uv${g}`}function m(g,v,I,N,U){let k=N.fog,z=U.geometry,K=g.isMeshStandardMaterial?N.environment:null,F=(g.isMeshStandardMaterial?e:t).get(g.envMap||K),tt=F&&F.mapping===Sa?F.image.height:null,at=y[g.type];g.precision!==null&&(A=s.getMaxPrecision(g.precision),A!==g.precision&&console.warn("THREE.WebGLProgram.getParameters:",g.precision,"not supported, using",A,"instead."));let ct=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,Et=ct!==void 0?ct.length:0,Dt=0;z.morphAttributes.position!==void 0&&(Dt=1),z.morphAttributes.normal!==void 0&&(Dt=2),z.morphAttributes.color!==void 0&&(Dt=3);let et,L,G,O;if(at){let Ye=In[at];et=Ye.vertexShader,L=Ye.fragmentShader}else et=g.vertexShader,L=g.fragmentShader,l.update(g),G=l.getVertexShaderID(g),O=l.getFragmentShaderID(g);let X=n.getRenderTarget(),j=U.isInstancedMesh===!0,nt=U.isBatchedMesh===!0,ft=!!g.map,lt=!!g.matcap,D=!!F,Gt=!!g.aoMap,ut=!!g.lightMap,Ut=!!g.bumpMap,Y=!!g.normalMap,pt=!!g.displacementMap,mt=!!g.emissiveMap,P=!!g.metalnessMap,S=!!g.roughnessMap,W=g.anisotropy>0,it=g.clearcoat>0,ot=g.dispersion>0,st=g.iridescence>0,Ct=g.sheen>0,gt=g.transmission>0,yt=W&&!!g.anisotropyMap,Wt=it&&!!g.clearcoatMap,ht=it&&!!g.clearcoatNormalMap,_t=it&&!!g.clearcoatRoughnessMap,Nt=st&&!!g.iridescenceMap,Ot=st&&!!g.iridescenceThicknessMap,St=Ct&&!!g.sheenColorMap,qt=Ct&&!!g.sheenRoughnessMap,kt=!!g.specularMap,Kt=!!g.specularColorMap,H=!!g.specularIntensityMap,xt=gt&&!!g.transmissionMap,$=gt&&!!g.thicknessMap,rt=!!g.gradientMap,Mt=!!g.alphaMap,wt=g.alphaTest>0,Yt=!!g.alphaHash,Ae=!!g.extensions,Xe=ai;g.toneMapped&&(X===null||X.isXRRenderTarget===!0)&&(Xe=n.toneMapping);let Zt={shaderID:at,shaderType:g.type,shaderName:g.name,vertexShader:et,fragmentShader:L,defines:g.defines,customVertexShaderID:G,customFragmentShaderID:O,isRawShaderMaterial:g.isRawShaderMaterial===!0,glslVersion:g.glslVersion,precision:A,batching:nt,batchingColor:nt&&U._colorsTexture!==null,instancing:j,instancingColor:j&&U.instanceColor!==null,instancingMorph:j&&U.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:X===null?n.outputColorSpace:X.isXRRenderTarget===!0?X.texture.colorSpace:ci,alphaToCoverage:!!g.alphaToCoverage,map:ft,matcap:lt,envMap:D,envMapMode:D&&F.mapping,envMapCubeUVHeight:tt,aoMap:Gt,lightMap:ut,bumpMap:Ut,normalMap:Y,displacementMap:d&&pt,emissiveMap:mt,normalMapObjectSpace:Y&&g.normalMapType===vf,normalMapTangentSpace:Y&&g.normalMapType===Cc,metalnessMap:P,roughnessMap:S,anisotropy:W,anisotropyMap:yt,clearcoat:it,clearcoatMap:Wt,clearcoatNormalMap:ht,clearcoatRoughnessMap:_t,dispersion:ot,iridescence:st,iridescenceMap:Nt,iridescenceThicknessMap:Ot,sheen:Ct,sheenColorMap:St,sheenRoughnessMap:qt,specularMap:kt,specularColorMap:Kt,specularIntensityMap:H,transmission:gt,transmissionMap:xt,thicknessMap:$,gradientMap:rt,opaque:g.transparent===!1&&g.blending===us&&g.alphaToCoverage===!1,alphaMap:Mt,alphaTest:wt,alphaHash:Yt,combine:g.combine,mapUv:ft&&p(g.map.channel),aoMapUv:Gt&&p(g.aoMap.channel),lightMapUv:ut&&p(g.lightMap.channel),bumpMapUv:Ut&&p(g.bumpMap.channel),normalMapUv:Y&&p(g.normalMap.channel),displacementMapUv:pt&&p(g.displacementMap.channel),emissiveMapUv:mt&&p(g.emissiveMap.channel),metalnessMapUv:P&&p(g.metalnessMap.channel),roughnessMapUv:S&&p(g.roughnessMap.channel),anisotropyMapUv:yt&&p(g.anisotropyMap.channel),clearcoatMapUv:Wt&&p(g.clearcoatMap.channel),clearcoatNormalMapUv:ht&&p(g.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_t&&p(g.clearcoatRoughnessMap.channel),iridescenceMapUv:Nt&&p(g.iridescenceMap.channel),iridescenceThicknessMapUv:Ot&&p(g.iridescenceThicknessMap.channel),sheenColorMapUv:St&&p(g.sheenColorMap.channel),sheenRoughnessMapUv:qt&&p(g.sheenRoughnessMap.channel),specularMapUv:kt&&p(g.specularMap.channel),specularColorMapUv:Kt&&p(g.specularColorMap.channel),specularIntensityMapUv:H&&p(g.specularIntensityMap.channel),transmissionMapUv:xt&&p(g.transmissionMap.channel),thicknessMapUv:$&&p(g.thicknessMap.channel),alphaMapUv:Mt&&p(g.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(Y||W),vertexColors:g.vertexColors,vertexAlphas:g.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!z.attributes.uv&&(ft||Mt),fog:!!k,useFog:g.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:g.flatShading===!0,sizeAttenuation:g.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:f,skinning:U.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:Et,morphTextureStride:Dt,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:g.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:Xe,decodeVideoTexture:ft&&g.map.isVideoTexture===!0&&jt.getTransfer(g.map.colorSpace)===re,premultipliedAlpha:g.premultipliedAlpha,doubleSided:g.side===We,flipSided:g.side===Le,useDepthPacking:g.depthPacking>=0,depthPacking:g.depthPacking||0,index0AttributeName:g.index0AttributeName,extensionClipCullDistance:Ae&&g.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ae&&g.extensions.multiDraw===!0||nt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:g.customProgramCacheKey()};return Zt.vertexUv1s=c.has(1),Zt.vertexUv2s=c.has(2),Zt.vertexUv3s=c.has(3),c.clear(),Zt}function _(g){let v=[];if(g.shaderID?v.push(g.shaderID):(v.push(g.customVertexShaderID),v.push(g.customFragmentShaderID)),g.defines!==void 0)for(let I in g.defines)v.push(I),v.push(g.defines[I]);return g.isRawShaderMaterial===!1&&(x(v,g),M(v,g),v.push(n.outputColorSpace)),v.push(g.customProgramCacheKey),v.join()}function x(g,v){g.push(v.precision),g.push(v.outputColorSpace),g.push(v.envMapMode),g.push(v.envMapCubeUVHeight),g.push(v.mapUv),g.push(v.alphaMapUv),g.push(v.lightMapUv),g.push(v.aoMapUv),g.push(v.bumpMapUv),g.push(v.normalMapUv),g.push(v.displacementMapUv),g.push(v.emissiveMapUv),g.push(v.metalnessMapUv),g.push(v.roughnessMapUv),g.push(v.anisotropyMapUv),g.push(v.clearcoatMapUv),g.push(v.clearcoatNormalMapUv),g.push(v.clearcoatRoughnessMapUv),g.push(v.iridescenceMapUv),g.push(v.iridescenceThicknessMapUv),g.push(v.sheenColorMapUv),g.push(v.sheenRoughnessMapUv),g.push(v.specularMapUv),g.push(v.specularColorMapUv),g.push(v.specularIntensityMapUv),g.push(v.transmissionMapUv),g.push(v.thicknessMapUv),g.push(v.combine),g.push(v.fogExp2),g.push(v.sizeAttenuation),g.push(v.morphTargetsCount),g.push(v.morphAttributeCount),g.push(v.numDirLights),g.push(v.numPointLights),g.push(v.numSpotLights),g.push(v.numSpotLightMaps),g.push(v.numHemiLights),g.push(v.numRectAreaLights),g.push(v.numDirLightShadows),g.push(v.numPointLightShadows),g.push(v.numSpotLightShadows),g.push(v.numSpotLightShadowsWithMaps),g.push(v.numLightProbes),g.push(v.shadowMapType),g.push(v.toneMapping),g.push(v.numClippingPlanes),g.push(v.numClipIntersection),g.push(v.depthPacking)}function M(g,v){o.disableAll(),v.supportsVertexTextures&&o.enable(0),v.instancing&&o.enable(1),v.instancingColor&&o.enable(2),v.instancingMorph&&o.enable(3),v.matcap&&o.enable(4),v.envMap&&o.enable(5),v.normalMapObjectSpace&&o.enable(6),v.normalMapTangentSpace&&o.enable(7),v.clearcoat&&o.enable(8),v.iridescence&&o.enable(9),v.alphaTest&&o.enable(10),v.vertexColors&&o.enable(11),v.vertexAlphas&&o.enable(12),v.vertexUv1s&&o.enable(13),v.vertexUv2s&&o.enable(14),v.vertexUv3s&&o.enable(15),v.vertexTangents&&o.enable(16),v.anisotropy&&o.enable(17),v.alphaHash&&o.enable(18),v.batching&&o.enable(19),v.dispersion&&o.enable(20),v.batchingColor&&o.enable(21),g.push(o.mask),o.disableAll(),v.fog&&o.enable(0),v.useFog&&o.enable(1),v.flatShading&&o.enable(2),v.logarithmicDepthBuffer&&o.enable(3),v.reverseDepthBuffer&&o.enable(4),v.skinning&&o.enable(5),v.morphTargets&&o.enable(6),v.morphNormals&&o.enable(7),v.morphColors&&o.enable(8),v.premultipliedAlpha&&o.enable(9),v.shadowMapEnabled&&o.enable(10),v.doubleSided&&o.enable(11),v.flipSided&&o.enable(12),v.useDepthPacking&&o.enable(13),v.dithering&&o.enable(14),v.transmission&&o.enable(15),v.sheen&&o.enable(16),v.opaque&&o.enable(17),v.pointsUvs&&o.enable(18),v.decodeVideoTexture&&o.enable(19),v.alphaToCoverage&&o.enable(20),g.push(o.mask)}function R(g){let v=y[g.type],I;if(v){let N=In[v];I=Cn.clone(N.uniforms)}else I=g.uniforms;return I}function b(g,v){let I;for(let N=0,U=h.length;N<U;N++){let k=h[N];if(k.cacheKey===v){I=k,++I.usedTimes;break}}return I===void 0&&(I=new fA(n,v,g,r),h.push(I)),I}function w(g){if(--g.usedTimes===0){let v=h.indexOf(g);h[v]=h[h.length-1],h.pop(),g.destroy()}}function E(g){l.remove(g)}function T(){l.dispose()}return{getParameters:m,getProgramCacheKey:_,getUniforms:R,acquireProgram:b,releaseProgram:w,releaseShaderCache:E,programs:h,dispose:T}}function gA(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function AA(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function bu(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function wu(){let n=[],t=0,e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(u,f,d,A,y,p){let m=n[t];return m===void 0?(m={id:u.id,object:u,geometry:f,material:d,groupOrder:A,renderOrder:u.renderOrder,z:y,group:p},n[t]=m):(m.id=u.id,m.object=u,m.geometry=f,m.material=d,m.groupOrder=A,m.renderOrder=u.renderOrder,m.z=y,m.group=p),t++,m}function o(u,f,d,A,y,p){let m=a(u,f,d,A,y,p);d.transmission>0?i.push(m):d.transparent===!0?s.push(m):e.push(m)}function l(u,f,d,A,y,p){let m=a(u,f,d,A,y,p);d.transmission>0?i.unshift(m):d.transparent===!0?s.unshift(m):e.unshift(m)}function c(u,f){e.length>1&&e.sort(u||AA),i.length>1&&i.sort(f||bu),s.length>1&&s.sort(f||bu)}function h(){for(let u=t,f=n.length;u<f;u++){let d=n[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function vA(){let n=new WeakMap;function t(i,s){let r=n.get(i),a;return r===void 0?(a=new wu,n.set(i,[a])):s>=r.length?(a=new wu,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function xA(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new B,color:new Lt};break;case"SpotLight":e={position:new B,direction:new B,color:new Lt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new B,color:new Lt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new B,skyColor:new Lt,groundColor:new Lt};break;case"RectAreaLight":e={color:new Lt,position:new B,halfWidth:new B,halfHeight:new B};break}return n[t.id]=e,e}}}function yA(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var _A=0;function MA(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function bA(n){let t=new xA,e=yA(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new B);let s=new B,r=new ie,a=new ie;function o(c){let h=0,u=0,f=0;for(let T=0;T<9;T++)i.probe[T].set(0,0,0);let d=0,A=0,y=0,p=0,m=0,_=0,x=0,M=0,R=0,b=0,w=0;c.sort(MA);for(let T=0,g=c.length;T<g;T++){let v=c[T],I=v.color,N=v.intensity,U=v.distance,k=v.shadow&&v.shadow.map?v.shadow.map.texture:null;if(v.isAmbientLight)h+=I.r*N,u+=I.g*N,f+=I.b*N;else if(v.isLightProbe){for(let z=0;z<9;z++)i.probe[z].addScaledVector(v.sh.coefficients[z],N);w++}else if(v.isDirectionalLight){let z=t.get(v);if(z.color.copy(v.color).multiplyScalar(v.intensity),v.castShadow){let K=v.shadow,F=e.get(v);F.shadowIntensity=K.intensity,F.shadowBias=K.bias,F.shadowNormalBias=K.normalBias,F.shadowRadius=K.radius,F.shadowMapSize=K.mapSize,i.directionalShadow[d]=F,i.directionalShadowMap[d]=k,i.directionalShadowMatrix[d]=v.shadow.matrix,_++}i.directional[d]=z,d++}else if(v.isSpotLight){let z=t.get(v);z.position.setFromMatrixPosition(v.matrixWorld),z.color.copy(I).multiplyScalar(N),z.distance=U,z.coneCos=Math.cos(v.angle),z.penumbraCos=Math.cos(v.angle*(1-v.penumbra)),z.decay=v.decay,i.spot[y]=z;let K=v.shadow;if(v.map&&(i.spotLightMap[R]=v.map,R++,K.updateMatrices(v),v.castShadow&&b++),i.spotLightMatrix[y]=K.matrix,v.castShadow){let F=e.get(v);F.shadowIntensity=K.intensity,F.shadowBias=K.bias,F.shadowNormalBias=K.normalBias,F.shadowRadius=K.radius,F.shadowMapSize=K.mapSize,i.spotShadow[y]=F,i.spotShadowMap[y]=k,M++}y++}else if(v.isRectAreaLight){let z=t.get(v);z.color.copy(I).multiplyScalar(N),z.halfWidth.set(v.width*.5,0,0),z.halfHeight.set(0,v.height*.5,0),i.rectArea[p]=z,p++}else if(v.isPointLight){let z=t.get(v);if(z.color.copy(v.color).multiplyScalar(v.intensity),z.distance=v.distance,z.decay=v.decay,v.castShadow){let K=v.shadow,F=e.get(v);F.shadowIntensity=K.intensity,F.shadowBias=K.bias,F.shadowNormalBias=K.normalBias,F.shadowRadius=K.radius,F.shadowMapSize=K.mapSize,F.shadowCameraNear=K.camera.near,F.shadowCameraFar=K.camera.far,i.pointShadow[A]=F,i.pointShadowMap[A]=k,i.pointShadowMatrix[A]=v.shadow.matrix,x++}i.point[A]=z,A++}else if(v.isHemisphereLight){let z=t.get(v);z.skyColor.copy(v.color).multiplyScalar(N),z.groundColor.copy(v.groundColor).multiplyScalar(N),i.hemi[m]=z,m++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=At.LTC_FLOAT_1,i.rectAreaLTC2=At.LTC_FLOAT_2):(i.rectAreaLTC1=At.LTC_HALF_1,i.rectAreaLTC2=At.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=f;let E=i.hash;(E.directionalLength!==d||E.pointLength!==A||E.spotLength!==y||E.rectAreaLength!==p||E.hemiLength!==m||E.numDirectionalShadows!==_||E.numPointShadows!==x||E.numSpotShadows!==M||E.numSpotMaps!==R||E.numLightProbes!==w)&&(i.directional.length=d,i.spot.length=y,i.rectArea.length=p,i.point.length=A,i.hemi.length=m,i.directionalShadow.length=_,i.directionalShadowMap.length=_,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=_,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=M+R-b,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=w,E.directionalLength=d,E.pointLength=A,E.spotLength=y,E.rectAreaLength=p,E.hemiLength=m,E.numDirectionalShadows=_,E.numPointShadows=x,E.numSpotShadows=M,E.numSpotMaps=R,E.numLightProbes=w,i.version=_A++)}function l(c,h){let u=0,f=0,d=0,A=0,y=0,p=h.matrixWorldInverse;for(let m=0,_=c.length;m<_;m++){let x=c[m];if(x.isDirectionalLight){let M=i.directional[u];M.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(p),u++}else if(x.isSpotLight){let M=i.spot[d];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(p),M.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(p),d++}else if(x.isRectAreaLight){let M=i.rectArea[A];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(p),a.identity(),r.copy(x.matrixWorld),r.premultiply(p),a.extractRotation(r),M.halfWidth.set(x.width*.5,0,0),M.halfHeight.set(0,x.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),A++}else if(x.isPointLight){let M=i.point[f];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(p),f++}else if(x.isHemisphereLight){let M=i.hemi[y];M.direction.setFromMatrixPosition(x.matrixWorld),M.direction.transformDirection(p),y++}}}return{setup:o,setupView:l,state:i}}function Su(n){let t=new bA(n),e=[],i=[];function s(h){c.camera=h,e.length=0,i.length=0}function r(h){e.push(h)}function a(h){i.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}let c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function wA(n){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new Su(n),t.set(s,[o])):r>=a.length?(o=new Su(n),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}var sr=class extends qn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Af,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Gl=class extends qn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},SA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,EA=`uniform sampler2D shadow_pass;
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
}`;function TA(n,t,e){let i=new ir,s=new vt,r=new vt,a=new fe,o=new sr({depthPacking:Tc}),l=new Gl,c={},h=e.maxTextureSize,u={[Dn]:Le,[Le]:Dn,[We]:We},f=new xe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new vt},radius:{value:4}},vertexShader:SA,fragmentShader:EA}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let A=new oe;A.setAttribute("position",new _e(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new ae(A,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Iu;let m=this.type;this.render=function(b,w,E){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||b.length===0)return;let T=n.getRenderTarget(),g=n.getActiveCubeFace(),v=n.getActiveMipmapLevel(),I=n.state;I.setBlending(ge),I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);let N=m!==zn&&this.type===zn,U=m===zn&&this.type!==zn;for(let k=0,z=b.length;k<z;k++){let K=b[k],F=K.shadow;if(F===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;s.copy(F.mapSize);let tt=F.getFrameExtents();if(s.multiply(tt),r.copy(F.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/tt.x),s.x=r.x*tt.x,F.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/tt.y),s.y=r.y*tt.y,F.mapSize.y=r.y)),F.map===null||N===!0||U===!0){let ct=this.type!==zn?{minFilter:Ue,magFilter:Ue}:{};F.map!==null&&F.map.dispose(),F.map=new Be(s.x,s.y,ct),F.map.texture.name=K.name+".shadowMap",F.camera.updateProjectionMatrix()}n.setRenderTarget(F.map),n.clear();let at=F.getViewportCount();for(let ct=0;ct<at;ct++){let Et=F.getViewport(ct);a.set(r.x*Et.x,r.y*Et.y,r.x*Et.z,r.y*Et.w),I.viewport(a),F.updateMatrices(K,ct),i=F.getFrustum(),M(w,E,F.camera,K,this.type)}F.isPointLightShadow!==!0&&this.type===zn&&_(F,E),F.needsUpdate=!1}m=this.type,p.needsUpdate=!1,n.setRenderTarget(T,g,v)};function _(b,w){let E=t.update(y);f.defines.VSM_SAMPLES!==b.blurSamples&&(f.defines.VSM_SAMPLES=b.blurSamples,d.defines.VSM_SAMPLES=b.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Be(s.x,s.y)),f.uniforms.shadow_pass.value=b.map.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(w,null,E,f,y,null),d.uniforms.shadow_pass.value=b.mapPass.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(w,null,E,d,y,null)}function x(b,w,E,T){let g=null,v=E.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(v!==void 0)g=v;else if(g=E.isPointLight===!0?l:o,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){let I=g.uuid,N=w.uuid,U=c[I];U===void 0&&(U={},c[I]=U);let k=U[N];k===void 0&&(k=g.clone(),U[N]=k,w.addEventListener("dispose",R)),g=k}if(g.visible=w.visible,g.wireframe=w.wireframe,T===zn?g.side=w.shadowSide!==null?w.shadowSide:w.side:g.side=w.shadowSide!==null?w.shadowSide:u[w.side],g.alphaMap=w.alphaMap,g.alphaTest=w.alphaTest,g.map=w.map,g.clipShadows=w.clipShadows,g.clippingPlanes=w.clippingPlanes,g.clipIntersection=w.clipIntersection,g.displacementMap=w.displacementMap,g.displacementScale=w.displacementScale,g.displacementBias=w.displacementBias,g.wireframeLinewidth=w.wireframeLinewidth,g.linewidth=w.linewidth,E.isPointLight===!0&&g.isMeshDistanceMaterial===!0){let I=n.properties.get(g);I.light=E}return g}function M(b,w,E,T,g){if(b.visible===!1)return;if(b.layers.test(w.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&g===zn)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,b.matrixWorld);let N=t.update(b),U=b.material;if(Array.isArray(U)){let k=N.groups;for(let z=0,K=k.length;z<K;z++){let F=k[z],tt=U[F.materialIndex];if(tt&&tt.visible){let at=x(b,tt,T,g);b.onBeforeShadow(n,b,w,E,N,at,F),n.renderBufferDirect(E,null,N,at,b,F),b.onAfterShadow(n,b,w,E,N,at,F)}}}else if(U.visible){let k=x(b,U,T,g);b.onBeforeShadow(n,b,w,E,N,k,null),n.renderBufferDirect(E,null,N,k,b,null),b.onAfterShadow(n,b,w,E,N,k,null)}}let I=b.children;for(let N=0,U=I.length;N<U;N++)M(I[N],w,E,T,g)}function R(b){b.target.removeEventListener("dispose",R);for(let E in c){let T=c[E],g=b.target.uuid;g in T&&(T[g].dispose(),delete T[g])}}}var CA={[jo]:Zo,[Qo]:tl,[Jo]:el,[ms]:$o,[Zo]:jo,[tl]:Qo,[el]:Jo,[$o]:ms};function RA(n){function t(){let H=!1,xt=new fe,$=null,rt=new fe(0,0,0,0);return{setMask:function(Mt){$!==Mt&&!H&&(n.colorMask(Mt,Mt,Mt,Mt),$=Mt)},setLocked:function(Mt){H=Mt},setClear:function(Mt,wt,Yt,Ae,Xe){Xe===!0&&(Mt*=Ae,wt*=Ae,Yt*=Ae),xt.set(Mt,wt,Yt,Ae),rt.equals(xt)===!1&&(n.clearColor(Mt,wt,Yt,Ae),rt.copy(xt))},reset:function(){H=!1,$=null,rt.set(-1,0,0,0)}}}function e(){let H=!1,xt=!1,$=null,rt=null,Mt=null;return{setReversed:function(wt){xt=wt},setTest:function(wt){wt?G(n.DEPTH_TEST):O(n.DEPTH_TEST)},setMask:function(wt){$!==wt&&!H&&(n.depthMask(wt),$=wt)},setFunc:function(wt){if(xt&&(wt=CA[wt]),rt!==wt){switch(wt){case jo:n.depthFunc(n.NEVER);break;case Zo:n.depthFunc(n.ALWAYS);break;case Qo:n.depthFunc(n.LESS);break;case ms:n.depthFunc(n.LEQUAL);break;case Jo:n.depthFunc(n.EQUAL);break;case $o:n.depthFunc(n.GEQUAL);break;case tl:n.depthFunc(n.GREATER);break;case el:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}rt=wt}},setLocked:function(wt){H=wt},setClear:function(wt){Mt!==wt&&(n.clearDepth(wt),Mt=wt)},reset:function(){H=!1,$=null,rt=null,Mt=null}}}function i(){let H=!1,xt=null,$=null,rt=null,Mt=null,wt=null,Yt=null,Ae=null,Xe=null;return{setTest:function(Zt){H||(Zt?G(n.STENCIL_TEST):O(n.STENCIL_TEST))},setMask:function(Zt){xt!==Zt&&!H&&(n.stencilMask(Zt),xt=Zt)},setFunc:function(Zt,Ye,Ln){($!==Zt||rt!==Ye||Mt!==Ln)&&(n.stencilFunc(Zt,Ye,Ln),$=Zt,rt=Ye,Mt=Ln)},setOp:function(Zt,Ye,Ln){(wt!==Zt||Yt!==Ye||Ae!==Ln)&&(n.stencilOp(Zt,Ye,Ln),wt=Zt,Yt=Ye,Ae=Ln)},setLocked:function(Zt){H=Zt},setClear:function(Zt){Xe!==Zt&&(n.clearStencil(Zt),Xe=Zt)},reset:function(){H=!1,xt=null,$=null,rt=null,Mt=null,wt=null,Yt=null,Ae=null,Xe=null}}}let s=new t,r=new e,a=new i,o=new WeakMap,l=new WeakMap,c={},h={},u=new WeakMap,f=[],d=null,A=!1,y=null,p=null,m=null,_=null,x=null,M=null,R=null,b=new Lt(0,0,0),w=0,E=!1,T=null,g=null,v=null,I=null,N=null,U=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),k=!1,z=0,K=n.getParameter(n.VERSION);K.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(K)[1]),k=z>=1):K.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),k=z>=2);let F=null,tt={},at=n.getParameter(n.SCISSOR_BOX),ct=n.getParameter(n.VIEWPORT),Et=new fe().fromArray(at),Dt=new fe().fromArray(ct);function et(H,xt,$,rt){let Mt=new Uint8Array(4),wt=n.createTexture();n.bindTexture(H,wt),n.texParameteri(H,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(H,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Yt=0;Yt<$;Yt++)H===n.TEXTURE_3D||H===n.TEXTURE_2D_ARRAY?n.texImage3D(xt,0,n.RGBA,1,1,rt,0,n.RGBA,n.UNSIGNED_BYTE,Mt):n.texImage2D(xt+Yt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Mt);return wt}let L={};L[n.TEXTURE_2D]=et(n.TEXTURE_2D,n.TEXTURE_2D,1),L[n.TEXTURE_CUBE_MAP]=et(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),L[n.TEXTURE_2D_ARRAY]=et(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),L[n.TEXTURE_3D]=et(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),a.setClear(0),G(n.DEPTH_TEST),r.setFunc(ms),ut(!1),Ut(Ph),G(n.CULL_FACE),D(ge);function G(H){c[H]!==!0&&(n.enable(H),c[H]=!0)}function O(H){c[H]!==!1&&(n.disable(H),c[H]=!1)}function X(H,xt){return h[H]!==xt?(n.bindFramebuffer(H,xt),h[H]=xt,H===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=xt),H===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=xt),!0):!1}function j(H,xt){let $=f,rt=!1;if(H){$=u.get(xt),$===void 0&&($=[],u.set(xt,$));let Mt=H.textures;if($.length!==Mt.length||$[0]!==n.COLOR_ATTACHMENT0){for(let wt=0,Yt=Mt.length;wt<Yt;wt++)$[wt]=n.COLOR_ATTACHMENT0+wt;$.length=Mt.length,rt=!0}}else $[0]!==n.BACK&&($[0]=n.BACK,rt=!0);rt&&n.drawBuffers($)}function nt(H){return d!==H?(n.useProgram(H),d=H,!0):!1}let ft={[un]:n.FUNC_ADD,[Jd]:n.FUNC_SUBTRACT,[$d]:n.FUNC_REVERSE_SUBTRACT};ft[tf]=n.MIN,ft[ef]=n.MAX;let lt={[Ss]:n.ZERO,[nf]:n.ONE,[sf]:n.SRC_COLOR,[Yo]:n.SRC_ALPHA,[lf]:n.SRC_ALPHA_SATURATE,[wa]:n.DST_COLOR,[ba]:n.DST_ALPHA,[rf]:n.ONE_MINUS_SRC_COLOR,[Ko]:n.ONE_MINUS_SRC_ALPHA,[of]:n.ONE_MINUS_DST_COLOR,[af]:n.ONE_MINUS_DST_ALPHA,[cf]:n.CONSTANT_COLOR,[hf]:n.ONE_MINUS_CONSTANT_COLOR,[uf]:n.CONSTANT_ALPHA,[df]:n.ONE_MINUS_CONSTANT_ALPHA};function D(H,xt,$,rt,Mt,wt,Yt,Ae,Xe,Zt){if(H===ge){A===!0&&(O(n.BLEND),A=!1);return}if(A===!1&&(G(n.BLEND),A=!0),H!==mc){if(H!==y||Zt!==E){if((p!==un||x!==un)&&(n.blendEquation(n.FUNC_ADD),p=un,x=un),Zt)switch(H){case us:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ih:n.blendFunc(n.ONE,n.ONE);break;case Dh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Uh:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}else switch(H){case us:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ih:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Dh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Uh:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}m=null,_=null,M=null,R=null,b.set(0,0,0),w=0,y=H,E=Zt}return}Mt=Mt||xt,wt=wt||$,Yt=Yt||rt,(xt!==p||Mt!==x)&&(n.blendEquationSeparate(ft[xt],ft[Mt]),p=xt,x=Mt),($!==m||rt!==_||wt!==M||Yt!==R)&&(n.blendFuncSeparate(lt[$],lt[rt],lt[wt],lt[Yt]),m=$,_=rt,M=wt,R=Yt),(Ae.equals(b)===!1||Xe!==w)&&(n.blendColor(Ae.r,Ae.g,Ae.b,Xe),b.copy(Ae),w=Xe),y=H,E=!1}function Gt(H,xt){H.side===We?O(n.CULL_FACE):G(n.CULL_FACE);let $=H.side===Le;xt&&($=!$),ut($),H.blending===us&&H.transparent===!1?D(ge):D(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),r.setFunc(H.depthFunc),r.setTest(H.depthTest),r.setMask(H.depthWrite),s.setMask(H.colorWrite);let rt=H.stencilWrite;a.setTest(rt),rt&&(a.setMask(H.stencilWriteMask),a.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),a.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),pt(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?G(n.SAMPLE_ALPHA_TO_COVERAGE):O(n.SAMPLE_ALPHA_TO_COVERAGE)}function ut(H){T!==H&&(H?n.frontFace(n.CW):n.frontFace(n.CCW),T=H)}function Ut(H){H!==Zd?(G(n.CULL_FACE),H!==g&&(H===Ph?n.cullFace(n.BACK):H===Qd?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):O(n.CULL_FACE),g=H}function Y(H){H!==v&&(k&&n.lineWidth(H),v=H)}function pt(H,xt,$){H?(G(n.POLYGON_OFFSET_FILL),(I!==xt||N!==$)&&(n.polygonOffset(xt,$),I=xt,N=$)):O(n.POLYGON_OFFSET_FILL)}function mt(H){H?G(n.SCISSOR_TEST):O(n.SCISSOR_TEST)}function P(H){H===void 0&&(H=n.TEXTURE0+U-1),F!==H&&(n.activeTexture(H),F=H)}function S(H,xt,$){$===void 0&&(F===null?$=n.TEXTURE0+U-1:$=F);let rt=tt[$];rt===void 0&&(rt={type:void 0,texture:void 0},tt[$]=rt),(rt.type!==H||rt.texture!==xt)&&(F!==$&&(n.activeTexture($),F=$),n.bindTexture(H,xt||L[H]),rt.type=H,rt.texture=xt)}function W(){let H=tt[F];H!==void 0&&H.type!==void 0&&(n.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function it(){try{n.compressedTexImage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ot(){try{n.compressedTexImage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function st(){try{n.texSubImage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Ct(){try{n.texSubImage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function gt(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function yt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Wt(){try{n.texStorage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ht(){try{n.texStorage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function _t(){try{n.texImage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Nt(){try{n.texImage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Ot(H){Et.equals(H)===!1&&(n.scissor(H.x,H.y,H.z,H.w),Et.copy(H))}function St(H){Dt.equals(H)===!1&&(n.viewport(H.x,H.y,H.z,H.w),Dt.copy(H))}function qt(H,xt){let $=l.get(xt);$===void 0&&($=new WeakMap,l.set(xt,$));let rt=$.get(H);rt===void 0&&(rt=n.getUniformBlockIndex(xt,H.name),$.set(H,rt))}function kt(H,xt){let rt=l.get(xt).get(H);o.get(xt)!==rt&&(n.uniformBlockBinding(xt,rt,H.__bindingPointIndex),o.set(xt,rt))}function Kt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),c={},F=null,tt={},h={},u=new WeakMap,f=[],d=null,A=!1,y=null,p=null,m=null,_=null,x=null,M=null,R=null,b=new Lt(0,0,0),w=0,E=!1,T=null,g=null,v=null,I=null,N=null,Et.set(0,0,n.canvas.width,n.canvas.height),Dt.set(0,0,n.canvas.width,n.canvas.height),s.reset(),r.reset(),a.reset()}return{buffers:{color:s,depth:r,stencil:a},enable:G,disable:O,bindFramebuffer:X,drawBuffers:j,useProgram:nt,setBlending:D,setMaterial:Gt,setFlipSided:ut,setCullFace:Ut,setLineWidth:Y,setPolygonOffset:pt,setScissorTest:mt,activeTexture:P,bindTexture:S,unbindTexture:W,compressedTexImage2D:it,compressedTexImage3D:ot,texImage2D:_t,texImage3D:Nt,updateUBOMapping:qt,uniformBlockBinding:kt,texStorage2D:Wt,texStorage3D:ht,texSubImage2D:st,texSubImage3D:Ct,compressedTexSubImage2D:gt,compressedTexSubImage3D:yt,scissor:Ot,viewport:St,reset:Kt}}function Eu(n,t,e,i){let s=PA(i);switch(e){case Bu:return n*t;case ku:return n*t;case zu:return n*t*2;case Hu:return n*t/s.components*s.byteLength;case wc:return n*t/s.components*s.byteLength;case Vu:return n*t*2/s.components*s.byteLength;case Sc:return n*t*2/s.components*s.byteLength;case Fu:return n*t*3/s.components*s.byteLength;case rn:return n*t*4/s.components*s.byteLength;case Ec:return n*t*4/s.components*s.byteLength;case Kr:case jr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Zr:case Qr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case al:case ll:return Math.max(n,16)*Math.max(t,8)/4;case rl:case ol:return Math.max(n,8)*Math.max(t,8)/2;case cl:case hl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case ul:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case dl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case fl:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case pl:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case ml:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case gl:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Al:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case vl:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case xl:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case yl:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case _l:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Ml:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case bl:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case wl:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Sl:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Jr:case El:case Tl:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Gu:case Cl:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Rl:case Pl:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function PA(n){switch(n){case wn:case Lu:return{byteLength:1,components:1};case $s:case Nu:case fn:return{byteLength:2,components:1};case Mc:case bc:return{byteLength:2,components:4};case Ii:case _c:case Vn:return{byteLength:4,components:1};case Ou:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function IA(n,t,e,i,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new vt,h=new WeakMap,u,f=new WeakMap,d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function A(P,S){return d?new OffscreenCanvas(P,S):ra("canvas")}function y(P,S,W){let it=1,ot=mt(P);if((ot.width>W||ot.height>W)&&(it=W/Math.max(ot.width,ot.height)),it<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){let st=Math.floor(it*ot.width),Ct=Math.floor(it*ot.height);u===void 0&&(u=A(st,Ct));let gt=S?A(st,Ct):u;return gt.width=st,gt.height=Ct,gt.getContext("2d").drawImage(P,0,0,st,Ct),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ot.width+"x"+ot.height+") to ("+st+"x"+Ct+")."),gt}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ot.width+"x"+ot.height+")."),P;return P}function p(P){return P.generateMipmaps&&P.minFilter!==Ue&&P.minFilter!==bn}function m(P){n.generateMipmap(P)}function _(P,S,W,it,ot=!1){if(P!==null){if(n[P]!==void 0)return n[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let st=S;if(S===n.RED&&(W===n.FLOAT&&(st=n.R32F),W===n.HALF_FLOAT&&(st=n.R16F),W===n.UNSIGNED_BYTE&&(st=n.R8)),S===n.RED_INTEGER&&(W===n.UNSIGNED_BYTE&&(st=n.R8UI),W===n.UNSIGNED_SHORT&&(st=n.R16UI),W===n.UNSIGNED_INT&&(st=n.R32UI),W===n.BYTE&&(st=n.R8I),W===n.SHORT&&(st=n.R16I),W===n.INT&&(st=n.R32I)),S===n.RG&&(W===n.FLOAT&&(st=n.RG32F),W===n.HALF_FLOAT&&(st=n.RG16F),W===n.UNSIGNED_BYTE&&(st=n.RG8)),S===n.RG_INTEGER&&(W===n.UNSIGNED_BYTE&&(st=n.RG8UI),W===n.UNSIGNED_SHORT&&(st=n.RG16UI),W===n.UNSIGNED_INT&&(st=n.RG32UI),W===n.BYTE&&(st=n.RG8I),W===n.SHORT&&(st=n.RG16I),W===n.INT&&(st=n.RG32I)),S===n.RGB_INTEGER&&(W===n.UNSIGNED_BYTE&&(st=n.RGB8UI),W===n.UNSIGNED_SHORT&&(st=n.RGB16UI),W===n.UNSIGNED_INT&&(st=n.RGB32UI),W===n.BYTE&&(st=n.RGB8I),W===n.SHORT&&(st=n.RGB16I),W===n.INT&&(st=n.RGB32I)),S===n.RGBA_INTEGER&&(W===n.UNSIGNED_BYTE&&(st=n.RGBA8UI),W===n.UNSIGNED_SHORT&&(st=n.RGBA16UI),W===n.UNSIGNED_INT&&(st=n.RGBA32UI),W===n.BYTE&&(st=n.RGBA8I),W===n.SHORT&&(st=n.RGBA16I),W===n.INT&&(st=n.RGBA32I)),S===n.RGB&&W===n.UNSIGNED_INT_5_9_9_9_REV&&(st=n.RGB9_E5),S===n.RGBA){let Ct=ot?ea:jt.getTransfer(it);W===n.FLOAT&&(st=n.RGBA32F),W===n.HALF_FLOAT&&(st=n.RGBA16F),W===n.UNSIGNED_BYTE&&(st=Ct===re?n.SRGB8_ALPHA8:n.RGBA8),W===n.UNSIGNED_SHORT_4_4_4_4&&(st=n.RGBA4),W===n.UNSIGNED_SHORT_5_5_5_1&&(st=n.RGB5_A1)}return(st===n.R16F||st===n.R32F||st===n.RG16F||st===n.RG32F||st===n.RGBA16F||st===n.RGBA32F)&&t.get("EXT_color_buffer_float"),st}function x(P,S){let W;return P?S===null||S===Ii||S===oi?W=n.DEPTH24_STENCIL8:S===Vn?W=n.DEPTH32F_STENCIL8:S===$s&&(W=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Ii||S===oi?W=n.DEPTH_COMPONENT24:S===Vn?W=n.DEPTH_COMPONENT32F:S===$s&&(W=n.DEPTH_COMPONENT16),W}function M(P,S){return p(P)===!0||P.isFramebufferTexture&&P.minFilter!==Ue&&P.minFilter!==bn?Math.log2(Math.max(S.width,S.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?S.mipmaps.length:1}function R(P){let S=P.target;S.removeEventListener("dispose",R),w(S),S.isVideoTexture&&h.delete(S)}function b(P){let S=P.target;S.removeEventListener("dispose",b),T(S)}function w(P){let S=i.get(P);if(S.__webglInit===void 0)return;let W=P.source,it=f.get(W);if(it){let ot=it[S.__cacheKey];ot.usedTimes--,ot.usedTimes===0&&E(P),Object.keys(it).length===0&&f.delete(W)}i.remove(P)}function E(P){let S=i.get(P);n.deleteTexture(S.__webglTexture);let W=P.source,it=f.get(W);delete it[S.__cacheKey],a.memory.textures--}function T(P){let S=i.get(P);if(P.depthTexture&&P.depthTexture.dispose(),P.isWebGLCubeRenderTarget)for(let it=0;it<6;it++){if(Array.isArray(S.__webglFramebuffer[it]))for(let ot=0;ot<S.__webglFramebuffer[it].length;ot++)n.deleteFramebuffer(S.__webglFramebuffer[it][ot]);else n.deleteFramebuffer(S.__webglFramebuffer[it]);S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer[it])}else{if(Array.isArray(S.__webglFramebuffer))for(let it=0;it<S.__webglFramebuffer.length;it++)n.deleteFramebuffer(S.__webglFramebuffer[it]);else n.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&n.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let it=0;it<S.__webglColorRenderbuffer.length;it++)S.__webglColorRenderbuffer[it]&&n.deleteRenderbuffer(S.__webglColorRenderbuffer[it]);S.__webglDepthRenderbuffer&&n.deleteRenderbuffer(S.__webglDepthRenderbuffer)}let W=P.textures;for(let it=0,ot=W.length;it<ot;it++){let st=i.get(W[it]);st.__webglTexture&&(n.deleteTexture(st.__webglTexture),a.memory.textures--),i.remove(W[it])}i.remove(P)}let g=0;function v(){g=0}function I(){let P=g;return P>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+s.maxTextures),g+=1,P}function N(P){let S=[];return S.push(P.wrapS),S.push(P.wrapT),S.push(P.wrapR||0),S.push(P.magFilter),S.push(P.minFilter),S.push(P.anisotropy),S.push(P.internalFormat),S.push(P.format),S.push(P.type),S.push(P.generateMipmaps),S.push(P.premultiplyAlpha),S.push(P.flipY),S.push(P.unpackAlignment),S.push(P.colorSpace),S.join()}function U(P,S){let W=i.get(P);if(P.isVideoTexture&&Y(P),P.isRenderTargetTexture===!1&&P.version>0&&W.__version!==P.version){let it=P.image;if(it===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(it.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Dt(W,P,S);return}}e.bindTexture(n.TEXTURE_2D,W.__webglTexture,n.TEXTURE0+S)}function k(P,S){let W=i.get(P);if(P.version>0&&W.__version!==P.version){Dt(W,P,S);return}e.bindTexture(n.TEXTURE_2D_ARRAY,W.__webglTexture,n.TEXTURE0+S)}function z(P,S){let W=i.get(P);if(P.version>0&&W.__version!==P.version){Dt(W,P,S);return}e.bindTexture(n.TEXTURE_3D,W.__webglTexture,n.TEXTURE0+S)}function K(P,S){let W=i.get(P);if(P.version>0&&W.__version!==P.version){et(W,P,S);return}e.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture,n.TEXTURE0+S)}let F={[an]:n.REPEAT,[Hn]:n.CLAMP_TO_EDGE,[sl]:n.MIRRORED_REPEAT},tt={[Ue]:n.NEAREST,[gf]:n.NEAREST_MIPMAP_NEAREST,[Sr]:n.NEAREST_MIPMAP_LINEAR,[bn]:n.LINEAR,[po]:n.LINEAR_MIPMAP_NEAREST,[Pi]:n.LINEAR_MIPMAP_LINEAR},at={[xf]:n.NEVER,[Sf]:n.ALWAYS,[yf]:n.LESS,[Wu]:n.LEQUAL,[_f]:n.EQUAL,[wf]:n.GEQUAL,[Mf]:n.GREATER,[bf]:n.NOTEQUAL};function ct(P,S){if(S.type===Vn&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===bn||S.magFilter===po||S.magFilter===Sr||S.magFilter===Pi||S.minFilter===bn||S.minFilter===po||S.minFilter===Sr||S.minFilter===Pi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(P,n.TEXTURE_WRAP_S,F[S.wrapS]),n.texParameteri(P,n.TEXTURE_WRAP_T,F[S.wrapT]),(P===n.TEXTURE_3D||P===n.TEXTURE_2D_ARRAY)&&n.texParameteri(P,n.TEXTURE_WRAP_R,F[S.wrapR]),n.texParameteri(P,n.TEXTURE_MAG_FILTER,tt[S.magFilter]),n.texParameteri(P,n.TEXTURE_MIN_FILTER,tt[S.minFilter]),S.compareFunction&&(n.texParameteri(P,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(P,n.TEXTURE_COMPARE_FUNC,at[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Ue||S.minFilter!==Sr&&S.minFilter!==Pi||S.type===Vn&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){let W=t.get("EXT_texture_filter_anisotropic");n.texParameterf(P,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function Et(P,S){let W=!1;P.__webglInit===void 0&&(P.__webglInit=!0,S.addEventListener("dispose",R));let it=S.source,ot=f.get(it);ot===void 0&&(ot={},f.set(it,ot));let st=N(S);if(st!==P.__cacheKey){ot[st]===void 0&&(ot[st]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,W=!0),ot[st].usedTimes++;let Ct=ot[P.__cacheKey];Ct!==void 0&&(ot[P.__cacheKey].usedTimes--,Ct.usedTimes===0&&E(S)),P.__cacheKey=st,P.__webglTexture=ot[st].texture}return W}function Dt(P,S,W){let it=n.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(it=n.TEXTURE_2D_ARRAY),S.isData3DTexture&&(it=n.TEXTURE_3D);let ot=Et(P,S),st=S.source;e.bindTexture(it,P.__webglTexture,n.TEXTURE0+W);let Ct=i.get(st);if(st.version!==Ct.__version||ot===!0){e.activeTexture(n.TEXTURE0+W);let gt=jt.getPrimaries(jt.workingColorSpace),yt=S.colorSpace===si?null:jt.getPrimaries(S.colorSpace),Wt=S.colorSpace===si||gt===yt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Wt);let ht=y(S.image,!1,s.maxTextureSize);ht=pt(S,ht);let _t=r.convert(S.format,S.colorSpace),Nt=r.convert(S.type),Ot=_(S.internalFormat,_t,Nt,S.colorSpace,S.isVideoTexture);ct(it,S);let St,qt=S.mipmaps,kt=S.isVideoTexture!==!0,Kt=Ct.__version===void 0||ot===!0,H=st.dataReady,xt=M(S,ht);if(S.isDepthTexture)Ot=x(S.format===li,S.type),Kt&&(kt?e.texStorage2D(n.TEXTURE_2D,1,Ot,ht.width,ht.height):e.texImage2D(n.TEXTURE_2D,0,Ot,ht.width,ht.height,0,_t,Nt,null));else if(S.isDataTexture)if(qt.length>0){kt&&Kt&&e.texStorage2D(n.TEXTURE_2D,xt,Ot,qt[0].width,qt[0].height);for(let $=0,rt=qt.length;$<rt;$++)St=qt[$],kt?H&&e.texSubImage2D(n.TEXTURE_2D,$,0,0,St.width,St.height,_t,Nt,St.data):e.texImage2D(n.TEXTURE_2D,$,Ot,St.width,St.height,0,_t,Nt,St.data);S.generateMipmaps=!1}else kt?(Kt&&e.texStorage2D(n.TEXTURE_2D,xt,Ot,ht.width,ht.height),H&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ht.width,ht.height,_t,Nt,ht.data)):e.texImage2D(n.TEXTURE_2D,0,Ot,ht.width,ht.height,0,_t,Nt,ht.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){kt&&Kt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,xt,Ot,qt[0].width,qt[0].height,ht.depth);for(let $=0,rt=qt.length;$<rt;$++)if(St=qt[$],S.format!==rn)if(_t!==null)if(kt){if(H)if(S.layerUpdates.size>0){let Mt=Eu(St.width,St.height,S.format,S.type);for(let wt of S.layerUpdates){let Yt=St.data.subarray(wt*Mt/St.data.BYTES_PER_ELEMENT,(wt+1)*Mt/St.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,wt,St.width,St.height,1,_t,Yt,0,0)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,St.width,St.height,ht.depth,_t,St.data,0,0)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,$,Ot,St.width,St.height,ht.depth,0,St.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else kt?H&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,St.width,St.height,ht.depth,_t,Nt,St.data):e.texImage3D(n.TEXTURE_2D_ARRAY,$,Ot,St.width,St.height,ht.depth,0,_t,Nt,St.data)}else{kt&&Kt&&e.texStorage2D(n.TEXTURE_2D,xt,Ot,qt[0].width,qt[0].height);for(let $=0,rt=qt.length;$<rt;$++)St=qt[$],S.format!==rn?_t!==null?kt?H&&e.compressedTexSubImage2D(n.TEXTURE_2D,$,0,0,St.width,St.height,_t,St.data):e.compressedTexImage2D(n.TEXTURE_2D,$,Ot,St.width,St.height,0,St.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):kt?H&&e.texSubImage2D(n.TEXTURE_2D,$,0,0,St.width,St.height,_t,Nt,St.data):e.texImage2D(n.TEXTURE_2D,$,Ot,St.width,St.height,0,_t,Nt,St.data)}else if(S.isDataArrayTexture)if(kt){if(Kt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,xt,Ot,ht.width,ht.height,ht.depth),H)if(S.layerUpdates.size>0){let $=Eu(ht.width,ht.height,S.format,S.type);for(let rt of S.layerUpdates){let Mt=ht.data.subarray(rt*$/ht.data.BYTES_PER_ELEMENT,(rt+1)*$/ht.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,rt,ht.width,ht.height,1,_t,Nt,Mt)}S.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ht.width,ht.height,ht.depth,_t,Nt,ht.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Ot,ht.width,ht.height,ht.depth,0,_t,Nt,ht.data);else if(S.isData3DTexture)kt?(Kt&&e.texStorage3D(n.TEXTURE_3D,xt,Ot,ht.width,ht.height,ht.depth),H&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ht.width,ht.height,ht.depth,_t,Nt,ht.data)):e.texImage3D(n.TEXTURE_3D,0,Ot,ht.width,ht.height,ht.depth,0,_t,Nt,ht.data);else if(S.isFramebufferTexture){if(Kt)if(kt)e.texStorage2D(n.TEXTURE_2D,xt,Ot,ht.width,ht.height);else{let $=ht.width,rt=ht.height;for(let Mt=0;Mt<xt;Mt++)e.texImage2D(n.TEXTURE_2D,Mt,Ot,$,rt,0,_t,Nt,null),$>>=1,rt>>=1}}else if(qt.length>0){if(kt&&Kt){let $=mt(qt[0]);e.texStorage2D(n.TEXTURE_2D,xt,Ot,$.width,$.height)}for(let $=0,rt=qt.length;$<rt;$++)St=qt[$],kt?H&&e.texSubImage2D(n.TEXTURE_2D,$,0,0,_t,Nt,St):e.texImage2D(n.TEXTURE_2D,$,Ot,_t,Nt,St);S.generateMipmaps=!1}else if(kt){if(Kt){let $=mt(ht);e.texStorage2D(n.TEXTURE_2D,xt,Ot,$.width,$.height)}H&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,_t,Nt,ht)}else e.texImage2D(n.TEXTURE_2D,0,Ot,_t,Nt,ht);p(S)&&m(it),Ct.__version=st.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function et(P,S,W){if(S.image.length!==6)return;let it=Et(P,S),ot=S.source;e.bindTexture(n.TEXTURE_CUBE_MAP,P.__webglTexture,n.TEXTURE0+W);let st=i.get(ot);if(ot.version!==st.__version||it===!0){e.activeTexture(n.TEXTURE0+W);let Ct=jt.getPrimaries(jt.workingColorSpace),gt=S.colorSpace===si?null:jt.getPrimaries(S.colorSpace),yt=S.colorSpace===si||Ct===gt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,yt);let Wt=S.isCompressedTexture||S.image[0].isCompressedTexture,ht=S.image[0]&&S.image[0].isDataTexture,_t=[];for(let rt=0;rt<6;rt++)!Wt&&!ht?_t[rt]=y(S.image[rt],!0,s.maxCubemapSize):_t[rt]=ht?S.image[rt].image:S.image[rt],_t[rt]=pt(S,_t[rt]);let Nt=_t[0],Ot=r.convert(S.format,S.colorSpace),St=r.convert(S.type),qt=_(S.internalFormat,Ot,St,S.colorSpace),kt=S.isVideoTexture!==!0,Kt=st.__version===void 0||it===!0,H=ot.dataReady,xt=M(S,Nt);ct(n.TEXTURE_CUBE_MAP,S);let $;if(Wt){kt&&Kt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,xt,qt,Nt.width,Nt.height);for(let rt=0;rt<6;rt++){$=_t[rt].mipmaps;for(let Mt=0;Mt<$.length;Mt++){let wt=$[Mt];S.format!==rn?Ot!==null?kt?H&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Mt,0,0,wt.width,wt.height,Ot,wt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Mt,qt,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):kt?H&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Mt,0,0,wt.width,wt.height,Ot,St,wt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Mt,qt,wt.width,wt.height,0,Ot,St,wt.data)}}}else{if($=S.mipmaps,kt&&Kt){$.length>0&&xt++;let rt=mt(_t[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,xt,qt,rt.width,rt.height)}for(let rt=0;rt<6;rt++)if(ht){kt?H&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,_t[rt].width,_t[rt].height,Ot,St,_t[rt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,qt,_t[rt].width,_t[rt].height,0,Ot,St,_t[rt].data);for(let Mt=0;Mt<$.length;Mt++){let Yt=$[Mt].image[rt].image;kt?H&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Mt+1,0,0,Yt.width,Yt.height,Ot,St,Yt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Mt+1,qt,Yt.width,Yt.height,0,Ot,St,Yt.data)}}else{kt?H&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,Ot,St,_t[rt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,qt,Ot,St,_t[rt]);for(let Mt=0;Mt<$.length;Mt++){let wt=$[Mt];kt?H&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Mt+1,0,0,Ot,St,wt.image[rt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+rt,Mt+1,qt,Ot,St,wt.image[rt])}}}p(S)&&m(n.TEXTURE_CUBE_MAP),st.__version=ot.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function L(P,S,W,it,ot,st){let Ct=r.convert(W.format,W.colorSpace),gt=r.convert(W.type),yt=_(W.internalFormat,Ct,gt,W.colorSpace);if(!i.get(S).__hasExternalTextures){let ht=Math.max(1,S.width>>st),_t=Math.max(1,S.height>>st);ot===n.TEXTURE_3D||ot===n.TEXTURE_2D_ARRAY?e.texImage3D(ot,st,yt,ht,_t,S.depth,0,Ct,gt,null):e.texImage2D(ot,st,yt,ht,_t,0,Ct,gt,null)}e.bindFramebuffer(n.FRAMEBUFFER,P),Ut(S)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,it,ot,i.get(W).__webglTexture,0,ut(S)):(ot===n.TEXTURE_2D||ot>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ot<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,it,ot,i.get(W).__webglTexture,st),e.bindFramebuffer(n.FRAMEBUFFER,null)}function G(P,S,W){if(n.bindRenderbuffer(n.RENDERBUFFER,P),S.depthBuffer){let it=S.depthTexture,ot=it&&it.isDepthTexture?it.type:null,st=x(S.stencilBuffer,ot),Ct=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,gt=ut(S);Ut(S)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,gt,st,S.width,S.height):W?n.renderbufferStorageMultisample(n.RENDERBUFFER,gt,st,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,st,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Ct,n.RENDERBUFFER,P)}else{let it=S.textures;for(let ot=0;ot<it.length;ot++){let st=it[ot],Ct=r.convert(st.format,st.colorSpace),gt=r.convert(st.type),yt=_(st.internalFormat,Ct,gt,st.colorSpace),Wt=ut(S);W&&Ut(S)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Wt,yt,S.width,S.height):Ut(S)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Wt,yt,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,yt,S.width,S.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function O(P,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,P),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),U(S.depthTexture,0);let it=i.get(S.depthTexture).__webglTexture,ot=ut(S);if(S.depthTexture.format===ds)Ut(S)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,it,0,ot):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,it,0);else if(S.depthTexture.format===li)Ut(S)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,it,0,ot):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,it,0);else throw new Error("Unknown depthTexture format")}function X(P){let S=i.get(P),W=P.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==P.depthTexture){let it=P.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),it){let ot=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,it.removeEventListener("dispose",ot)};it.addEventListener("dispose",ot),S.__depthDisposeCallback=ot}S.__boundDepthTexture=it}if(P.depthTexture&&!S.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");O(S.__webglFramebuffer,P)}else if(W){S.__webglDepthbuffer=[];for(let it=0;it<6;it++)if(e.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[it]),S.__webglDepthbuffer[it]===void 0)S.__webglDepthbuffer[it]=n.createRenderbuffer(),G(S.__webglDepthbuffer[it],P,!1);else{let ot=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,st=S.__webglDepthbuffer[it];n.bindRenderbuffer(n.RENDERBUFFER,st),n.framebufferRenderbuffer(n.FRAMEBUFFER,ot,n.RENDERBUFFER,st)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=n.createRenderbuffer(),G(S.__webglDepthbuffer,P,!1);else{let it=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ot=S.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ot),n.framebufferRenderbuffer(n.FRAMEBUFFER,it,n.RENDERBUFFER,ot)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function j(P,S,W){let it=i.get(P);S!==void 0&&L(it.__webglFramebuffer,P,P.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),W!==void 0&&X(P)}function nt(P){let S=P.texture,W=i.get(P),it=i.get(S);P.addEventListener("dispose",b);let ot=P.textures,st=P.isWebGLCubeRenderTarget===!0,Ct=ot.length>1;if(Ct||(it.__webglTexture===void 0&&(it.__webglTexture=n.createTexture()),it.__version=S.version,a.memory.textures++),st){W.__webglFramebuffer=[];for(let gt=0;gt<6;gt++)if(S.mipmaps&&S.mipmaps.length>0){W.__webglFramebuffer[gt]=[];for(let yt=0;yt<S.mipmaps.length;yt++)W.__webglFramebuffer[gt][yt]=n.createFramebuffer()}else W.__webglFramebuffer[gt]=n.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){W.__webglFramebuffer=[];for(let gt=0;gt<S.mipmaps.length;gt++)W.__webglFramebuffer[gt]=n.createFramebuffer()}else W.__webglFramebuffer=n.createFramebuffer();if(Ct)for(let gt=0,yt=ot.length;gt<yt;gt++){let Wt=i.get(ot[gt]);Wt.__webglTexture===void 0&&(Wt.__webglTexture=n.createTexture(),a.memory.textures++)}if(P.samples>0&&Ut(P)===!1){W.__webglMultisampledFramebuffer=n.createFramebuffer(),W.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let gt=0;gt<ot.length;gt++){let yt=ot[gt];W.__webglColorRenderbuffer[gt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,W.__webglColorRenderbuffer[gt]);let Wt=r.convert(yt.format,yt.colorSpace),ht=r.convert(yt.type),_t=_(yt.internalFormat,Wt,ht,yt.colorSpace,P.isXRRenderTarget===!0),Nt=ut(P);n.renderbufferStorageMultisample(n.RENDERBUFFER,Nt,_t,P.width,P.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+gt,n.RENDERBUFFER,W.__webglColorRenderbuffer[gt])}n.bindRenderbuffer(n.RENDERBUFFER,null),P.depthBuffer&&(W.__webglDepthRenderbuffer=n.createRenderbuffer(),G(W.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(st){e.bindTexture(n.TEXTURE_CUBE_MAP,it.__webglTexture),ct(n.TEXTURE_CUBE_MAP,S);for(let gt=0;gt<6;gt++)if(S.mipmaps&&S.mipmaps.length>0)for(let yt=0;yt<S.mipmaps.length;yt++)L(W.__webglFramebuffer[gt][yt],P,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+gt,yt);else L(W.__webglFramebuffer[gt],P,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0);p(S)&&m(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Ct){for(let gt=0,yt=ot.length;gt<yt;gt++){let Wt=ot[gt],ht=i.get(Wt);e.bindTexture(n.TEXTURE_2D,ht.__webglTexture),ct(n.TEXTURE_2D,Wt),L(W.__webglFramebuffer,P,Wt,n.COLOR_ATTACHMENT0+gt,n.TEXTURE_2D,0),p(Wt)&&m(n.TEXTURE_2D)}e.unbindTexture()}else{let gt=n.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(gt=P.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(gt,it.__webglTexture),ct(gt,S),S.mipmaps&&S.mipmaps.length>0)for(let yt=0;yt<S.mipmaps.length;yt++)L(W.__webglFramebuffer[yt],P,S,n.COLOR_ATTACHMENT0,gt,yt);else L(W.__webglFramebuffer,P,S,n.COLOR_ATTACHMENT0,gt,0);p(S)&&m(gt),e.unbindTexture()}P.depthBuffer&&X(P)}function ft(P){let S=P.textures;for(let W=0,it=S.length;W<it;W++){let ot=S[W];if(p(ot)){let st=P.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,Ct=i.get(ot).__webglTexture;e.bindTexture(st,Ct),m(st),e.unbindTexture()}}}let lt=[],D=[];function Gt(P){if(P.samples>0){if(Ut(P)===!1){let S=P.textures,W=P.width,it=P.height,ot=n.COLOR_BUFFER_BIT,st=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ct=i.get(P),gt=S.length>1;if(gt)for(let yt=0;yt<S.length;yt++)e.bindFramebuffer(n.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+yt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,Ct.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+yt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer);for(let yt=0;yt<S.length;yt++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(ot|=n.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(ot|=n.STENCIL_BUFFER_BIT)),gt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Ct.__webglColorRenderbuffer[yt]);let Wt=i.get(S[yt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Wt,0)}n.blitFramebuffer(0,0,W,it,0,0,W,it,ot,n.NEAREST),l===!0&&(lt.length=0,D.length=0,lt.push(n.COLOR_ATTACHMENT0+yt),P.depthBuffer&&P.resolveDepthBuffer===!1&&(lt.push(st),D.push(st),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,D)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,lt))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),gt)for(let yt=0;yt<S.length;yt++){e.bindFramebuffer(n.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+yt,n.RENDERBUFFER,Ct.__webglColorRenderbuffer[yt]);let Wt=i.get(S[yt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,Ct.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+yt,n.TEXTURE_2D,Wt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){let S=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[S])}}}function ut(P){return Math.min(s.maxSamples,P.samples)}function Ut(P){let S=i.get(P);return P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Y(P){let S=a.render.frame;h.get(P)!==S&&(h.set(P,S),P.update())}function pt(P,S){let W=P.colorSpace,it=P.format,ot=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||W!==ci&&W!==si&&(jt.getTransfer(W)===re?(it!==rn||ot!==wn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),S}function mt(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=I,this.resetTextureUnits=v,this.setTexture2D=U,this.setTexture2DArray=k,this.setTexture3D=z,this.setTextureCube=K,this.rebindTextures=j,this.setupRenderTarget=nt,this.updateRenderTargetMipmap=ft,this.updateMultisampleRenderTarget=Gt,this.setupDepthRenderbuffer=X,this.setupFrameBufferTexture=L,this.useMultisampledRTT=Ut}function DA(n,t){function e(i,s=si){let r,a=jt.getTransfer(s);if(i===wn)return n.UNSIGNED_BYTE;if(i===Mc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===bc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Ou)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Lu)return n.BYTE;if(i===Nu)return n.SHORT;if(i===$s)return n.UNSIGNED_SHORT;if(i===_c)return n.INT;if(i===Ii)return n.UNSIGNED_INT;if(i===Vn)return n.FLOAT;if(i===fn)return n.HALF_FLOAT;if(i===Bu)return n.ALPHA;if(i===Fu)return n.RGB;if(i===rn)return n.RGBA;if(i===ku)return n.LUMINANCE;if(i===zu)return n.LUMINANCE_ALPHA;if(i===ds)return n.DEPTH_COMPONENT;if(i===li)return n.DEPTH_STENCIL;if(i===Hu)return n.RED;if(i===wc)return n.RED_INTEGER;if(i===Vu)return n.RG;if(i===Sc)return n.RG_INTEGER;if(i===Ec)return n.RGBA_INTEGER;if(i===Kr||i===jr||i===Zr||i===Qr)if(a===re)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Kr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===jr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Zr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Qr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Kr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===jr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Zr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Qr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===rl||i===al||i===ol||i===ll)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===rl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===al)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ol)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ll)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===cl||i===hl||i===ul)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===cl||i===hl)return a===re?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===ul)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===dl||i===fl||i===pl||i===ml||i===gl||i===Al||i===vl||i===xl||i===yl||i===_l||i===Ml||i===bl||i===wl||i===Sl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===dl)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===fl)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===pl)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ml)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===gl)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Al)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===vl)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===xl)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===yl)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===_l)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ml)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===bl)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===wl)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Sl)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Jr||i===El||i===Tl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Jr)return a===re?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===El)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Tl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Gu||i===Cl||i===Rl||i===Pl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Jr)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Cl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Rl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Pl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===oi?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}var Wl=class extends Ge{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},ri=class extends je{constructor(){super(),this.isGroup=!0,this.type="Group"}},UA={type:"move"},Zs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ri,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ri,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ri,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let y of t.hand.values()){let p=e.getJointPose(y,i),m=this._getHandJoint(c,y);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,A=.005;c.inputState.pinching&&f>d+A?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-A&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(UA)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new ri;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},LA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,NA=`
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

}`,ql=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){let s=new Ke,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new xe({vertexShader:LA,fragmentShader:NA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ae(new Yn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Xl=class extends Wn{constructor(t,e){super();let i=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,A=null,y=new ql,p=e.getContextAttributes(),m=null,_=null,x=[],M=[],R=new vt,b=null,w=new Ge;w.layers.enable(1),w.viewport=new fe;let E=new Ge;E.layers.enable(2),E.viewport=new fe;let T=[w,E],g=new Wl;g.layers.enable(1),g.layers.enable(2);let v=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(et){let L=x[et];return L===void 0&&(L=new Zs,x[et]=L),L.getTargetRaySpace()},this.getControllerGrip=function(et){let L=x[et];return L===void 0&&(L=new Zs,x[et]=L),L.getGripSpace()},this.getHand=function(et){let L=x[et];return L===void 0&&(L=new Zs,x[et]=L),L.getHandSpace()};function N(et){let L=M.indexOf(et.inputSource);if(L===-1)return;let G=x[L];G!==void 0&&(G.update(et.inputSource,et.frame,c||a),G.dispatchEvent({type:et.type,data:et.inputSource}))}function U(){s.removeEventListener("select",N),s.removeEventListener("selectstart",N),s.removeEventListener("selectend",N),s.removeEventListener("squeeze",N),s.removeEventListener("squeezestart",N),s.removeEventListener("squeezeend",N),s.removeEventListener("end",U),s.removeEventListener("inputsourceschange",k);for(let et=0;et<x.length;et++){let L=M[et];L!==null&&(M[et]=null,x[et].disconnect(L))}v=null,I=null,y.reset(),t.setRenderTarget(m),d=null,f=null,u=null,s=null,_=null,Dt.stop(),i.isPresenting=!1,t.setPixelRatio(b),t.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(et){r=et,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(et){o=et,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(et){c=et},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return A},this.getSession=function(){return s},this.setSession=async function(et){if(s=et,s!==null){if(m=t.getRenderTarget(),s.addEventListener("select",N),s.addEventListener("selectstart",N),s.addEventListener("selectend",N),s.addEventListener("squeeze",N),s.addEventListener("squeezestart",N),s.addEventListener("squeezeend",N),s.addEventListener("end",U),s.addEventListener("inputsourceschange",k),p.xrCompatible!==!0&&await e.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(R),s.renderState.layers===void 0){let L={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,L),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),_=new Be(d.framebufferWidth,d.framebufferHeight,{format:rn,type:wn,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let L=null,G=null,O=null;p.depth&&(O=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,L=p.stencil?li:ds,G=p.stencil?oi:Ii);let X={colorFormat:e.RGBA8,depthFormat:O,scaleFactor:r};u=new XRWebGLBinding(s,e),f=u.createProjectionLayer(X),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),_=new Be(f.textureWidth,f.textureHeight,{format:rn,type:wn,depthTexture:new _s(f.textureWidth,f.textureHeight,G,void 0,void 0,void 0,void 0,void 0,void 0,L),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Dt.setContext(s),Dt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function k(et){for(let L=0;L<et.removed.length;L++){let G=et.removed[L],O=M.indexOf(G);O>=0&&(M[O]=null,x[O].disconnect(G))}for(let L=0;L<et.added.length;L++){let G=et.added[L],O=M.indexOf(G);if(O===-1){for(let j=0;j<x.length;j++)if(j>=M.length){M.push(G),O=j;break}else if(M[j]===null){M[j]=G,O=j;break}if(O===-1)break}let X=x[O];X&&X.connect(G)}}let z=new B,K=new B;function F(et,L,G){z.setFromMatrixPosition(L.matrixWorld),K.setFromMatrixPosition(G.matrixWorld);let O=z.distanceTo(K),X=L.projectionMatrix.elements,j=G.projectionMatrix.elements,nt=X[14]/(X[10]-1),ft=X[14]/(X[10]+1),lt=(X[9]+1)/X[5],D=(X[9]-1)/X[5],Gt=(X[8]-1)/X[0],ut=(j[8]+1)/j[0],Ut=nt*Gt,Y=nt*ut,pt=O/(-Gt+ut),mt=pt*-Gt;if(L.matrixWorld.decompose(et.position,et.quaternion,et.scale),et.translateX(mt),et.translateZ(pt),et.matrixWorld.compose(et.position,et.quaternion,et.scale),et.matrixWorldInverse.copy(et.matrixWorld).invert(),X[10]===-1)et.projectionMatrix.copy(L.projectionMatrix),et.projectionMatrixInverse.copy(L.projectionMatrixInverse);else{let P=nt+pt,S=ft+pt,W=Ut-mt,it=Y+(O-mt),ot=lt*ft/S*P,st=D*ft/S*P;et.projectionMatrix.makePerspective(W,it,ot,st,P,S),et.projectionMatrixInverse.copy(et.projectionMatrix).invert()}}function tt(et,L){L===null?et.matrixWorld.copy(et.matrix):et.matrixWorld.multiplyMatrices(L.matrixWorld,et.matrix),et.matrixWorldInverse.copy(et.matrixWorld).invert()}this.updateCamera=function(et){if(s===null)return;let L=et.near,G=et.far;y.texture!==null&&(y.depthNear>0&&(L=y.depthNear),y.depthFar>0&&(G=y.depthFar)),g.near=E.near=w.near=L,g.far=E.far=w.far=G,(v!==g.near||I!==g.far)&&(s.updateRenderState({depthNear:g.near,depthFar:g.far}),v=g.near,I=g.far);let O=et.parent,X=g.cameras;tt(g,O);for(let j=0;j<X.length;j++)tt(X[j],O);X.length===2?F(g,w,E):g.projectionMatrix.copy(w.projectionMatrix),at(et,g,O)};function at(et,L,G){G===null?et.matrix.copy(L.matrixWorld):(et.matrix.copy(G.matrixWorld),et.matrix.invert(),et.matrix.multiply(L.matrixWorld)),et.matrix.decompose(et.position,et.quaternion,et.scale),et.updateMatrixWorld(!0),et.projectionMatrix.copy(L.projectionMatrix),et.projectionMatrixInverse.copy(L.projectionMatrixInverse),et.isPerspectiveCamera&&(et.fov=tr*2*Math.atan(1/et.projectionMatrix.elements[5]),et.zoom=1)}this.getCamera=function(){return g},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(et){l=et,f!==null&&(f.fixedFoveation=et),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=et)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(g)};let ct=null;function Et(et,L){if(h=L.getViewerPose(c||a),A=L,h!==null){let G=h.views;d!==null&&(t.setRenderTargetFramebuffer(_,d.framebuffer),t.setRenderTarget(_));let O=!1;G.length!==g.cameras.length&&(g.cameras.length=0,O=!0);for(let j=0;j<G.length;j++){let nt=G[j],ft=null;if(d!==null)ft=d.getViewport(nt);else{let D=u.getViewSubImage(f,nt);ft=D.viewport,j===0&&(t.setRenderTargetTextures(_,D.colorTexture,f.ignoreDepthValues?void 0:D.depthStencilTexture),t.setRenderTarget(_))}let lt=T[j];lt===void 0&&(lt=new Ge,lt.layers.enable(j),lt.viewport=new fe,T[j]=lt),lt.matrix.fromArray(nt.transform.matrix),lt.matrix.decompose(lt.position,lt.quaternion,lt.scale),lt.projectionMatrix.fromArray(nt.projectionMatrix),lt.projectionMatrixInverse.copy(lt.projectionMatrix).invert(),lt.viewport.set(ft.x,ft.y,ft.width,ft.height),j===0&&(g.matrix.copy(lt.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale)),O===!0&&g.cameras.push(lt)}let X=s.enabledFeatures;if(X&&X.includes("depth-sensing")){let j=u.getDepthInformation(G[0]);j&&j.isValid&&j.texture&&y.init(t,j,s.renderState)}}for(let G=0;G<x.length;G++){let O=M[G],X=x[G];O!==null&&X!==void 0&&X.update(O,L,c||a)}ct&&ct(et,L),L.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:L}),A=null}let Dt=new Ku;Dt.setAnimationLoop(Et),this.setAnimationLoop=function(et){ct=et},this.dispose=function(){}}},Ei=new Un,OA=new ie;function BA(n,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function i(p,m){m.color.getRGB(p.fogColor.value,Yu(n)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,_,x,M){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(p,m):m.isMeshToonMaterial?(r(p,m),u(p,m)):m.isMeshPhongMaterial?(r(p,m),h(p,m)):m.isMeshStandardMaterial?(r(p,m),f(p,m),m.isMeshPhysicalMaterial&&d(p,m,M)):m.isMeshMatcapMaterial?(r(p,m),A(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),y(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?l(p,m,_,x):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Le&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Le&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);let _=t.get(m),x=_.envMap,M=_.envMapRotation;x&&(p.envMap.value=x,Ei.copy(M),Ei.x*=-1,Ei.y*=-1,Ei.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Ei.y*=-1,Ei.z*=-1),p.envMapRotation.value.setFromMatrix4(OA.makeRotationFromEuler(Ei)),p.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,_,x){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*_,p.scale.value=x*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function u(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function f(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function d(p,m,_){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Le&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=_.texture,p.transmissionSamplerSize.value.set(_.width,_.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function A(p,m){m.matcap&&(p.matcap.value=m.matcap)}function y(p,m){let _=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(_.matrixWorld),p.nearDistance.value=_.shadow.camera.near,p.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function FA(n,t,e,i){let s={},r={},a=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,x){let M=x.program;i.uniformBlockBinding(_,M)}function c(_,x){let M=s[_.id];M===void 0&&(A(_),M=h(_),s[_.id]=M,_.addEventListener("dispose",p));let R=x.program;i.updateUBOMapping(_,R);let b=t.render.frame;r[_.id]!==b&&(f(_),r[_.id]=b)}function h(_){let x=u();_.__bindingPointIndex=x;let M=n.createBuffer(),R=_.__size,b=_.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,R,b),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,x,M),M}function u(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(_){let x=s[_.id],M=_.uniforms,R=_.__cache;n.bindBuffer(n.UNIFORM_BUFFER,x);for(let b=0,w=M.length;b<w;b++){let E=Array.isArray(M[b])?M[b]:[M[b]];for(let T=0,g=E.length;T<g;T++){let v=E[T];if(d(v,b,T,R)===!0){let I=v.__offset,N=Array.isArray(v.value)?v.value:[v.value],U=0;for(let k=0;k<N.length;k++){let z=N[k],K=y(z);typeof z=="number"||typeof z=="boolean"?(v.__data[0]=z,n.bufferSubData(n.UNIFORM_BUFFER,I+U,v.__data)):z.isMatrix3?(v.__data[0]=z.elements[0],v.__data[1]=z.elements[1],v.__data[2]=z.elements[2],v.__data[3]=0,v.__data[4]=z.elements[3],v.__data[5]=z.elements[4],v.__data[6]=z.elements[5],v.__data[7]=0,v.__data[8]=z.elements[6],v.__data[9]=z.elements[7],v.__data[10]=z.elements[8],v.__data[11]=0):(z.toArray(v.__data,U),U+=K.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,I,v.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(_,x,M,R){let b=_.value,w=x+"_"+M;if(R[w]===void 0)return typeof b=="number"||typeof b=="boolean"?R[w]=b:R[w]=b.clone(),!0;{let E=R[w];if(typeof b=="number"||typeof b=="boolean"){if(E!==b)return R[w]=b,!0}else if(E.equals(b)===!1)return E.copy(b),!0}return!1}function A(_){let x=_.uniforms,M=0,R=16;for(let w=0,E=x.length;w<E;w++){let T=Array.isArray(x[w])?x[w]:[x[w]];for(let g=0,v=T.length;g<v;g++){let I=T[g],N=Array.isArray(I.value)?I.value:[I.value];for(let U=0,k=N.length;U<k;U++){let z=N[U],K=y(z),F=M%R,tt=F%K.boundary,at=F+tt;M+=tt,at!==0&&R-at<K.storage&&(M+=R-at),I.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=M,M+=K.storage}}}let b=M%R;return b>0&&(M+=R-b),_.__size=M,_.__cache={},this}function y(_){let x={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(x.boundary=4,x.storage=4):_.isVector2?(x.boundary=8,x.storage=8):_.isVector3||_.isColor?(x.boundary=16,x.storage=12):_.isVector4?(x.boundary=16,x.storage=16):_.isMatrix3?(x.boundary=48,x.storage=48):_.isMatrix4?(x.boundary=64,x.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),x}function p(_){let x=_.target;x.removeEventListener("dispose",p);let M=a.indexOf(x.__bindingPointIndex);a.splice(M,1),n.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function m(){for(let _ in s)n.deleteBuffer(s[_]);a=[],s={},r={}}return{bind:l,update:c,dispose:m}}var fa=class{constructor(t={}){let{canvas:e=Vf(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=a;let d=new Uint32Array(4),A=new Int32Array(4),y=null,p=null,m=[],_=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ve,this.toneMapping=ai,this.toneMappingExposure=1;let x=this,M=!1,R=0,b=0,w=null,E=-1,T=null,g=new fe,v=new fe,I=null,N=new Lt(0),U=0,k=e.width,z=e.height,K=1,F=null,tt=null,at=new fe(0,0,k,z),ct=new fe(0,0,k,z),Et=!1,Dt=new ir,et=!1,L=!1,G=new ie,O=new ie,X=new B,j=new fe,nt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ft=!1;function lt(){return w===null?K:1}let D=i;function Gt(C,V){return e.getContext(C,V)}try{let C={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine","three.js r169"),e.addEventListener("webglcontextlost",rt,!1),e.addEventListener("webglcontextrestored",Mt,!1),e.addEventListener("webglcontextcreationerror",wt,!1),D===null){let V="webgl2";if(D=Gt(V,C),D===null)throw Gt(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let ut,Ut,Y,pt,mt,P,S,W,it,ot,st,Ct,gt,yt,Wt,ht,_t,Nt,Ot,St,qt,kt,Kt,H;function xt(){ut=new t0(D),ut.init(),kt=new DA(D,ut),Ut=new Kg(D,ut,t,kt),Y=new RA(D),Ut.reverseDepthBuffer&&Y.buffers.depth.setReversed(!0),pt=new i0(D),mt=new gA,P=new IA(D,ut,Y,mt,Ut,kt,pt),S=new Zg(x),W=new $g(x),it=new hp(D),Kt=new Xg(D,it),ot=new e0(D,it,pt,Kt),st=new r0(D,ot,it,pt),Ot=new s0(D,Ut,P),ht=new jg(mt),Ct=new mA(x,S,W,ut,Ut,Kt,ht),gt=new BA(x,mt),yt=new vA,Wt=new wA(ut),Nt=new qg(x,S,W,Y,st,f,l),_t=new TA(x,st,Ut),H=new FA(D,pt,Ut,Y),St=new Yg(D,ut,pt),qt=new n0(D,ut,pt),pt.programs=Ct.programs,x.capabilities=Ut,x.extensions=ut,x.properties=mt,x.renderLists=yt,x.shadowMap=_t,x.state=Y,x.info=pt}xt();let $=new Xl(x,D);this.xr=$,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){let C=ut.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){let C=ut.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(C){C!==void 0&&(K=C,this.setSize(k,z,!1))},this.getSize=function(C){return C.set(k,z)},this.setSize=function(C,V,Q=!0){if($.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=C,z=V,e.width=Math.floor(C*K),e.height=Math.floor(V*K),Q===!0&&(e.style.width=C+"px",e.style.height=V+"px"),this.setViewport(0,0,C,V)},this.getDrawingBufferSize=function(C){return C.set(k*K,z*K).floor()},this.setDrawingBufferSize=function(C,V,Q){k=C,z=V,K=Q,e.width=Math.floor(C*Q),e.height=Math.floor(V*Q),this.setViewport(0,0,C,V)},this.getCurrentViewport=function(C){return C.copy(g)},this.getViewport=function(C){return C.copy(at)},this.setViewport=function(C,V,Q,J){C.isVector4?at.set(C.x,C.y,C.z,C.w):at.set(C,V,Q,J),Y.viewport(g.copy(at).multiplyScalar(K).round())},this.getScissor=function(C){return C.copy(ct)},this.setScissor=function(C,V,Q,J){C.isVector4?ct.set(C.x,C.y,C.z,C.w):ct.set(C,V,Q,J),Y.scissor(v.copy(ct).multiplyScalar(K).round())},this.getScissorTest=function(){return Et},this.setScissorTest=function(C){Y.setScissorTest(Et=C)},this.setOpaqueSort=function(C){F=C},this.setTransparentSort=function(C){tt=C},this.getClearColor=function(C){return C.copy(Nt.getClearColor())},this.setClearColor=function(){Nt.setClearColor.apply(Nt,arguments)},this.getClearAlpha=function(){return Nt.getClearAlpha()},this.setClearAlpha=function(){Nt.setClearAlpha.apply(Nt,arguments)},this.clear=function(C=!0,V=!0,Q=!0){let J=0;if(C){let q=!1;if(w!==null){let dt=w.texture.format;q=dt===Ec||dt===Sc||dt===wc}if(q){let dt=w.texture.type,bt=dt===wn||dt===Ii||dt===$s||dt===oi||dt===Mc||dt===bc,Tt=Nt.getClearColor(),Rt=Nt.getClearAlpha(),Bt=Tt.r,Ft=Tt.g,Pt=Tt.b;bt?(d[0]=Bt,d[1]=Ft,d[2]=Pt,d[3]=Rt,D.clearBufferuiv(D.COLOR,0,d)):(A[0]=Bt,A[1]=Ft,A[2]=Pt,A[3]=Rt,D.clearBufferiv(D.COLOR,0,A))}else J|=D.COLOR_BUFFER_BIT}V&&(J|=D.DEPTH_BUFFER_BIT,D.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),Q&&(J|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",rt,!1),e.removeEventListener("webglcontextrestored",Mt,!1),e.removeEventListener("webglcontextcreationerror",wt,!1),yt.dispose(),Wt.dispose(),mt.dispose(),S.dispose(),W.dispose(),st.dispose(),Kt.dispose(),H.dispose(),Ct.dispose(),$.dispose(),$.removeEventListener("sessionstart",Ah),$.removeEventListener("sessionend",vh),yi.stop()};function rt(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function Mt(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;let C=pt.autoReset,V=_t.enabled,Q=_t.autoUpdate,J=_t.needsUpdate,q=_t.type;xt(),pt.autoReset=C,_t.enabled=V,_t.autoUpdate=Q,_t.needsUpdate=J,_t.type=q}function wt(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function Yt(C){let V=C.target;V.removeEventListener("dispose",Yt),Ae(V)}function Ae(C){Xe(C),mt.remove(C)}function Xe(C){let V=mt.get(C).programs;V!==void 0&&(V.forEach(function(Q){Ct.releaseProgram(Q)}),C.isShaderMaterial&&Ct.releaseShaderCache(C))}this.renderBufferDirect=function(C,V,Q,J,q,dt){V===null&&(V=nt);let bt=q.isMesh&&q.matrixWorld.determinant()<0,Tt=Fd(C,V,Q,J,q);Y.setMaterial(J,bt);let Rt=Q.index,Bt=1;if(J.wireframe===!0){if(Rt=ot.getWireframeAttribute(Q),Rt===void 0)return;Bt=2}let Ft=Q.drawRange,Pt=Q.attributes.position,ee=Ft.start*Bt,le=(Ft.start+Ft.count)*Bt;dt!==null&&(ee=Math.max(ee,dt.start*Bt),le=Math.min(le,(dt.start+dt.count)*Bt)),Rt!==null?(ee=Math.max(ee,0),le=Math.min(le,Rt.count)):Pt!=null&&(ee=Math.max(ee,0),le=Math.min(le,Pt.count));let de=le-ee;if(de<0||de===1/0)return;Kt.setup(q,J,Tt,Q,Rt);let tn,$t=St;if(Rt!==null&&(tn=it.get(Rt),$t=qt,$t.setIndex(tn)),q.isMesh)J.wireframe===!0?(Y.setLineWidth(J.wireframeLinewidth*lt()),$t.setMode(D.LINES)):$t.setMode(D.TRIANGLES);else if(q.isLine){let It=J.linewidth;It===void 0&&(It=1),Y.setLineWidth(It*lt()),q.isLineSegments?$t.setMode(D.LINES):q.isLineLoop?$t.setMode(D.LINE_LOOP):$t.setMode(D.LINE_STRIP)}else q.isPoints?$t.setMode(D.POINTS):q.isSprite&&$t.setMode(D.TRIANGLES);if(q.isBatchedMesh)if(q._multiDrawInstances!==null)$t.renderMultiDrawInstances(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount,q._multiDrawInstances);else if(ut.get("WEBGL_multi_draw"))$t.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{let It=q._multiDrawStarts,De=q._multiDrawCounts,te=q._multiDrawCount,vn=Rt?it.get(Rt).bytesPerElement:1,Ki=mt.get(J).currentProgram.getUniforms();for(let en=0;en<te;en++)Ki.setValue(D,"_gl_DrawID",en),$t.render(It[en]/vn,De[en])}else if(q.isInstancedMesh)$t.renderInstances(ee,de,q.count);else if(Q.isInstancedBufferGeometry){let It=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,De=Math.min(Q.instanceCount,It);$t.renderInstances(ee,de,De)}else $t.render(ee,de)};function Zt(C,V,Q){C.transparent===!0&&C.side===We&&C.forceSinglePass===!1?(C.side=Le,C.needsUpdate=!0,wr(C,V,Q),C.side=Dn,C.needsUpdate=!0,wr(C,V,Q),C.side=We):wr(C,V,Q)}this.compile=function(C,V,Q=null){Q===null&&(Q=C),p=Wt.get(Q),p.init(V),_.push(p),Q.traverseVisible(function(q){q.isLight&&q.layers.test(V.layers)&&(p.pushLight(q),q.castShadow&&p.pushShadow(q))}),C!==Q&&C.traverseVisible(function(q){q.isLight&&q.layers.test(V.layers)&&(p.pushLight(q),q.castShadow&&p.pushShadow(q))}),p.setupLights();let J=new Set;return C.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;let dt=q.material;if(dt)if(Array.isArray(dt))for(let bt=0;bt<dt.length;bt++){let Tt=dt[bt];Zt(Tt,Q,q),J.add(Tt)}else Zt(dt,Q,q),J.add(dt)}),_.pop(),p=null,J},this.compileAsync=function(C,V,Q=null){let J=this.compile(C,V,Q);return new Promise(q=>{function dt(){if(J.forEach(function(bt){mt.get(bt).currentProgram.isReady()&&J.delete(bt)}),J.size===0){q(C);return}setTimeout(dt,10)}ut.get("KHR_parallel_shader_compile")!==null?dt():setTimeout(dt,10)})};let Ye=null;function Ln(C){Ye&&Ye(C)}function Ah(){yi.stop()}function vh(){yi.start()}let yi=new Ku;yi.setAnimationLoop(Ln),typeof self<"u"&&yi.setContext(self),this.setAnimationLoop=function(C){Ye=C,$.setAnimationLoop(C),C===null?yi.stop():yi.start()},$.addEventListener("sessionstart",Ah),$.addEventListener("sessionend",vh),this.render=function(C,V){if(V!==void 0&&V.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),$.enabled===!0&&$.isPresenting===!0&&($.cameraAutoUpdate===!0&&$.updateCamera(V),V=$.getCamera()),C.isScene===!0&&C.onBeforeRender(x,C,V,w),p=Wt.get(C,_.length),p.init(V),_.push(p),O.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),Dt.setFromProjectionMatrix(O),L=this.localClippingEnabled,et=ht.init(this.clippingPlanes,L),y=yt.get(C,m.length),y.init(),m.push(y),$.enabled===!0&&$.isPresenting===!0){let dt=x.xr.getDepthSensingMesh();dt!==null&&co(dt,V,-1/0,x.sortObjects)}co(C,V,0,x.sortObjects),y.finish(),x.sortObjects===!0&&y.sort(F,tt),ft=$.enabled===!1||$.isPresenting===!1||$.hasDepthSensing()===!1,ft&&Nt.addToRenderList(y,C),this.info.render.frame++,et===!0&&ht.beginShadows();let Q=p.state.shadowsArray;_t.render(Q,C,V),et===!0&&ht.endShadows(),this.info.autoReset===!0&&this.info.reset();let J=y.opaque,q=y.transmissive;if(p.setupLights(),V.isArrayCamera){let dt=V.cameras;if(q.length>0)for(let bt=0,Tt=dt.length;bt<Tt;bt++){let Rt=dt[bt];yh(J,q,C,Rt)}ft&&Nt.render(C);for(let bt=0,Tt=dt.length;bt<Tt;bt++){let Rt=dt[bt];xh(y,C,Rt,Rt.viewport)}}else q.length>0&&yh(J,q,C,V),ft&&Nt.render(C),xh(y,C,V);w!==null&&(P.updateMultisampleRenderTarget(w),P.updateRenderTargetMipmap(w)),C.isScene===!0&&C.onAfterRender(x,C,V),Kt.resetDefaultState(),E=-1,T=null,_.pop(),_.length>0?(p=_[_.length-1],et===!0&&ht.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,m.pop(),m.length>0?y=m[m.length-1]:y=null};function co(C,V,Q,J){if(C.visible===!1)return;if(C.layers.test(V.layers)){if(C.isGroup)Q=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(V);else if(C.isLight)p.pushLight(C),C.castShadow&&p.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||Dt.intersectsSprite(C)){J&&j.setFromMatrixPosition(C.matrixWorld).applyMatrix4(O);let bt=st.update(C),Tt=C.material;Tt.visible&&y.push(C,bt,Tt,Q,j.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||Dt.intersectsObject(C))){let bt=st.update(C),Tt=C.material;if(J&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),j.copy(C.boundingSphere.center)):(bt.boundingSphere===null&&bt.computeBoundingSphere(),j.copy(bt.boundingSphere.center)),j.applyMatrix4(C.matrixWorld).applyMatrix4(O)),Array.isArray(Tt)){let Rt=bt.groups;for(let Bt=0,Ft=Rt.length;Bt<Ft;Bt++){let Pt=Rt[Bt],ee=Tt[Pt.materialIndex];ee&&ee.visible&&y.push(C,bt,ee,Q,j.z,Pt)}}else Tt.visible&&y.push(C,bt,Tt,Q,j.z,null)}}let dt=C.children;for(let bt=0,Tt=dt.length;bt<Tt;bt++)co(dt[bt],V,Q,J)}function xh(C,V,Q,J){let q=C.opaque,dt=C.transmissive,bt=C.transparent;p.setupLightsView(Q),et===!0&&ht.setGlobalState(x.clippingPlanes,Q),J&&Y.viewport(g.copy(J)),q.length>0&&br(q,V,Q),dt.length>0&&br(dt,V,Q),bt.length>0&&br(bt,V,Q),Y.buffers.depth.setTest(!0),Y.buffers.depth.setMask(!0),Y.buffers.color.setMask(!0),Y.setPolygonOffset(!1)}function yh(C,V,Q,J){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[J.id]===void 0&&(p.state.transmissionRenderTarget[J.id]=new Be(1,1,{generateMipmaps:!0,type:ut.has("EXT_color_buffer_half_float")||ut.has("EXT_color_buffer_float")?fn:wn,minFilter:Pi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:jt.workingColorSpace}));let dt=p.state.transmissionRenderTarget[J.id],bt=J.viewport||g;dt.setSize(bt.z,bt.w);let Tt=x.getRenderTarget();x.setRenderTarget(dt),x.getClearColor(N),U=x.getClearAlpha(),U<1&&x.setClearColor(16777215,.5),x.clear(),ft&&Nt.render(Q);let Rt=x.toneMapping;x.toneMapping=ai;let Bt=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),p.setupLightsView(J),et===!0&&ht.setGlobalState(x.clippingPlanes,J),br(C,Q,J),P.updateMultisampleRenderTarget(dt),P.updateRenderTargetMipmap(dt),ut.has("WEBGL_multisampled_render_to_texture")===!1){let Ft=!1;for(let Pt=0,ee=V.length;Pt<ee;Pt++){let le=V[Pt],de=le.object,tn=le.geometry,$t=le.material,It=le.group;if($t.side===We&&de.layers.test(J.layers)){let De=$t.side;$t.side=Le,$t.needsUpdate=!0,_h(de,Q,J,tn,$t,It),$t.side=De,$t.needsUpdate=!0,Ft=!0}}Ft===!0&&(P.updateMultisampleRenderTarget(dt),P.updateRenderTargetMipmap(dt))}x.setRenderTarget(Tt),x.setClearColor(N,U),Bt!==void 0&&(J.viewport=Bt),x.toneMapping=Rt}function br(C,V,Q){let J=V.isScene===!0?V.overrideMaterial:null;for(let q=0,dt=C.length;q<dt;q++){let bt=C[q],Tt=bt.object,Rt=bt.geometry,Bt=J===null?bt.material:J,Ft=bt.group;Tt.layers.test(Q.layers)&&_h(Tt,V,Q,Rt,Bt,Ft)}}function _h(C,V,Q,J,q,dt){C.onBeforeRender(x,V,Q,J,q,dt),C.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),q.onBeforeRender(x,V,Q,J,C,dt),q.transparent===!0&&q.side===We&&q.forceSinglePass===!1?(q.side=Le,q.needsUpdate=!0,x.renderBufferDirect(Q,V,J,q,C,dt),q.side=Dn,q.needsUpdate=!0,x.renderBufferDirect(Q,V,J,q,C,dt),q.side=We):x.renderBufferDirect(Q,V,J,q,C,dt),C.onAfterRender(x,V,Q,J,q,dt)}function wr(C,V,Q){V.isScene!==!0&&(V=nt);let J=mt.get(C),q=p.state.lights,dt=p.state.shadowsArray,bt=q.state.version,Tt=Ct.getParameters(C,q.state,dt,V,Q),Rt=Ct.getProgramCacheKey(Tt),Bt=J.programs;J.environment=C.isMeshStandardMaterial?V.environment:null,J.fog=V.fog,J.envMap=(C.isMeshStandardMaterial?W:S).get(C.envMap||J.environment),J.envMapRotation=J.environment!==null&&C.envMap===null?V.environmentRotation:C.envMapRotation,Bt===void 0&&(C.addEventListener("dispose",Yt),Bt=new Map,J.programs=Bt);let Ft=Bt.get(Rt);if(Ft!==void 0){if(J.currentProgram===Ft&&J.lightsStateVersion===bt)return bh(C,Tt),Ft}else Tt.uniforms=Ct.getUniforms(C),C.onBeforeCompile(Tt,x),Ft=Ct.acquireProgram(Tt,Rt),Bt.set(Rt,Ft),J.uniforms=Tt.uniforms;let Pt=J.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Pt.clippingPlanes=ht.uniform),bh(C,Tt),J.needsLights=zd(C),J.lightsStateVersion=bt,J.needsLights&&(Pt.ambientLightColor.value=q.state.ambient,Pt.lightProbe.value=q.state.probe,Pt.directionalLights.value=q.state.directional,Pt.directionalLightShadows.value=q.state.directionalShadow,Pt.spotLights.value=q.state.spot,Pt.spotLightShadows.value=q.state.spotShadow,Pt.rectAreaLights.value=q.state.rectArea,Pt.ltc_1.value=q.state.rectAreaLTC1,Pt.ltc_2.value=q.state.rectAreaLTC2,Pt.pointLights.value=q.state.point,Pt.pointLightShadows.value=q.state.pointShadow,Pt.hemisphereLights.value=q.state.hemi,Pt.directionalShadowMap.value=q.state.directionalShadowMap,Pt.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Pt.spotShadowMap.value=q.state.spotShadowMap,Pt.spotLightMatrix.value=q.state.spotLightMatrix,Pt.spotLightMap.value=q.state.spotLightMap,Pt.pointShadowMap.value=q.state.pointShadowMap,Pt.pointShadowMatrix.value=q.state.pointShadowMatrix),J.currentProgram=Ft,J.uniformsList=null,Ft}function Mh(C){if(C.uniformsList===null){let V=C.currentProgram.getUniforms();C.uniformsList=ps.seqWithValue(V.seq,C.uniforms)}return C.uniformsList}function bh(C,V){let Q=mt.get(C);Q.outputColorSpace=V.outputColorSpace,Q.batching=V.batching,Q.batchingColor=V.batchingColor,Q.instancing=V.instancing,Q.instancingColor=V.instancingColor,Q.instancingMorph=V.instancingMorph,Q.skinning=V.skinning,Q.morphTargets=V.morphTargets,Q.morphNormals=V.morphNormals,Q.morphColors=V.morphColors,Q.morphTargetsCount=V.morphTargetsCount,Q.numClippingPlanes=V.numClippingPlanes,Q.numIntersection=V.numClipIntersection,Q.vertexAlphas=V.vertexAlphas,Q.vertexTangents=V.vertexTangents,Q.toneMapping=V.toneMapping}function Fd(C,V,Q,J,q){V.isScene!==!0&&(V=nt),P.resetTextureUnits();let dt=V.fog,bt=J.isMeshStandardMaterial?V.environment:null,Tt=w===null?x.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:ci,Rt=(J.isMeshStandardMaterial?W:S).get(J.envMap||bt),Bt=J.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,Ft=!!Q.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),Pt=!!Q.morphAttributes.position,ee=!!Q.morphAttributes.normal,le=!!Q.morphAttributes.color,de=ai;J.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(de=x.toneMapping);let tn=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,$t=tn!==void 0?tn.length:0,It=mt.get(J),De=p.state.lights;if(et===!0&&(L===!0||C!==T)){let cn=C===T&&J.id===E;ht.setState(J,C,cn)}let te=!1;J.version===It.__version?(It.needsLights&&It.lightsStateVersion!==De.state.version||It.outputColorSpace!==Tt||q.isBatchedMesh&&It.batching===!1||!q.isBatchedMesh&&It.batching===!0||q.isBatchedMesh&&It.batchingColor===!0&&q.colorTexture===null||q.isBatchedMesh&&It.batchingColor===!1&&q.colorTexture!==null||q.isInstancedMesh&&It.instancing===!1||!q.isInstancedMesh&&It.instancing===!0||q.isSkinnedMesh&&It.skinning===!1||!q.isSkinnedMesh&&It.skinning===!0||q.isInstancedMesh&&It.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&It.instancingColor===!1&&q.instanceColor!==null||q.isInstancedMesh&&It.instancingMorph===!0&&q.morphTexture===null||q.isInstancedMesh&&It.instancingMorph===!1&&q.morphTexture!==null||It.envMap!==Rt||J.fog===!0&&It.fog!==dt||It.numClippingPlanes!==void 0&&(It.numClippingPlanes!==ht.numPlanes||It.numIntersection!==ht.numIntersection)||It.vertexAlphas!==Bt||It.vertexTangents!==Ft||It.morphTargets!==Pt||It.morphNormals!==ee||It.morphColors!==le||It.toneMapping!==de||It.morphTargetsCount!==$t)&&(te=!0):(te=!0,It.__version=J.version);let vn=It.currentProgram;te===!0&&(vn=wr(J,V,q));let Ki=!1,en=!1,ho=!1,me=vn.getUniforms(),Qn=It.uniforms;if(Y.useProgram(vn.program)&&(Ki=!0,en=!0,ho=!0),J.id!==E&&(E=J.id,en=!0),Ki||T!==C){Ut.reverseDepthBuffer?(G.copy(C.projectionMatrix),Wf(G),qf(G),me.setValue(D,"projectionMatrix",G)):me.setValue(D,"projectionMatrix",C.projectionMatrix),me.setValue(D,"viewMatrix",C.matrixWorldInverse);let cn=me.map.cameraPosition;cn!==void 0&&cn.setValue(D,X.setFromMatrixPosition(C.matrixWorld)),Ut.logarithmicDepthBuffer&&me.setValue(D,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&me.setValue(D,"isOrthographic",C.isOrthographicCamera===!0),T!==C&&(T=C,en=!0,ho=!0)}if(q.isSkinnedMesh){me.setOptional(D,q,"bindMatrix"),me.setOptional(D,q,"bindMatrixInverse");let cn=q.skeleton;cn&&(cn.boneTexture===null&&cn.computeBoneTexture(),me.setValue(D,"boneTexture",cn.boneTexture,P))}q.isBatchedMesh&&(me.setOptional(D,q,"batchingTexture"),me.setValue(D,"batchingTexture",q._matricesTexture,P),me.setOptional(D,q,"batchingIdTexture"),me.setValue(D,"batchingIdTexture",q._indirectTexture,P),me.setOptional(D,q,"batchingColorTexture"),q._colorsTexture!==null&&me.setValue(D,"batchingColorTexture",q._colorsTexture,P));let uo=Q.morphAttributes;if((uo.position!==void 0||uo.normal!==void 0||uo.color!==void 0)&&Ot.update(q,Q,vn),(en||It.receiveShadow!==q.receiveShadow)&&(It.receiveShadow=q.receiveShadow,me.setValue(D,"receiveShadow",q.receiveShadow)),J.isMeshGouraudMaterial&&J.envMap!==null&&(Qn.envMap.value=Rt,Qn.flipEnvMap.value=Rt.isCubeTexture&&Rt.isRenderTargetTexture===!1?-1:1),J.isMeshStandardMaterial&&J.envMap===null&&V.environment!==null&&(Qn.envMapIntensity.value=V.environmentIntensity),en&&(me.setValue(D,"toneMappingExposure",x.toneMappingExposure),It.needsLights&&kd(Qn,ho),dt&&J.fog===!0&&gt.refreshFogUniforms(Qn,dt),gt.refreshMaterialUniforms(Qn,J,K,z,p.state.transmissionRenderTarget[C.id]),ps.upload(D,Mh(It),Qn,P)),J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(ps.upload(D,Mh(It),Qn,P),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&me.setValue(D,"center",q.center),me.setValue(D,"modelViewMatrix",q.modelViewMatrix),me.setValue(D,"normalMatrix",q.normalMatrix),me.setValue(D,"modelMatrix",q.matrixWorld),J.isShaderMaterial||J.isRawShaderMaterial){let cn=J.uniformsGroups;for(let fo=0,Hd=cn.length;fo<Hd;fo++){let wh=cn[fo];H.update(wh,vn),H.bind(wh,vn)}}return vn}function kd(C,V){C.ambientLightColor.needsUpdate=V,C.lightProbe.needsUpdate=V,C.directionalLights.needsUpdate=V,C.directionalLightShadows.needsUpdate=V,C.pointLights.needsUpdate=V,C.pointLightShadows.needsUpdate=V,C.spotLights.needsUpdate=V,C.spotLightShadows.needsUpdate=V,C.rectAreaLights.needsUpdate=V,C.hemisphereLights.needsUpdate=V}function zd(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(C,V,Q){mt.get(C.texture).__webglTexture=V,mt.get(C.depthTexture).__webglTexture=Q;let J=mt.get(C);J.__hasExternalTextures=!0,J.__autoAllocateDepthBuffer=Q===void 0,J.__autoAllocateDepthBuffer||ut.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),J.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(C,V){let Q=mt.get(C);Q.__webglFramebuffer=V,Q.__useDefaultFramebuffer=V===void 0},this.setRenderTarget=function(C,V=0,Q=0){w=C,R=V,b=Q;let J=!0,q=null,dt=!1,bt=!1;if(C){let Rt=mt.get(C);if(Rt.__useDefaultFramebuffer!==void 0)Y.bindFramebuffer(D.FRAMEBUFFER,null),J=!1;else if(Rt.__webglFramebuffer===void 0)P.setupRenderTarget(C);else if(Rt.__hasExternalTextures)P.rebindTextures(C,mt.get(C.texture).__webglTexture,mt.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){let Pt=C.depthTexture;if(Rt.__boundDepthTexture!==Pt){if(Pt!==null&&mt.has(Pt)&&(C.width!==Pt.image.width||C.height!==Pt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(C)}}let Bt=C.texture;(Bt.isData3DTexture||Bt.isDataArrayTexture||Bt.isCompressedArrayTexture)&&(bt=!0);let Ft=mt.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Ft[V])?q=Ft[V][Q]:q=Ft[V],dt=!0):C.samples>0&&P.useMultisampledRTT(C)===!1?q=mt.get(C).__webglMultisampledFramebuffer:Array.isArray(Ft)?q=Ft[Q]:q=Ft,g.copy(C.viewport),v.copy(C.scissor),I=C.scissorTest}else g.copy(at).multiplyScalar(K).floor(),v.copy(ct).multiplyScalar(K).floor(),I=Et;if(Y.bindFramebuffer(D.FRAMEBUFFER,q)&&J&&Y.drawBuffers(C,q),Y.viewport(g),Y.scissor(v),Y.setScissorTest(I),dt){let Rt=mt.get(C.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+V,Rt.__webglTexture,Q)}else if(bt){let Rt=mt.get(C.texture),Bt=V||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,Rt.__webglTexture,Q||0,Bt)}E=-1},this.readRenderTargetPixels=function(C,V,Q,J,q,dt,bt){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Tt=mt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&bt!==void 0&&(Tt=Tt[bt]),Tt){Y.bindFramebuffer(D.FRAMEBUFFER,Tt);try{let Rt=C.texture,Bt=Rt.format,Ft=Rt.type;if(!Ut.textureFormatReadable(Bt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ut.textureTypeReadable(Ft)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=C.width-J&&Q>=0&&Q<=C.height-q&&D.readPixels(V,Q,J,q,kt.convert(Bt),kt.convert(Ft),dt)}finally{let Rt=w!==null?mt.get(w).__webglFramebuffer:null;Y.bindFramebuffer(D.FRAMEBUFFER,Rt)}}},this.readRenderTargetPixelsAsync=async function(C,V,Q,J,q,dt,bt){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Tt=mt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&bt!==void 0&&(Tt=Tt[bt]),Tt){let Rt=C.texture,Bt=Rt.format,Ft=Rt.type;if(!Ut.textureFormatReadable(Bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ut.textureTypeReadable(Ft))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(V>=0&&V<=C.width-J&&Q>=0&&Q<=C.height-q){Y.bindFramebuffer(D.FRAMEBUFFER,Tt);let Pt=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Pt),D.bufferData(D.PIXEL_PACK_BUFFER,dt.byteLength,D.STREAM_READ),D.readPixels(V,Q,J,q,kt.convert(Bt),kt.convert(Ft),0);let ee=w!==null?mt.get(w).__webglFramebuffer:null;Y.bindFramebuffer(D.FRAMEBUFFER,ee);let le=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Gf(D,le,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Pt),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,dt),D.deleteBuffer(Pt),D.deleteSync(le),dt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(C,V=null,Q=0){C.isTexture!==!0&&($r("WebGLRenderer: copyFramebufferToTexture function signature has changed."),V=arguments[0]||null,C=arguments[1]);let J=Math.pow(2,-Q),q=Math.floor(C.image.width*J),dt=Math.floor(C.image.height*J),bt=V!==null?V.x:0,Tt=V!==null?V.y:0;P.setTexture2D(C,0),D.copyTexSubImage2D(D.TEXTURE_2D,Q,0,0,bt,Tt,q,dt),Y.unbindTexture()},this.copyTextureToTexture=function(C,V,Q=null,J=null,q=0){C.isTexture!==!0&&($r("WebGLRenderer: copyTextureToTexture function signature has changed."),J=arguments[0]||null,C=arguments[1],V=arguments[2],q=arguments[3]||0,Q=null);let dt,bt,Tt,Rt,Bt,Ft;Q!==null?(dt=Q.max.x-Q.min.x,bt=Q.max.y-Q.min.y,Tt=Q.min.x,Rt=Q.min.y):(dt=C.image.width,bt=C.image.height,Tt=0,Rt=0),J!==null?(Bt=J.x,Ft=J.y):(Bt=0,Ft=0);let Pt=kt.convert(V.format),ee=kt.convert(V.type);P.setTexture2D(V,0),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,V.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,V.unpackAlignment);let le=D.getParameter(D.UNPACK_ROW_LENGTH),de=D.getParameter(D.UNPACK_IMAGE_HEIGHT),tn=D.getParameter(D.UNPACK_SKIP_PIXELS),$t=D.getParameter(D.UNPACK_SKIP_ROWS),It=D.getParameter(D.UNPACK_SKIP_IMAGES),De=C.isCompressedTexture?C.mipmaps[q]:C.image;D.pixelStorei(D.UNPACK_ROW_LENGTH,De.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,De.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Tt),D.pixelStorei(D.UNPACK_SKIP_ROWS,Rt),C.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,q,Bt,Ft,dt,bt,Pt,ee,De.data):C.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,q,Bt,Ft,De.width,De.height,Pt,De.data):D.texSubImage2D(D.TEXTURE_2D,q,Bt,Ft,dt,bt,Pt,ee,De),D.pixelStorei(D.UNPACK_ROW_LENGTH,le),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,de),D.pixelStorei(D.UNPACK_SKIP_PIXELS,tn),D.pixelStorei(D.UNPACK_SKIP_ROWS,$t),D.pixelStorei(D.UNPACK_SKIP_IMAGES,It),q===0&&V.generateMipmaps&&D.generateMipmap(D.TEXTURE_2D),Y.unbindTexture()},this.copyTextureToTexture3D=function(C,V,Q=null,J=null,q=0){C.isTexture!==!0&&($r("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Q=arguments[0]||null,J=arguments[1]||null,C=arguments[2],V=arguments[3],q=arguments[4]||0);let dt,bt,Tt,Rt,Bt,Ft,Pt,ee,le,de=C.isCompressedTexture?C.mipmaps[q]:C.image;Q!==null?(dt=Q.max.x-Q.min.x,bt=Q.max.y-Q.min.y,Tt=Q.max.z-Q.min.z,Rt=Q.min.x,Bt=Q.min.y,Ft=Q.min.z):(dt=de.width,bt=de.height,Tt=de.depth,Rt=0,Bt=0,Ft=0),J!==null?(Pt=J.x,ee=J.y,le=J.z):(Pt=0,ee=0,le=0);let tn=kt.convert(V.format),$t=kt.convert(V.type),It;if(V.isData3DTexture)P.setTexture3D(V,0),It=D.TEXTURE_3D;else if(V.isDataArrayTexture||V.isCompressedArrayTexture)P.setTexture2DArray(V,0),It=D.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,V.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,V.unpackAlignment);let De=D.getParameter(D.UNPACK_ROW_LENGTH),te=D.getParameter(D.UNPACK_IMAGE_HEIGHT),vn=D.getParameter(D.UNPACK_SKIP_PIXELS),Ki=D.getParameter(D.UNPACK_SKIP_ROWS),en=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,de.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,de.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Rt),D.pixelStorei(D.UNPACK_SKIP_ROWS,Bt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Ft),C.isDataTexture||C.isData3DTexture?D.texSubImage3D(It,q,Pt,ee,le,dt,bt,Tt,tn,$t,de.data):V.isCompressedArrayTexture?D.compressedTexSubImage3D(It,q,Pt,ee,le,dt,bt,Tt,tn,de.data):D.texSubImage3D(It,q,Pt,ee,le,dt,bt,Tt,tn,$t,de),D.pixelStorei(D.UNPACK_ROW_LENGTH,De),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,te),D.pixelStorei(D.UNPACK_SKIP_PIXELS,vn),D.pixelStorei(D.UNPACK_SKIP_ROWS,Ki),D.pixelStorei(D.UNPACK_SKIP_IMAGES,en),q===0&&V.generateMipmaps&&D.generateMipmap(It),Y.unbindTexture()},this.initRenderTarget=function(C){mt.get(C).__webglFramebuffer===void 0&&P.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?P.setTextureCube(C,0):C.isData3DTexture?P.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?P.setTexture2DArray(C,0):P.setTexture2D(C,0),Y.unbindTexture()},this.resetState=function(){R=0,b=0,w=null,Y.reset(),Kt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Gn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=t===Rc?"display-p3":"srgb",e.unpackColorSpace=jt.workingColorSpace===Ea?"display-p3":"srgb"}};var rr=class extends je{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Un,this.environmentIntensity=1,this.environmentRotation=new Un,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var Ms=class extends Ke{constructor(t=null,e=1,i=1,s,r,a,o,l,c=Ue,h=Ue,u,f){super(null,a,o,l,c,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var dn=class extends Ke{constructor(t,e,i,s,r,a,o,l,c){super(t,e,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},En=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],i,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)i=this.getPoint(a/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let i=this.getLengths(),s=0,r=i.length,a;e?a=e:a=t*i[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=i[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===a)return s/(r-1);let h=i[s],f=i[s+1]-h,d=(a-h)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new vt:new B);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){let i=new B,s=[],r=[],a=[],o=new B,l=new ie;for(let d=0;d<=t;d++){let A=d/t;s[d]=this.getTangentAt(A,new B)}r[0]=new B,a[0]=new B;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=c&&(c=h,i.set(1,0,0)),u<=c&&(c=u,i.set(0,1,0)),f<=c&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(s[d-1],s[d]),o.length()>Number.EPSILON){o.normalize();let A=Math.acos(ye(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(o,A))}a[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(ye(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(d=-d);for(let A=1;A<=t;A++)r[A].applyMatrix4(l.makeRotationAxis(s[A],d*A)),a[A].crossVectors(s[A],r[A])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},pa=class extends En{constructor(t=0,e=0,i=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new vt){let i=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*h-d*u+this.aX,c=f*u+d*h+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Yl=class extends pa{constructor(t,e,i,s,r,a){super(t,e,i,i,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Dc(){let n=0,t=0,e=0,i=0;function s(r,a,o,l){n=r,t=o,e=-3*r+3*a-2*o-l,i=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let f=(a-r)/c-(o-r)/(c+h)+(o-a)/h,d=(o-a)/h-(l-a)/(h+u)+(l-o)/u;f*=h,d*=h,s(a,o,f,d)},calc:function(r){let a=r*r,o=a*r;return n+t*r+e*a+i*o}}}var Xr=new B,Go=new Dc,Wo=new Dc,qo=new Dc,Li=class extends En{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new B){let i=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(Xr.subVectors(s[0],s[1]).add(s[0]),c=Xr);let u=s[o%r],f=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Xr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Xr),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,A=Math.pow(c.distanceToSquared(u),d),y=Math.pow(u.distanceToSquared(f),d),p=Math.pow(f.distanceToSquared(h),d);y<1e-4&&(y=1),A<1e-4&&(A=y),p<1e-4&&(p=y),Go.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,A,y,p),Wo.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,A,y,p),qo.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,A,y,p)}else this.curveType==="catmullrom"&&(Go.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),Wo.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),qo.initCatmullRom(c.z,u.z,f.z,h.z,this.tension));return i.set(Go.calc(l),Wo.calc(l),qo.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new B().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Tu(n,t,e,i,s){let r=(i-t)*.5,a=(s-e)*.5,o=n*n,l=n*o;return(2*e-2*i+r+a)*l+(-3*e+3*i-2*r-a)*o+r*n+e}function kA(n,t){let e=1-n;return e*e*t}function zA(n,t){return 2*(1-n)*n*t}function HA(n,t){return n*n*t}function Qs(n,t,e,i){return kA(n,t)+zA(n,e)+HA(n,i)}function VA(n,t){let e=1-n;return e*e*e*t}function GA(n,t){let e=1-n;return 3*e*e*n*t}function WA(n,t){return 3*(1-n)*n*n*t}function qA(n,t){return n*n*n*t}function Js(n,t,e,i,s){return VA(n,t)+GA(n,e)+WA(n,i)+qA(n,s)}var Kl=class extends En{constructor(t=new vt,e=new vt,i=new vt,s=new vt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new vt){let i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(Js(t,s.x,r.x,a.x,o.x),Js(t,s.y,r.y,a.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},jl=class extends En{constructor(t=new B,e=new B,i=new B,s=new B){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new B){let i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(Js(t,s.x,r.x,a.x,o.x),Js(t,s.y,r.y,a.y,o.y),Js(t,s.z,r.z,a.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Zl=class extends En{constructor(t=new vt,e=new vt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new vt){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new vt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ql=class extends En{constructor(t=new B,e=new B){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new B){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new B){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Jl=class extends En{constructor(t=new vt,e=new vt,i=new vt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new vt){let i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(Qs(t,s.x,r.x,a.x),Qs(t,s.y,r.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ma=class extends En{constructor(t=new B,e=new B,i=new B){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new B){let i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(Qs(t,s.x,r.x,a.x),Qs(t,s.y,r.y,a.y),Qs(t,s.z,r.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},$l=class extends En{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new vt){let i=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return i.set(Tu(o,l.x,c.x,h.x,u.x),Tu(o,l.y,c.y,h.y,u.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new vt().fromArray(s))}return this}},XA=Object.freeze({__proto__:null,ArcCurve:Yl,CatmullRomCurve3:Li,CubicBezierCurve:Kl,CubicBezierCurve3:jl,EllipseCurve:pa,LineCurve:Zl,LineCurve3:Ql,QuadraticBezierCurve:Jl,QuadraticBezierCurve3:ma,SplineCurve:$l});var ga=class n extends oe{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let l=Math.min(a+o,Math.PI),c=0,h=[],u=new B,f=new B,d=[],A=[],y=[],p=[];for(let m=0;m<=i;m++){let _=[],x=m/i,M=0;m===0&&a===0?M=.5/e:m===i&&l===Math.PI&&(M=-.5/e);for(let R=0;R<=e;R++){let b=R/e;u.x=-t*Math.cos(s+b*r)*Math.sin(a+x*o),u.y=t*Math.cos(a+x*o),u.z=t*Math.sin(s+b*r)*Math.sin(a+x*o),A.push(u.x,u.y,u.z),f.copy(u).normalize(),y.push(f.x,f.y,f.z),p.push(b+M,1-x),_.push(c++)}h.push(_)}for(let m=0;m<i;m++)for(let _=0;_<e;_++){let x=h[m][_+1],M=h[m][_],R=h[m+1][_],b=h[m+1][_+1];(m!==0||a>0)&&d.push(x,M,b),(m!==i-1||l<Math.PI)&&d.push(M,R,b)}this.setIndex(d),this.setAttribute("position",new he(A,3)),this.setAttribute("normal",new he(y,3)),this.setAttribute("uv",new he(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var ar=class n extends oe{constructor(t=new ma(new B(-1,-1,0),new B(-1,1,0),new B(1,1,0)),e=64,i=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:i,radialSegments:s,closed:r};let a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new B,l=new B,c=new vt,h=new B,u=[],f=[],d=[],A=[];y(),this.setIndex(A),this.setAttribute("position",new he(u,3)),this.setAttribute("normal",new he(f,3)),this.setAttribute("uv",new he(d,2));function y(){for(let x=0;x<e;x++)p(x);p(r===!1?e:0),_(),m()}function p(x){h=t.getPointAt(x/e,h);let M=a.normals[x],R=a.binormals[x];for(let b=0;b<=s;b++){let w=b/s*Math.PI*2,E=Math.sin(w),T=-Math.cos(w);l.x=T*M.x+E*R.x,l.y=T*M.y+E*R.y,l.z=T*M.z+E*R.z,l.normalize(),f.push(l.x,l.y,l.z),o.x=h.x+i*l.x,o.y=h.y+i*l.y,o.z=h.z+i*l.z,u.push(o.x,o.y,o.z)}}function m(){for(let x=1;x<=e;x++)for(let M=1;M<=s;M++){let R=(s+1)*(x-1)+(M-1),b=(s+1)*x+(M-1),w=(s+1)*x+M,E=(s+1)*(x-1)+M;A.push(R,b,E),A.push(b,w,E)}}function _(){for(let x=0;x<=e;x++)for(let M=0;M<=s;M++)c.x=x/e,c.y=M/s,d.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new n(new XA[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};var Aa=class extends qn{constructor(t){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Lt(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}},va=class extends xe{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},tc=class extends qn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Lt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Lt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Cc,this.normalScale=new vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Un,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Kn=class extends tc{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new vt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ye(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Lt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Lt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Lt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};var bs=class extends qn{constructor(t){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Cc,this.normalScale=new vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(t)}copy(t){return super.copy(t),this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.flatShading=t.flatShading,this}};function Yr(n,t,e){return!n||!e&&n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function YA(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}var ws=class{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,s=e[i],r=e[i-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=i+2;;){if(s===void 0){if(t<r)break i;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=e[++i],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=e[--i-1],t>=r)break t}a=i,i=0;break e}break n}for(;i<a;){let o=i+a>>>1;t<e[o]?a=o:i=o+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=i[r+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},ec=class extends ws{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Lh,endingEnd:Lh}}intervalChanged_(t,e,i){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Nh:r=t,o=2*e-i;break;case Oh:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Nh:a=t,l=2*i-e;break;case Oh:a=1,l=i+s[1]-s[0];break;default:a=t-1,l=e}let c=(i-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,A=(i-e)/(s-e),y=A*A,p=y*A,m=-f*p+2*f*y-f*A,_=(1+f)*p+(-1.5-2*f)*y+(-.5+f)*A+1,x=(-1-d)*p+(1.5+d)*y+.5*A,M=d*p-d*y;for(let R=0;R!==o;++R)r[R]=m*a[h+R]+_*a[c+R]+x*a[l+R]+M*a[u+R];return r}},nc=class extends ws{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(i-e)/(s-e),u=1-h;for(let f=0;f!==o;++f)r[f]=a[c+f]*u+a[l+f]*h;return r}},ic=class extends ws{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Tn=class{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Yr(e,this.TimeBufferType),this.values=Yr(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:Yr(t.times,Array),values:Yr(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new ic(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new nc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new ec(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case ta:e=this.InterpolantFactoryMethodDiscrete;break;case Il:e=this.InterpolantFactoryMethodLinear;break;case mo:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ta;case this.InterpolantFactoryMethodLinear:return Il;case this.InterpolantFactoryMethodSmooth:return mo}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t}return this}trim(t,e){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<t;)++r;for(;a!==-1&&i[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&YA(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===mo,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(s)l=!0;else{let u=o*i,f=u-i,d=u+i;for(let A=0;A!==i;++A){let y=e[u+A];if(y!==e[f+A]||y!==e[d+A]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let u=o*i,f=a*i;for(let d=0;d!==i;++d)e[f+d]=e[u+d]}++a}}if(r>0){t[a]=t[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};Tn.prototype.TimeBufferType=Float32Array;Tn.prototype.ValueBufferType=Float32Array;Tn.prototype.DefaultInterpolation=Il;var Ni=class extends Tn{constructor(t,e,i){super(t,e,i)}};Ni.prototype.ValueTypeName="bool";Ni.prototype.ValueBufferType=Array;Ni.prototype.DefaultInterpolation=ta;Ni.prototype.InterpolantFactoryMethodLinear=void 0;Ni.prototype.InterpolantFactoryMethodSmooth=void 0;var sc=class extends Tn{};sc.prototype.ValueTypeName="color";var rc=class extends Tn{};rc.prototype.ValueTypeName="number";var ac=class extends ws{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-e)/(s-e),c=t*o;for(let h=c+o;c!==h;c+=4)Sn.slerpFlat(r,0,a,c-o,a,c,l);return r}},xa=class extends Tn{InterpolantFactoryMethodLinear(t){return new ac(this.times,this.values,this.getValueSize(),t)}};xa.prototype.ValueTypeName="quaternion";xa.prototype.InterpolantFactoryMethodSmooth=void 0;var Oi=class extends Tn{constructor(t,e,i){super(t,e,i)}};Oi.prototype.ValueTypeName="string";Oi.prototype.ValueBufferType=Array;Oi.prototype.DefaultInterpolation=ta;Oi.prototype.InterpolantFactoryMethodLinear=void 0;Oi.prototype.InterpolantFactoryMethodSmooth=void 0;var oc=class extends Tn{};oc.prototype.ValueTypeName="vector";var lc=class{constructor(t,e,i){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=c.length;u<f;u+=2){let d=c[u],A=c[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return A}return null}}},KA=new lc,cc=class{constructor(t){this.manager=t!==void 0?t:KA,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};cc.DEFAULT_MATERIAL_NAME="__DEFAULT";var hc=class extends je{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Lt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}};var Xo=new ie,Cu=new B,Ru=new B,uc=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new vt(512,512),this.map=null,this.mapPass=null,this.matrix=new ie,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ir,this._frameExtents=new vt(1,1),this._viewportCount=1,this._viewports=[new fe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,i=this.matrix;Cu.setFromMatrixPosition(t.matrixWorld),e.position.copy(Cu),Ru.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Ru),e.updateMatrixWorld(),Xo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Xo),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Xo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var dc=class extends uc{constructor(){super(new xs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ya=class extends hc{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(je.DEFAULT_UP),this.updateMatrix(),this.target=new je,this.shadow=new dc}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var _a=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Pu(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=Pu();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};function Pu(){return performance.now()}var Uc="\\[\\]\\.:\\/",jA=new RegExp("["+Uc+"]","g"),Lc="[^"+Uc+"]",ZA="[^"+Uc.replace("\\.","")+"]",QA=/((?:WC+[\/:])*)/.source.replace("WC",Lc),JA=/(WCOD+)?/.source.replace("WCOD",ZA),$A=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Lc),tv=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Lc),ev=new RegExp("^"+QA+JA+$A+tv+"$"),nv=["material","materials","bones","map"],fc=class{constructor(t,e,i){let s=i||ce.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},ce=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(jA,"")}static parseTrackName(t){let e=ev.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);nv.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=i(o.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ce.Composite=fc;ce.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ce.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ce.prototype.GetterByBindingType=[ce.prototype._getValue_direct,ce.prototype._getValue_array,ce.prototype._getValue_arrayElement,ce.prototype._getValue_toArray];ce.prototype.SetterByBindingTypeAndVersioning=[[ce.prototype._setValue_direct,ce.prototype._setValue_direct_setNeedsUpdate,ce.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ce.prototype._setValue_array,ce.prototype._setValue_array_setNeedsUpdate,ce.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ce.prototype._setValue_arrayElement,ce.prototype._setValue_arrayElement_setNeedsUpdate,ce.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ce.prototype._setValue_fromArray,ce.prototype._setValue_fromArray_setNeedsUpdate,ce.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var mx=new Float32Array(1);var or=class{constructor(t=1,e=0,i=0){return this.radius=t,this.phi=e,this.theta=i,this}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(ye(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Ma=class extends Wn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"169"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="169");var $u={type:"change"},Oc={type:"start"},ed={type:"end"},Ra=new nr,td=new Mn,sv=Math.cos(70*Ta.DEG2RAD),we=new B,Ze=2*Math.PI,se={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Nc=1e-6,Pa=class extends Ma{constructor(t,e=null){super(t,e),this.state=se.NONE,this.enabled=!0,this.target=new B,this.cursor=new B,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Bi.ROTATE,MIDDLE:Bi.DOLLY,RIGHT:Bi.PAN},this.touches={ONE:Fi.ROTATE,TWO:Fi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new B,this._lastQuaternion=new Sn,this._lastTargetPosition=new B,this._quat=new Sn().setFromUnitVectors(t.up,new B(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new or,this._sphericalDelta=new or,this._scale=1,this._panOffset=new B,this._rotateStart=new vt,this._rotateEnd=new vt,this._rotateDelta=new vt,this._panStart=new vt,this._panEnd=new vt,this._panDelta=new vt,this._dollyStart=new vt,this._dollyEnd=new vt,this._dollyDelta=new vt,this._dollyDirection=new B,this._mouse=new vt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=av.bind(this),this._onPointerDown=rv.bind(this),this._onPointerUp=ov.bind(this),this._onContextMenu=pv.bind(this),this._onMouseWheel=hv.bind(this),this._onKeyDown=uv.bind(this),this._onTouchStart=dv.bind(this),this._onTouchMove=fv.bind(this),this._onMouseDown=lv.bind(this),this._onMouseMove=cv.bind(this),this._interceptControlDown=mv.bind(this),this._interceptControlUp=gv.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent($u),this.update(),this.state=se.NONE}update(t=null){let e=this.object.position;we.copy(e).sub(this.target),we.applyQuaternion(this._quat),this._spherical.setFromVector3(we),this.autoRotate&&this.state===se.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=Ze:i>Math.PI&&(i-=Ze),s<-Math.PI?s+=Ze:s>Math.PI&&(s-=Ze),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(we.setFromSpherical(this._spherical),we.applyQuaternion(this._quatInverse),e.copy(this.target).add(we),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=we.length();a=this._clampDistance(o*this._scale);let l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let o=new B(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new B(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=we.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Ra.origin.copy(this.object.position),Ra.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ra.direction))<sv?this.object.lookAt(this.target):(td.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ra.intersectPlane(td,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Nc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Nc||this._lastTargetPosition.distanceToSquared(this.target)>Nc?(this.dispatchEvent($u),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Ze/60*this.autoRotateSpeed*t:Ze/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){we.setFromMatrixColumn(e,0),we.multiplyScalar(-t),this._panOffset.add(we)}_panUp(t,e){this.screenSpacePanning===!0?we.setFromMatrixColumn(e,1):(we.setFromMatrixColumn(e,0),we.crossVectors(this.object.up,we)),we.multiplyScalar(t),this._panOffset.add(we)}_pan(t,e){let i=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;we.copy(s).sub(this.target);let r=we.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Ze*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ze*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(Ze*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-Ze*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(Ze*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-Ze*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Ze*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ze*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new vt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}};function rv(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function av(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function ov(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(ed),this.state=se.NONE;break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function lv(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Bi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=se.DOLLY;break;case Bi.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=se.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=se.ROTATE}break;case Bi.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=se.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=se.PAN}break;default:this.state=se.NONE}this.state!==se.NONE&&this.dispatchEvent(Oc)}function cv(n){switch(this.state){case se.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case se.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case se.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function hv(n){this.enabled===!1||this.enableZoom===!1||this.state!==se.NONE||(n.preventDefault(),this.dispatchEvent(Oc),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(ed))}function uv(n){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(n)}function dv(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Fi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=se.TOUCH_ROTATE;break;case Fi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=se.TOUCH_PAN;break;default:this.state=se.NONE}break;case 2:switch(this.touches.TWO){case Fi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=se.TOUCH_DOLLY_PAN;break;case Fi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=se.TOUCH_DOLLY_ROTATE;break;default:this.state=se.NONE}break;default:this.state=se.NONE}this.state!==se.NONE&&this.dispatchEvent(Oc)}function fv(n){switch(this._trackPointer(n),this.state){case se.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case se.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case se.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case se.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=se.NONE}}function pv(n){this.enabled!==!1&&n.preventDefault()}function mv(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function gv(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Ia(n,t=!1){let e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},a={},o=n[0].morphTargetsRelative,l=new oe,c=0;for(let h=0;h<n.length;++h){let u=n[h],f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let d in u.attributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.attributes[d]),f++}if(f!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let d in u.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[d]===void 0&&(a[d]=[]),a[d].push(u.morphAttributes[d])}if(t){let d;if(e)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,d,h),c+=d}}if(e){let h=0,u=[];for(let f=0;f<n.length;++f){let d=n[f].index;for(let A=0;A<d.count;++A)u.push(d.getX(A)+h);h+=n[f].attributes.position.count}l.setIndex(u)}for(let h in r){let u=nd(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(let h in a){let u=a[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let f=0;f<u;++f){let d=[];for(let y=0;y<a[h].length;++y)d.push(a[h][y][f]);let A=nd(d);if(!A)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(A)}}return l}function nd(n){let t,e,i,s=-1,r=0;for(let c=0;c<n.length;++c){let h=n[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}let a=new t(r),o=new _e(a,e,i),l=0;for(let c=0;c<n.length;++c){let h=n[c];if(h.isInterleavedBufferAttribute){let u=l/e;for(let f=0,d=h.count;f<d;f++)for(let A=0;A<e;A++){let y=h.getComponent(f,A);o.setComponent(f+u,A,y)}}else a.set(h.array,l);l+=h.count*e}return s!==void 0&&(o.gpuType=s),o}var Cs={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};var on=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},Av=new xs(-1,1,1,-1,0,1),Bc=class extends oe{constructor(){super(),this.setAttribute("position",new he([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new he([0,2,0,0,2,0],2))}},vv=new Bc,hi=class{constructor(t){this._mesh=new ae(vv,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Av)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}};var Da=class extends on{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof xe?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Cn.clone(t.uniforms),this.material=new xe({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new hi(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var cr=class extends on{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){let s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},Ua=class extends on{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}};var La=class{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){let i=t.getSize(new vt);this._width=i.width,this._height=i.height,e=new Be(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:fn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Da(Cs),this.copyPass.material.blending=ge,this.clock=new _a}swapBuffers(){let t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){let e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());let e=this.renderer.getRenderTarget(),i=!1;for(let s=0,r=this.passes.length;s<r;s++){let a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),a.needsSwap){if(i){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}cr!==void 0&&(a instanceof cr?i=!0:a instanceof Ua&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){let e=this.renderer.getSize(new vt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;let i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var Na=class extends on{constructor(t,e,i=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Lt}render(t,e,i){let s=t.autoClear;t.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=s}};var hr={name:"GTAOShader",defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new vt},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new ie},cameraProjectionMatrixInverse:{value:new ie},cameraWorldMatrix:{value:new ie},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new B(-1,-1,-1)},sceneBoxMax:{value:new B(1,1,1)}},vertexShader:`

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
		}`},ur={name:"GTAODepthShader",defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
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

		}`},Oa={name:"GTAOBlendShader",uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
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
		}`};function id(n=5){let t=Math.floor(n)%2===0?Math.floor(n)+1:Math.floor(n),e=xv(t),i=e.length,s=new Uint8Array(i*4);for(let a=0;a<i;++a){let o=e[a],l=2*Math.PI*o/i,c=new B(Math.cos(l),Math.sin(l),0).normalize();s[a*4]=(c.x*.5+.5)*255,s[a*4+1]=(c.y*.5+.5)*255,s[a*4+2]=127,s[a*4+3]=255}let r=new Ms(s,t,t);return r.wrapS=an,r.wrapT=an,r.needsUpdate=!0,r}function xv(n){let t=Math.floor(n)%2===0?Math.floor(n)+1:Math.floor(n),e=t*t,i=Array(e).fill(0),s=Math.floor(t/2),r=t-1;for(let a=1;a<=e;){if(s===-1&&r===t?(r=t-2,s=0):(r===t&&(r=0),s<0&&(s=t-1)),i[s*t+r]!==0){r-=2,s++;continue}else i[s*t+r]=a++;r++,s--}return i}var dr={name:"PoissonDenoiseShader",defines:{SAMPLES:16,SAMPLE_VECTORS:Fc(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new vt},cameraProjectionMatrixInverse:{value:new ie},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

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
		}`};function Fc(n,t,e){let i=yv(n,t,e),s="vec3[SAMPLES](";for(let r=0;r<n;r++){let a=i[r];s+=`vec3(${a.x}, ${a.y}, ${a.z})${r<n-1?",":")"}`}return s}function yv(n,t,e){let i=[];for(let s=0;s<n;s++){let r=2*Math.PI*t*s/n,a=Math.pow(s/(n-1),e);i.push(new B(Math.cos(r),Math.sin(r),a))}return i}var Ba=class{constructor(t=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let e=0;e<256;e++)this.p[e]=Math.floor(t.random()*256);this.perm=[];for(let e=0;e<512;e++)this.perm[e]=this.p[e&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}dot(t,e,i){return t[0]*e+t[1]*i}dot3(t,e,i,s){return t[0]*e+t[1]*i+t[2]*s}dot4(t,e,i,s,r){return t[0]*e+t[1]*i+t[2]*s+t[3]*r}noise(t,e){let i,s,r,a=.5*(Math.sqrt(3)-1),o=(t+e)*a,l=Math.floor(t+o),c=Math.floor(e+o),h=(3-Math.sqrt(3))/6,u=(l+c)*h,f=l-u,d=c-u,A=t-f,y=e-d,p,m;A>y?(p=1,m=0):(p=0,m=1);let _=A-p+h,x=y-m+h,M=A-1+2*h,R=y-1+2*h,b=l&255,w=c&255,E=this.perm[b+this.perm[w]]%12,T=this.perm[b+p+this.perm[w+m]]%12,g=this.perm[b+1+this.perm[w+1]]%12,v=.5-A*A-y*y;v<0?i=0:(v*=v,i=v*v*this.dot(this.grad3[E],A,y));let I=.5-_*_-x*x;I<0?s=0:(I*=I,s=I*I*this.dot(this.grad3[T],_,x));let N=.5-M*M-R*R;return N<0?r=0:(N*=N,r=N*N*this.dot(this.grad3[g],M,R)),70*(i+s+r)}noise3d(t,e,i){let s,r,a,o,c=(t+e+i)*.3333333333333333,h=Math.floor(t+c),u=Math.floor(e+c),f=Math.floor(i+c),d=1/6,A=(h+u+f)*d,y=h-A,p=u-A,m=f-A,_=t-y,x=e-p,M=i-m,R,b,w,E,T,g;_>=x?x>=M?(R=1,b=0,w=0,E=1,T=1,g=0):_>=M?(R=1,b=0,w=0,E=1,T=0,g=1):(R=0,b=0,w=1,E=1,T=0,g=1):x<M?(R=0,b=0,w=1,E=0,T=1,g=1):_<M?(R=0,b=1,w=0,E=0,T=1,g=1):(R=0,b=1,w=0,E=1,T=1,g=0);let v=_-R+d,I=x-b+d,N=M-w+d,U=_-E+2*d,k=x-T+2*d,z=M-g+2*d,K=_-1+3*d,F=x-1+3*d,tt=M-1+3*d,at=h&255,ct=u&255,Et=f&255,Dt=this.perm[at+this.perm[ct+this.perm[Et]]]%12,et=this.perm[at+R+this.perm[ct+b+this.perm[Et+w]]]%12,L=this.perm[at+E+this.perm[ct+T+this.perm[Et+g]]]%12,G=this.perm[at+1+this.perm[ct+1+this.perm[Et+1]]]%12,O=.6-_*_-x*x-M*M;O<0?s=0:(O*=O,s=O*O*this.dot3(this.grad3[Dt],_,x,M));let X=.6-v*v-I*I-N*N;X<0?r=0:(X*=X,r=X*X*this.dot3(this.grad3[et],v,I,N));let j=.6-U*U-k*k-z*z;j<0?a=0:(j*=j,a=j*j*this.dot3(this.grad3[L],U,k,z));let nt=.6-K*K-F*F-tt*tt;return nt<0?o=0:(nt*=nt,o=nt*nt*this.dot3(this.grad3[G],K,F,tt)),32*(s+r+a+o)}noise4d(t,e,i,s){let r=this.grad4,a=this.simplex,o=this.perm,l=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20,h,u,f,d,A,y=(t+e+i+s)*l,p=Math.floor(t+y),m=Math.floor(e+y),_=Math.floor(i+y),x=Math.floor(s+y),M=(p+m+_+x)*c,R=p-M,b=m-M,w=_-M,E=x-M,T=t-R,g=e-b,v=i-w,I=s-E,N=T>g?32:0,U=T>v?16:0,k=g>v?8:0,z=T>I?4:0,K=g>I?2:0,F=v>I?1:0,tt=N+U+k+z+K+F,at=a[tt][0]>=3?1:0,ct=a[tt][1]>=3?1:0,Et=a[tt][2]>=3?1:0,Dt=a[tt][3]>=3?1:0,et=a[tt][0]>=2?1:0,L=a[tt][1]>=2?1:0,G=a[tt][2]>=2?1:0,O=a[tt][3]>=2?1:0,X=a[tt][0]>=1?1:0,j=a[tt][1]>=1?1:0,nt=a[tt][2]>=1?1:0,ft=a[tt][3]>=1?1:0,lt=T-at+c,D=g-ct+c,Gt=v-Et+c,ut=I-Dt+c,Ut=T-et+2*c,Y=g-L+2*c,pt=v-G+2*c,mt=I-O+2*c,P=T-X+3*c,S=g-j+3*c,W=v-nt+3*c,it=I-ft+3*c,ot=T-1+4*c,st=g-1+4*c,Ct=v-1+4*c,gt=I-1+4*c,yt=p&255,Wt=m&255,ht=_&255,_t=x&255,Nt=o[yt+o[Wt+o[ht+o[_t]]]]%32,Ot=o[yt+at+o[Wt+ct+o[ht+Et+o[_t+Dt]]]]%32,St=o[yt+et+o[Wt+L+o[ht+G+o[_t+O]]]]%32,qt=o[yt+X+o[Wt+j+o[ht+nt+o[_t+ft]]]]%32,kt=o[yt+1+o[Wt+1+o[ht+1+o[_t+1]]]]%32,Kt=.6-T*T-g*g-v*v-I*I;Kt<0?h=0:(Kt*=Kt,h=Kt*Kt*this.dot4(r[Nt],T,g,v,I));let H=.6-lt*lt-D*D-Gt*Gt-ut*ut;H<0?u=0:(H*=H,u=H*H*this.dot4(r[Ot],lt,D,Gt,ut));let xt=.6-Ut*Ut-Y*Y-pt*pt-mt*mt;xt<0?f=0:(xt*=xt,f=xt*xt*this.dot4(r[St],Ut,Y,pt,mt));let $=.6-P*P-S*S-W*W-it*it;$<0?d=0:($*=$,d=$*$*this.dot4(r[qt],P,S,W,it));let rt=.6-ot*ot-st*st-Ct*Ct-gt*gt;return rt<0?A=0:(rt*=rt,A=rt*rt*this.dot4(r[kt],ot,st,Ct,gt)),27*(h+u+f+d+A)}};var fr=class n extends on{constructor(t,e,i,s,r,a,o){super(),this.width=i!==void 0?i:512,this.height=s!==void 0?s:512,this.clear=!0,this.camera=e,this.scene=t,this.output=0,this._renderGBuffer=!0,this._visibilityCache=new Map,this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=id(),this.pdNoiseTexture=this.generateNoise(),this.gtaoRenderTarget=new Be(this.width,this.height,{type:fn}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new xe({defines:Object.assign({},hr.defines),uniforms:Cn.clone(hr.uniforms),vertexShader:hr.vertexShader,fragmentShader:hr.fragmentShader,blending:ge,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.defines.PERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new bs,this.normalMaterial.blending=ge,this.pdMaterial=new xe({defines:Object.assign({},dr.defines),uniforms:Cn.clone(dr.uniforms),vertexShader:dr.vertexShader,fragmentShader:dr.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new xe({defines:Object.assign({},ur.defines),uniforms:Cn.clone(ur.uniforms),vertexShader:ur.vertexShader,fragmentShader:ur.fragmentShader,blending:ge}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new xe({uniforms:Cn.clone(Cs.uniforms),vertexShader:Cs.vertexShader,fragmentShader:Cs.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:wa,blendDst:Ss,blendEquation:un,blendSrcAlpha:ba,blendDstAlpha:Ss,blendEquationAlpha:un}),this.blendMaterial=new xe({uniforms:Cn.clone(Oa.uniforms),vertexShader:Oa.vertexShader,fragmentShader:Oa.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:mc,blendSrc:wa,blendDst:Ss,blendEquation:un,blendSrcAlpha:ba,blendDstAlpha:Ss,blendEquationAlpha:un}),this.fsQuad=new hi(null),this.originalClearColor=new Lt,this.setGBuffer(r?r.depthTexture:void 0,r?r.normalTexture:void 0),a!==void 0&&this.updateGtaoMaterial(a),o!==void 0&&this.updatePdMaterial(o)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this.fsQuad.dispose()}get gtaoMap(){return this.pdRenderTarget.texture}setGBuffer(t,e){t!==void 0?(this.depthTexture=t,this.normalTexture=e,this._renderGBuffer=!1):(this.depthTexture=new _s,this.depthTexture.format=li,this.depthTexture.type=oi,this.normalRenderTarget=new Be(this.width,this.height,{minFilter:Ue,magFilter:Ue,type:fn,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);let i=this.normalTexture?1:0,s=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=i,this.gtaoMaterial.defines.DEPTH_SWIZZLING=s,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=i,this.pdMaterial.defines.DEPTH_SWIZZLING=s,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(t){t?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(t.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(t.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(t){t.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=t.radius),t.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=t.distanceExponent),t.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=t.thickness),t.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=t.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),t.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=t.scale),t.samples!==void 0&&t.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=t.samples,this.gtaoMaterial.needsUpdate=!0),t.screenSpaceRadius!==void 0&&(t.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=t.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(t){let e=!1;t.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=t.lumaPhi),t.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=t.depthPhi),t.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=t.normalPhi),t.radius!==void 0&&t.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=t.radius),t.radiusExponent!==void 0&&t.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=t.radiusExponent,e=!0),t.rings!==void 0&&t.rings!==this.pdRings&&(this.pdRings=t.rings,e=!0),t.samples!==void 0&&t.samples!==this.pdSamples&&(this.pdSamples=t.samples,e=!0),e&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=Fc(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(t,e,i){switch(this._renderGBuffer&&(this.overrideVisibility(),this.renderOverride(t,this.normalMaterial,this.normalRenderTarget,7829503,1),this.restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this.renderPass(t,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.renderPass(t,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case n.OUTPUT.Off:break;case n.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=i.texture,this.copyMaterial.blending=ge,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case n.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=ge,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case n.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=ge,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case n.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.renderPass(t,this.depthRenderMaterial,this.renderToScreen?null:e);break;case n.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=ge,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case n.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=i.texture,this.copyMaterial.blending=ge,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.renderPass(t,this.blendMaterial,this.renderToScreen?null:e);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}renderPass(t,e,i,s,r){t.getClearColor(this.originalClearColor);let a=t.getClearAlpha(),o=t.autoClear;t.setRenderTarget(i),t.autoClear=!1,s!=null&&(t.setClearColor(s),t.setClearAlpha(r||0),t.clear()),this.fsQuad.material=e,this.fsQuad.render(t),t.autoClear=o,t.setClearColor(this.originalClearColor),t.setClearAlpha(a)}renderOverride(t,e,i,s,r){t.getClearColor(this.originalClearColor);let a=t.getClearAlpha(),o=t.autoClear;t.setRenderTarget(i),t.autoClear=!1,s=e.clearColor||s,r=e.clearAlpha||r,s!=null&&(t.setClearColor(s),t.setClearAlpha(r||0),t.clear()),this.scene.overrideMaterial=e,t.render(this.scene,this.camera),this.scene.overrideMaterial=null,t.autoClear=o,t.setClearColor(this.originalClearColor),t.setClearAlpha(a)}setSize(t,e){this.width=t,this.height=e,this.gtaoRenderTarget.setSize(t,e),this.normalRenderTarget.setSize(t,e),this.pdRenderTarget.setSize(t,e),this.gtaoMaterial.uniforms.resolution.value.set(t,e),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(t,e),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}overrideVisibility(){let t=this.scene,e=this._visibilityCache;t.traverse(function(i){e.set(i,i.visible),(i.isPoints||i.isLine)&&(i.visible=!1)})}restoreVisibility(){let t=this.scene,e=this._visibilityCache;t.traverse(function(i){let s=e.get(i);i.visible=s}),e.clear()}generateNoise(t=64){let e=new Ba,i=t*t*4,s=new Uint8Array(i);for(let a=0;a<t;a++)for(let o=0;o<t;o++){let l=a,c=o;s[(a*t+o)*4]=(e.noise(l,c)*.5+.5)*255,s[(a*t+o)*4+1]=(e.noise(l+t,c)*.5+.5)*255,s[(a*t+o)*4+2]=(e.noise(l,c+t)*.5+.5)*255,s[(a*t+o)*4+3]=(e.noise(l+t,c+t)*.5+.5)*255}let r=new Ms(s,t,t,rn,wn);return r.wrapS=an,r.wrapT=an,r.needsUpdate=!0,r}};fr.OUTPUT={Off:-1,Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};var sd={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};var Fa=class extends on{constructor(){super();let t=sd;this.uniforms=Cn.clone(t.uniforms),this.material=new va({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new hi(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},jt.getTransfer(this._outputColorSpace)===re&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===gc?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Ac?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===vc?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===xc?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===yc?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===lr&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};window.qrcode=md.default;var _v="data:image/png;base64,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",ue=.01,gr=1.04,gd=[["Red","#d42a1f"],["Orange","#e8641c"],["Yellow","#efbf2a"],["Green","#2e7d3c"],["Royal","#2350b8"],["Navy","#1f2b4d"],["Black","#1d1d20"],["Grey","#8c8e92"],["White","#efeee9"],["Kraft","#bd9665"],["Olive","#a2ad48"]],Mv=[["Black","#1b1c20"],["Match fabric","match"],["White","#eceae4"],["Navy","#1f2b4d"],["Blue","#2b4db5"],["Red","#ec5534"]],Ad=[["Black","#1a1a1a"],["Dark grey","#4a4a4c"],["Grey","#7a7a7c"],["White","#f4f3ef"],["Gold","#c49a3c"],["Silver","#a9adb2"],["KOBAGS green","#7d9c44"],["Green","#4c8a3f"],["Dark green","#2f3b1c"],["Orange","#e2683a"],["Red","#d33a2c"],["Maroon","#7a1f18"],["Teal","#2fa58a"],["Navy","#1f2b4d"]],Wc={"sans-900":["Montserrat",900,"Montserrat Black"],"sans-800":["Montserrat",800,"Montserrat Extra Bold"],"sans-700":["Montserrat",700,"Montserrat Bold"],"sans-600":["Montserrat",600,"Montserrat Semi Bold"],"sans-500":["Montserrat",500,"Montserrat Medium"],"sans-300":["Montserrat",300,"Montserrat Light"],"cond-700":["Oswald",700,"Oswald Bold (condensed)"],"script-700":["Dancing Script",700,"Script"],"serif-700":["Playfair Display",700,"Serif Bold"]},ne={box:{name:"Box bag",fill:.28,sub:"Side gusset \xB7 welded handles",gusset:"side",handles:"loop",strap:"webbing",hem:3.2,py:.51,ps:.85,handle:"#1b1c20",sizes:[["XS",20,26,12,"3,800"],["S",25,26,12,"3,300"],["M",32,29.5,15,"5,300"],["L",40,38.5,17,"4,400"],["XL",47,42,20,"3,800"]]},handle:{name:"Handle bag",fill:.12,sub:"Bottom gusset \xB7 fabric loop handles",gusset:"bottom",handles:"loop",strap:"fabric",close:.35,hem:3,py:.53,ps:.8,handle:"match",sizes:[["XS",20,25,5,"5,000"],["S",25,29.5,5,"4,000"],["M",35,33,8,"2,800"],["L",45,42,10,"4,000"],["XL",55,44.5,15,"\u22483,500"]]},dcut:{name:"D-cut bag",fill:.08,sub:"Die-cut handle with reinforcement patch",gusset:"bottom",handles:"dcut",close:.85,hem:0,py:.6,ps:.72,sizes:[["XS",20,25,0,"5,000"],["S",25,27.5,5,"4,000"],["M",35,31,8,"2,800"],["L",45,39,10,"4,000"],["XL",55,44.5,10,"\u22483,500"]]},tshirt:{name:"T-shirt bag",fill:.15,sub:"Vest handles \xB7 side gusset",gusset:"side",handles:"tshirt",hem:0,py:.68,ps:.66,sizes:[["S",27,40,12,"5,000"],["M",27,50,12,"4,000"],["L",32,60,17,"3,300"]]},bottle:{name:"Bottle bag",sub:"Side gusset \xB7 die-cut handle",gusset:"side",handles:"dcut",hem:0,topFold:.97,foldPow:1,fill:.2,sizes:[["Std",14,38,9,"on request"]]},string:{name:"String bag",fill:.12,sub:"Drawstring backpack \xB7 cord channel",gusset:"bottom",handles:"string",close:.6,hem:3,py:.55,ps:.72,handle:"#1b1c20",sizes:[["XS",20,27,5,"5,000"],["S",25,32.5,5,"4,000"],["M",35,36,8,"2,800"],["L",45,45,10,"4,000"],["XL",55,47.5,15,"\u22483,500"]]}},Z={type:"box",size:"XS",bagView:"open",W:20,H:26,D:12,hem:3.2,drop:12,full:.35,pose:"upright",strap:"fabric",bag:"#d42a1f",handle:"#1b1c20"},Ga=document.getElementById("stage"),gi=!0,Ee=new fa({antialias:!0,preserveDrawingBuffer:!0,premultipliedAlpha:!1});Ee.setPixelRatio(Math.min(devicePixelRatio,innerWidth<760?1.5:2));Ee.outputColorSpace=Ve;Ee.toneMapping=lr;Ee.shadowMap.enabled=!0;Ee.shadowMap.type=pc;Ga.prepend(Ee.domElement);var ln=new rr,bv=new ys(Ee);function wv(){let n=new rr,t=new ae(new Ui(12,8,12),new Xn({color:11842744,side:Le}));t.position.y=3,n.add(t);let e=new ae(new Yn(12,12),new Xn({color:9079436}));e.rotation.x=-Math.PI/2,e.position.y=-.98,n.add(e);let i=(s,r,a,o,l,c)=>{let h=new ae(new Yn(s,r),new Xn({color:new Lt(a,a,a),side:We}));h.position.set(o,l,c),h.lookAt(0,.4,0),n.add(h)};return i(3.4,2.6,6,-2.6,2.8,2.6),i(2.6,2.2,2.6,3.2,1.4,2.4),i(.8,4.2,5,2.6,2,-2.8),i(.8,4.2,4,-2.8,2,-2.4),i(5,5,1.2,0,6.8,0),bv.fromScene(n,.02).texture}ln.environment=wv();ln.environmentIntensity=.7;var qe=new Ge(30,1,.01,20),Je=new Pa(qe,Ee.domElement);Je.enableDamping=!0;Je.minDistance=.25;Je.maxDistance=3;Je.maxPolarAngle=Math.PI*.51;var Ai=new ya(16774892,1.25);Ai.castShadow=!0;Ai.shadow.mapSize.set(2048,2048);Ai.shadow.bias=-3e-4;Ai.shadow.normalBias=.0015;Object.assign(Ai.shadow.camera,{left:-.45,right:.45,top:.6,bottom:-.3,near:.1,far:3});ln.add(Ai,Ai.target);var sh=new ae(new Yn(6,6),new Aa({opacity:.2}));sh.rotation.x=-Math.PI/2;sh.receiveShadow=!0;ln.add(sh);var Sv=(()=>{let n=document.createElement("canvas");n.width=n.height=256;let t=n.getContext("2d");for(let s=18;s>=0;s--){let r=40+s*4.2,a=18+s*4;t.fillStyle=`rgba(0,0,0,${.075})`,t.beginPath(),t.roundRect(r,r,256-2*r,256-2*r,a),t.fill()}let e=new dn(n),i=new ae(new Yn(1,1),new Xn({map:e,transparent:!0,depthWrite:!1,color:0,opacity:.85}));return i.rotation.x=-Math.PI/2,i.position.y=1e-4,i.renderOrder=1,ln.add(i),i})();function rd(n){return getComputedStyle(document.documentElement).getPropertyValue(n).trim()}function rh(){ln.background=null,Ee.setClearColor(16777215,0),gi=!0}rh();matchMedia("(prefers-color-scheme: dark)").addEventListener("change",rh);new MutationObserver(rh).observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]});var Re=(n,t,e)=>{let i=Math.min(1,Math.max(0,(e-n)/(t-n)));return i*i*(3-2*i)};function ka(n,t,e){let i=Math.sin(n*127.1+t*311.7+e*74.7)*43758.5453;return i-Math.floor(i)}function fi(n,t,e){let i=Math.floor(n),s=Math.floor(t),r=n-i,a=t-s,o=r*r*(3-2*r),l=a*a*(3-2*a),c=ka(i,s,e),h=ka(i+1,s,e),u=ka(i,s+1,e),f=ka(i+1,s+1,e);return(c+(h-c)*o+(u-c)*l+(c-h-u+f)*o*l)*2-1}var Ha=(n,t,e)=>fi(n,t,e)*.6+fi(n*2.1,t*2.1,e+3)*.3+fi(n*4.3,t*4.3,e+7)*.1;function ah(){let{W:n,H:t,D:e}=Z,i=2,s=[i,i,e,t],r=[2*i+e,i,n,t],a=[3*i+e+n,i,e,t],o=[4*i+2*e+n,i,n,t],l=[r[0],2*i+t,n,e];return{left:s,front:r,right:a,back:o,bottom:l,AW:5*i+2*e+2*n,AH:3*i+t+e}}var Ht=ah();function gn(){return(Z.bagView??(Z.type==="tshirt"?Z.vestView:"open"))==="flat"}function di(n){let t=ne[Z.type],e=Z.D/2,i=Z.H;if(gn()&&t.handles!=="tshirt"){let o=Math.min(e,.18);return t.gusset==="bottom"?{d:o*(1-Re(0,qc(),n)),s:0}:{d:o,s:Math.sqrt(Math.max(e*e-o*o,0))}}if(t.gusset==="bottom")return{d:e*(1-Re(0,qc(),n)),s:0};let s=Math.min(e,i*.45),r=(t.topFold??.82-.6*Z.full)*Math.pow(Re(s,i,n),t.foldPow??1.4);if(t.handles==="tshirt"){if(gn()){let d=jn().yb,A=(.5+3*Z.full)*Re(0,i*.18,n)*(1-Re(i*.3,d-1,n)),y=.12+Math.min(A,e*.9);return{d:y,s:Math.sqrt(Math.max(e*e-y*y,0))}}let o=jn().yb,l=Re(0,i*.14,n),c=1-.1*Re(i*.5,o,n),h=1-Re(o+.4,i-.8,n),u=.72+.26*Math.min(1,Math.max(0,Z.full)),f=.12+Math.max(0,e-.12)*u*l*c*h;return{d:f,s:Math.sqrt(Math.max(e*e-f*f,0))}}let a=e*Math.min(r,1);return{d:Math.max(Math.sqrt(Math.max(e*e-a*a,0)),.12),s:a}}function qc(){return Math.min(Z.H*.5,Math.max(Z.D*1.25,2))}function jn(){let{W:n,H:t,D:e}=Z,i=Math.min(n*.4,Math.max(e/2+.8,n*.29)),s=n/2-i;return{hw:i,c:s,yb:t*.73,r:Math.min(s*.35,2.5)}}function Wa(){let{W:n}=Z;return Z.type==="bottle"?{w:n*.5,h:2.4,top:2.2,pad:1}:{w:Math.min(9,n*.62),h:3,top:2.6,pad:1.4}}function Os(n,t,e){let{W:i,H:s,hem:r,full:a}=Z,o=ne[Z.type],l=1-Math.pow(2*n/i,2),c=Math.sin(Math.PI*Math.min(1,Math.max(0,t/s))),h=Re(0,1.4,i/2-Math.abs(n)),u=o.handles==="tshirt"?1-Re(jn().yb-5,jn().yb-.5,t):1,f=(.12+1.3*a)*l*Math.pow(c,.8)*u,d=((.3-.18*a)*Ha(n*.15,t*.07,e)*l*c+.035*Ha(n*.7,t*.5,e+20)*l*c)*u,A=Math.min(Z.D/2,s*.45),y=o.gusset==="side"&&o.handles!=="tshirt"?-.07*Math.exp(-(((t-A)/.3)**2))*l:0,p=0,m=Math.min(s*.42,11),_=Math.hypot(.5,1);for(let R of[-1,1]){let b=-R*.5/_,w=-1/_,E=n-R*i/2,T=t-(s-.4),g=E*b+T*w;if(g>0&&g<m){let v=E*-w+T*b;p-=.24*(1-.7*a)*Math.exp(-((v/.8)**2))*Math.sin(Math.PI*g/m)}}let x=0;if(o.handles==="loop"){let R=s-r-t,b=Math.min(s*.28,8);if(R>0&&R<b){let w=Math.sin(Math.PI*R/b)*(1-.45*a);for(let E of[-1,1]){let T=n-E*(eo()+R*.13);x-=.045*Math.exp(-((T/.55)**2))*w*l}}}let M=r>0?(o.handles==="string"?.22:.05)*Re(s-r-.06,s-r+.06,t):0;if(gn()&&o.handles!=="tshirt"){let R=di(t).d,b=o.gusset==="bottom"?.18*Math.pow(Math.max(l,0),.6)*Re(0,2.5,t):0,w=(.018+.008*Ha(n*.15,t*.07,e))*Math.max(l,0)*c;return R+b+w+M*h*(o.handles==="string"?1:.5)}if(o.gusset==="bottom"){let R=di(t).d,b=Z.D/2,w=Math.pow(Math.max(l,0),.6),E=(.3+2*a)*w*Re(0,3,t)*(.5+.5*c),T=1-(o.close||0)*(1-.5*a)*Re(s*.45,s,t);return(R+(b-R)*w+E)*T+.1*w*Re(0,3,t)+d+(M+x)*h}if(o.handles==="tshirt"&&!gn()){let R=Z.D/2,b=jn().yb,w=0;for(let E of[-1,1]){let T=n-E*(i/2-R*.55-.025*t);w-=.13*Math.exp(-((T/.65)**2))*Math.sin(Math.PI*Math.min(1,t/b))*u*h}return Math.max(.12,Math.min(R,di(t).d+f+d+w))}return di(t).d+f+d+y+((o.handles==="tshirt"?0:p)+M+x)*h}function za(n,t,e,i){let s=(n+1)*(t+1),r=new Float32Array(s*3),a=new Float32Array(s*2),o=new Float32Array(s*2),l=new Float32Array(s*3),c=0;for(let p=0;p<=t;p++)for(let m=0;m<=n;m++,c++){let _=e(m/n,p/t);r[c*3]=_.p[0]*ue,r[c*3+1]=_.p[1]*ue,r[c*3+2]=_.p[2]*ue,a[c*2]=_.a[0]/Ht.AW,a[c*2+1]=1-_.a[1]/Ht.AH,o[c*2]=_.a[0]/gr,o[c*2+1]=-_.a[1]/gr;let x=.5+.5*Math.pow(Math.min(1,Math.max(0,_.p[1]/Z.H)),.75);l[c*3]=l[c*3+1]=l[c*3+2]=x}let h=[],u=(p,m)=>Math.abs(r[p*3]-r[m*3])+Math.abs(r[p*3+1]-r[m*3+1])+Math.abs(r[p*3+2]-r[m*3+2])<1e-9,f=(p,m,_)=>{!u(p,m)&&!u(m,_)&&!u(_,p)&&h.push(p,m,_)};for(let p=0;p<t;p++)for(let m=0;m<n;m++){let _=p*(n+1)+m,x=_+1,M=_+n+1,R=M+1;f(_,x,R),f(_,R,M)}let d=new oe;d.setAttribute("position",new _e(r,3)),d.setAttribute("uv",new _e(a,2)),d.setAttribute("uv1",new _e(o,2)),d.setAttribute("color",new _e(l,3)),d.setIndex(h),d.computeVertexNormals();let A=d.getAttribute("normal"),y=Math.floor(t/2)*(n+1)+Math.floor(n/2);if(A.getX(y)*i[0]+A.getY(y)*i[1]+A.getZ(y)*i[2]<0){for(let p=0;p<h.length;p+=3){let m=h[p+1];h[p+1]=h[p+2],h[p+2]=m}d.setIndex(h),d.computeVertexNormals()}return d}function Ev(n){let a=Z.H-.9,o=jn().yb+.45,l=.14,c=1.86,h=.14,u=Math.min(.75,(a-o)/4),f=[];for(let[R,b,w]of[[c-h,o+u,-90],[c-h,a-u,0],[l+h,a-u,90],[l+h,o+u,180]])for(let E=0;E<=4;E++){let T=(w+E*22.5)*Math.PI/180;f.push([R+h*Math.cos(T),b+u*Math.sin(T)])}let d=Object.fromEntries(Object.entries(n.attributes).map(([R,b])=>[R,{size:b.itemSize,values:Array.from(b.array)}])),A=[],y=new Map,p=(R,b)=>{let E=(R-17982-b*1887)%17/16;return{index:R,x:b%2?2-E:E,y:d.position.values[R*3+1]/ue}},m=(R,b,w,E)=>{if(w<1e-10)return R;if(w>1-1e-10)return b;let T=R.x+(b.x-R.x)*w,g=R.y+(b.y-R.y)*w,v=E+":"+T.toFixed(9)+":"+g.toFixed(9);if(y.has(v))return y.get(v);let I=d.position.values.length/3;for(let[U,{size:k,values:z}]of Object.entries(d)){let K=[];for(let F=0;F<k;F++)K.push(z[R.index*k+F]+(z[b.index*k+F]-z[R.index*k+F])*w);if(U==="normal"){let F=Math.hypot(...K)||1;for(let tt=0;tt<k;tt++)K[tt]/=F}z.push(...K)}let N={index:I,x:T,y:g};return y.set(v,N),N},_=(R,b,w,E,T)=>{let g=[],v=I=>(w[0]-b[0])*(I.y-b[1])-(w[1]-b[1])*(I.x-b[0]);for(let I=0;I<R.length;I++){let N=R[I],U=R[(I+1)%R.length],k=v(N),z=v(U),K=E?k>=0:k<=0,F=E?z>=0:z<=0;K&&g.push(N),K!==F&&g.push(m(N,U,k/(k-z),T))}return g},x=R=>{for(let b=1;b+1<R.length;b++){let w=R[0],E=R[b],T=R[b+1];Math.abs((E.x-w.x)*(T.y-w.y)-(E.y-w.y)*(T.x-w.x))>1e-10&&A.push(w.index,E.index,T.index)}},M=n.index.array;for(let R=0;R<M.length;R+=3){let b=[M[R],M[R+1],M[R+2]],w=Math.min(...b),E=Math.max(...b);if(w<17982||E>=25530){A.push(...b);continue}let T=Math.floor((w-17982)/1887),g=b.map(v=>p(v,T));if(g.every(v=>v.y<=o)||g.every(v=>v.y>=a)){A.push(...b);continue}for(let v=0;v<f.length&&g.length;v++){let I=f[v],N=f[(v+1)%f.length];x(_(g,I,N,!1,T)),g=_(g,I,N,!0,T)}}for(let[R,{size:b,values:w}]of Object.entries(d))n.setAttribute(R,new he(w,b));return n.setIndex(A),n}function Tv(){let{W:n,H:t,D:e}=Z,i=e/2,s=110,r=[];r.push(za(80,s,(c,h)=>{let u=-n/2+c*n,f=h*t;return{p:[u,f,Os(u,f,1)],a:[Ht.front[0]+c*n,Ht.front[1]+(1-h)*t]}},[0,0,1])),r.push(za(80,s,(c,h)=>{let u=n/2-c*n,f=h*t;return{p:[u,f,-Os(u,f,2)],a:[Ht.back[0]+c*n,Ht.back[1]+(1-h)*t]}},[0,0,-1]));let a=ne[Z.type].gusset==="bottom"?Math.min(s,Math.ceil(qc()/(t/s))):s;if(e>=.5)for(let c of[1,-1])for(let h of["f","b"]){let u=c>0?Ht.right:Ht.left;r.push(za(16,a,(f,d)=>{let A=d*a*t/s,{d:y,s:p}=di(A),m=((.12+.35*Z.full)*(1-.6*p/i)*Math.sin(Math.PI*f)+.06*Ha(f*3,A*.3,c*3+(h==="f"?1:2))*Math.sin(Math.PI*f))*(y/i)*Re(0,2.5,A),_=[c*(n/2-p*f+m),A,(h==="f"?y:-y)*(1-f)],x=h==="f"?f*i:e-f*i;return{p:_,a:[u[0]+(c>0?x:e-x),u[1]+t-A]}},[c,0,0]))}let o=ne[Z.type].handles==="tshirt"||gn()?di(0).d:i;e>=.5&&r.push(za(80,ne[Z.type].handles==="tshirt"?2:32,(c,h)=>({p:[(-n/2+c*n)*(gn()&&ne[Z.type].handles!=="tshirt"&&ne[Z.type].gusset==="side"?1-2*di(0).s*(1-Math.abs(1-2*h))/n:1),0,o-h*2*o],a:[Ht.bottom[0]+c*n,Ht.bottom[1]+h*e]}),[0,-1,0]));let l=Ia(r);return ne[Z.type].handles==="tshirt"?Ev(l):l}function eo(){return Math.min(.28*Z.W,Z.W/2-2,6.2)}function Cv(n){let{W:t,H:e,hem:i,drop:s}=Z,r=eo(),a=Z.strap!=="webbing",o=2.5,l=a?.075:.06,c=gn()?n>0?.004:.008:Z.pose==="relaxed"?n>0?.62:.85:n>0?.12:.18,h=(K,F=0)=>n*(Os(F,Math.min(K,e),n>0?1:2)-.09),u=(K,F)=>{if(F<=e)return new B(K,F,h(F,K));let tt=F-e,at=c*Math.pow(Math.min(1,tt/s),.75),ct=.12*Math.sin(Math.PI*Math.min(1,tt/s))*Math.sin(K/r*.8+n);return new B(K+ct,e+tt*Math.cos(at),h(e,K)+n*tt*Math.sin(at))},f=e-i+.45,d=Z.pose==="relaxed"?.6:.22,A=Z.pose==="relaxed"?.74:.88,y=new Li([u(-r,f),u(-r,e-.3),u(-r-d,e+.3*s),u(-r*A,e+.84*s),u(n*.28,e+s*(n>0?1:.985)),u(r*A,e+.84*s),u(r+d,e+.3*s),u(r,e-.3),u(r,f)],!1,"centripetal"),p=200,m=y.getSpacedPoints(p),_=20,x=new B(0,-Math.sin(c),n*Math.cos(c)),M=[];for(let K=0;K<=_;K++){let F=Math.PI/2+K/_*Math.PI*2,tt=Math.cos(F),at=Math.sin(F);M.push([Math.sign(tt)*Math.abs(tt)**.35,Math.sign(at)*Math.abs(at)**.7])}let R=[],b=[],w=[],E=[],T=[],g=new B,v=new B,I=new B,N=new B,U=new B,k=0;for(let K=0;K<=p;K++){let F=m[K];g.subVectors(m[Math.min(p,K+1)],m[Math.max(0,K-1)]).normalize(),K>0&&(k+=F.distanceTo(m[K-1])),v.crossVectors(x,g).normalize(),I.copy(x).addScaledVector(g,-x.dot(g)).normalize();let tt=F.y>e?Math.hypot(F.y-e,F.z-h(e)):0,at=(gn()?.035:.2)*Math.sin(tt*.32+n*1.7)*Re(.08,.45,tt/s);N.copy(v).multiplyScalar(Math.cos(at)).addScaledVector(I,Math.sin(at)),U.crossVectors(g,N).normalize();let ct=Re(e,e+2,F.y);for(let[Et,Dt]of M){let et=(a?.045:.025)*ct*(1-Et*Et)*Math.sin(Math.PI*K/p),L=Dt*l+et;R.push((F.x+N.x*Et*o/2+U.x*L)*ue,(F.y+N.y*Et*o/2+U.y*L)*ue,(F.z+N.z*Et*o/2+U.z*L)*ue),w.push(k,(Et+1)/2),E.push(k/gr,(Et*o/2+(Dt<0?o:0))/gr)}if(K<p)for(let Et=0;Et<_;Et++){let Dt=K*(_+1)+Et,et=Dt+_+1;T.push(Dt,et,Dt+1,Dt+1,et,et+1)}}let z=new oe;return z.setAttribute("position",new he(R,3)),z.setAttribute("uv",new he(w,2)),z.setAttribute("uv1",new he(E,2)),z.setIndex(T),z.computeVertexNormals(),z}function Rv(){let{W:n,H:t,D:e}=Z,i=ne[Z.type],s=t-.02,{d:r,s:a}=di(s),o=i.gusset==="side"&&e>=.5,l=[[],[]];for(let c=0;c<=60;c++){let h=-n/2+n*c/60;l[0].push([h,s,Os(h,s,1)]),l[1].push([h,s,-Os(h,s,2)])}if(o)for(let c of[1,-1])for(let h of[1,-1]){let u=[];for(let f=0;f<=8;f++){let d=f/8;u.push([c*(n/2-a*d),s,h*r*(1-d)])}l.push(u)}return Ia(l.map(c=>{let h=new Li(c.map(([u,f,d])=>new B(u*ue,f*ue,d*ue)),!1,"centripetal");return new ar(h,c.length*2,.065*ue,6,!1)}))}function Pv(n){let{W:t,H:e,hem:i}=Z,s=n*(t/2-1.6),r=1.6,a=-(Os(s,r,2)+.25),o=[[n*(t/2-.2),e-i/2,0],[n*(t/2+.9),e-i/2-1.4,-.3],[n*(t/2+1.9),e*.62,gn()?-.25:-1.2],[n*(t/2+1.5),e*.3,gn()?-.3:-1.9],[n*(t/2-.3),2.4,a-(gn()?.2:.7)],[s,r,a]].map(([d,A,y])=>new B(d*ue,A*ue,y*ue)),l=new Li(o,!1,"centripetal"),c=new ar(l,180,.22*ue,10,!1),h=c.getAttribute("uv"),u=l.getLength()/ue;for(let d=0;d<h.count;d++)h.setX(d,h.getX(d)*u);let f=new ga(.42*ue,16,12);return f.translate(s*ue,r*ue,(a-.2)*ue),Ia([c.toNonIndexed(),f.toNonIndexed()])}function vd(n,t,e,i){let s=document.createElement("canvas");s.width=t,s.height=e;let r=s.getContext("2d"),a=r.createImageData(t,e);for(let o=0;o<e;o++)for(let l=0;l<t;l++){let c=(n[o*t+(l+1)%t]-n[o*t+(l-1+t)%t])*i,h=(n[(o+1)%e*t+l]-n[(o-1+e)%e*t+l])*i,u=Math.hypot(c,h,1),f=(o*t+l)*4;a.data[f]=(-c/u*.5+.5)*255,a.data[f+1]=(h/u*.5+.5)*255,a.data[f+2]=(1/u*.5+.5)*255,a.data[f+3]=255}return r.putImageData(a,0,0),s}function Iv(){let t=new Float32Array(65536),e=7,i=8,s=256/e,r=256/i,a=s*.26,o=a;for(let c=0;c<256;c++)for(let h=0;h<256;h++){let u=0;for(let f=-1;f<=i;f++){let d=(f+.5)*r,A=f&1?s/2:0;if(!(Math.abs(c-d)>r))for(let y=-1;y<=e;y++){let p=(y+.5)*s+A,m=(h-p)/a,_=(c-d)/o;u-=Math.exp(-(m*m+_*_))}}t[c*256+h]=u+(Math.random()-.5)*.35}let l=new dn(vd(t,256,256,1.6));return l.wrapS=l.wrapT=an,l.channel=1,l.anisotropy=8,l}function Dv(){let e=new Float32Array(10240),i=document.createElement("canvas");i.width=64,i.height=160;let s=i.getContext("2d"),r=s.createImageData(64,160);for(let l=0;l<160;l++)for(let c=0;c<64;c++){let h=l<9||l>150,u=l<160/2?1:-1,f=h?.5+.5*Math.sin(2*Math.PI*c/64*12):.5+.5*Math.sin(2*Math.PI*(c/64*7+u*l/160*14));e[l*64+c]=f+(Math.random()-.5)*.15;let d=(.78+.22*f)*255,A=(l*64+c)*4;r.data[A]=r.data[A+1]=r.data[A+2]=d,r.data[A+3]=255}s.putImageData(r,0,0);let a=new dn(i);a.colorSpace=Ve;let o=new dn(vd(e,64,160,1.2));for(let l of[a,o])l.wrapS=an,l.wrapT=Hn,l.anisotropy=8;return{map:a,nm:o}}function Uv(){let t=document.createElement("canvas");t.width=t.height=512;let e=t.getContext("2d");e.fillStyle="#808080",e.fillRect(0,0,512,512),e.lineWidth=1,e.lineCap="round";for(let i=0;i<9e3;i++){let s=Math.random()*512,r=Math.random()*512,a=Math.random()*Math.PI*2,o=6+Math.random()*26,l=(Math.random()-.5)*.9;e.strokeStyle=Math.random()<.5?"rgba(255,255,255,0.10)":"rgba(0,0,0,0.10)",e.beginPath();for(let c of[-512,0,512])for(let h of[-512,0,512])e.moveTo(s+c,r+h),e.quadraticCurveTo(s+c+Math.cos(a+l)*o/2,r+h+Math.sin(a+l)*o/2,s+c+Math.cos(a)*o,r+h+Math.sin(a)*o);e.stroke()}return t}function Lv(){let t=document.createElement("canvas");t.width=t.height=256;let e=t.getContext("2d"),i=e.createImageData(256,256);for(let s=0;s<256;s++)for(let r=0;r<256;r++){let a=128+70*(fi(r/16,s/16,11)*.5+fi(r/4,s/4,5)*.5),o=(s*256+r)*4;i.data[o]=i.data[o+1]=i.data[o+2]=a,i.data[o+3]=255}return e.putImageData(i,0,0),t}var Is=document.createElement("canvas"),Bs=new dn(Is);Bs.colorSpace=Ve;Bs.anisotropy=Ee.capabilities.getMaxAnisotropy();var ad=Lv();function Nv(n){let t=new Lt(n),e=.2126*t.r+.7152*t.g+.0722*t.b,i=e<.08?1.7:.78,s=Math.min(1,t.r*i+(e<.08?.03:0)),r=Math.min(1,t.g*i+(e<.08?.03:0)),a=Math.min(1,t.b*i+(e<.08?.03:0));return`rgb(${s*255|0},${r*255|0},${a*255|0})`}function Ce(n,t,e,i,s,r){let a=Math.hypot(s-e,r-i),o=(s-e)/a,l=(r-i)/a,c=-l,h=o,u=.19,f=.3;n.beginPath();for(let A=u/2;A<a;A+=u){let y=e+o*A,p=i+l*A;n.moveTo((y-c*f/2)*t,(p-h*f/2)*t),n.lineTo((y+c*f/2)*t,(p+h*f/2)*t)}n.lineWidth=.055*t,n.stroke();let d=n.globalAlpha;n.globalAlpha=d*.35,n.beginPath(),n.moveTo(e*t,i*t),n.lineTo(s*t,r*t),n.lineWidth=.03*t,n.stroke(),n.globalAlpha=d}function Ov(n,t,e,i,s){let r=s/2,a=s*.16;n.lineWidth=.05*t,n.beginPath();for(let l=0;l<6;l++){let c=-r*.6+l*(s*.6/5);for(let[h,u,f,d]of[[c,-r,0,1],[c,r,0,-1],[-r,c,1,0],[r,c,-1,0]])n.moveTo((e+h)*t,(i+u)*t),n.lineTo((e+h+f*a)*t,(i+u+d*a)*t)}for(let[l,c]of[[-1,-1],[1,-1],[-1,1],[1,1]])n.moveTo((e+l*r)*t,(i+c*r)*t),n.lineTo((e+l*r*.72)*t,(i+c*r*.72)*t);n.stroke();let o=s*.24;n.beginPath(),n.arc(e*t,i*t,o*t,0,Math.PI*2),n.lineWidth=.04*t,n.stroke(),n.beginPath();for(let l=0;l<5;l++){let c=l*Math.PI*2/5-Math.PI/2;n.ellipse((e+Math.cos(c)*o*.45)*t,(i+Math.sin(c)*o*.45)*t,o*.42*t,o*.2*t,c,0,Math.PI*2)}n.lineWidth=.03*t,n.stroke()}var Jt={front:[],back:[]},Xt="front",mn=null,Zn=1,Gi=new Map,pi={},mi=new Map,od=new WeakMap;function ld(n,t){let e=od.get(n);if(e||od.set(n,e=new Map),!e.has(t)){let i=document.createElement("canvas");i.width=n.width,i.height=n.height;let s=i.getContext("2d");s.fillStyle=t,s.fillRect(0,0,i.width,i.height),s.globalCompositeOperation="destination-in",s.drawImage(n,0,0),e.set(t,i)}return e.get(t)}function Bv(n){let t=`t|${n.style}|${n.track||0}|${n.text}`;if(mi.has(t))return mi.get(t);let[e,i]=Wc[n.style]||Wc["sans-800"],s=160,r=(n.track||0)*s,a=i>=800?900:i>=500?800:700,o=(n.text||" ").split(`
`).map(y=>y.split("**").map((p,m)=>[p,m%2?a:i]).filter(([p])=>p)),l=document.createElement("canvas"),c=l.getContext("2d"),h=y=>{c.font=`${y} ${s}px "${e}", "Helvetica Neue", Arial, sans-serif`,"letterSpacing"in c&&(c.letterSpacing=r+"px")},u=y=>y.reduce((p,[m,_])=>(h(_),p+c.measureText(m).width),0)||s*.3,f=o.map(u),d=s*1.12,A=s*.14;return l.width=Math.ceil(Math.max(...f)+A*2),l.height=Math.ceil(o.length*d+A),c.fillStyle="#fff",c.textBaseline="middle",o.forEach((y,p)=>{let m=(l.width-f[p])/2+r/2;for(let[_,x]of y)h(x),c.fillText(_,m,A/2+d*(p+.5)),m+=c.measureText(_).width}),mi.set(t,l),l}function Fv(n){let t="q|"+n;if(mi.has(t))return mi.get(t);if(!window.qrcode)return null;let e=window.qrcode(0,"M");e.addData(n||" "),e.make();let i=e.getModuleCount(),s=2,r=16,a=document.createElement("canvas");a.width=a.height=(i+s*2)*r;let o=a.getContext("2d");o.fillStyle="#fff";for(let l=0;l<i;l++)for(let c=0;c<i;c++)e.isDark(l,c)&&o.fillRect((c+s)*r,(l+s)*r,r,r);return mi.set(t,a),a}function xd(n){return n.kind==="text"?Bv(n):n.kind==="qr"?Fv(n.data):n.kind==="logo"?Gi.get(n.asset)?.mask||null:pi[n.graphic]||null}function Fs(n){let t=xd(n);return[n.w,t?n.w*t.height/t.width:n.w*.4]}var yd=n=>n.kind==="qr"?3:1;function kv(){let n=ne[Z.type];if(n.handles==="tshirt")return Z.H-jn().yb+1;if(n.handles==="dcut"){let t=Wa();return t.top+t.h+t.pad+.6}return Z.hem}function zs(){let{W:n,H:t}=Z,e=ne[Z.type].handles==="tshirt"?2:1.2;return{x0:1,x1:n-1,y0:kv()+.4,y1:t-e}}function $e(n){let t=zs(),[e,i]=Fs(n),s=Math.min(1,(t.x1-t.x0)/e,(t.y1-t.y0)/i);s<1&&(n.w*=s,e*=s,i*=s),n.x=Math.min(Math.max(n.x,t.x0+e/2),t.x1-e/2),n.y=Math.min(Math.max(n.y,t.y0+i/2),t.y1-i/2)}var zv=(()=>{let t=document.createElement("canvas");t.width=t.height=128;let e=t.getContext("2d"),i=128/7,s=128/8;for(let r=-1;r<=8;r++)for(let a=-1;a<=7;a++){let o=(a+.5)*i+(r&1?i/2:0),l=(r+.5)*s,c=e.createRadialGradient(o,l,0,o,l,i*.32);c.addColorStop(0,"rgba(0,0,0,1)"),c.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=c,e.fillRect(o-i,l-s,i*2,s*2)}return t})(),Hv=(()=>{let t=document.createElement("canvas");t.width=t.height=256;let e=t.getContext("2d"),i=e.createImageData(256,256);for(let s=0;s<256;s++)for(let r=0;r<256;r++){let a=fi(r/9,s/9,31)*.55+fi(r/3,s/3,37)*.45,o=(s*256+r)*4;i.data[o+3]=Math.max(0,Math.min(255,(a*.5+.5)**2.2*255))}return e.putImageData(i,0,0),t})(),Rs=document.createElement("canvas");function cd(n,t,e,i,s){if(!s.length)return;Rs.width=Math.ceil(Z.W*t),Rs.height=Math.ceil(Z.H*t);let r=Rs.getContext("2d");Ar(r,t,0,0,s),r.save(),r.globalCompositeOperation="destination-out";for(let[a,o,l]of[[zv,gr,.32],[Hv,6,.22]]){let c=r.createPattern(a,"repeat");c.setTransform(new DOMMatrix().translate(-e*t,-i*t).scale(o*t/a.width)),r.globalAlpha=l,r.fillStyle=c,r.fillRect(0,0,Rs.width,Rs.height)}r.restore(),n.drawImage(Rs,e*t,i*t)}function Ar(n,t,e,i,s,r=null){let a=n.globalAlpha;for(let o of s){let l=xd(o);if(!l)continue;let[c,h]=Fs(o),u=r?ld(l,r):null,f=1;u||(o.kind==="logo"&&o.method==="full"?u=Gi.get(o.asset).color:(u=ld(l,o.ink),f=.9)),n.save(),n.globalAlpha=a*f,n.drawImage(u,(e+o.x-c/2)*t,(i+o.y-h/2)*t,c*t,h*t),n.restore()}}var Va=document.createElement("canvas"),ui=document.createElement("canvas"),Ds=document.createElement("canvas"),Xc=new dn(Va),Yc=new dn(ui),ks=new dn(Ds),Vv=Uv(),Gv="#bd9665",Wv=(()=>{let t=document.createElement("canvas");t.width=t.height=512;let e=t.getContext("2d");e.fillStyle="#fff",e.fillRect(0,0,512,512);for(let i=0;i<2600;i++){let s=Math.random()*512,r=Math.random()*512,a=.4+Math.random()**3*2.2,o=120+Math.random()*90;e.fillStyle=`rgba(${o*.75|0},${o*.55|0},${o*.35|0},${.35+Math.random()*.5})`;for(let l of[-512,0,512])for(let c of[-512,0,512])e.beginPath(),e.ellipse(s+l,r+c,a,a*(.4+Math.random()*.6),Math.random()*3,0,Math.PI*2),e.fill()}e.lineWidth=.8,e.strokeStyle="rgba(120,80,45,0.25)";for(let i=0;i<700;i++){let s=Math.random()*512,r=Math.random()*512,a=Math.random()*6.3,o=6+Math.random()*18;e.beginPath(),e.moveTo(s,r),e.lineTo(s+Math.cos(a)*o,r+Math.sin(a)*o),e.stroke()}return t})();function kc(n,t){let{W:e,H:i,D:s,hem:r}=Z,a=ne[Z.type],o=eo(),l=Math.min(2.2,r*.72);for(let c of[Ht.front,Ht.back]){let[h,u]=c;if(r>0&&Ce(n,t,h,u+r,h+e,u+r),a.handles==="loop")for(let f of[-1,1])Ov(n,t,h+e/2+f*o,u+r*.52,l);if(a.gusset==="bottom"&&(Ce(n,t,h+.5,u,h+.5,u+i),Ce(n,t,h+e-.5,u,h+e-.5,u+i)),a.handles==="tshirt"){let f=jn();Ce(n,t,h,u+i-1.1,h+e,u+i-1.1),Ce(n,t,h,u+.9,h+f.hw,u+.9),Ce(n,t,h+e-f.hw,u+.9,h+e,u+.9)}}if(s>=.5)for(let c of[Ht.left,Ht.right]){let[h,u]=c;if(a.gusset==="side"&&a.handles==="tshirt")Ce(n,t,h,u+.9,h+s,u+.9),Ce(n,t,h,u+i-1.1,h+s,u+i-1.1);else if(a.gusset==="side"){let f=u+i-Math.min(s/2,i*.45);r>0&&Ce(n,t,h,u+r,h+s,u+r),Ce(n,t,h+.15,u+r,h+.15,u+i),Ce(n,t,h+s-.15,u+r,h+s-.15,u+i),Ce(n,t,h,f,h+s,f),Ce(n,t,h+s/2,f,h,u+i),Ce(n,t,h+s/2,f,h+s,u+i)}else{let f=Math.min(i*.5,Math.max(s*1.25,2));Ce(n,t,h+s/2,u+i-f,h+s/2,u+i)}}if(s>=.5&&a.handles!=="tshirt"){let[c,h]=Ht.bottom;Ce(n,t,c+.4,h,c+.4,h+s),Ce(n,t,c+e-.4,h,c+e-.4,h+s)}if(a.handles==="string"){let[c,h]=Ht.back,u=Math.min(4,e*.15);for(let[f,d]of[[c,1],[c+e,-1]])Ce(n,t,f,h+i-u,f+d*u,h+i),n.beginPath(),n.arc((f+d*1.6)*t,(h+i-1.6)*t,.4*t,0,Math.PI*2),n.stroke()}}function _d(n,t,e,i){let s=ne[Z.type],{W:r,H:a}=Z;if(n.beginPath(),s.handles==="dcut"){let o=Wa();n.roundRect((e+r/2-o.w/2)*t,(i+o.top)*t,o.w*t,o.h*t,o.h/2*t)}if(s.handles==="tshirt"){let o=jn(),l=e+r/2,c=i+a-o.yb,h=o.c*.9,u=Math.min(2.4,a*.06),f=Math.min(h/2,u)*.92,d=.35,A=(y,p)=>[y*t,p*t];n.moveTo(...A(l-o.c,i-1)),n.arcTo(...A(l-o.c,c),...A(l-h/2,c),o.r*t),n.arcTo(...A(l-h/2,c),...A(l-h/2,c-u),d*t),n.arcTo(...A(l-h/2,c-u),...A(l,c-u),f*t),n.arcTo(...A(l+h/2,c-u),...A(l+h/2,c),f*t),n.arcTo(...A(l+h/2,c),...A(l+o.c,c),d*t),n.arcTo(...A(l+o.c,c),...A(l+o.c,i-1),o.r*t),n.lineTo(...A(l+o.c,i-1)),n.closePath()}}function qv(n,t){n.fillStyle="#000";for(let e of[Ht.front,Ht.back])_d(n,t,e[0],e[1]),n.fill()}var hd=40;function xi(){Ht=ah(),hd=Math.min(40,4e3/Ht.AW,4e3/Ht.AH);let n=hd,t=Math.round(Ht.AW*n),e=Math.round(Ht.AH*n),{W:i,hem:s}=Z;if(Is.width!==t||Is.height!==e)for(let d of[Bs,Xc,Yc,ks])d.dispose();Is.width=t,Is.height=e;let r=Is.getContext("2d");r.fillStyle=Z.bag,r.fillRect(0,0,t,e);let a=(d,A,y,p)=>{let m=r.createPattern(d,"repeat");m.setTransform(new DOMMatrix().scale(A)),r.save(),r.globalCompositeOperation=y,r.globalAlpha=p,r.fillStyle=m,r.fillRect(0,0,t,e),r.restore()};if(a(ad,n/40,"soft-light",.16),a(Vv,n/40,"soft-light",.55),Z.bag===Gv&&(a(Wv,n/40,"multiply",.3),a(ad,n/90,"soft-light",.22)),ne[Z.type].handles==="dcut"){let d=Wa();r.save(),r.fillStyle="rgba(0,0,0,0.025)";for(let A of[Ht.front,Ht.back])r.fillRect((A[0]+i/2-d.w/2-d.pad)*n,(A[1]+d.top-d.pad)*n,(d.w+2*d.pad)*n,(d.h+2*d.pad)*n);r.restore()}let o=new Lt(Z.bag).getHSL({}).l,l=o>.75?.3:o>.45?.14:.05;if(ne[Z.type].handles==="loop"&&Z.handle!=="match"&&l>.1){let d=eo(),A=2.5;r.save(),r.fillStyle=Z.handle,r.globalAlpha=l*1.25;for(let y of[Ht.front,Ht.back])for(let p of[-1,1])r.fillRect((y[0]+i/2+p*d-A/2)*n,y[1]*n,A*n,(s-.45)*n);r.restore()}r.save(),r.strokeStyle=Nv(Z.bag),r.lineCap="butt",r.globalAlpha=.6,kc(r,n),r.restore(),cd(r,n,Ht.front[0],Ht.front[1],Jt.front),cd(r,n,Ht.back[0],Ht.back[1],Jt.back),Bs.needsUpdate=!0,Va.width=t,Va.height=e;let c=Va.getContext("2d");c.fillStyle="#808080",c.fillRect(0,0,t,e),c.fillStyle="#8c8c8c";for(let d of[Ht.front,Ht.back])c.fillRect(d[0]*n,d[1]*n,i*n,s*n);for(let d of[Ht.left,Ht.right])c.fillRect(d[0]*n,d[1]*n,Z.D*n,s*n);if(ne[Z.type].handles==="dcut"){let d=Wa();for(let A of[Ht.front,Ht.back])c.fillRect((A[0]+i/2-d.w/2-d.pad)*n,(A[1]+d.top-d.pad)*n,(d.w+2*d.pad)*n,(d.h+2*d.pad)*n)}c.strokeStyle="#3c3c3c",c.lineCap="butt",kc(c,n),Xc.needsUpdate=!0;let h=.5;ui.width=Math.round(t*h),ui.height=Math.round(e*h);let u=ui.getContext("2d");u.fillStyle="rgb(214,214,214)",u.fillRect(0,0,ui.width,ui.height),u.strokeStyle="rgb(150,150,150)",u.lineCap="butt",kc(u,n*h),Ar(u,n*h,Ht.front[0],Ht.front[1],Jt.front,"#a6a6a6"),Ar(u,n*h,Ht.back[0],Ht.back[1],Jt.back,"#a6a6a6"),Yc.needsUpdate=!0,Ds.width=ui.width,Ds.height=ui.height;let f=Ds.getContext("2d");f.fillStyle="#fff",f.fillRect(0,0,Ds.width,Ds.height),qv(f,n*h),ks.needsUpdate=!0,wd.value=l,qi.transmission=l>.2?.45:l>.1?.26:.06,Md.value=l>.2?.55:l>.1?.32:.08,xr.emissive.set(Z.bag).multiplyScalar(l*.38),gi=!0}var oh=Iv(),qa=Dv(),Md={value:.3};function bd(n){n.uniforms.backLight=Md,n.fragmentShader=n.fragmentShader.replace("#include <lights_physical_pars_fragment>",`#include <lights_physical_pars_fragment>
uniform float backLight;
void RE_Direct_Thin( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir,
    const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
  RE_Direct_Physical( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
  float through = saturate( dot( - geometryNormal, directLight.direction ) );
  reflectedLight.directDiffuse += through * directLight.color * material.diffuseColor * backLight;
}
#undef RE_Direct
#define RE_Direct RE_Direct_Thin`)}var qi=new Kn({map:Bs,normalMap:oh,normalScale:new vt(.36,.36),bumpMap:Xc,bumpScale:2.2,roughnessMap:Yc,roughness:1,alphaMap:ks,alphaTest:.5,sheen:.18,sheenRoughness:.6,sheenColor:16777215,side:Dn,transmission:.1,thickness:0});qi.onBeforeCompile=n=>{bd(n),n.fragmentShader=n.fragmentShader.replace("#include <transmission_fragment>",zt.transmission_fragment.replace("n, v, material.roughness, material.diffuseColor","n, v, material.roughness * 0.5, material.diffuseColor")),n.fragmentShader=n.fragmentShader.replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
#if defined( USE_BUMPMAP ) && defined( USE_NORMALMAP_TANGENTSPACE )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`)};var Xv=qi.onBeforeCompile;qi.onBeforeCompile=n=>{Xv(n),n.fragmentShader=n.fragmentShader.replace("#include <opaque_fragment>",`#include <opaque_fragment>
gl_FragColor.a = 1.0;`)};qi.customProgramCacheKey=()=>"bag-outer-bump-white-coverage";var wd={value:.05},xr=new Kn({color:16777215,vertexColors:!0,map:Bs,normalMap:oh,normalScale:new vt(.45,.45),alphaMap:ks,alphaTest:.5,roughness:.9,sheen:.3,sheenRoughness:.6,side:Le});xr.onBeforeCompile=n=>{bd(n),n.uniforms.showThrough=wd,n.fragmentShader=`uniform float showThrough;
`+n.fragmentShader.replace("#include <map_fragment>",`#ifdef USE_MAP
	diffuseColor.rgb = mix( diffuseColor.rgb, texture2D( map, vMapUv ).rgb * 0.92, showThrough );
#endif`)};xr.customProgramCacheKey=()=>"bag-inner-through";var Yv=(()=>{let t=document.createElement("canvas");t.width=t.height=256;let e=t.getContext("2d"),i=e.createImageData(256,256);for(let r=0;r<256;r++)for(let a=0;a<256;a++){let o=251+3*fi(a*.7,r*.16,91)+1.5*Math.sin(a*1.7+r*.6),l=(r*256+a)*4;i.data[l]=i.data[l+1]=i.data[l+2]=o,i.data[l+3]=255}e.putImageData(i,0,0);let s=new dn(t);return s.colorSpace=Ve,s.wrapS=s.wrapT=an,s.channel=1,s.anisotropy=Math.min(8,Ee.capabilities.getMaxAnisotropy()),s})(),Xa=new Kn({map:qa.map,normalMap:qa.nm,normalScale:new vt(.75,.75),roughness:.72,sheen:.35,sheenRoughness:.55,sheenColor:9079434,side:We}),ud=new Kn({map:Yv,normalMap:oh,normalScale:new vt(.36,.36),roughness:.94,sheen:.2,sheenRoughness:.65,side:We}),Kc=new Kn({map:qa.map,normalMap:qa.nm,normalScale:new vt(1.2,1.2),roughness:.7,sheen:.5,sheenRoughness:.4}),lh=new ri;ln.add(lh);lh.position.y=4e-4;var vi=new ae(new oe,qi),no=new ae(new oe,xr),yr=[new ae(new oe,Xa),new ae(new oe,Xa)],io=[new ae(new oe,Kc),new ae(new oe,Kc)],jc=new Kn({roughness:.82,sheen:.35,sheenRoughness:.5}),Us=new ae(new oe,jc);vi.castShadow=vi.receiveShadow=!0;no.receiveShadow=!0;vi.customDepthMaterial=new sr({depthPacking:Tc,alphaMap:ks,alphaTest:.5});for(let n of[...yr,...io])n.castShadow=n.receiveShadow=!0;lh.add(vi,no,Us,...yr,...io);function Xi(){xr.color.set(Z.bag).multiplyScalar(.92),jc.color.set(Z.bag),jc.sheenColor.set(Z.bag).lerp(new Lt(16777215),.2),qi.sheenColor.set(Z.bag).lerp(new Lt(16777215),.2);let n=Z.handle==="match"?Z.bag:Z.handle;Xa.color.set(n),ud.color.set(n),Kc.color.set(n),yr.forEach(t=>{t.material=Z.strap==="webbing"?Xa:ud}),document.documentElement.style.setProperty("--bagc",Z.bag),gi=!0}function Yi(){Ht=ah();let n=Tv();vi.geometry.dispose(),vi.geometry=n,no.geometry=n;let t=ne[Z.type];yr.forEach((e,i)=>{e.visible=t.handles==="loop",e.geometry.dispose(),e.geometry=e.visible?Cv(i===0?1:-1):new oe}),Us.visible=ne[Z.type].handles!=="tshirt",Us.geometry.dispose(),Us.geometry=Us.visible?Rv():new oe,io.forEach((e,i)=>{e.visible=t.handles==="string",e.geometry.dispose(),e.geometry=e.visible?Pv(i===0?-1:1):new oe}),Sv.scale.set(Z.W*ue/.69*1.04,(gn()?Z.type==="tshirt"?2:.9:Math.max(Z.D,2))*ue/.69*1.1,1),xi(),document.getElementById("dimsHud").textContent=`${pn(Z.W)} \xD7 ${pn(Z.H)} \xD7 ${pn(Z.D)} cm`}var pn=n=>(Math.round(n*10)/10).toString(),Kv={34:{dir:[.62,.3,.73],ty:.5},front:{dir:[0,.12,1],ty:.5},side:{dir:[1,.12,.02],ty:.5},top:{dir:[.08,1.5,.62],ty:.55},back:{dir:[-.62,.3,-.73],ty:.5}},Pn=null;function jv(n){let t=Kv[n],e=Z.H+(ne[Z.type].handles==="loop"?Z.drop*.7:0),i=Math.max(e,Z.W*1.1)*ue,s=new B(0,(n==="top"?Z.H*t.ty:e*t.ty)*ue,0),r=i/(2*Math.tan(Ta.degToRad(qe.fov/2)))*(qe.aspect<1?1.35/qe.aspect:1.35);return{pos:new B(...t.dir).normalize().multiplyScalar(r).add(s),target:s}}function Qe(n,t=!0){document.querySelectorAll("#views button").forEach(i=>i.classList.toggle("on",i.dataset.view===n));let e=jv(n);if(!t||matchMedia("(prefers-reduced-motion: reduce)").matches){qe.position.copy(e.pos),Je.target.copy(e.target),Pn=null;return}Pn={t0:performance.now(),p0:qe.position.clone(),q0:Je.target.clone(),to:e}}document.getElementById("views").addEventListener("click",n=>{let t=n.target.closest("button");t&&Qe(t.dataset.view)});Je.addEventListener("start",()=>{Pn=null,document.querySelectorAll("#views button").forEach(n=>n.classList.remove("on"))});function Sd(n,t,e,i){let s=document.getElementById(n),r=document.createElement("span");r.className="swname";let a=()=>{s.querySelectorAll(".sw").forEach(l=>l.classList.toggle("on",l.dataset.v===Z[e]));let o=t.find(([,l])=>l===Z[e]);r.textContent=o?o[0]:Z[e]};for(let[o,l]of t){let c=document.createElement("button");c.className="sw",c.dataset.v=l,c.title=o,c.setAttribute("aria-label",o),l!=="match"&&(c.style.background=l),c.onclick=()=>{Z[e]=l,a(),i()},s.appendChild(c)}return s.appendChild(r),a(),a}var so=Sd("handleSw",Mv,"handle",()=>{Xi(),xi(),Hs()}),Ed=Sd("bagSw",gd,"bag",()=>{Xi(),so(),xi(),ke(),Se(),Hs()}),Td={};function Zv(n,t,e,i){let s=document.getElementById(n),r=document.getElementById("o-"+n),a=()=>{r.textContent=e(+s.value)};s.value=Z[t],a(),Td[t]=()=>{s.value=Z[t],a()},s.addEventListener("input",()=>{Z[t]=+s.value,a(),i()})}var Cd=()=>Object.values(Td).forEach(n=>n()),Qv=n=>pn(n)+" cm";Zv("drop","drop",Qv,Yi);function Ls(n){document.querySelectorAll("#tabs button").forEach(t=>{let e=t.dataset.tab===n;t.classList.toggle("on",e),t.setAttribute("aria-selected",e)}),document.querySelectorAll(".pane").forEach(t=>{t.hidden=t.dataset.pane!==n}),document.getElementById("panes").scrollTop=0,n==="design"&&ke()}document.getElementById("tabs").addEventListener("click",n=>{let t=n.target.closest("button");t&&Ls(t.dataset.tab)});document.querySelectorAll("[data-go]").forEach(n=>{n.onclick=()=>Ls(n.dataset.go)});function ch(){document.querySelectorAll("#strapSeg button").forEach(n=>n.classList.toggle("on",n.dataset.v===Z.strap))}document.getElementById("strapSeg").addEventListener("click",n=>{let t=n.target.closest("button");t&&(Z.strap=t.dataset.v,ch(),Xi(),Yi(),Hs())});document.getElementById("poseSeg").addEventListener("click",n=>{let t=n.target.closest("button");t&&(Z.pose=t.dataset.v,document.querySelectorAll("#poseSeg button").forEach(e=>e.classList.toggle("on",e===t)),Yi())});var Zc=document.getElementById("sizeSeg"),Jv=document.getElementById("moq");function $v(){let n=ne[Z.type];Zc.querySelectorAll("button").forEach(i=>i.classList.toggle("on",i.dataset.v===Z.size));let t=n.sizes.find(i=>i[0]===Z.size),e=/\d/.test(t[4])?t[4]+" pcs":t[4];Jv.innerHTML=`${pn(t[1])} \xD7 ${pn(t[2])} \xD7 ${pn(t[3])} cm \xB7 minimum order <b>${e}</b>`,document.getElementById("sumType").textContent=`${n.name} \xB7 ${t[0]}`,document.getElementById("sumDims").textContent=`${pn(t[1])} \xD7 ${pn(t[2])} \xD7 ${pn(t[3])} cm`,document.getElementById("sumMoq").textContent=`Minimum order ${e}`}function Ya(n){let t=ne[Z.type].sizes.find(s=>s[0]===n);if(!t)return;let e=Z.W,i=Z.H;Object.assign(Z,{size:n,W:t[1],H:t[2],D:t[3]}),ne[Z.type].handles==="loop"&&(Z.drop=Math.min(30,Math.max(10,Math.round(Z.H*.46))));for(let s of["front","back"])for(let r of Jt[s])r.x*=Z.W/e,r.y*=Z.H/i,r.w*=Z.W/e,$e(r);Cd(),$v(),Yi(),ke(),Se(),Qe(Xt==="back"?"back":"34")}function _r(n){let t=ne[n];Z.type=n,document.querySelectorAll("#typeSeg button").forEach(s=>s.classList.toggle("on",s.dataset.v===n)),document.getElementById("typeSub").textContent=t.sub,Z.hem=t.hem,Z.full=t.fill??.2,t.handle&&(Z.handle=t.handle,so(),Xi()),Zc.innerHTML="";for(let[s,r,a,o]of t.sizes){let l=document.createElement("button");l.dataset.v=s,l.textContent=s,l.title=`${s}: ${r} \xD7 ${a} \xD7 ${o} cm`,l.onclick=()=>{Ya(s),Hs()},Zc.appendChild(l)}let e=t.handles==="loop",i=t.handles==="string";document.getElementById("handlesSec").hidden=!(e||i),document.getElementById("handlesTitle").textContent=i?"Cords":"Handles",document.getElementById("poseSeg").hidden=!e,document.getElementById("dropRow").hidden=!e,Ya(t.sizes.some(s=>s[0]===Z.size)?Z.size:t.sizes[0][0])}document.getElementById("typeSeg").addEventListener("click",n=>{let t=n.target.closest("button");t&&(_r(t.dataset.v),Hs())});var Qc=document.getElementById("envRot"),Jc=document.getElementById("expo");function hh(){let n=+Qc.value*Math.PI/180;ln.environmentRotation.y=n,Ai.position.set(Math.sin(n-Math.PI/4)*1.25,1,Math.cos(n-Math.PI/4)*1.25),Ee.toneMappingExposure=+Jc.value,document.getElementById("o-envRot").textContent=Qc.value+"\xB0",document.getElementById("o-expo").textContent=(+Jc.value).toFixed(2),gi=!0}Qc.oninput=hh;Jc.oninput=hh;hh();function Ka(n){return new Promise((t,e)=>{let i=new Image;i.onload=()=>t(i),i.onerror=e,i.src=n})}function tx(n,t){let e=Math.min(1,2400/Math.max(n.width,n.height)),i=Math.max(1,Math.round(n.width*e)),s=Math.max(1,Math.round(n.height*e)),r=document.createElement("canvas");r.width=i,r.height=s;let a=r.getContext("2d");a.drawImage(n,0,0,i,s);let o=a.getImageData(0,0,i,s),l=o.data,c=0,h=new Float32Array(i*s);for(let A=0;A<i*s;A++)l[A*4+3]<250&&c++,h[A]=.2126*l[A*4]+.7152*l[A*4+1]+.0722*l[A*4+2];let u=document.createElement("canvas");u.width=i,u.height=s;let f=u.getContext("2d"),d=f.createImageData(i,s);if(c>i*s*.02)for(let A=0;A<i*s;A++)d.data[A*4+3]=l[A*4+3];else{let A=Float32Array.from(h).sort(),y=A[Math.floor(A.length*.5)],p=y>127,m=p?A[Math.floor(A.length*.02)]:A[Math.floor(A.length*.98)],_=(y+m)/2;for(let x=0;x<i*s;x++){let M=Math.min(1,Math.max(0,(p?_-h[x]:h[x]-_)/40+.5));d.data[x*4+3]=M*255,l[x*4+3]=M*255}a.putImageData(o,0,0)}return f.putImageData(d,0,0),{mask:u,color:r,name:t}}var Fe=(n,t)=>[{text:"ENHANCE",style:"sans-600",track:.05,fx:.5,fy:.35,fw:.58,ink:n},{kind:"graphic",graphic:"your",fx:.5,fy:.452,fw:.38,ink:n},{text:"BRAND",style:"sans-800",track:.02,fx:.5,fy:.565,fw:.64,ink:n},{text:"WITH **KOBAGS**",style:"sans-500",track:.04,fx:.5,fy:.66,fw:.4,ink:n},{text:"www.kobags-group.com",style:"sans-500",track:.02,fx:.5,fy:.712,fw:.28,ink:t}],zc=(n,t)=>[{text:"PUT YOUR",style:"sans-800",fx:.5,fy:.36,fw:.42,ink:n},{text:"BRAND",style:"sans-900",fx:.5,fy:.475,fw:.6,ink:t},{text:"IN THEIR HAND.",style:"sans-800",fx:.5,fy:.585,fw:.5,ink:n},{text:"\u2014\u2014\u2014  CONTACT US  \u2014\u2014\u2014",style:"sans-700",fx:.5,fy:.67,fw:.42,ink:n},{text:"www.kobags-group.com   |   Kobags   |   kobags_group",style:"sans-500",fx:.5,fy:.735,fw:.74,ink:n}],dd=n=>n.map(t=>({...t,fy:.69+(t.fy-.53)*.74,fw:t.fw*1.05})),Ps=n=>[{kind:"graphic",graphic:"heart",fx:.5,fy:.665,fw:.66,ink:n}],pr="#d33a2c",uh=[{name:"Enhance your brand",sub:"Box bag L \xB7 white",type:"box",size:"L",bag:"#efeee9",handle:"#2b4db5",ink:"#7d9c44",front:Fe("#7d9c44","#4a4a4c"),back:Fe("#7d9c44","#4a4a4c")},{name:"Black & gold",sub:"Box bag L \xB7 black",type:"box",size:"L",bag:"#1d1d20",handle:"#1b1c20",ink:"#c49a3c",front:Fe("#c49a3c","#c49a3c"),back:Fe("#c49a3c","#c49a3c")},{name:"Olive & red",sub:"Box bag M \xB7 olive",type:"box",size:"M",bag:"#a2ad48",handle:"#ec5534",strap:"webbing",ink:"#2f3b1c",front:Fe("#2f3b1c","#2f3b1c"),back:Fe("#2f3b1c","#2f3b1c")},{name:"Black \xB7 white ink",sub:"Box bag M \xB7 black",type:"box",size:"M",bag:"#1d1d20",handle:"#1b1c20",ink:"#f4f3ef",front:Fe("#f4f3ef","#f4f3ef"),back:Fe("#f4f3ef","#f4f3ef")},{name:"Grey \xB7 white ink",sub:"Box bag L \xB7 grey",type:"box",size:"L",bag:"#8c8e92",handle:"#1b1c20",ink:"#f4f3ef",front:Fe("#f4f3ef","#f4f3ef"),back:Fe("#f4f3ef","#f4f3ef")},{name:"Two-sided kraft",sub:"Box bag M \xB7 kraft",type:"box",size:"M",bag:"#bd9665",handle:"match",ink:"#e2683a",front:zc("#3a3a3c","#e2683a"),back:Fe("#1a1a1a","#1a1a1a")},{name:"Saray",sub:"Box bag M \xB7 red",type:"box",size:"M",bag:"#d42a1f",handle:"#1b1c20",ink:"#7a1f18",front:[{text:"Saray",style:"serif-700",fx:.5,fy:.47,fw:.56,ink:"#7a1f18"}],back:[{text:"Saray",style:"serif-700",fx:.5,fy:.47,fw:.56,ink:"#7a1f18"}]},{name:"American Beauty Clinic",sub:"Box bag XL \xB7 white",type:"box",size:"XL",bag:"#efeee9",handle:"#1b1c20",ink:"#4a4a4c",front:[{kind:"graphic",graphic:"crescent",fx:.255,fy:.5,fw:.075,ink:"#4a4a4c"},{text:"AMERICAN",style:"serif-700",track:.04,fx:.535,fy:.49,fw:.44,ink:"#4a4a4c"},{text:"BEAUTY CLINIC",style:"sans-500",track:.25,fx:.535,fy:.56,fw:.25,ink:"#4a4a4c"}],back:[]},{name:"Papirun",sub:"Box bag M \xB7 kraft",type:"box",size:"M",bag:"#bd9665",handle:"match",ink:"#1a1a1a",front:[{kind:"graphic",graphic:"papirun",fx:.5,fy:.4,fw:.2,ink:"#1a1a1a"},{text:"PAPIRUN",style:"sans-700",track:.14,fx:.5,fy:.625,fw:.58,ink:"#1a1a1a"},{text:"\u2014\u2014\u2014  LIMITED EDITION  \u2014\u2014\u2014",style:"sans-600",track:.12,fx:.5,fy:.69,fw:.36,ink:"#1a1a1a"}],back:[]},{name:"Full-panel M",sub:"Box bag L \xB7 kraft",type:"box",size:"L",bag:"#bd9665",handle:"match",ink:"#e2683a",front:[{text:"M",style:"sans-900",fx:.5,fy:.56,fw:.86,ink:"#e2683a"}],back:[{text:"M",style:"sans-900",fx:.5,fy:.56,fw:.86,ink:"#e2683a"}]},{name:"Dina \xB7 two designs",sub:"Box bag L \xB7 kraft",type:"box",size:"L",bag:"#bd9665",handle:"match",ink:pr,front:[{text:"Dina",style:"sans-900",fx:.5,fy:.48,fw:.88,ink:pr},{text:"Dina-R SUPERMARKET",style:"sans-800",fx:.5,fy:.75,fw:.62,ink:pr}],back:[{text:"Mbushur me",style:"sans-900",fx:.5,fy:.42,fw:.78,ink:"#3a3a3c"},{text:"t'mira!",style:"sans-900",fx:.5,fy:.6,fw:.56,ink:pr},{text:"Dina-R",style:"sans-900",fx:.76,fy:.84,fw:.22,ink:pr}]},{name:"Put your brand",sub:"D-cut L \xB7 white",type:"dcut",size:"L",bag:"#efeee9",ink:"#e2683a",front:zc("#4a4a4c","#e2683a"),back:zc("#4a4a4c","#e2683a")},{name:"Black D-cut",sub:"D-cut L \xB7 gold ink",type:"dcut",size:"L",bag:"#1d1d20",ink:"#c49a3c",front:Fe("#c49a3c","#c49a3c"),back:Fe("#c49a3c","#c49a3c")},{name:"ECO bottle bag",sub:"Bottle bag \xB7 kraft",type:"bottle",size:"Std",bag:"#bd9665",ink:"#4c8a3f",front:[{kind:"graphic",graphic:"eco",fx:.5,fy:.6,fw:.78,ink:"#4c8a3f"}],back:[{kind:"graphic",graphic:"eco",fx:.5,fy:.6,fw:.78,ink:"#4c8a3f"}]},{name:"Enhance \xB7 navy",sub:"T-shirt S \xB7 white",type:"tshirt",size:"S",bag:"#efeee9",ink:"#1f2b4d",front:dd(Fe("#1f2b4d","#1f2b4d")),back:dd(Fe("#1f2b4d","#1f2b4d"))},{name:"Thank you \xB7 orange",sub:"T-shirt S \xB7 white",type:"tshirt",size:"S",bag:"#efeee9",ink:"#e2683a",front:Ps("#e2683a"),back:Ps("#e2683a")},{name:"Thank you \xB7 grey",sub:"T-shirt S \xB7 white",type:"tshirt",size:"S",bag:"#efeee9",ink:"#7a7a7c",front:Ps("#7a7a7c"),back:Ps("#7a7a7c")},{name:"Thank you \xB7 teal",sub:"T-shirt S \xB7 white",type:"tshirt",size:"S",bag:"#efeee9",ink:"#2fa58a",front:Ps("#2fa58a"),back:Ps("#2fa58a")},{name:"Drawstring",sub:"String bag M \xB7 white",type:"string",size:"M",bag:"#efeee9",handle:"#eceae4",ink:"#c49a3c",front:Fe("#c49a3c","#c49a3c"),back:[]},{name:"KIVO",sub:"Box bag XS \xB7 red",type:"box",size:"XS",bag:"#d42a1f",handle:"#1b1c20",strap:"webbing",ink:"#1a1a1a",front:[{kind:"graphic",graphic:"kivo",fx:.5,fy:.53,fw:.85,ink:"#1a1a1a"}],back:[]}],ja=document.getElementById("samples"),ex=n=>(gd.find(([,t])=>t===n)||["Custom"])[0];for(let n of[...document.querySelectorAll("#typeSeg button")].map(t=>t.dataset.v)){let t=uh.map((s,r)=>[s,r]).filter(([s])=>s.type===n);if(!t.length)continue;let e=document.createElement("h3");e.textContent=ne[n].name+"s";let i=document.createElement("span");i.textContent=t.length,e.appendChild(i),ja.appendChild(e);for(let[s,r]of t){let a=document.createElement("button");a.className="sample",a.dataset.i=r,a.innerHTML='<i class="dot"></i><span><b></b><small></small></span>',a.querySelector(".dot").style.background=`linear-gradient(135deg, ${s.bag} 58%, ${s.ink} 58%)`,a.querySelector("b").textContent=s.name,a.querySelector("small").textContent=`${s.size} \xB7 ${ex(s.bag)}`,a.onclick=()=>dh(r),ja.appendChild(a)}}function Hs(){ja.querySelectorAll(".sample").forEach(n=>n.classList.remove("on"))}function dh(n){let t=uh[n];Object.assign(Z,{bag:t.bag,size:t.size}),Jt.front=[],Jt.back=[],_r(t.type),t.handle&&(Z.handle=t.handle),Z.strap=t.strap||"fabric",ch();for(let e of["front","back"])Jt[e]=t[e].map(({fx:i,fy:s,fw:r,...a})=>{let o={kind:"text",...a,id:Zn++,x:i*Z.W,y:s*Z.H,w:r*Z.W};return $e(o),o});Ed(),so(),Xi(),Xt="front",mn=null,Ns(),ja.querySelectorAll(".sample").forEach(e=>e.classList.toggle("on",+e.dataset.i===n)),xi(),ke(),Se(),Qe("34")}var pe=document.getElementById("editor"),Qt=pe.getContext("2d"),$c=document.getElementById("props"),th=document.getElementById("designNote"),zi=document.getElementById("pText"),vr=document.getElementById("pStyle"),Hi=document.getElementById("pQr"),Za=document.getElementById("pMethod"),Qa=document.getElementById("pInk"),Vi=document.getElementById("pSize"),Hc=document.getElementById("pNote"),ki=document.getElementById("copySide"),Ja=10,Rn=null,Vc=!1,Pe=()=>Jt[Xt].find(n=>n.id===mn)||null;function Ie(){ke(),Vc||(Vc=!0,requestAnimationFrame(()=>{Vc=!1,xi()}))}var Gc={};function nx(n){if(!Gc[n]){let t=document.createElement("canvas");t.width=t.height=10;let e=t.getContext("2d");e.fillStyle=n?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.05)",e.fillRect(0,0,10,10),e.strokeStyle=n?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.22)",e.lineWidth=1.2,e.beginPath(),e.moveTo(-2,12),e.lineTo(12,-2),e.moveTo(-2,2),e.lineTo(2,-2),e.moveTo(8,12),e.lineTo(12,8),e.stroke(),Gc[n]=t}return Gc[n]}function ke(){let{W:n,H:t}=Z,e=Math.max(120,pe.parentElement.clientWidth-18),i=innerWidth<=760,s=document.documentElement.dataset.canvasFocus==="true",r=i?Math.max(120,Math.min(340,s?innerHeight-270:document.getElementById("panes").clientHeight-24)):340,a=e/n;t*a>r&&(a=r/t);let o=Math.min(window.devicePixelRatio||1,2),l=Math.round(n*a),c=Math.round(t*a);(pe.width!==Math.round(l*o)||pe.height!==Math.round(c*o))&&(pe.width=Math.round(l*o),pe.height=Math.round(c*o)),pe.style.width=l+"px",pe.style.height=c+"px",Ja=a;let h=a*o,u=zs(),f=new Lt(Z.bag).getHSL({}).l<.5;Qt.setTransform(1,0,0,1,0,0),Qt.fillStyle=Z.bag,Qt.fillRect(0,0,pe.width,pe.height),Qt.save(),Qt.beginPath(),Qt.rect(0,0,pe.width,pe.height),Qt.rect(u.x0*h,u.y0*h,(u.x1-u.x0)*h,(u.y1-u.y0)*h),Qt.fillStyle=Qt.createPattern(nx(f),"repeat"),Qt.fill("evenodd"),Qt.setLineDash([4*o,4*o]),Qt.strokeStyle=f?"rgba(255,255,255,0.45)":"rgba(0,0,0,0.3)",Qt.lineWidth=o,Qt.strokeRect(u.x0*h,u.y0*h,(u.x1-u.x0)*h,(u.y1-u.y0)*h),Qt.restore(),Qt.save(),Qt.fillStyle=rd("--chip")||"#fff",_d(Qt,h,0,0),Qt.fill(),Qt.restore(),Ar(Qt,h,0,0,Jt[Xt]);let d=Pe();if(d){let[A,y]=Fs(d),p=(d.x-A/2)*h,m=(d.y-y/2)*h,_=10*o;Qt.save(),Qt.strokeStyle=rd("--focus")||"#2b59c3",Qt.lineWidth=1.5*o,Qt.setLineDash([5*o,3*o]),Qt.strokeRect(p,m,A*h,y*h),Qt.setLineDash([]),Qt.fillStyle="#fff",Qt.fillRect(p+A*h-_/2,m+y*h-_/2,_,_),Qt.strokeRect(p+A*h-_/2,m+y*h-_/2,_,_),Qt.restore()}}new ResizeObserver(()=>ke()).observe(pe.parentElement);matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>ke());var Rd=n=>{let t=pe.getBoundingClientRect();return[(n.clientX-t.left)/Ja,(n.clientY-t.top)/Ja]};function Pd(n,t){let e=Pe(),i=12/Ja;if(e){let[r,a]=Fs(e),o=Math.min(i,Math.min(r,a)*.4);if(Math.abs(n-(e.x+r/2))<o&&Math.abs(t-(e.y+a/2))<o)return[e,"resize"]}let s=Jt[Xt];for(let r=s.length-1;r>=0;r--){let a=s[r],[o,l]=Fs(a);if(Math.abs(n-a.x)<=o/2&&Math.abs(t-a.y)<=l/2)return[a,"move"]}return[null,null]}pe.addEventListener("pointerdown",n=>{let[t,e]=Rd(n),[i,s]=Pd(t,e);if(!i){$a(null);return}$a(i.id),pe.setPointerCapture(n.pointerId),Rn={mode:s,el:i,x0:t,y0:e,ex:i.x,ey:i.y,w0:i.w}});pe.addEventListener("pointermove",n=>{let[t,e]=Rd(n);if(!Rn){let[s,r]=Pd(t,e);pe.style.cursor=r==="resize"?"nwse-resize":s?"move":"default";return}let i=Rn.el;Rn.mode==="move"?(i.x=Rn.ex+t-Rn.x0,i.y=Rn.ey+e-Rn.y0):i.w=Math.max(yd(i),Rn.w0+2*(t-Rn.x0)),$e(i),Se(),Ie()});var Id=()=>{Rn=null};pe.addEventListener("pointerup",Id);pe.addEventListener("pointercancel",Id);pe.addEventListener("keydown",n=>{let t=Pe();if(!t)return;let e=n.shiftKey?1:.2,i={ArrowLeft:[-e,0],ArrowRight:[e,0],ArrowUp:[0,-e],ArrowDown:[0,e]}[n.key];i&&(t.x+=i[0],t.y+=i[1],$e(t),Se(),Ie(),n.preventDefault()),(n.key==="Delete"||n.key==="Backspace")&&(Dd(),n.preventDefault())});function $a(n){mn=n,Se(),ke()}function Dd(){Jt[Xt]=Jt[Xt].filter(n=>n.id!==mn),mn=null,Se(),Ie()}for(let[n,[,,t]]of Object.entries(Wc))vr.add(new Option(t,n));var fh=document.createElement("span");fh.className="swname";for(let[n,t]of Ad){let e=document.createElement("button");e.className="sw",e.dataset.v=t,e.title=n,e.setAttribute("aria-label",n),e.style.background=t,e.onclick=()=>{let i=Pe();i&&(i.ink=t,Se(),Ie())},Qa.appendChild(e)}Qa.appendChild(fh);var eh=n=>{let t=new Lt(n);return .2126*t.r+.7152*t.g+.0722*t.b};function Se(){let n=Pe();if($c.hidden=!n,!n)return;document.getElementById("propsTitle").textContent={text:"Text",logo:"Logo",qr:"QR code",graphic:"Artwork"}[n.kind],zi.hidden=vr.hidden=n.kind!=="text",n.kind==="text"&&(document.activeElement!==zi&&(zi.value=n.text),vr.value=n.style),Hi.hidden=n.kind!=="qr",n.kind==="qr"&&document.activeElement!==Hi&&(Hi.value=n.data),Za.hidden=n.kind!=="logo",Za.querySelectorAll("button").forEach(s=>s.classList.toggle("on",s.dataset.v===(n.method||"mono"))),Qa.hidden=n.kind==="logo"&&n.method==="full",Qa.querySelectorAll(".sw").forEach(s=>s.classList.toggle("on",s.dataset.v===n.ink)),fh.textContent=(Ad.find(([,s])=>s===n.ink)||[n.ink])[0];let t=zs();Vi.min=yd(n),Vi.max=(t.x1-t.x0).toFixed(1),Vi.value=n.w,document.getElementById("o-pSize").textContent=pn(n.w)+" cm";let e="",i=!1;if(n.kind==="qr"){let s=eh(n.ink),r=eh(Z.bag),a=(Math.max(s,r)+.05)/(Math.min(s,r)+.05);window.qrcode?a<3?(e="Low contrast with the fabric, so phones may not read this QR code. Pick a darker or lighter ink.",i=!0):s>r?(e="Light ink on dark fabric makes an inverted QR code, which some phones cannot read. Scan a sample before ordering.",i=!0):n.w<3.5?(e="Make it at least 3.5 cm wide so phones read it through the fabric texture.",i=!0):e="Scannable size and contrast. Phones read it best on a flat, well-lit panel.":(e="The QR code generator did not load. Check the internet connection and reload the page.",i=!0)}else n.kind==="logo"&&n.method==="full"?e="Full-colour logos are printed as a heat transfer, so they keep their own colours.":n.kind==="text"&&(e="Put **double asterisks** around words to make them bold. Press Enter for a new line.");Hc.textContent=e,Hc.classList.toggle("warn",i),Hc.hidden=!e}zi.addEventListener("input",()=>{let n=Pe();n&&(n.text=zi.value||" ",$e(n),Se(),Ie())});vr.addEventListener("change",()=>{let n=Pe();n&&(n.style=vr.value,$e(n),Ie())});Hi.addEventListener("input",()=>{let n=Pe();n&&(n.data=Hi.value.trim()||" ",$e(n),Ie())});Za.addEventListener("click",n=>{let t=n.target.closest("button"),e=Pe();t&&e&&(e.method=t.dataset.v,Se(),Ie())});Vi.addEventListener("input",()=>{let n=Pe();n&&(n.w=+Vi.value,$e(n),Se(),Ie())});document.getElementById("pCenter").onclick=()=>{let n=Pe();n&&(n.x=Z.W/2,$e(n),Ie())};document.getElementById("delItem").onclick=Dd;var ix=()=>eh(Z.bag)>.3?"#1a1a1a":"#f4f3ef";function ro(n){let t=zs();n={id:Zn++,x:(t.x0+t.x1)/2,y:(t.y0+t.y1)/2,ink:ix(),...n},$e(n),Jt[Xt].push(n),mn=n.id,Se(),Ie()}document.getElementById("addText").onclick=()=>ro({kind:"text",text:"Your text",style:"sans-800",track:.02,w:Math.min(14,Z.W*.5)});document.getElementById("addQr").onclick=()=>{let n=zs();ro({kind:"qr",data:"https://www.kobags-group.com",w:4.5,x:n.x1-2.25,y:n.y1-2.25})};document.getElementById("addLogo").onchange=async n=>{let t=n.target.files[0];if(t){try{let e=await Ka(URL.createObjectURL(t)),i="logo"+Zn++;Gi.set(i,tx(e,t.name)),ro({kind:"logo",asset:i,method:"mono",w:Math.min(12,Z.W*.45)}),th.textContent=`Added ${t.name}. Drag it into place.`}catch{th.textContent="That file could not be read as an image. Try a PNG, JPG or SVG."}n.target.value=""}};function Ns(){document.querySelectorAll("#sideSeg button[data-v]").forEach(n=>n.classList.toggle("on",n.dataset.v===Xt)),ki.textContent=Xt==="front"?"Copy to back":"Copy to front"}document.getElementById("sideSeg").addEventListener("click",n=>{let t=n.target.closest("button[data-v]");t&&(Xt=t.dataset.v,mn=null,Ns(),Se(),ke(),Qe(Xt==="back"?"back":"34"))});ki.onclick=()=>{let n=Xt==="front"?"back":"front";Jt[n]=Jt[Xt].map(t=>({...t,id:Zn++})),Ie(),th.textContent=`The ${n} now has the same design as the ${Xt}.`};function Ud(){let e=document.createElement("canvas"),i=e.getContext("2d"),s=()=>{i.font='300 200px "Montserrat", "Helvetica Neue", Arial, sans-serif',"letterSpacing"in i&&(i.letterSpacing="20px")};s();let r=i.measureText("Y").width,a=i.measureText("UR").width,o=i.measureText("H").actualBoundingBoxAscent||200*.7,l=o*1.04,c=200*.14;e.width=Math.ceil(r+l+20+a+c*2),e.height=Math.ceil(200*1.12+c),s(),i.fillStyle=i.strokeStyle="#fff",i.textBaseline="alphabetic";let h=e.height/2+o/2;i.fillText("Y",c,h);let u=c+r+l/2,f=h-o/2,d=l/2;i.lineWidth=200*.045,i.lineCap="round";for(let A=0;A<3;A++)i.save(),i.translate(u,f),i.rotate(A*Math.PI*2/3-Math.PI/2),i.beginPath(),i.arc(0,0,d*.94,-.95,1.15),i.quadraticCurveTo(d*.2,d*.25,d*.55,-d*.76),i.stroke(),i.beginPath(),i.moveTo(d*.83,d*.42),i.quadraticCurveTo(d*.55,0,d*.62,-d*.55),i.stroke(),i.restore();return i.fillText("UR",c+r+l+20,h),e}function ph(n,t,e){let i=document.createElement("canvas");i.width=n,i.height=t;let s=i.getContext("2d");return s.fillStyle=s.strokeStyle="#fff",e(s),i}var sx=()=>ph(520,560,n=>{for(let t=0;t<4;t++)n.beginPath(),n.roundRect(40+t*115,20,85,220,[42,42,8,8]),n.fill();n.beginPath(),n.moveTo(20,268),n.lineTo(500,268),n.lineTo(500,318),n.lineTo(20,318),n.closePath(),n.fill(),n.beginPath(),n.moveTo(40,350),n.lineTo(480,350),n.arc(260,350,220,0,Math.PI),n.closePath(),n.fill()}),rx=()=>ph(400,400,n=>{n.beginPath(),n.arc(200,200,180,0,Math.PI*2),n.fill(),n.globalCompositeOperation="destination-out",n.beginPath(),n.arc(250,185,150,0,Math.PI*2),n.fill(),n.globalCompositeOperation="source-over",n.beginPath(),n.ellipse(215,215,70,34,-.8,0,Math.PI*2),n.fill()}),Ld=()=>ph(600,1500,n=>{n.lineWidth=12,n.lineCap=n.lineJoin="round";for(let[t,e,i]of[[300,170,95],[215,230,80],[385,230,80],[300,290,85]])n.beginPath(),n.arc(t,e,i,0,Math.PI*2),n.stroke();n.beginPath(),n.moveTo(300,370),n.lineTo(300,470),n.moveTo(300,420),n.lineTo(255,380),n.moveTo(300,405),n.lineTo(340,370),n.stroke(),n.font='700 190px "Montserrat", sans-serif',n.textAlign="center",n.lineWidth=10,n.strokeText("ECO",300,700),n.lineWidth=12,n.beginPath(),n.arc(300,900,85,0,Math.PI*2),n.stroke();for(let t=0;t<12;t++){let e=t*Math.PI/6;n.beginPath(),n.moveTo(300+Math.cos(e)*115,900+Math.sin(e)*115),n.lineTo(300+Math.cos(e)*160,900+Math.sin(e)*160),n.stroke()}n.beginPath(),n.arc(170,1300,95,0,Math.PI*2),n.moveTo(525,1300),n.arc(430,1300,95,0,Math.PI*2),n.stroke(),n.beginPath(),n.moveTo(170,1300),n.lineTo(270,1170),n.lineTo(390,1170),n.lineTo(430,1300),n.moveTo(170,1300),n.lineTo(300,1300),n.lineTo(390,1170),n.moveTo(270,1170),n.lineTo(300,1300),n.moveTo(250,1140),n.lineTo(300,1140),n.moveTo(390,1170),n.lineTo(380,1120),n.lineTo(420,1110),n.stroke();for(let[t,e,i]of[[110,560,-.6],[500,1020,.6],[100,1050,-.4]])n.save(),n.translate(t,e),n.rotate(i),n.beginPath(),n.ellipse(0,0,70,28,0,0,Math.PI*2),n.moveTo(-70,0),n.lineTo(70,0),n.stroke(),n.restore()});function Nd(){let t=document.createElement("canvas");t.width=1400,t.height=1400;let e=t.getContext("2d"),i=[];for(let U=0;U<480;U++){let k=U/480*Math.PI*2;i.push([16*Math.sin(k)**3,-(13*Math.cos(k)-5*Math.cos(2*k)-2*Math.cos(3*k)-Math.cos(4*k))])}let s=Math.min(...i.map(U=>U[1])),r=1400*.92/32,a=i.map(([U,k])=>[1400/2+U*r,(k-s)*r+1400*.02]),o=U=>{let k=1/0,z=-1/0;for(let K=0;K<a.length;K++){let F=a[K],tt=a[(K+1)%a.length];if((F[1]-U)*(tt[1]-U)<=0&&F[1]!==tt[1]){let at=F[0]+(U-F[1])/(tt[1]-F[1])*(tt[0]-F[0]);k=Math.min(k,at),z=Math.max(z,at)}}return[k,z]},l=[{words:[["Gracias","s"],["XIEXIE","b"],["Merci","s"]],k:1},{words:[["DANKE","b"],["SHUKRAN","b"]],k:1.3},{big:"THANK",left:["HVALA","KIITOS"],right:["OBRIGADO","TERIMA KASIH"],k:2.1},{big:"YOU",left:["ARIGATO","DEKUJI"],right:["SALAMAT","TACK"],k:1.9},{words:[["FALEMINDERIT","b"]],k:1.1},{words:[["KOSZONOM","b"],["MULTUMESC","b"]],k:.75},{words:[["TESEKKUR EDERIM","b"]],k:.65},{words:[["DANK U","b"]],k:.6}],c=(U,k)=>U==="s"?`700 ${k*1.2}px "Dancing Script", cursive`:`700 ${k}px "Oswald", "Arial Narrow", sans-serif`,h=(U,k,z)=>(e.font=c(k,z),e.measureText(U).width),u=.46,f=.22,d=(U,k)=>Math.max(...U.map(z=>h(z,"b",k*u))),A=(U,k)=>U.big?d(U.left,k)+h(U.big,"b",k)+d(U.right,k)+2*f*k:U.words.reduce((z,[K,F])=>z+h(K,F,k),0)+(U.words.length-1)*k*.26;e.font=c("b",100);let y=e.measureText("H").actualBoundingBoxAscent/100||.78,p=1.14,m=Math.min(...a.map(U=>U[1])),_=Math.max(...a.map(U=>U[1])),x=_-m,M=m+x*.08,R=m+x*.9,b=(R-M)/l.reduce((U,k)=>U+k.k*y*p,0),w=[];for(let U=0;U<8;U++){w=[];let k=M;for(let z of l){let K=z.k*b,[F,tt]=o(k+K*y*.5);if(!(tt>F)){k+=K*y*p;continue}let at=(tt-F)*.96/A(z,1),ct=Math.min(Math.max(at,K*.6),K*1.6),Et=Math.min(Math.max((tt-F)*.96/A(z,ct),.8),1.25);w.push({row:z,size:ct,sx:Et,cx:(F+tt)/2,base:k+ct*y}),k+=ct*y*p}b*=(R-M)/(k-M)}e.fillStyle="#fff";for(let{row:U,size:k,sx:z,cx:K,base:F}of w){e.save(),e.translate(K,0),e.scale(z,1);let tt=-A(U,k)/2;if(U.big){let at=k*u,ct=d(U.left,k),Et=F-k*y*.56;e.textAlign="right",e.font=c("b",at),e.fillText(U.left[0],tt+ct,Et),e.fillText(U.left[1],tt+ct,F),tt+=ct+f*k,e.textAlign="left",e.font=c("b",k),e.fillText(U.big,tt,F),tt+=h(U.big,"b",k)+f*k,e.font=c("b",at),e.fillText(U.right[0],tt,Et),e.fillText(U.right[1],tt,F)}else for(let[at,ct]of U.words)e.font=c(ct,k),e.fillText(at,tt,F),tt+=e.measureText(at).width+k*.26;e.restore()}let E=e.getImageData(0,0,1400,1400).data,T=1400,g=1400,v=0,I=0;for(let U=0;U<1400;U+=2)for(let k=0;k<1400;k+=2)E[(U*1400+k)*4+3]>20&&(T=Math.min(T,k),v=Math.max(v,k),g=Math.min(g,U),I=Math.max(I,U));let N=document.createElement("canvas");return N.width=v-T+12,N.height=I-g+12,N.getContext("2d").drawImage(t,T-6,g-6,N.width,N.height,0,0,N.width,N.height),N}function ax(n){let t=document.createElement("canvas");return t.width=n.width,t.height=n.height,t.getContext("2d").drawImage(n,0,0),t}function ox(){let n=document.querySelector('link[href*="fonts.googleapis.com/css2"]'),t=new Promise(i=>{!n||n.sheet?i():(n.addEventListener("load",i,{once:!0}),n.addEventListener("error",i,{once:!0}))}),e=["300","500","600","700","800","900"].map(i=>`${i} 40px "Montserrat"`).concat(['700 40px "Oswald"','700 40px "Dancing Script"','700 40px "Playfair Display"']);return Promise.race([t.then(()=>Promise.all(e.map(i=>document.fonts.load(i)))),new Promise(i=>setTimeout(i,5e3))]).catch(()=>{})}document.fonts?.addEventListener?.("loadingdone",()=>{if(window.__ready){mi.clear(),pi.heart=Nd(),pi.eco=Ld(),pi.your=Ud();for(let n of["front","back"])Jt[n].forEach($e);xi(),ke()}});var lx=window.claude?.use?window.claude.use("downloads"):Promise.resolve(null);document.getElementById("shot").onclick=async()=>{oo(!0);let n=await new Promise(s=>Ee.domElement.toBlob(s,"image/png")),t=`${ne[Z.type].name.toLowerCase().replace(/[^a-z]+/g,"-")}-${Z.size}-${Xt}.png`,e=await lx;if(e){try{await e.save({filename:t,data:n})}catch{}return}let i=document.createElement("a");i.href=URL.createObjectURL(n),i.download=t,i.click(),setTimeout(()=>URL.revokeObjectURL(i.href),5e3)};var Wi=new La(Ee,new Be(1,1,{type:fn,samples:4}));Wi.addPass(new Na(ln,qe));var An=new fr(ln,qe,1,1);An.normalMaterial.side=We;An.updateGtaoMaterial({radius:.045,distanceExponent:1.6,thickness:.03,scale:1.15,samples:16,distanceFallOff:1});An.updatePdMaterial({lumaPhi:10,depthPhi:2,normalPhi:3,radius:5,rings:2,samples:16});An.blendIntensity=.9;var ao=new bs({side:We,blending:ge});ao.alphaMap=ks;ao.onBeforeCompile=n=>{n.fragmentShader=n.fragmentShader.replace("#include <uv_pars_fragment>",`#include <uv_pars_fragment>
#include <alphamap_pars_fragment>`).replace("#include <normal_fragment_begin>",`#ifdef USE_ALPHAMAP
	if ( texture2D( alphaMap, vAlphaMapUv ).g < 0.5 ) discard;
#endif
#include <normal_fragment_begin>`)};ao.customProgramCacheKey=()=>"bag-cut-normals";var cx=An.renderOverride.bind(An),fd=new Lt;An.renderOverride=(n,t,e,i,s)=>{if(t!==An.normalMaterial)return cx(n,t,e,i,s);let r=[];ln.traverse(l=>{l.isMesh&&(r.push([l,l.material]),l.material=l===vi||l===no?ao:An.normalMaterial)}),n.getClearColor(fd);let a=n.getClearAlpha(),o=n.autoClear;n.setRenderTarget(e),n.autoClear=!1,n.setClearColor(i),n.setClearAlpha(s||0),n.clear(),n.render(ln,qe),n.autoClear=o,n.setClearColor(fd),n.setClearAlpha(a);for(let[l,c]of r)l.material=c};Wi.addPass(An);var nh=new Fa;nh.material.fragmentShader=nh.material.fragmentShader.replace("gl_FragColor = texture2D( tDiffuse, vUv );",`gl_FragColor = texture2D( tDiffuse, vUv );
    // Opaque fabric keeps its original linear colour. For transparent floor
    // shadows, include GTAO darkening in the black-shadow coverage first.
    float websiteCoverage = clamp(max(gl_FragColor.a, 1.0 - min(min(gl_FragColor.r, gl_FragColor.g), gl_FragColor.b)), 0.0, 1.0);
    gl_FragColor.rgb = max(vec3(0.0), (gl_FragColor.rgb - vec3(1.0 - websiteCoverage)) / max(websiteCoverage, 0.00001));`).replace("// color space",`// Composite a true white backdrop after tone mapping, also for downloads.
    gl_FragColor.rgb = mix(vec3(1.0), gl_FragColor.rgb, websiteCoverage);
    gl_FragColor.a = 1.0;
    // color space`);Wi.addPass(nh);function Od(){let n=Ga.clientWidth,t=Math.max(120,Ga.clientHeight-(document.documentElement.dataset.embed==="preview"?0:56));Ee.setSize(n,t,!1),qe.aspect=n/t,qe.updateProjectionMatrix(),Wi.setPixelRatio(Ee.getPixelRatio()),Wi.setSize(n,t),gi=!0}new ResizeObserver(Od).observe(Ga);Od();function oo(n=!1){let t=!1;if(Pn){t=!0;let e=Math.min(1,(performance.now()-Pn.t0)/650),i=1-Math.pow(1-e,3);qe.position.lerpVectors(Pn.p0,Pn.to.pos,i),Je.target.lerpVectors(Pn.q0,Pn.to.target,i),e===1&&(Pn=null)}t=Je.update()||t,(t||gi||n)&&(Wi.render(),gi=!1)}Ee.setAnimationLoop(()=>oo());Xi();_r("box");Qe("34",!1);window.qrcode?.stringToBytesFuncs?.["UTF-8"]&&(window.qrcode.stringToBytes=window.qrcode.stringToBytesFuncs["UTF-8"]);Promise.all([ox(),Ka(_v)]).then(([,n])=>{pi.kivo=ax(n),pi.heart=Nd(),Object.assign(pi,{papirun:sx(),crescent:rx(),eco:Ld(),your:Ud()}),mi.clear(),dh(0),Qe("34",!1),window.__ready=!0});window.__api={renderer:Ee,render:()=>oo(!0),gtao:An,applyType:_r,applySize:Ya,loadSample:dh,SAMPLES:uh,design:Jt,select:$a,drawEditor:ke,printArea:zs,elementSize:Fs,getSide:()=>Xt,outer:vi,rim:Us,straps:yr,cords:io,TYPES:ne,state:Z,setView:Qe,rebuild:Yi,redrawAtlas:xi,camera:qe,controls:Je,composer:Wi,gtao:An,scene:ln};var Mr=document.documentElement.dataset.embed==="preview",mh="kobags-reference-studio-v1",lo=!1;window.addEventListener("storage",n=>{!Mr&&n.key===mh&&n.newValue===null&&(lo=!1,clearTimeout(ih),location.reload())});function mr(n,t={}){window.parent!==window&&window.parent.postMessage({type:n,...t},location.origin)}function Bd(){if(!(!lo||Mr))try{let n=new Set([...Jt.front,...Jt.back].filter(e=>e.kind==="logo").map(e=>e.asset)),t=[...Gi.entries()].filter(([e])=>n.has(e)).map(([e,i])=>[e,{name:i.name,mask:i.mask.toDataURL(),color:i.color.toDataURL()}]);localStorage.setItem(mh,JSON.stringify({version:1,state:Z,design:Jt,side:Xt,nextId:Zn,uploaded:t}))}catch{mr("kobags:storage-unavailable")}}var ih;function to(){clearTimeout(ih),ih=setTimeout(Bd,350)}for(let n of["input","change","click","pointerup"])document.addEventListener(n,to,{passive:!0});var hx=Ie;Ie=function(){hx(),to()};function gh(n){let t=n.toDataURL("image/png");if(t.length<=8e4)return t;for(let i of[.9,.8,.65])if(t=n.toDataURL("image/webp",i),t.length<=8e4)return t;if(n.width<=180)throw Error("IMAGE_TOO_LARGE");let e=document.createElement("canvas");return e.width=Math.round(n.width*.75),e.height=Math.round(n.height*.75),e.getContext("2d").drawImage(n,0,0,e.width,e.height),gh(e)}function pd(n){if(!Jt[n].length)return"";let t=document.createElement("canvas");t.width=900,t.height=Math.round(900*Z.H/Z.W);let e=t.getContext("2d");return Ar(e,900/Z.W,0,0,Jt[n]),gh(t)}function ux(){let n=qe.position.clone(),t=Je.target.clone(),e=document.getElementById("mobile-camera-view")?.value,i={};try{for(let s of["front","back"]){Qe(s,!1),oo(!0);let r=document.createElement("canvas"),a=Ee.domElement,o=Math.min(1,800/Math.max(a.width,a.height));r.width=Math.round(a.width*o),r.height=Math.round(a.height*o),r.getContext("2d").drawImage(a,0,0,r.width,r.height),i[s]=gh(r)}}finally{Pn=null,qe.position.copy(n),Je.target.copy(t),Je.update(),gi=!0,e!==void 0&&(document.getElementById("mobile-camera-view").value=e)}return{source:"ariongj-mo-b23cd8f",productName:ne[Z.type].name,size:Z.size,dimensions:`${Z.W} \xD7 ${Z.H} \xD7 ${Z.D} cm`,fabric:Z.bag,...i}}window.addEventListener("message",n=>{if(!(n.source!==window.parent||n.origin!==location.origin||!lo)&&(n.data?.type==="kobags:studio-status"&&mr("kobags:studio-ready"),n.data?.type==="kobags:request-quote")){Bd();try{mr("kobags:quote-design",{bag:{...Z},front:pd("front"),back:pd("back"),referenceStudio:ux()})}catch{mr("kobags:quote-error")}}});async function dx(){if(!Mr)try{let n=JSON.parse(localStorage.getItem(mh)||"null");if(n?.version!==1||!Object.hasOwn(ne,n.state?.type))return;let t=n.state;if(!ne[t.type].sizes.some(i=>i[0]===t.size)||!/^#[\da-f]{6}$/i.test(t.bag)||!Array.isArray(n.design?.front)||!Array.isArray(n.design?.back)||n.design.front.length+n.design.back.length>100)return;Number.isSafeInteger(n.nextId)&&n.nextId>0&&n.nextId<1e9&&(Zn=Math.max(Zn,n.nextId));for(let[i,s]of(n.uploaded||[]).slice(0,32)){if(typeof i!="string"||i.length>100||!s.mask?.startsWith("data:image/png;base64,")||!s.color?.startsWith("data:image/png;base64,")||s.mask.length+s.color.length>8e6)continue;let[r,a]=await Promise.all([Ka(s.mask),Ka(s.color)]);if([r,a].some(l=>l.width>4096||l.height>4096))continue;let o=l=>{let c=document.createElement("canvas");return c.width=l.width,c.height=l.height,c.getContext("2d").drawImage(l,0,0),c};Gi.set(i,{name:String(s.name||"Logo").slice(0,200),mask:o(r),color:o(a)})}Jt.front=[],Jt.back=[],_r(t.type),Ya(t.size);let e=t.bagView==="flat"||t.bagView==null&&t.type==="tshirt"&&t.vestView==="flat"?"flat":"open";Object.assign(Z,{bag:t.bag,handle:t.handle==="match"||/^#[\da-f]{6}$/i.test(t.handle)?t.handle:"match",strap:t.strap==="webbing"?"webbing":"fabric",pose:t.pose==="relaxed"?"relaxed":"upright",bagView:e}),Number.isFinite(t.drop)&&(Z.drop=Math.max(6,Math.min(35,t.drop)));for(let i of["front","back"])Jt[i]=n.design[i].filter(s=>["text","logo","graphic","qr"].includes(s.kind)&&[s.x,s.y,s.w].every(Number.isFinite)&&/^#[\da-f]{6}$/i.test(s.ink)&&(s.kind!=="logo"||Gi.has(s.asset))&&(s.kind!=="graphic"||Object.hasOwn(pi,s.graphic))).map(s=>{let r={...s,id:Zn++,text:String(s.text||"").slice(0,2e3),data:String(s.data||"").slice(0,2e3)};return $e(r),r});Xt=n.side==="back"?"back":"front",mn=null,Ed(),so(),ch(),Cd(),Ns(),document.querySelectorAll("#poseSeg button").forEach(i=>i.classList.toggle("on",i.dataset.v===Z.pose)),Xi(),Yi(),xi(),ke(),Se(),Hs(),Qe(Xt==="back"?"back":"34",!1)}catch{}}var fx=setInterval(async()=>{window.__ready&&(clearInterval(fx),await dx(),lo=!0,document.documentElement.dataset.studioSource="ariongj-mo-b23cd8f",mr("kobags:studio-ready"))},50);if(!Mr){let h=function(){for(let Y of c){let pt=Y.dataset.v===(Z.bagView==="flat"?"flat":"open");Y.classList.toggle("on",pt),Y.setAttribute("aria-pressed",String(pt))}},U=function(Y,pt=!1){R.matches&&(y.hidden=!Y,g.setAttribute("aria-expanded",String(Y)),pt&&g.focus({preventScroll:!0}))},G=function(){F.open||(L=document.activeElement,U(!1),document.documentElement.dataset.canvasFocus="true",Et.append(s),Dt.append(d,v,N),v.prepend(_),I.append(...M),et.append(k),F.showModal(),ke(),pe.focus({preventScroll:!0}))},O=function(){if(F.open){X();return}let Y=document.activeElement,pt=w.contains(Y)||y.contains(Y)||d.contains(Y)||_.contains(Y)||M.includes(Y);R.matches?(E.prepend(d),E.after(y),v.prepend(_),I.append(...M),U(!1)):(document.querySelector(".editor").before(y,d),$c.append(_),x.append(...M),y.hidden=!1),X(),pt&&(Y.isConnected&&Y.getClientRects().length&&!Y.matches(":disabled")?Y:document.querySelector("#tabs button.on"))?.focus({preventScroll:!0})},X=function(){let Y=document.querySelector("#tabs button.on")?.dataset.tab||"samples";document.documentElement.dataset.studioTab=Y,w.hidden=!R.matches||Y!=="design";let pt=Pe();T.disabled=!pt;for(let mt of[..._.querySelectorAll("button"),...M])mt.disabled=!pt;N.textContent=pt?`${pn(pt.w)} cm wide`:"Select artwork to move or resize",!w.hidden&&pt&&(a[Xt]=pt.id)},D=function(){let Y=Jt[Xt],pt=String(mn??""),mt=document.activeElement===A;A.replaceChildren(new Option(Y.length?"Choose an item\u2026":"Add a logo, text or QR code",""));for(let[S,W]of Y.entries()){let it=W.kind==="text"?W.text:W.kind==="logo"?Gi.get(W.asset)?.name||"Logo":W.kind==="qr"?"QR code":"Artwork";A.add(new Option(`${S+1}. ${String(it).replace(/\s+/g," ").slice(0,48)}`,String(W.id)))}A.value=pt,A.disabled=!Y.length,mt&&A.focus();for(let S of["front","back"]){let W=r[S];W.textContent=`${S==="front"?"Front":"Back"} \xB7 ${Jt[S].length}`,W.classList.toggle("on",S===Xt),W.setAttribute("aria-pressed",String(S===Xt))}u.textContent=Xt==="front"?"Front artwork":"Back artwork",ki.textContent=Xt==="front"?"Copy to back":"Copy to front",A.setAttribute("aria-label",`Select ${Xt} artwork`);let P=document.getElementById("designNote");P.textContent=Y.length?"Select an item above, drag it on the canvas, or use the move and size controls.":"This side is blank. Add your logo, a message or a QR code.",document.documentElement.dataset.editingSide=Xt,Pe()&&(a[Xt]=mn),h(),X()},n=(Y,pt,mt)=>{let P=document.createElement(Y);return pt&&(P.className=pt),mt&&(P.textContent=mt),P},t=(Y,pt,mt="")=>{let P=n("button",mt,Y);return P.type="button",P.addEventListener("click",pt),P},e=document.querySelector("#panel .head h1");e.textContent="Make it yours.";let i={samples:"Products",bag:"Bag & size",design:"Your design"};for(let Y of document.querySelectorAll("#tabs button"))Y.textContent=i[Y.dataset.tab],Y.id="studio-tab-"+Y.dataset.tab,Y.setAttribute("aria-controls","studio-pane-"+Y.dataset.tab);for(let Y of document.querySelectorAll("[data-pane]"))Y.id="studio-pane-"+Y.dataset.pane,Y.setAttribute("aria-labelledby","studio-tab-"+Y.dataset.pane);document.querySelector("[data-pane=samples] .lead").textContent="Choose a starting design, then make either side your own.";let s=n("div","studio-side-tools");s.setAttribute("role","group"),s.setAttribute("aria-label","Design either side of your bag");let r={},a={front:null,back:null},o=Y=>{Pe()&&(a[Xt]=mn),Xt=Y,mn=Jt[Xt].find(pt=>pt.id===a[Xt])?.id??Jt[Xt][0]?.id??null,Ns(),Se(),Ls("design"),Qe(Y),ke(),to()};for(let Y of["front","back"]){let pt=t(Y==="front"?"Front":"Back",()=>o(Y),"studio-side-button");pt.id="edit-"+Y,pt.setAttribute("aria-label","Design the "+Y),r[Y]=pt,s.append(pt)}document.getElementById("stage").append(s);let l=n("div","studio-bag-view");l.id="bag-view",l.setAttribute("role","group"),l.setAttribute("aria-label","Bag presentation"),l.append(n("span","","Bag view"));let c=[];for(let[Y,pt]of[["open","Opened"],["flat","Folded"]]){let mt=t(pt,()=>{Z.bagView!==Y&&(Z.bagView=Y,Yi(),h(),to())});mt.dataset.v=Y,mt.id="bag-view-"+Y,mt.setAttribute("aria-label",Y==="open"?"Show bag opened":"Show bag folded flat"),c.push(mt),l.append(mt)}document.getElementById("tabs").before(l),l.addEventListener("keydown",Y=>{let pt=c.indexOf(document.activeElement);if(pt<0)return;let mt;if(Y.key==="ArrowRight"||Y.key==="ArrowLeft")mt=1-pt;else if(Y.key==="Home")mt=0;else if(Y.key==="End")mt=1;else return;Y.preventDefault(),c[mt].focus(),c[mt].click()});let u=n("strong","studio-edit-title","Front artwork");document.getElementById("sideSeg").prepend(u);let f=n("p","note studio-edit-help","Tap an item to select it. Drag to move, or use the controls below.");document.querySelector(".editor").before(f);let d=n("label","studio-artwork-picker");d.htmlFor="artwork-picker",d.append(n("span","","Select artwork"));let A=n("select");A.id="artwork-picker",d.append(A),document.querySelector(".editor").after(d),A.addEventListener("change",()=>$a(A.value?Number(A.value):null));let y=document.getElementById("addText").parentElement;y.classList.add("studio-add-tools"),document.querySelector(".editor").before(y,d);let p=y.querySelector(".file");p.tabIndex=0,p.setAttribute("role","button"),p.setAttribute("aria-label","Add a logo"),p.addEventListener("keydown",Y=>{(Y.key==="Enter"||Y.key===" ")&&(Y.preventDefault(),document.getElementById("addLogo").click())}),document.getElementById("addText").textContent="+ Text",document.getElementById("addQr").textContent="+ QR code";for(let[Y,pt]of[["addText",zi],["addQr",Hi]])document.getElementById(Y).addEventListener("click",()=>{pt.focus({preventScroll:!0}),pt.scrollIntoView({block:"nearest",behavior:"auto"})});let m=t("Duplicate",()=>{let Y=Pe();Y&&ro({...Y,id:Zn++,x:Y.x+.8,y:Y.y+.8})},"ghost");m.id="duplicate-artwork",document.querySelector(".propsHead").insertBefore(m,document.getElementById("delItem"));let _=n("div","studio-move");_.setAttribute("role","group"),_.setAttribute("aria-label","Move selected artwork");for(let[Y,pt,mt,P]of[["Move left","\u2190",-.5,0],["Move up","\u2191",0,-.5],["Move down","\u2193",0,.5],["Move right","\u2192",.5,0]]){let S=t(pt,()=>{let W=Pe();W&&(W.x+=mt,W.y+=P,$e(W),Se(),Ie())});S.setAttribute("aria-label",Y),_.append(S)}$c.append(_);let x=Vi.parentElement;x.classList.add("studio-size-row");let M=[];for(let[Y,pt,mt]of[["Make artwork smaller","\u2212",-.5],["Make artwork larger","+",.5]]){let P=t(pt,()=>{let S=Pe();S&&(S.w+=mt,$e(S),Se(),Ie())});P.setAttribute("aria-label",Y),x.append(P),M.push(P)}let R=matchMedia("(max-width:760px)"),b=document.getElementById("panes"),w=n("div","studio-mobile-tools");w.id="studio-mobile-tools",w.hidden=!0,w.setAttribute("role","region"),w.setAttribute("aria-label","Artwork controls"),b.before(w);let E=n("div","studio-mobile-selection"),T=t("Edit",()=>{let Y=Pe();if(!Y)return;let pt=Y.kind==="text"?zi:Y.kind==="qr"?Hi:Y.kind==="logo"?Za.querySelector("button"):Vi;pt.focus({preventScroll:!0}),pt.scrollIntoView({block:"nearest",behavior:"auto"})});T.id="studio-edit-artwork",T.setAttribute("aria-label","Edit selected artwork");let g=t("+ Add",()=>U(y.hidden));g.id="studio-add-toggle",g.setAttribute("aria-label","Add logo, text or QR code"),g.setAttribute("aria-controls","studio-add-artwork"),g.setAttribute("aria-expanded","false"),y.id="studio-add-artwork",y.setAttribute("role","group"),y.setAttribute("aria-label","Add artwork");let v=n("div","studio-quick-adjust"),I=n("div","studio-quick-size");I.setAttribute("role","group"),I.setAttribute("aria-label","Resize selected artwork");let N=n("output","studio-quick-width");N.id="studio-quick-width",N.setAttribute("aria-label","Selected artwork width"),E.append(T,g),v.append(I),w.append(E,v,N);for(let Y of["addText","addQr"])document.getElementById(Y).addEventListener("click",()=>U(!1));document.getElementById("addLogo").addEventListener("change",()=>U(!1,!0)),w.addEventListener("keydown",Y=>{Y.key==="Escape"&&!y.hidden&&(Y.preventDefault(),U(!1,!0))});let k=document.querySelector(".editor"),z=n("div","studio-canvas-heading"),K=t("Expand canvas",G);K.id="expand-artwork-canvas",K.setAttribute("aria-haspopup","dialog"),K.setAttribute("aria-controls","artwork-canvas-dialog"),z.append(f,K),k.before(z);let F=n("dialog","studio-canvas-dialog");F.id="artwork-canvas-dialog",F.setAttribute("aria-labelledby","artwork-canvas-title");let tt=n("div","studio-canvas-header"),at=n("h2","","Place your artwork");at.id="artwork-canvas-title";let ct=t("Done",()=>F.close());ct.id="close-artwork-canvas",tt.append(at,ct);let Et=n("div","studio-canvas-sides"),Dt=n("div","studio-canvas-tools"),et=n("div","studio-canvas-body");F.append(tt,Et,Dt,et),document.body.append(F);let L=null;F.addEventListener("close",()=>{delete document.documentElement.dataset.canvasFocus,document.getElementById("stage").append(s),z.after(k),w.append(v,N),O(),ke(),(L?.isConnected&&L.getClientRects().length?L:K).focus({preventScroll:!0})}),R.addEventListener("change",O);let j=Ls;Ls=function(Y){j(Y),U(!1),X()};let nt=n("div","studio-copy-confirm");nt.hidden=!0,nt.setAttribute("role","group"),nt.setAttribute("aria-label","Replace other side artwork"),nt.append(n("span","","Replace the artwork on the other side?"));let ft=ki.onclick,lt=t("Replace artwork",()=>{ft(),nt.hidden=!0,D(),ki.focus()});lt.id="confirm-copy",nt.append(lt,t("Cancel",()=>{nt.hidden=!0,ki.focus()})),document.getElementById("sideSeg").after(nt),ki.onclick=()=>{Jt[Xt==="front"?"back":"front"].length?(nt.hidden=!1,lt.focus()):(ft(),D())};let Gt=Se;Se=function(){Gt(),D()};let ut=Ie;Ie=function(){ut(),D()};let Ut=Ns;Ns=function(){Ut(),nt.hidden=!0,D()},document.getElementById("tabs").addEventListener("keydown",Y=>{let pt=[...document.querySelectorAll("#tabs button")],mt=pt.indexOf(document.activeElement);if(mt<0)return;let P;if(Y.key==="ArrowRight")P=(mt+1)%pt.length;else if(Y.key==="ArrowLeft")P=(mt+pt.length-1)%pt.length;else if(Y.key==="Home")P=0;else if(Y.key==="End")P=pt.length-1;else return;Y.preventDefault(),pt[P].focus(),Ls(pt[P].dataset.tab)}),O(),D()}(()=>{if(document.documentElement.dataset.embed==="preview")return;let n="/assets/client-2026-09/",t={box:[{src:n+"box-bag.jpg",label:"Natural Box bag",detail:"Loop handles, welded attachments and a folded side gusset."},{src:n+"detail-box.jpg",label:"Red Box bag",detail:"Fabric texture, the top hem and the finished base."}],handle:[{src:n+"handle-bag.jpg",label:"Olive Handle bag",detail:"Soft loop handles and their attachment to the top hem."},{src:n+"detail-handle.jpg",label:"Black Handle bag",detail:"Front panel, handle shape and the non-woven finish."}],dcut:[{src:n+"d-cut-bag.jpg",label:"Black D-cut bag",detail:"The integrated grip, fabric texture and finished edges."}],tshirt:[{src:n+"t-shirt-bag.jpg",label:"T-shirt bag",detail:"The centre tab, integrated handles and side folds."},{src:"/assets/client-2026-10/thank-you-stock-640.webp",label:"Thank you collection",detail:"Finished T-shirt bags photographed on the production floor."}],string:[{src:n+"string-bag.jpg",label:"String bag, upright",detail:"The gathered opening, cord and natural fabric folds."},{src:n+"detail-string.jpg",label:"String bag, laid down",detail:"The cord channel and the way the material rests."}],bottle:[]},e=document.createElement("details");e.id="product-references",e.className="reference-gallery";let i=document.createElement("summary"),s=document.createElement("span");s.textContent="Real bag references";let r=document.createElement("span");r.className="reference-gallery-count",i.append(s,r);let a=document.createElement("div");a.className="reference-gallery-grid",e.append(i,a),document.getElementById("tabs").after(e);let o=document.createElement("dialog");o.id="reference-photo-dialog",o.className="reference-photo-dialog",o.setAttribute("aria-labelledby","reference-photo-title"),o.setAttribute("aria-describedby","reference-photo-description");let l=document.createElement("header");l.className="reference-photo-head";let c=document.createElement("h2");c.id="reference-photo-title";let h=document.createElement("button");h.type="button",h.textContent="Close",h.setAttribute("aria-label","Close product reference"),l.append(c,h);let u=document.createElement("img");u.className="reference-photo-image",u.decoding="async",u.width=1280,u.height=1600;let f=document.createElement("p");f.id="reference-photo-description";let d=document.createElement("div");d.className="reference-photo-controls";let A=document.createElement("button");A.type="button",A.textContent="Previous";let y=document.createElement("button");y.type="button",y.textContent="Next";let p=document.createElement("span");p.setAttribute("aria-live","polite"),p.setAttribute("aria-atomic","true"),d.append(A,p,y),o.append(l,u,f,d),document.body.appendChild(o);let m="",_=[],x=0,M=null;function R(E){if(!_.length)return;x=(E+_.length)%_.length;let T=_[x];u.src=T.src,u.alt=`Real Kobags ${T.label.toLowerCase()}`,c.textContent=T.label,f.textContent=T.detail,p.textContent=`${x+1} of ${_.length}`,A.disabled=y.disabled=_.length<2}h.addEventListener("click",()=>o.close()),o.addEventListener("click",E=>{if(E.target!==o)return;let T=o.getBoundingClientRect();(E.clientX<T.left||E.clientX>T.right||E.clientY<T.top||E.clientY>T.bottom)&&o.close()}),o.addEventListener("close",()=>{u.removeAttribute("src"),(M?.isConnected?M:i).focus({preventScroll:!0})}),o.addEventListener("keydown",E=>{(E.key==="ArrowLeft"||E.key==="ArrowRight")&&(E.preventDefault(),R(x+(E.key==="ArrowLeft"?-1:1)))}),A.addEventListener("click",()=>R(x-1)),y.addEventListener("click",()=>R(x+1));function b(){a.replaceChildren(),e.open&&_.forEach((E,T)=>{let g=document.createElement("button");g.type="button",g.className="reference-gallery-card",g.setAttribute("aria-label",`View ${E.label.toLowerCase()} production photograph`),g.setAttribute("aria-haspopup","dialog");let v=document.createElement("img");v.src=E.src,v.alt="",v.width=120,v.height=90,v.loading="lazy",v.decoding="async";let I=document.createElement("span");I.textContent=E.label,g.append(v,I),g.addEventListener("click",()=>{M=g,R(T),o.showModal(),h.focus()}),a.appendChild(g)})}function w(){m!==Z.type&&(m=Z.type,_=t[m]||[],e.hidden=!_.length,e.dataset.product=m,r.textContent=`${_.length} ${_.length===1?"photo":"photos"}`,o.open&&o.close(),b())}e.addEventListener("toggle",b),new MutationObserver(w).observe(document.getElementById("typeSub"),{childList:!0,characterData:!0,subtree:!0}),window.updateReferenceGallery=w,w()})();if(!Mr){let n=document.createElement("select");n.id="mobile-camera-view",n.setAttribute("aria-label","Camera view");let t=new Option("Free view","");t.disabled=!0,n.add(t);for(let[s,r]of[["34","3/4 view"],["front","Front"],["back","Back"],["side","Side"],["top","Inside"]])n.add(new Option(r,s));n.addEventListener("change",()=>Qe(n.value)),document.getElementById("stage").append(n),n.value=document.querySelector("#views button.on")?.dataset.view||"34";let e=Qe;Qe=function(s,r=!0){e(s,r),n.value=s},window.__api.setView=Qe,Je.addEventListener("start",()=>{n.value=""});let i;new ResizeObserver(()=>{cancelAnimationFrame(i),i=requestAnimationFrame(()=>ke())}).observe(document.getElementById("panes"))}
