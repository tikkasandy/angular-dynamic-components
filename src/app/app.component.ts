import {Component, ComponentFactoryResolver, ViewChild} from '@angular/core';
import {ModalComponent} from "./modal/modal.component";
import {RefDirective} from "./ref.directive";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // modal = false

  @ViewChild(RefDirective, {static: false}) refDir: RefDirective | undefined;

  constructor(
    private title: Title,
    private meta: Meta
  ) {
    const t = title.getTitle();
    console.log('getTitle()', t);
    this.title.setTitle('App Component Page!');
    this.meta.addTags([
      {name: 'keywords', content: 'angular,google,appcomponent'},
      {name: 'description', content: 'this is app component'}
    ])
  }

  showModal() {
    this.refDir?.containerRef.clear();
    const component = this.refDir?.containerRef.createComponent(ModalComponent);

    if (component) {
      component.instance.title = "Dynamic title";
      component.instance.close.subscribe(() => {
        this.refDir?.containerRef.clear();
      })
    }
  }
}
