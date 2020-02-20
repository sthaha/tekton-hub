import React, {useState, useEffect, ReactNode} from 'react';
import {
  Card,
  Flex,
  FlexItem,
  Button,
  Grid,
  Badge,
  GridItem,
  CardHead,
  TextContent,
  Text,
  CardActions,
  ClipboardCopy,
  ClipboardCopyVariant,
  Modal,
  TextVariants,
} from '@patternfly/react-core';
import c_modal_box_BoxShadow	from '@patternfly/react-styles'
import {DownloadIcon, GithubIcon} from '@patternfly/react-icons';
import '@patternfly/react-core/dist/styles/base.css';
import Rating from '../rating/Rating';
import {API_URL} from '../../constants';
import avatarImg from './download.png';
import {useParams} from 'react-router';
import './basicdetail.css';
import { is } from '@babel/types';
export interface BasicDetailPropObject {
    id: any
    name : string;
    description : string;
    downloads : number;
    rating : number;
    yaml : string;
    github: string
    tags : []
}
export interface BasicDetailProp {
  task: BasicDetailPropObject
}



const BasicDetail: React.FC<BasicDetailProp> = (props: BasicDetailProp) => {
  const {taskId} = useParams();
  const taskArr : any = [];
  const [resourcePath, setResourcePath]=useState();
  const [isModalOpen,SetIsModalOpen]=useState(false);

  if (props.task.tags != null) {
    taskArr.push(props.task.tags);
  } else {
    taskArr.push([]);
  }
  useEffect(() =>{
    fetch(`${API_URL}/resource/links/${taskId}`)
        .then((resp) => resp.json())
        .then((data) => setResourcePath(data));
    // eslint-disable-next-line
  }, []);
  const ClipboardItem=(it:any) =>{
    return ( 
      <React.Fragment> 
        <ClipboardCopy style={{marginBottom:'2em'}}
            isReadOnly variant={ClipboardCopyVariant.expansion}>
            {`kubectl apply -f ${it.it}`}</ClipboardCopy>
      </React.Fragment>
     
    );
  };

  let taskLink :ReactNode;
  let pipelineLink:ReactNode;
  if (resourcePath !== undefined) {
    // for  handling pipeline raw path
    if (resourcePath['pipelines']){
      const pipelinePath = 'kubectl apply -f ' + resourcePath['pipelines'];
      pipelineLink =
      <React.Fragment>
        <Text > <b>Pipeline</b> </Text>
        <ClipboardCopy  isReadOnly
          variant={ClipboardCopyVariant.expansion}>
          {`${pipelinePath}`}</ClipboardCopy>
      </React.Fragment>;
    }
//   for handling task raw path
    if (resourcePath['tasks']) 
      taskLink = <ul>
        {
          resourcePath['tasks'].map((it:any) => <ClipboardItem it={it} key={it} />)
        }
      </ul>;
    }

  
  return (
    <Flex>
      <Card style={{marginLeft: '-2em', marginRight: '-2em',
        marginTop: '-2em', width: '120%', paddingBottom: '2em'}}>
        <CardHead style = {{paddingTop: '2em'}}>
          <img src ={avatarImg} alt="Task"
            style={{height: '7em', paddingLeft: '9em'}}
          />
          <TextContent style={{paddingLeft: '4em', paddingTop: '2em'}}>
            <Text style={{fontSize: '2em'}}>
              {props.task.name.charAt(0).toUpperCase()+props.task.name.slice(1)}
            </Text>

            <Text style={{fontSize: '1em'}}>
              <GithubIcon size="md"
                style = {{marginRight: '0.5em', marginBottom: '-0.3em'}} />
              <a href={props.task.github} target = "_">Github</a>
            </Text>

            <Grid>
              <GridItem span={10} style = {{paddingBottom: '1.5em'}}>
                {props.task.description}
              </GridItem>
              <GridItem>
                {
                  taskArr[0].map((tag: any) =>{
                    return (
                      <Badge
                        style={{paddingRight: '1em',
                          marginBottom: '1em', marginRight: '1em'}}
                        key={tag.Name}
                        className="badge">{tag}
                      </Badge>);
                  })
                }
              </GridItem>
            </Grid>
          </TextContent>

          <CardActions style={{marginRight: '3em', paddingTop: '2em'}}>
            <Flex breakpointMods={[{modifier: 'column', breakpoint: 'lg'}]}>
              <FlexItem>
                <Rating />
              </FlexItem>
              <FlexItem>
                <DownloadIcon style={{marginRight: '1em'}}/>
                {props.task.downloads}
              </FlexItem>
             <FlexItem style={{marginLeft: '-3em'}}>
                <React.Fragment>
                  { document.queryCommandSupported('copy')}
                  <Button variant="primary" 
                  className="button" 
                  onClick={() => SetIsModalOpen(!isModalOpen)}
                  >
                    Install
                  </Button>
        
                <Modal
                      width={'60%'}
                      title={props.task.name.charAt(0).toUpperCase()+
                        props.task.name.slice(1)}
                      isOpen={isModalOpen}
                      onClose={() => SetIsModalOpen(!isModalOpen)}
                      isFooterLeftAligned
                    >
                       <hr />
                        <div>
                        
                          
                          <TextContent>
                            <Text component={TextVariants.h2} className="modaltext">Install on Kubernetes</Text> 
                            {pipelineLink}
                            <Text> Tasks </Text>
                            {taskLink}
                          </TextContent>  
                          <br />
                        </div>
          
        </Modal>

        </React.Fragment>
              </FlexItem>
            </Flex>
          </CardActions>
        </CardHead>
      </Card>
    </Flex>
  );
                          }


export default BasicDetail;


