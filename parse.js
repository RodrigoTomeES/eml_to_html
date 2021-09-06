#!/usr/bin/env node

import { MailParser } from 'mailparser';
import { writeFileSync, createReadStream } from 'fs';
import nomnom from 'nomnom'

const mailparser = new MailParser();
const opts = nomnom.option('infile', {
    abbr: 'i',
    required: true,
    help: 'Specify input file'
  })
  .option('outfile', {
    abbr: 'o',
    required: true,
    help: 'Specify output file'
  })
  .parse();

mailparser.on('data', data => {
  if (data.type === 'text') {
    writeFileSync(opts.outfile, data.html);
  }
});

createReadStream(opts.infile).pipe(mailparser);
