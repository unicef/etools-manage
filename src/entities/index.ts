

abstract class Entity<T> {
    public abstract get displayProperties(): (keyof T)[]
}

export default Entity;

