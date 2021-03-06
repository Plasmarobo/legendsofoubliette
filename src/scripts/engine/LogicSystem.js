import { PhakrSystem } from '../plugins/phakr'
import { Logic } from '../engine/Components'

export class LogicSystem extends PhakrSystem
{
    constructor(core)
    {
        super(core, [Logic])
        this.handleEvent = this.handleEvent.bind(this)
    }

    handleEvent(event, status)
    {
        let entities = this.core.queryEntities(this.components)
        for(let entity of entities)
        {
            let logic = entity.get(Logic)
            if (logic.function_map.hasOwnProperty(event))
            {
                (logic.function_map[event])(entity, status);
            }
        }
    }
}
