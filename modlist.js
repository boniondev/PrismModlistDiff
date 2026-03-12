import { Mod } from 'mod.js'
export class Modlist {

    constructor(modliststring) {

        let modliststring  = ""
        this.modlistarray = []
        modstringlines     = modliststring.split('\n')
        modstringlines.forEach(modliststring => {
            this.modlistarray.push(new Mod(modliststring))
        });

    }

}