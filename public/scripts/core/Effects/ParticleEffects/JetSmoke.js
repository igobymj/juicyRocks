import VectorParticle from "./VectorParticle.js";

export default class JetSmoke extends VectorParticle {

    constructor(duration, size, particleVertices, position, rotation, startVelocity, color){
        var expPosition = position;
        var expRotation = rotation;

        if (size === null) {
            size = 1;
        }
        if (particleVertices === null) {

            // default tiangle particle
            particleVertices = [
                { x: -size, y: 0 },
                // this number is sqrt(3)
                { x: 0, y: 1.73205080757 * size },
                { x: size, y: 0 },
            ];
        }

        var strokeWeight = 0.01;

        super(duration, size, particleVertices, expPosition, expRotation, startVelocity, strokeWeight,true);
        this.__fillColor = color;
    }

    update() {
        super.update();
        this.__alpha -= 10 * this.__timeManager.timeScale;
    }

}