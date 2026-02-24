// separate manager for UI interactions with JuiceSettings, also allows for data driven construction of the UI
// updated by MJ 1/31/26


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
                        label: "Juice FX",
                        path: "container.cheats.juiceFx",
                        type: "checkbox"
                    },
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
                                label: "Active",
                                path: "container.bulletHit.particles.active",
                                type: "checkbox"
                            },
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
                                label: "Active",
                                path: "container.bulletHit.shake.active",
                                type: "checkbox"
                            },
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
                                type: "checkbox",
                                excludes: [
                                    "container.bulletHit.shake.xAxis",
                                    "container.bulletHit.shake.yAxis"
                                ]
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
                                min: 0, max: 1,
                                step: 0.01
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
                                label: "Active",
                                path: "container.bulletHit.hitPause.active",
                                type: "checkbox"
                            },
                            {
                                label: "Frames",
                                path: "container.bulletHit.hitPause.frames",
                                type: "range",
                                min: 0, max: 10
                            }
                        ]
                    },
                    {
                        label: "Time Slow",
                        type: "collapse",
                        id: "bulletHitTimeSlow",
                        children: [
                            {
                                label: "Active",
                                path: "container.bulletHit.timeSlow.active",
                                type: "checkbox"
                            },
                            {
                                label: "Intensity",
                                path: "container.bulletHit.timeSlow.scale",
                                type: "range",
                                min: 0.05, max: 1.0,
                                step: 0.05,
                                invert: true
                            },
                            {
                                label: "Duration",
                                path: "container.bulletHit.timeSlow.duration",
                                type: "range",
                                min: 0.05, max: 2.0,
                                step: 0.05
                            }
                        ]
                    }
                ]
            },
            {
                label: "Asteroid Hit Juice",
                type: "collapse",
                id: "asteroidHitEffects",
                children: [
                    {
                        label: "Deconstruct",
                        type: "collapse",
                        id: "asteroidHitDeconstruct",
                        children: [
                            {
                                label: "Active",
                                path: "container.asteroidHit.deconstruct.active",
                                type: "checkbox"
                            },
                            {
                                label: "Speed",
                                path: "container.asteroidHit.deconstruct.speed",
                                type: "range",
                                min: 5, max: 200
                            },
                            {
                                label: "Rotation",
                                path: "container.asteroidHit.deconstruct.rotationSpeed",
                                type: "range",
                                min: 0, max: 20,
                                step: 0.5
                            },
                            {
                                label: "Duration",
                                path: "container.asteroidHit.deconstruct.duration",
                                type: "range",
                                min: 0.1, max: 5.0,
                                step: 0.1
                            },
                            {
                                label: "Fade",
                                path: "container.asteroidHit.deconstruct.fade",
                                type: "checkbox"
                            },
                            {
                                label: "Drag",
                                path: "container.asteroidHit.deconstruct.drag",
                                type: "range",
                                min: 0.9, max: 1.0,
                                step: 0.01
                            }
                        ]
                    }
                ]
            },
            {
                label: "Destroy Ship Juice",
                type: "collapse",
                id: "destroyShipEffects",
                children: [
                    {
                        label: "Deconstruct",
                        type: "collapse",
                        id: "destroyShipDeconstruct",
                        children: [
                            {
                                label: "Active",
                                path: "container.destroyShip.deconstruct.active",
                                type: "checkbox"
                            },
                            {
                                label: "Speed",
                                path: "container.destroyShip.deconstruct.speed",
                                type: "range",
                                min: 5, max: 255
                            },
                            {
                                label: "Rotation",
                                path: "container.destroyShip.deconstruct.rotationSpeed",
                                type: "range",
                                min: 0, max: 20,
                                step: 0.5
                            },
                            {
                                label: "Duration",
                                path: "container.destroyShip.deconstruct.duration",
                                type: "range",
                                min: 0.1, max: 5.0,
                                step: 0.1
                            },
                            {
                                label: "Fade",
                                path: "container.destroyShip.deconstruct.fade",
                                type: "checkbox"
                            },
                            {
                                label: "Drag",
                                path: "container.destroyShip.deconstruct.drag",
                                type: "range",
                                min: 0.9, max: 1.0,
                                step: 0.01
                            }
                        ]
                    },
                    {
                        label: "Time Slow",
                        type: "collapse",
                        id: "destroyShipTimeSlow",
                        children: [
                            {
                                label: "Active",
                                path: "container.destroyShip.timeSlow.active",
                                type: "checkbox"
                            },
                            {
                                label: "Intensity",
                                path: "container.destroyShip.timeSlow.scale",
                                type: "range",
                                min: 0.05, max: 1.0,
                                step: 0.05,
                                invert: true
                            },
                            {
                                label: "Duration",
                                path: "container.destroyShip.timeSlow.duration",
                                type: "range",
                                min: 0.1, max: 5.0,
                                step: 0.1
                            }
                        ]
                    }
                ]
            },
            {
                label: "Score Juice",
                type: "collapse",
                id: "scoreEffects",
                children: [
                    {
                        label: "Font Size",
                        path: "container.cheats.score.fontSize",
                        type: "range",
                        min: 16, max: 512
                    },
                    {
                        label: "Score Pulse",
                        path: "container.cheats.score.pulse",
                        type: "checkbox"
                    },
                    {
                        label: "Pulse Scale",
                        path: "container.cheats.score.pulseScale",
                        type: "range",
                        min: 1.0, max: 2.0,
                        step: 0.05
                    },
                    {
                        label: "Slot Machine",
                        path: "container.cheats.score.slotMachine",
                        type: "checkbox"
                    },
                    {
                        label: "Score Multiplier",
                        path: "container.cheats.score.multiplier",
                        type: "select",
                        options: [1, 2, 3, 5, 8, 13, 21, 34, 55]
                    },
                    {
                        label: "Flying Score",
                        type: "collapse",
                        id: "scoreFloating",
                        children: [
                            {
                                label: "Active",
                                path: "container.scoreIncrement.floatingScore.active",
                                type: "checkbox"
                            },
                            {
                                label: "Duration",
                                path: "container.scoreIncrement.floatingScore.duration",
                                type: "range",
                                min: 0.2, max: 3.0,
                                step: 0.1
                            },
                            {
                                label: "Font Size",
                                path: "container.scoreIncrement.floatingScore.fontSize",
                                type: "range",
                                min: 10, max: 48
                            }
                        ]
                    },
                    {
                        label: "Score Particles",
                        type: "collapse",
                        id: "scoreParticles",
                        children: [
                            {
                                label: "Active",
                                path: "container.scoreArrive.particles.active",
                                type: "checkbox"
                            },
                            {
                                label: "Type",
                                path: "particleSystems.scoreArrive.vectorParticle.shape",
                                type: "select",
                                options: ["none", "circle", "dot", "triangle", "square", "line"]
                            },
                            {
                                label: "Count",
                                path: "particleSystems.scoreArrive.vectorParticle.count",
                                type: "range",
                                min: 1, max: 50
                            },
                            {
                                label: "Velocity",
                                path: "particleSystems.scoreArrive.vectorParticle.initialVelocity",
                                type: "range",
                                min: 1, max: 100
                            },
                            {
                                label: "Duration",
                                path: "particleSystems.scoreArrive.vectorParticle.particleLife",
                                type: "range",
                                min: 4, max: 10
                            },
                            {
                                label: "Gravity",
                                path: "particleSystems.scoreArrive.vectorParticle.gravity",
                                type: "checkbox"
                            }
                        ]
                    }
                ]
            },
            {
                label: "Music",
                type: "collapse",
                id: "musicControls",
                children: [
                    {
                        label: "Heartbeat",
                        path: "container.music.heartbeat",
                        type: "checkbox"
                    },
                    {
                        label: "Volume",
                        path: "container.music.volume",
                        type: "range",
                        min: -40, max: 0, step: 1
                    }
                ]
            }
        ];

        this.sillySchema = [
            {
                label: "Silly Juice",
                type: "collapse",
                id: "sillyEffects",
                children: [
                    {
                        label: "pewpewpew",
                        path: "container.sillySounds.pewpewpew",
                        type: "checkbox"
                    },
                    {
                        label: "Eyeballs",
                        path: "container.eyeBallsOnAsteroids.eyeBalls.active",
                        type: "checkbox"
                    },
                    {
                        label: "Thrust Trail",
                        type: "collapse",
                        id: "thrustTrail",
                        children: [
                            {
                                label: "Active",
                                path: "container.shipThrust.particles.active",
                                type: "checkbox"
                            },
                            {
                                label: "Density",
                                path: "particleSystems.shipThrust.vectorParticle.count",
                                type: "range",
                                min: 1, max: 5
                            },
                            {
                                label: "Color",
                                path: "particleSystems.shipThrust.vectorParticle.hue",
                                type: "range",
                                min: 0, max: 360,
                                gradient: "hue"
                            },
                            {
                                label: "Size",
                                path: "particleSystems.shipThrust.vectorParticle.size",
                                type: "range",
                                min: 1, max: 25
                            },
                            {
                                label: "Duration",
                                path: "particleSystems.shipThrust.vectorParticle.particleLife",
                                type: "range",
                                min: 1, max: 10
                            }
                        ]
                    },
                    {
                        label: "Colors",
                        type: "collapse",
                        id: "sillyColors",
                        children: [
                            {
                                label: "Active",
                                path: "container.sillyColors.active",
                                type: "checkbox"
                            },
                            {
                                label: "Ship",
                                path: "container.sillyColors.shipHue",
                                type: "range",
                                min: 0, max: 360,
                                gradient: "hue"
                            },
                            {
                                label: "Asteroid",
                                path: "container.sillyColors.asteroidHue",
                                type: "range",
                                min: 0, max: 360,
                                gradient: "hue"
                            },
                            {
                                label: "Particle",
                                path: "container.sillyColors.particleHue",
                                type: "range",
                                min: 0, max: 360,
                                gradient: "hue"
                            },
                            {
                                label: "Background",
                                path: "container.sillyColors.backgroundHue",
                                type: "range",
                                min: 0, max: 360,
                                gradient: "hue"
                            }
                        ]
                    }
                ]
            }
        ];
    }

    initialize() {
        this.buildPathLabels();
        this._lastLogPath = null;

        const parentElement = document.getElementById('juice-menu');
        if (!parentElement) return;

        // Clear existing content (removed the hardcoded form)
        parentElement.innerHTML = '';

        // Split schema: groups (Cheats) are pinned at top, rest scrolls
        const pinnedItems = this.schema.filter(item => item.type === 'group');
        const scrollableItems = this.schema.filter(item => item.type !== 'group');

        // Pinned section (Invincibility toggle)
        const pinnedDiv = document.createElement('div');
        pinnedDiv.className = 'juice-pinned';
        const pinnedForm = document.createElement('form');
        pinnedDiv.appendChild(pinnedForm);
        this.buildUI(pinnedItems, pinnedForm);
        parentElement.appendChild(pinnedDiv);

        // Scrollable section (all collapsible effect groups)
        const scrollableDiv = document.createElement('div');
        scrollableDiv.className = 'juice-scrollable';
        const scrollForm = document.createElement('form');
        scrollableDiv.appendChild(scrollForm);
        this.buildUI(scrollableItems, scrollForm);

        // Silly Juice section — shown by default, toggled from About page
        const sillyDiv = document.createElement('div');
        sillyDiv.id = 'silly-juice-section';
        this.buildUI(this.sillySchema, scrollForm);
        // The silly collapse was appended to scrollForm; grab the last child and wrap it
        const sillyNode = scrollForm.lastElementChild;
        sillyDiv.appendChild(sillyNode);
        scrollForm.appendChild(sillyDiv);

        document.addEventListener('silly-mode', (e) => {
            sillyDiv.style.display = e.detail ? '' : 'none';
        });

        parentElement.appendChild(scrollableDiv);
    }

    buildUI(schemaItems, parent, depth = 0) {
        schemaItems.forEach(item => {
            if (item.type === 'group') {
                this.createGroup(item, parent, depth);
            } else if (item.type === 'collapse') {
                this.createCollapse(item, parent, depth);
            } else {
                this.createControl(item, parent);
            }
        });
    }

    createGroup(item, parent, depth) {
        const div = document.createElement('div');
        div.className = 'juice-item';

        this.buildUI(item.children, div, depth);
        parent.appendChild(div);
    }

    createCollapse(item, parent, depth) {
        // Ensure parent has an ID so Bootstrap accordion (data-bs-parent) works
        if (!parent.id) {
            parent.id = `accordion-${JuiceGuiManager.__accordionId++}`;
        }

        // Wrapper holds label + content together; top-level gets accent border
        const wrapper = document.createElement('div');
        if (depth === 0) {
            wrapper.className = 'collapse-section collapse-section-top';
        } else {
            wrapper.className = 'collapse-section';
        }

        // Label/Link to toggle
        const labelDiv = document.createElement('label');
        labelDiv.className = 'form-check-label collapse-toggle';

        const link = document.createElement('a');
        link.setAttribute('aria-expanded', 'false');
        link.className = 'collapse-label';
        link.setAttribute('data-bs-toggle', 'collapse');
        link.setAttribute('data-bs-target', `#${item.id}`);
        link.textContent = item.label;
        link.style.cursor = "pointer";

        labelDiv.appendChild(link);
        wrapper.appendChild(labelDiv);

        // Collapsible Content Div
        const contentDiv = document.createElement('div');
        contentDiv.className = 'juice-effect collapse';
        contentDiv.id = item.id;
        // Only one sibling collapse open at a time
        contentDiv.setAttribute('data-bs-parent', `#${parent.id}`);

        // Nested indent
        contentDiv.style.paddingLeft = "10px";

        this.buildUI(item.children, contentDiv, depth + 1);

        // If this collapse has an "Active" toggle, disable sibling controls when inactive
        const activeChild = item.children.find(c => c.label === 'Active' && c.path && c.path.endsWith('.active'));
        if (activeChild) {
            const activeId = `control-${activeChild.path.replace(/\./g, '-')}`;
            const activeInput = contentDiv.querySelector(`#${activeId}`);
            if (activeInput) {
                // Sibling controls: inputs/selects in this contentDiv but not in nested collapses
                const getSiblings = () =>
                    [...contentDiv.querySelectorAll('input, select')].filter(
                        el => el !== activeInput && el.closest('.collapse') === contentDiv
                    );

                const setDisabled = (disabled) => {
                    getSiblings().forEach(el => el.disabled = disabled);
                    contentDiv.classList.toggle('juice-inactive', disabled);
                };

                // Set initial state
                setDisabled(!activeInput.checked);

                // Update on toggle
                activeInput.addEventListener('change', () => setDisabled(!activeInput.checked));
            }
        }

        // When a top-level collapse hides, close any nested collapses so
        // the accent border disappears (CSS uses :has(.collapse.show))
        if (depth === 0) {
            contentDiv.addEventListener('hide.bs.collapse', () => {
                contentDiv.querySelectorAll('.collapse.show').forEach(nested => {
                    const bsCollapse = bootstrap.Collapse.getInstance(nested);
                    if (bsCollapse) bsCollapse.hide();
                });
            });
        }

        wrapper.appendChild(contentDiv);
        parent.appendChild(wrapper);
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
                if (String(opt) === String(currentValue)) option.selected = true;
                input.appendChild(option);
            });
            input.addEventListener('change', (e) => {
                const raw = e.target.value;
                const val = isNaN(raw) ? raw : parseFloat(raw);
                this.setValue(item.path, val);
            });
        }
        else if (item.type === 'range') {
            input = document.createElement('input');
            input.type = 'range';
            input.className = 'form-range';
            input.min = item.min;
            input.max = item.max;
            if (item.step) input.step = item.step;

            const invert = item.invert === true;
            const toSlider = (v) => invert ? (item.min + item.max - v) : v;
            const fromSlider = toSlider; // same transform in both directions

            input.value = toSlider(currentValue);

            input.addEventListener('input', (e) => {
                let val = fromSlider(parseFloat(e.target.value));
                this.setValue(item.path, val);
            });

            if (item.gradient === 'hue') {
                input.classList.add('hue-slider');
            }
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
                if (e.target.checked && item.excludes) {
                    item.excludes.forEach(exPath => {
                        this.setValue(exPath, false);
                        const exId = `control-${exPath.replace(/\./g, '-')}`;
                        const exEl = document.getElementById(exId);
                        if (exEl) exEl.checked = false;
                    });
                }
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

        // Auto-enable the global Juice FX toggle when any effect is activated
        const isScoreJuice = path.startsWith('container.cheats.score.')
            || path.startsWith('container.scoreIncrement.')
            || path.startsWith('container.scoreArrive.')
            || path.startsWith('particleSystems.scoreArrive.');
        const isSillyJuice = path === 'container.sillySounds.pewpewpew';
        const isMusicJuice = path === 'container.music.heartbeat';
        const shouldEnable = (path.endsWith('.active') && value === true)
            || (isScoreJuice && value === true && typeof value === 'boolean')
            || (isSillyJuice && value === true)
            || (isMusicJuice && value === true);
        if (shouldEnable) {
            this.gameSession.juiceSettings.container.cheats.juiceFx = true;
            const juiceFxEl = document.getElementById('control-container-cheats-juiceFx');
            if (juiceFxEl) juiceFxEl.checked = true;
        }

        // Switch bullet/explosion sounds when pewpewpew is toggled
        if (path === 'container.sillySounds.pewpewpew') {
            this.gameSession.soundManager.changeBullet(value ? 2 : 0);
            this.gameSession.soundManager.changeExplosion(value ? 1 : 0);
        }

        // When juiceFx is toggled off, revert pewpewpew sounds and stop heartbeat;
        // when toggled back on, re-apply if pewpewpew/heartbeat are still checked
        if (path === 'container.cheats.juiceFx') {
            const pewpew = this.gameSession.juiceSettings.container.sillySounds.pewpewpew;
            this.gameSession.soundManager.changeBullet(value && pewpew ? 2 : 0);
            this.gameSession.soundManager.changeExplosion(value && pewpew ? 1 : 0);

            const heartbeat = this.gameSession.juiceSettings.container.music.heartbeat;
            if (value && heartbeat) {
                this.gameSession.soundManager.startHeartbeat();
            } else {
                this.gameSession.soundManager.stopHeartbeat();
            }
        }

        // Music volume
        if (path === 'container.music.volume') {
            this.gameSession.soundManager.setMusicVolume(value);
        }

        // Heartbeat toggle
        if (path === 'container.music.heartbeat') {
            if (value) {
                this.gameSession.soundManager.startHeartbeat();
            } else {
                this.gameSession.soundManager.stopHeartbeat();
            }
        }

        // Log the change to the footer
        const message = this.formatChange(path, value);
        if (message) this.logChange(path, message);
    }

    // Walk the schema tree to build a flat path → label context map
    buildPathLabels() {
        this.pathLabels = {};
        const walk = (items, parents = []) => {
            items.forEach(item => {
                if (item.children) {
                    walk(item.children, [...parents, item.label]);
                } else if (item.path) {
                    this.pathLabels[item.path] = { parents, label: item.label, type: item.type };
                }
            });
        };
        walk(this.schema);
        walk(this.sillySchema);
    }

    // Build a human-readable message for a setting change
    formatChange(path, value) {
        const info = this.pathLabels[path];
        if (!info) return null;

        // Build context from parent labels, skip the "Cheats" group name
        const context = info.parents.filter(p => p !== 'Cheats').join(' ');
        const displayValue = typeof value === 'number'
            ? (Number.isInteger(value) ? value : parseFloat(value.toFixed(2)))
            : value;

        if (path.endsWith('.active') && info.label === 'Active') {
            // Active toggle inside a collapse: "Bullet Hit Juice Particles enabled"
            return `${context} ${value ? 'enabled' : 'disabled'}`;
        } else if (info.type === 'checkbox') {
            // Other checkbox: "Screen Shake Fade Out enabled"
            return `${context} ${info.label} ${value ? 'enabled' : 'disabled'}`;
        } else {
            // Range/select: "Bullet Hit Juice Particles count set to 50"
            return `${context} ${info.label} set to ${displayValue}`;
        }
    }

    // Append a message to the footer log
    logChange(path, message) {
        const log = document.getElementById('juice-log');
        if (!log) return;

        // If the last entry was for the same path (e.g. slider drag), update in place
        if (this._lastLogPath === path && log.lastElementChild) {
            log.lastElementChild.textContent = message;
        } else {
            const p = document.createElement('p');
            p.textContent = message;
            log.appendChild(p);

            // Cap the log at 50 entries
            while (log.children.length > 50) {
                log.removeChild(log.firstChild);
            }
        }

        this._lastLogPath = path;
        log.scrollTop = log.scrollHeight;
    }
}

JuiceGuiManager.__accordionId = 0;
