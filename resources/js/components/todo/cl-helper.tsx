/**
 * Cover Letter helpers
 */

interface CoverLetter {
    id: number,
    hide: boolean,
    url: string,
    chat: string,
    company: string,
    contact_name: string,
    stage: string,
    status: string,
    title: string,
    info: string,
    content: string,
}
interface Dict { [key:string]: string|number|any }
let Stages: string[] = ['tpl', 'open', 'closed', 'reject']
let Statuses: string[] = ['tpl', 'sent', '1 hr', '2 tech', '3 cheef', 'offer', 'reject']
let stages: string[] = ['tpl', 'open', 'closed', 'reject']

let StatusColor: {[key:string]:string} = {
    'tpl': 'slate',
    'open': 'emerald', 'closed': 'fuchsia',
    'sent': 'emerald', '1 hr': 'fuchsia', '2 tech': 'sky', '3 cheef': 'lime',
    'offer': 'pink', 'reject': 'zinc'}
let StatusTextColor: {[key:string]:string} = {'slate': 'gray', 'emerald': 'gray', 'fuchsia': 'gray',
    'sky': 'gray', 'lime': 'gray', 'pink': 'gray', 'zinc': 'gray'}



function getNextStatus(status: any, list: null|string[] = Statuses) {
    if(!list) list = Statuses
    let pos = list.indexOf(status)
    if(pos == -1) return list[0]
    pos += 1
    if(pos >= list.length) pos = 0
    return list[pos]
}
function getColorStatus(status:string) {
    if(!(status in StatusColor)) status = 'tpl'
    return StatusColor[status]
}
function getColorText(color:string) {
    if(!(color in StatusTextColor)) color = 'tpl'
    return StatusTextColor[color]
}

export type {
    CoverLetter,
    Dict
}
export {
    Stages,
    Statuses,
    StatusColor,
    StatusTextColor,
    getNextStatus,
    getColorStatus,
    getColorText,
}

