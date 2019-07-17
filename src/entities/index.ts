
abstract class EntityConfig<T> {
    public abstract get displayProperties(): (keyof T)[]
    public abstract get title(): string
}

export default EntityConfig;

