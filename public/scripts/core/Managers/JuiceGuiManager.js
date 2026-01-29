export default class JuiceGuiManager {
    constructor(gameSession) {
        if (JuiceGuiManager.__instance) {
            return JuiceGuiManager.__instance;
        }
        JuiceGuiManager.__instance = this;
        this.gameSession = gameSession;

        // This schema maps the UI structure to the JuiceSettings data paths
        this.schema = [
            {
                label: "Cheats",
                type: "group",
                children: [
                    {
                        label: "Invincibility",
                        path: "container.cheats.ship.invincibility",
                        type: "checkbox"
                    }
                ]
            },
            {
                label: "Bullet Hit Juice",
                type: "collapse",
                id: "bulletHitEffects",
                children: [
                    {
                        label: "Particles",
                        type: "collapse",
                        id: "bulletHitParticles",
                        children: [
                            {
                                label: "Type",
                                path: "particleSystems.bulletHit.vectorParticle.shape",
                                type: "select",
                                options: ["none", "circle", "dot", "triangle", "square", "line"]
                            },
                            {
                                label: "Pattern",
                                path: "particleSystems.bulletHit.vectorParticle.pattern",
                                type: "select",
                                options: ["random", "radial"]
                            },
                            {
                                label: "Count",
                                path: "particleSystems.bulletHit.vectorParticle.count",
                                type: "range",
                                min: 1, max: 100
                            },
                            {
                                label: "Life Span",
                                path: "particleSystems.bulletHit.vectorParticle.particleLife",
                                type: "range",
                                min: 1, max: 10
                            },
                            {
                                label: "Velocity",
                                path: "particleSystems.bulletHit.vectorParticle.initialVelocity",
                                type: "range",
                                min: 1, max: 100
                            },
                            {
                                label: "Randomize Velocity",
                                path: "particleSystems.bulletHit.vectorParticle.initialVelocityRandom",
                                type: "checkbox"
                            },
                            {
                                label: "Inherit Bullet Velocity",
                                path: "particleSystems.bulletHit.vectorParticle.inheritVelocity",
                                type: "checkbox"
                            }
                        ]
                    },
                    {
                        label: "Screen Shake",
                        type: "collapse",
                        id: "bulletHitScreenShake",
                        children: [
                            {
                                label: "Type",
                                path: "container.bulletHit.shake.form",
                                type: "select",
                                options: ["simple", "sine", "noise"]
                            },
                            {
                                label: "X Axis",
                                path: "container.bulletHit.shake.xAxis",
                                type: "checkbox"
                            },
                            {
                                label: "Y Axis",
                                path: "container.bulletHit.shake.yAxis",
                                type: "checkbox"
                            },
                            {
                                label: "Inherit Velocity",
                                path: "container.bulletHit.shake.inheritVelocity",
                                type: "checkbox"
                            },
                            {
                                label: "Frequency",
                                path: "container.bulletHit.shake.frequency",
                                type: "range",
                                min: 1, max: 100
                            },
                            {
                                label: "Amplitude",
                                path: "container.bulletHit.shake.amplitude",
                                type: "range",
                                min: 1, max: 100,
                                step: 0.1
                            },
                            {
                                label: "Duration",
                                path: "container.bulletHit.shake.duration",
                                type: "range",
                                min: 0.1, max: 2.0,
                                step: 0.1
                            },
                            {
                                label: "Fade Out",
                                path: "container.bulletHit.shake.fade",
                                type: "checkbox"
                            }
                        ]
                    },
                    {
                        label: "Hit Pause",
                        type: "collapse",
                        id: "bulletHitPause",
                        children: [
                            {
                                label: "Frames",
                                path: "container.bulletHit.hitPause.frames",
                                type: "range",
                                min: 0, max: 10
                            }
                        ]
                    }
                ]
            }
        ];
    }

    initialize() {
        const parentElement = document.getElementById('juice-menu');
        if (!parentElement) return;

        // Clear existing content (removed the hardcoded form)
        parentElement.innerHTML = '';

        const container = document.createElement('div');
        container.className = 'juice-controller';

        const form = document.createElement('form');
        container.appendChild(form);

        this.buildUI(this.schema, form);
        parentElement.appendChild(container);
    }

    buildUI(schemaItems, parent) {
        schemaItems.forEach(item => {
            if (item.type === 'group') {
                this.createGroup(item, parent);
            } else if (item.type === 'collapse') {
                this.createCollapse(item, parent);
            } else {
                this.createControl(item, parent);
            }
        });
    }

    createGroup(item, parent) {
        const div = document.createElement('div');
        div.className = 'juice-item';

        // Only add label if it exists (some groups might be invisible containers)
        if (item.label) {
            // Check if first child is checkbox to inline it? No, stick to consistent vertically stacked design for now.
            // But for "Cheats -> Invincibility", the HTML had the label and the checkbox in one "juice-item" div.
            // Stick to standard layout: Label (if group label), then children.
        }

        this.buildUI(item.children, div);
        parent.appendChild(div);
    }

    createCollapse(item, parent) {
        // Label/Link to toggle
        const labelDiv = document.createElement('label');
        labelDiv.className = 'form-check-label';

        const link = document.createElement('a');
        link.setAttribute('aria-expanded', 'false');
        link.className = 'collapse-label';
        link.setAttribute('data-bs-toggle', 'collapse');
        link.setAttribute('data-bs-target', `#${item.id}`);
        link.textContent = item.label;
        // Basic styling to look like a link/button
        link.style.cursor = "pointer";

        labelDiv.appendChild(link);
        parent.appendChild(labelDiv);

        // Collapsible Content Div
        const contentDiv = document.createElement('div');
        contentDiv.className = 'juice-effect collapse';
        contentDiv.id = item.id;

        // Add some margin/padding for nested look
        contentDiv.style.paddingLeft = "10px";
        contentDiv.style.marginBottom = "10px";

        this.buildUI(item.children, contentDiv);
        parent.appendChild(contentDiv);
        parent.appendChild(document.createElement('br'));
    }

    createControl(item, parent) {
        const wrapper = document.createElement('div');
        wrapper.className = 'mb-2';

        const id = `control-${item.path.replace(/\./g, '-')}`;
        const currentValue = this.getValue(item.path);

        const label = document.createElement('label');
        label.className = 'form-label';
        label.htmlFor = id;
        label.textContent = item.label;
        if (item.type !== 'checkbox') wrapper.appendChild(label);

        let input;

        if (item.type === 'select') {
            input = document.createElement('select');
            input.className = 'form-select';
            item.options.forEach(opt => {
                const option = document.createElement('option');
                option.value = opt;
                option.textContent = opt;
                if (opt === currentValue) option.selected = true;
                input.appendChild(option);
            });
            input.addEventListener('change', (e) => {
                this.setValue(item.path, e.target.value);
            });
        }
        else if (item.type === 'range') {
            input = document.createElement('input');
            input.type = 'range';
            input.className = 'form-range';
            input.min = item.min;
            input.max = item.max;
            if (item.step) input.step = item.step;
            input.value = currentValue;

            // Optional: value display
            // const valDisplay = document.createElement('span');
            // valDisplay.textContent = ` (${currentValue})`;
            // label.appendChild(valDisplay);

            input.addEventListener('input', (e) => {
                // Determine if value should be number
                let val = parseFloat(e.target.value);
                this.setValue(item.path, val);
                // valDisplay.textContent = ` (${val})`;
            });
        }
        else if (item.type === 'checkbox') {
            // Wrapper for checkbox to align right
            wrapper.className = 'juice-item'; // Re-use the juice-item class for easy styling?
            // Actually, let's match the existing CSS style
            // Label left, input right

            label.className = 'form-check-label';

            input = document.createElement('input');
            input.className = 'form-check-input';
            input.type = 'checkbox';
            input.checked = currentValue;
            input.id = id;

            input.addEventListener('change', (e) => {
                this.setValue(item.path, e.target.checked);
            });

            wrapper.appendChild(label);
            wrapper.appendChild(input);
        }

        input.id = id;
        if (item.type !== 'checkbox') wrapper.appendChild(input);

        parent.appendChild(wrapper);
    }

    getValue(path) {
        const keys = path.split('.');
        let obj = this.gameSession.juiceSettings;
        for (let key of keys) {
            if (obj === undefined) return null;
            obj = obj[key];
        }
        return obj;
    }

    setValue(path, value) {
        const keys = path.split('.');
        let obj = this.gameSession.juiceSettings;
        for (let i = 0; i < keys.length - 1; i++) {
            obj = obj[keys[i]];
        }
        obj[keys[keys.length - 1]] = value;

        // Optional: Trigger any updates if needed, e.g. console log
        // console.log(`Set ${path} to ${value}`);
    }
}
