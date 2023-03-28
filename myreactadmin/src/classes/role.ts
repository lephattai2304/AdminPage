import { Permission } from "./permission";

export class Role{
    id: number;
    name : string;
    permission : Permission[];

    constructor(id:number = 0, name: string = '', permission =[]){
        this.id = id;
        this.name = name;
        this.permission = permission;

    }

}