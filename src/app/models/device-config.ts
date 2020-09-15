import { DeviceStatusSTS } from './device-config-sts';
import { DeviceStatusSNS } from './device-config-sns';
import { DeviceStatus } from './device-config-status';
import { DeviceStatusTIM } from './device-config-tim';
import { DeviceStatusMQTT } from './device-config-mqtt';
import { DeviceStatusNET } from './device-config-net';
import { DeviceStatusMEM } from './device-config-mem';
import { DeviceStatusLOG } from './device-config-log';
import { DeviceStatusFWR } from './device-config-fwr';
import { DeviceStatusPRM } from './device-config-prm';

export class DeviceConfig {
  StatusFWR?: DeviceStatusFWR;
  StatusLOG?: DeviceStatusLOG;
  StatusMEM?: DeviceStatusMEM;
  StatusMQT?: DeviceStatusMQTT;
  StatusNET?: DeviceStatusNET;
  StatusPRM?: DeviceStatusPRM;
  StatusSNS?: DeviceStatusSNS;
  Status?: DeviceStatus;
  StatusSTS?: DeviceStatusSTS;
  StatusTIM?: DeviceStatusTIM;
}
