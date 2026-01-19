---
title:  TextMate Rsync bundle
period: Feb 2009
date:   2009-02-11
github: https://github.com/itspriddle/rsync-tmbundle
tags:
  - TextMate
  - Rsync
  - SSH
project_type: oss
category: vim
---

This is a little TextMate bundle I wrote to let you use SSH/rsync to upload your website.

See the [README](https://github.com/itspriddle/rsync-tmbundle/blob/master/README.markdown) for installation/usage
or [fork it](https://github.com/itspriddle/rsync-tmbundle/).

### Installation

    git clone git://github.com/itspriddle/rsync-tmbundle.git \
      ~/Library/Application\ Support/TextMate/Bundles/rsync.tmbundle
    osascript -e 'tell app "TextMate" to reload bundles'

### Setup

To get going, setup these variables in your TM project:

![Variable Setup]({{ "/images/tm-rsync/setup.png" | relative_url }})

### Usage

When you're ready, run **&#8963;+&#8984;+r**. If everything looks good in the results,
remove the `--dry-run` option and run **&#8963;+&#8984;+r** again.

### Caveats

You **must** have a .tmproj setup to use this.
