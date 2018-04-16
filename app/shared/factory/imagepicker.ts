import { AbstractElement } from "./element";

export class ImagePicker implements AbstractElement {
    public id: number;
    public value: string;
    public label: string;
    public helper: string;
    public type: string;
    public hasEvent: boolean;
    public shouldSubmit: boolean;

    render = () => {
       return ``+
       `<Label text="test"></Label>`+
        `<Image width="100" height="100" src="res://logo" 
        id="`+this.id+`" class="img_gallery"></Image>`+
        `<Button text="Foto maken/selecteren" class="camera-button" (tap)="onTap()"></Button>`;
    }

    constructor(...options){
        console.log('ImagePicker Element');
        options = options[0];
        this.id = options['Id'];
        this.value = options['Value'];
        this.label = options['Label'];
        this.helper = options['Helper'];
        this.hasEvent=true;
        this.shouldSubmit=true;
    }
}