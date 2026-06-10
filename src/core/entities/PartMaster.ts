export enum MachineType {
  MRI = 'MRI',
  CT = 'CT',
  GENERAL = 'GENERAL',
}

export interface PartMaster {
  id: string;
  name: string;
  partNumber: string;
  serialNo?: string;
  machineType?: MachineType;
  description?: string;
}
