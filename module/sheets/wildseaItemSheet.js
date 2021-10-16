export default class wildseaItemSheet extends ItemSheet {
    get template() {
        return 'systems/wildsea/templates/sheets/item-sheet.html';
    }

    getData() {
        const baseData = super.getData();
        let sheetData = {
            owner: this.item.isOwner,
            editable: this.isEditable,
            item: baseData.item,
            data: baseData.item.data.data,
            config: CONFIG.wildsea
        };
        
        return sheetData;
    }
}