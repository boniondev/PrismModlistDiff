import { Mod } from 'mod.js'
export class Modlist {

    constructor(modListString) {

        let modListString = ""
        this.modListArray = []
        modStringLines    = modListString.split('\n')
        modStringLines.forEach(modListString => {
            this.modListArray.push(new Mod(modListString))
        });

    }

}