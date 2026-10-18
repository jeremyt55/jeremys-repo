export const BOSS={x:43,y:2.8,z:36.5};
export const CORES=[{x:35.5,y:2.2,z:37},{x:50.5,y:2.2,z:37},{x:43,y:7,z:29.5}];
export function bossState(s,time){
 if(s.zurgHP<=0)return{stage:'defeated',shield:false,message:'Zurg is powered down. Return to Woody.'};
 if(!s.relay)return{stage:'locked',shield:true,message:s.batteries.length<3?'Recover three power cells to reverse the shield.':'Install the power cells at the castle relay.'};
 if(s.cores.length<3)return{stage:'overload',shield:true,message:`Shoot the three glowing shield anchors · ${s.cores.length}/3 disabled`};
 const t=time%8,shield=t<5;
 return{stage:s.zurgHP<=4?'final':'duel',shield,remaining:shield?5-t:8-t,message:shield?'Shield rebuilding. Dodge the cannon and wait for the opening.':'SHIELD DOWN — aim at Zurg’s chest!'};
}
export function activateRelay(s){if(s.batteries.length<3)return false;s.relay=true;return true}
export function damageCore(s,index){if(!s.relay||s.cores.includes(index)||index<0||index>2)return false;s.cores.push(index);return true}
export function damageBoss(s,time){if(bossState(s,time).shield||s.zurgHP<=0)return false;s.zurgHP=Math.max(0,s.zurgHP-1);return true}
export function rayDistance(origin,direction,target){const x=target.x-origin.x,y=target.y-origin.y,z=target.z-origin.z,t=x*direction.x+y*direction.y+z*direction.z;return t>0?Math.hypot(x-direction.x*t,y-direction.y*t,z-direction.z*t):Infinity}
