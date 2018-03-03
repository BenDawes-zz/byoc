declare module 'meteor/react-meteor-data' {
  import * as React from 'react';

  type ComponentConstructor<P> = React.ComponentClass<P> | React.StatelessComponent<P>

  export function createContainer<InP, D, OutP extends (InP & D)>(
    options: (props: InP) => D | {getMeteorData: (props: InP) => D, pure?: boolean},
    reactComponent: ComponentConstructor<OutP>)
    : ComponentConstructor<InP>;
  
  export function withTracker(opt: (props: InP) => D | {getMeteorData: (props: InP) => D, pure?: boolean}): ((ComponentConstructor<InP>) => ComponentConstructor<InP>);
}
