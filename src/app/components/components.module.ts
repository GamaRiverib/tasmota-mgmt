import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HouseListComponent } from './house-list/house-list.component';
import { RoomDetailsDeviceInfoComponent } from './room-details-device-info/room-details-device-info.component';
import { RoomDetailsDevicesSelectComponent } from './room-details-devices-select/room-details-devices-select.component';
import { HouseEditComponent } from './house-edit/house-edit.component';
import { RoomEditComponent } from './room-edit/room-edit.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { AttributesViewerComponent } from './attributes-viewer/attributes-viewer.component';
import { DeviceViewerComponent } from './device-viewer/device-viewer.component';
import { WidgetsModule } from '../widgets/widgets.module';
import { DeviceViewerWidgetEditOptionsComponent } from './device-viewer-widget-edit-options/device-viewer-widget-edit-options.component';
import { DeviceViewerWidgetsComponent } from './device-viewer-widgets/device-viewer-widgets.component';
import { DeviceViewerWidgetSelectComponent } from './device-viewer-widget-select/device-viewer-widget-select.component';
import { DeviceViewerInformationComponent } from './device-viewer-information/device-viewer-information.component';
import { DeviceViewerFirmwareUpgradeComponent } from './device-viewer-firmware-upgrade/device-viewer-firmware-upgrade.component';
import { DeviceViewerConfigurationComponent } from './device-viewer-configuration/device-viewer-configuration.component';
import { DeviceViewerActionsMenuComponent } from './device-viewer-actions-menu/device-viewer-actions-menu.component';
// tslint:disable-next-line: max-line-length
import { DeviceViewerConfigurationModuleComponent } from './device-viewer-configuration-module/device-viewer-configuration-module.component';
import { DeviceViewerConfigurationMqttComponent } from './device-viewer-configuration-mqtt/device-viewer-configuration-mqtt.component';
import { DeviceViewerConfigurationOptionsComponent } from './device-viewer-configuration-options/device-viewer-configuration-options.component';
// tslint:disable-next-line: max-line-length
import { DeviceViewerConfigurationOthersComponent } from './device-viewer-configuration-others/device-viewer-configuration-others.component';
import { DeviceViewerConfigurationWifiComponent } from './device-viewer-configuration-wifi/device-viewer-configuration-wifi.component';
import { LayoutsModule } from '../layouts/layouts.module';

@NgModule({
  declarations: [
    AttributesViewerComponent,
    DeviceListComponent,
    DeviceViewerComponent,
    DeviceViewerActionsMenuComponent,
    DeviceViewerConfigurationComponent,
    DeviceViewerConfigurationModuleComponent,
    DeviceViewerConfigurationMqttComponent,
    DeviceViewerConfigurationOptionsComponent,
    DeviceViewerConfigurationOthersComponent,
    DeviceViewerConfigurationWifiComponent,
    DeviceViewerFirmwareUpgradeComponent,
    DeviceViewerInformationComponent,
    DeviceViewerWidgetEditOptionsComponent,
    DeviceViewerWidgetSelectComponent,
    DeviceViewerWidgetsComponent,
    DeviceViewerComponent,
    HouseEditComponent,
    HouseListComponent,
    RoomDetailsDeviceInfoComponent,
    RoomDetailsDevicesSelectComponent,
    RoomEditComponent
  ],
  exports: [
    AttributesViewerComponent,
    DeviceListComponent,
    DeviceViewerComponent,
    DeviceViewerActionsMenuComponent,
    DeviceViewerConfigurationComponent,
    DeviceViewerConfigurationModuleComponent,
    DeviceViewerConfigurationMqttComponent,
    DeviceViewerConfigurationOptionsComponent,
    DeviceViewerConfigurationOthersComponent,
    DeviceViewerConfigurationWifiComponent,
    DeviceViewerFirmwareUpgradeComponent,
    DeviceViewerInformationComponent,
    DeviceViewerWidgetEditOptionsComponent,
    DeviceViewerWidgetSelectComponent,
    DeviceViewerWidgetsComponent,
    DeviceViewerComponent,
    HouseEditComponent,
    HouseListComponent,
    RoomDetailsDeviceInfoComponent,
    RoomDetailsDevicesSelectComponent,
    RoomEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LayoutsModule,
    WidgetsModule
  ]
})
export class ComponentsModule { }
