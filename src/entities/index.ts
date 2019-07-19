import { EntityDisplay } from './types';

abstract class EntityConfig<T> {
    public abstract get displayProperties(): EntityDisplay<T>[]
    public abstract get title(): string
    public abstract get sectionsProp(): string;
}

export default EntityConfig;

