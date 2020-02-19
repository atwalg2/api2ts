import React, { useState } from 'react';
import './App.css';
import js2ts from 'json-to-ts';
import axios from 'axios';
import { Input, Icon, Button, Grid, GridRow, GridColumn, Segment } from 'semantic-ui-react';

function App() {
  const [endpoint, setEndpoint] = useState();
  const [apiResult, setApiResult] = useState();

  const onRequest = async () => {
    if (endpoint) {
      try {
        const res = await axios.get(endpoint);
        setApiResult(res);
      } catch (e) {
        setApiResult({ message: e.message });
      }
    } else {
      alert('No endpoint provided')
    }
  }
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
              ? <pre style={{ color: 'whitesmoke' }}>{JSON.stringify(apiResult, null, 4)}</pre>
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
