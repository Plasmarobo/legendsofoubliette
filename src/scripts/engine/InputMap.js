export const LogicalControls = {
    EAST: 'east',     // Movement left
    WEST: 'west',   // Movement right
    NORTH: 'north',     // Movement down
    SOUTH: 'south',         // Movement up
    IDLE: 'idle',

    SELECT: 'select',           // Confirm a selection, press a button
    CANCEL: 'cancel',           // Cancel selection, exit or return
    USE: 'use',                 // Use or interact with an item or context

    ATTACK: 'attack',           // Attacks with waepon
    ACTION_A: 'action_a',           // Uses item in slot a
    ACTION_B: 'action_b',           // Uses item in slot b
    ACTION_C: 'action_c'            // Uses item in slot c
};

const KeyboardKeymap = {
    [LogicalControls.WEST]: [Phaser.Input.Keyboard.KeyCodes.LEFT, Phaser.Input.Keyboard.KeyCodes.A],
    [LogicalControls.EAST]: [Phaser.Input.Keyboard.KeyCodes.RIGHT, Phaser.Input.Keyboard.KeyCodes.D],
    [LogicalControls.SOUTH]: [Phaser.Input.Keyboard.KeyCodes.DOWN, Phaser.Input.Keyboard.KeyCodes.S],
    [LogicalControls.NORTH]: [Phaser.Input.Keyboard.KeyCodes.UP, Phaser.Input.Keyboard.KeyCodes.W],

    [LogicalControls.SELECT]: [Phaser.Input.Keyboard.KeyCodes.ENTER, Phaser.Input.Keyboard.KeyCodes.F],
    [LogicalControls.CANCEL]: [Phaser.Input.Keyboard.KeyCodes.BACKSPACE],
    [LogicalControls.USE]: [Phaser.Input.Keyboard.KeyCodes.ENTER, Phaser.Input.Keyboard.KeyCodes.F],

    [LogicalControls.ATTACK]: [Phaser.Input.Keyboard.KeyCodes.SPACE],
    [LogicalControls.ACTION_A]: [Phaser.Input.Keyboard.KeyCodes.J],
    [LogicalControls.ACTION_B]: [Phaser.Input.Keyboard.KeyCodes.K],
    [LogicalControls.ACTION_C]: [Phaser.Input.Keyboard.KeyCodes.L]
};

export const ControlEvent = {
    INPUT: 'input'
};

export const ControlStates = {
    PRESSED: 'pressed',
    HELD: 'held',
    RELEASED: 'released'
};

const HoldTime = 750;

// Maps inputs to logical events
export class InputMap
{
    constructor(scene)
    {
        this.emitter = new Phaser.Events.EventEmitter()
        this.control_map = {};
        let physical_keys = [];
        this.scene = scene
        // Hoist this for use with arrow functions
        var controller = this
        for(const [control, keys] of Object.entries(KeyboardKeymap))
        {
            let logical_control = control;
            for(let key of keys)
            {
                if (physical_keys.indexOf(key) == -1)
                {
                    physical_keys.push(key)
                    controller.control_map[logical_control] = ControlStates.RELEASED;
                    
                    var handler = controller.scene.input.keyboard.addKey(key)
                    handler.onDown = () => {
                        controller.updateControlState(logical_control, ControlStates.PRESSED)
                        setTimeout(() => {
                            if (controller.control_map[logical_control] == ControlStates.PRESSED &&
                                handler.getDuration() > HoldTime)
                            {
                                controller.updateControlState(logical_control, ControlStates.HELD)
                            }
                        }, HoldTime);
                    }
                    handler.onUp = () => {
                        controller.updateControlState(logical_control, ControlStates.RELEASED)
                    }
                }
            }
        }
    }

    updateControlState(logical_control, state)
    {
        this.emitter.emit(ControlEvent.INPUT, logical_control, state)
        this.control_map[logical_control] = state
    }

    addConsumer(logical_control, consumer)
    {
        this.emitter.addListener(logical_control, consumer)
    }

    update()
    {

    }
}