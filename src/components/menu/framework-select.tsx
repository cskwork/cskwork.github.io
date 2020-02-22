import { Component, Element, Prop, h } from '@stencil/core';
import { Angular, JavaScript, React, Vue } from '../../icons';
import store, { Frameworks } from '../../store';

@Component({
  tag: 'framework-select'
})
export class DocsMenu {
  @Prop() onToggleClick: (e: Event) => void;
  @Element() el;

  frameworkIcons = {
    Angular,
    JavaScript,
    React,
    Vue
  };

  componentDidLoad() {
    this.el.querySelectorAll('.Select-option--selected').forEach(menuItem => {
      if (store.framework !== menuItem.innerText) {
        menuItem.classList.remove('Select-option--selected');
      }
    });
  }

  renderOption = (framework: string) => {
    const Icon = this.frameworkIcons[framework];
    return (
      <div class="FrameworkSelect-framework">
        <Icon class="FrameworkSelect-icon"/>
        <span>{framework}</span>
      </div>
    );
  }

  render() {
    return (
      <docs-select
        class="FrameworkSelect"
        options={Frameworks as any}
        optionRenderer={this.renderOption}
        initializer={() => store.framework}
        onSelection={ev => store.framework = ev.detail as any}/>
    );
  }
}
