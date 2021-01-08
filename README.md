# Hiring Frontend Test

## Getting Started

Here you should place the files of the test required, you can find some smokes tests that will evaluate the compliance, check running section to know how to execute them.

### Prerequisites

* Node js installed (v12.18.1 or later)

### Running

Things you need to know to run them

1. Before run tests, assurance to modifier config/index.js with server URL (could be a bucket url or localhost:port).

```sh
exports.config = {
  url: bucket_url | http://localhost:3000
};
```

2. Run test
```sh
npm run test
```