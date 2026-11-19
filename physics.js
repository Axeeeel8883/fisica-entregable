/* SI interno: cargas en C, distancias en m, masa en kg. */
const Physics = (() => {
 const K=8.9875517923e9, EPS=8.8541878128e-12;
 function sample(charges,p){let v=0,e=[0,0,0];for(const c of charges){const d=p.map((x,i)=>x-c.p[i]),r=Math.hypot(...d);if(r<1e-9)return {v:NaN,e:[NaN,NaN,NaN]};v+=K*c.q/r;d.forEach((x,i)=>e[i]+=K*c.q*x/r**3);}return {v,e};}
 function capacitor(a,d,er,v){const c=EPS*er*a/d;return {c,q:c*v,e:v/d,u:.5*c*v*v};}
 function step(charges,s,q,m,dt){const f=t=>{const e=sample(charges,[t[0],t[1],0]).e;return [t[2],t[3],q*e[0]/m,q*e[1]/m]};const add=(a,b,k)=>a.map((x,i)=>x+k*b[i]);const a=f(s),b=f(add(s,a,dt/2)),c=f(add(s,b,dt/2)),d=f(add(s,c,dt));return s.map((x,i)=>x+dt*(a[i]+2*b[i]+2*c[i]+d[i])/6);}
 return {K,EPS,sample,capacitor,step};
})();
if(typeof module!=='undefined')module.exports=Physics;
