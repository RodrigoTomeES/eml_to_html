#!/usr/bin/env node

import { MailParser } from 'mailparser';
import { writeFileSync, createReadStream, readdir } from 'fs';
import { basename } from 'path';
import nomnom from 'nomnom';

const opts = nomnom
  .option('directory', {
    abbr: 'd',
    flag: true,
    help: 'Adds the ability to use directories instead of files'
  })
  .option('infile', {
    abbr: 'i',
    required: true,
    help: 'Specify input file or directory with -d flag'
  })
  .option('outfile', {
    abbr: 'o',
    required: true,
    help: 'Specify output file or directory with -d flag'
  })
  .parse();

if (opts.directory) {
  readdir(opts.infile, (err, files) => {
    if (err) console.error("Error:", err);
    else {
      files.forEach(file => {
        const fileName = basename(file, '.eml');
        const mailparser = new MailParser();
  
        mailparser.on('data', data => {
          if (data.type === 'text') {
            writeFileSync(`${opts.outfile}/${fileName}.html`, data.html);
          }
        });
  
        createReadStream(`${opts.infile}/${file}`).pipe(mailparser);
      });
    }
  });
} else {
  const mailparser = new MailParser();

  mailparser.on('data', data => {
    if (data.type === 'text') {
      writeFileSync(opts.outfile, data.html);
    }
  });

  createReadStream(opts.infile).pipe(mailparser);
}
