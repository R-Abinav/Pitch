import 'server-only';

import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'
import { token } from '../env';

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token
})

//Add a failsafe
if(!writeClient.config().token){
    throw new Error("Write token not found!");
}