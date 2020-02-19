import React, { useState } from 'react';
import './App.css';
import js2ts from 'json-to-ts';
import axios from 'axios';
import { Input, Button, Grid, GridRow, GridColumn } from 'semantic-ui-react';
import { traverseAndReplace } from './util';

function App() {
  const [endpoint, setEndpoint] = useState();
  const [apiResult, setApiResult] = useState();

  const onRequest = async () => {
    if (endpoint) {
      try {
        // TODO: axios throws non 200 requests, so handle this correctly in the future
        const res = await axios.get(endpoint); 
        setApiResult(traverseAndReplace(res.data));
      } catch (e) {
        setApiResult({ message: e.message });
      }
    } else {
      alert('No endpoint provided')
    }
  }

  // TODO: Allow the ability to name, or infer name of root interface from variable name
  // TODO: reduce arrays to 1 as an option to turn on, and maybe other settings like this
  // TODO: Style: Make things look cleaner, and figure out why text has rendering glitches

  return (
    <div className="App" style={{}}>
      <Grid className="App-Container p-5" centered>
        <GridRow className="m-5" textAlign="center">
          <GridColumn className="test-border" mobile={16} tablet={13} computer={12}>
            <Input
              inverted
              fluid
              size="large"
              placeholder="https://"
              onChange={e => setEndpoint(e.target.value)}
              value={endpoint}
            />
          </GridColumn>
          <GridColumn className="test-border" mobile={16} tablet={3} computer={4} >
            <Button
              basic
              circular
              inverted
              size="large"
              // icon={<Icon name='bolt' />}
              onClick={onRequest}
              content={'Send Request'}
            />
          </GridColumn>
        </GridRow>

        <GridRow className="m-5">
          <GridColumn className="test-border p-3" mobile={16} tablet={8} computer={8}>
            {apiResult
              ? <pre style={{ color: 'whitesmoke' }}>{`Compact Body (arrays reduced to 1 elem) \n` + JSON.stringify(apiResult, null, 4)}</pre>
              : 'No Results'}
          </GridColumn>
          <GridColumn className="test-border p-3" mobile={16} tablet={8} computer={8}>
            {apiResult
              ? js2ts(apiResult).map(typeInterface => (
                <pre style={{ color: 'whitesmoke' }}>{typeInterface}</pre>
              ))
              : "No Interfaces"}
          </GridColumn>
        </GridRow>
      </Grid>
    </div>
  );
}

export default App;
