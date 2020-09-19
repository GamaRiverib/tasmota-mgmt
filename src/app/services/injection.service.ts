import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector, Type } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InjectionService {

  private container: ComponentRef<any>;

  constructor(
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector) { }

  getRootViewContainer(): ComponentRef<any> {
    if (this.container) {
      return this.container;
    }
    // tslint:disable-next-line: no-string-literal
    const rootComponents = this.applicationRef['_rootComponents'];
    if (rootComponents && rootComponents.length) {
      return rootComponents[0];
    }

    throw new Error('View container not found! ngUpgrade needs to manually set this via setRootViewContainer.');
  }

  setRootViewContainer(container: ComponentRef<any>): void {
    this.container = container;
  }

  getComponentRootNode(componentRef: ComponentRef<any>): HTMLElement {
    return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  }

  getRootViewContainerNode(): HTMLElement {
    return this.getComponentRootNode(this.getRootViewContainer());
  }

  appendComponent<T>(componentClass: Type<T>, options?: any, location?: Element, replace?: boolean): ComponentRef<any> {
    if (!options) {
      options = {};
    }

    if (!location) {
      location = this.getRootViewContainerNode();
    }

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    const componentRef = componentFactory.create(this.injector);
    const componentRootNode = this.getComponentRootNode(componentRef);
    this.applicationRef.attachView(componentRef.hostView);
    componentRef.onDestroy(() => {
      this.applicationRef.detachView(componentRef.hostView);
    });

    if (replace) {
      location.childNodes.forEach((node: ChildNode) => location.removeChild(node));
    }

    location.appendChild(componentRootNode);

    return componentRef;
  }
}
