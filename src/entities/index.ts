
abstract class EntityConfig<T> {
    public abstract get displayProperties(): (keyof T)[]
    public abstract get title(): string
    public abstract get sectionsProp(): string;
}

export default EntityConfig;

