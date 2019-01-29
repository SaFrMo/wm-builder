import { createGuid } from './utils'

export default class Goal {
    guid: string
    name: string
    text: string
    conditions: Array<Condition>
    importance: string

    static get LOW(){ return 'secondary' }
    static get HIGH(){return 'primary'}

    constructor(opts){
        this.guid = opts.guid || createGuid()
        this.name = opts.name || ''
        this.text = opts.text || ''
        this.conditions = opts.conditions || []
        this.importance = opts.importance || Goal.HIGH
    }
}
