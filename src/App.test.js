import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { shallow } from 'enzyme';
describe('App Component', ()=>{
  let mountedApp;
  beforeEach(()=>{
    mountedApp = shallow(<App />)
  });

  test('Testing the label shipment info is available', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/Shippment information/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('should render App Component layout', () =>{
    const mountedApp = shallow(<App />);
    let browserRouter = mountedApp.find('BrowserRouter');
    expect(mountedApp.getElements()).toMatchSnapshot();
    expect(browserRouter.length).toBe(1);
  }); 
})
