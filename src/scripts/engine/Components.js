// Controls entities with limited lifespans
// ttl - time to live in ms
// onTimeUp - function to run onTimeUp
export function Lifetime(ttl, onTimeUp)
{
    this.ttl = ttl || 1000;
    this.t = this.ttl;
    this.onTimeUp = onTimeUp || (() => { return true });
}

export function Position(x,y,z)
{
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
}

export function Velocity(x, y)
{
    this.x = x || 0;
    this.y = y || 0;
}

export function Acceleration(x, y)
{
    this.x = x || 0
    this.y = y || 0
}

export function Hitbox(x, y, w,h)
{
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 0;
    this.h = h || 0;
}

export function Draw(sprite, animation_prefix, action_map, default_action)
{
    // The sprite name
    this.sprite = sprite || 'error';
    // The animation prefix within the sprite atlas (ex. skel_)
    this.animation_prefix = animation_prefix || "error";
    // Maps logical actions/movements to animations via keyword (ex. south, s)
    // Will be appended to prefix before the frame number (I.E. skel_s)
    this.action_map = action_map || {};
    this.current_action = this.default_action = default_action || "idle";
}

// Generic/scripted logic, takes logical events and runs them through the associated function
export function Logic(function_map)
{
    this.function_map = function_map
}
