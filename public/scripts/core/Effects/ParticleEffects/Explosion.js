import VectorParticle from "./VectorParticle.js";

export default class Explosion extends VectorParticle {

    constructor(duration, size, particleVertices, position, rotation, startVelocity, color){
        var expPosition = position;
        var expRotation = rotation;

        if (size === null) {
            size = 1;
        }
        if (particleVertices === null) {

            particleVertices = [
                { x: -size, y: 0 },
                { x: 0, y: 1.4 * size },
                { x: size, y: 0 },
            ];
        }

        var strokeWeight = 0.01;

        super(duration, size, particleVertices, expPosition, expRotation, startVelocity, strokeWeight, true);
        this.__fillColor = color;
    }

    update() {
        super.update();
        this.__alpha -= 10 * this.__timeManager.timeScale;
    }

}