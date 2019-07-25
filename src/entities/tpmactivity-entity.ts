import { EntityConfig } from 'entities';
import { TPMActivityEntity, EntityDisplay } from './types';
import { TPMBuilder } from './tpm-builder';
import { map, propEq, reject } from 'ramda';


export default class TPMActivityConfig implements EntityConfig<TPMActivityEntity> {

    public get displayProperties(): EntityDisplay<TPMActivityEntity>[] {
        return [
            { label: 'Reference Number', propName: 'reference_number' }
        ];
    }

    public get title() {
        return 'TPM Activities';
    }
    public get sectionsProp() {
        return 'sections';
    }

    public get builder() {
        return new TPMBuilder();
    }

    public get moduleName() {
        return 'Third Party Monitoring';
    }

}

export const tpmRemoveSection = (list: TPMActivityEntity[], id: number) => map(
    (tpmActivity: TPMActivityEntity) => {
        const withoutSection = reject(propEq('id', id), tpmActivity.sections);
        return ({
            ...tpmActivity,
            sections: withoutSection
        });
    }, list
);
