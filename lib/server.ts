import {env} from 'cloudflare:workers';
import {getChatGPTUser} from '@/app/chatgpt-auth';
import {AppError} from './ticket-service';
export function db(){if(!env.DB)throw new AppError('Ticket records are temporarily unavailable. Please try again.',503);return env.DB}
export const defaults={name:'Dandiya Night',date:'',venue:'',price:0,gate_open:0};
export async function manager(){const u=await getChatGPTUser();if(!u)throw new AppError('Please sign in to manage tickets.',401);const owner=String((env as unknown as {OWNER_EMAIL?:string}).OWNER_EMAIL||'').toLowerCase();const isOwner=!!owner&&u.email.toLowerCase()===owner;const member=isOwner||await db().prepare('SELECT email FROM members WHERE email=?').bind(u.email.toLowerCase()).first();if(!member)throw new AppError('This account is not on the management team. Ask the owner to add your email.',403);return {...u,isOwner}}
export function json(data:unknown,status=200){return Response.json(data,{status,headers:{'Cache-Control':'no-store','Referrer-Policy':'no-referrer'}})}
export function failure(e:unknown){if(e instanceof AppError)return json({error:e.message},e.status);console.error('Ticket operation failed',e);return json({error:'We could not reach the ticket records. Your entry has not been confirmed. Please try again or ask the gate team.'},503)}
export async function body(req:Request){const origin=req.headers.get('origin');if(origin&&origin!==new URL(req.url).origin)throw new AppError('Request not allowed.',403);if(!req.headers.get('content-type')?.includes('application/json'))throw new AppError('JSON required.',415);const text=await req.text();if(text.length>12000)throw new AppError('Request too large.',413);try{return JSON.parse(text)}catch{throw new AppError('Invalid request.')}}
export function str(value:unknown,min:number,max:number){if(typeof value!=='string'||value.trim().length<min||value.trim().length>max)throw new AppError('Please check the form fields.');return value.trim()}
