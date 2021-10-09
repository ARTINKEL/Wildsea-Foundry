export default class wildseaActorSheet extends ActorSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            template: 'systems/wildsea/templates/sheets/wildsailor-sheet.hbs',
            classes: ["wildsea", "sheet", "wildsailor"]
        });
    }

    getData() {
        const baseData = super.getData();
        let sheetData = {
            owner: this.actor.isOwner,
            editable: this.isEditable,
            actor: baseData.actor,
            data: baseData.actor.data.data,
            config: CONFIG.wildsea
        }
        
        return sheetData;
    }
}