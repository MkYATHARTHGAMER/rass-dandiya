export class AppError extends Error { constructor(message:string,public status=400){super(message)} }
export async function admit(db:D1Database,token:string,gate:string|null,staff:string|null){
 const event=await db.prepare('SELECT gate_key, gate_open FROM event WHERE id=1').first<{gate_key:string,gate_open:number}>();
 if(!event?.gate_open)throw new AppError('Entry is closed. Please ask the gate team.',409);
 if(!staff && (!gate || gate!==event.gate_key))throw new AppError('This is not the current gate QR. Please scan the poster at the entrance.',403);
 const at=new Date().toISOString();const receipt=crypto.randomUUID().slice(0,8).toUpperCase();
 const result=await db.prepare("UPDATE tickets SET entered_at=?,receipt=?,checked_by=? WHERE token=? AND entered_at IS NULL AND cancelled=0 RETURNING token,name,entered_at,receipt").bind(at,receipt,staff||'Guest scan',token).first();
 if(result)return result;
 const ticket=await db.prepare('SELECT cancelled,entered_at FROM tickets WHERE token=?').bind(token).first<{cancelled:number,entered_at:string|null}>();
 if(!ticket)throw new AppError('Ticket not found.',404);
 if(ticket.cancelled)throw new AppError('This ticket has been cancelled. Please ask the gate team.',409);
 throw new AppError('This ticket has already been used. Please ask the gate team to check the entry record.',409);
}
