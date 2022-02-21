import stream from 'stream';
import { promisify } from 'util';
import fetch from 'node-fetch';

const pipeline = promisify(stream.pipeline);
const url = 'https://ipfs.infura.io/ipfs/'

import https from "https"
import sslRootCas from "ssl-root-cas"
https.globalAgent.options.ca = sslRootCas.create()

const handler = async (req, res) => {
  const { hash } = req.query
  const response = await fetch(url + hash)
  if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);

  res.setHeader('Content-Type', 'image/jpeg')
  await pipeline(response.body, res)
};

export default handler