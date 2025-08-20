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

export type {
    CoverLetter,
    Dict
}
export {
    Stages,
    Statuses,
    StatusColor,
    StatusTextColor
}

