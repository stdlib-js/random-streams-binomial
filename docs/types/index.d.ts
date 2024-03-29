/*
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

// TypeScript Version: 4.1

/// <reference types="node"/>
/// <reference types="@stdlib/types"/>

import { Readable } from 'stream';
import * as random from '@stdlib/types/random';

/**
* Interface defining stream options.
*/
interface Options {
	/**
	* Specifies whether a stream should operate in object mode (default: `false`).
	*/
	objectMode?: boolean;

	/**
	* Specifies how `Buffer` objects should be decoded to strings (default: `null`).
	*/
	encoding?: string | null;

	/**
	* Specifies the maximum number of bytes to store in an internal buffer before ceasing to generate additional pseudorandom numbers.
	*/
	highWaterMark?: number;

	/**
	* Separator used to join streamed data (default: `'\n'`).
	*/
	sep?: string;

	/**
	* Number of iterations.
	*/
	iter?: number;

	/**
	* Pseudorandom number generator which generates uniformly distributed pseudorandom numbers.
	*/
	prng?: random.PRNG;

	/**
	* Pseudorandom number generator seed.
	*/
	seed?: random.PRNGSeedMT19937;

	/**
	* Pseudorandom number generator state.
	*/
	state?: random.PRNGStateMT19937;

	/**
	* Specifies whether to copy a provided pseudorandom number generator state (default: `true`).
	*/
	copy?: boolean;

	/**
	* Number of iterations after which to emit the PRNG state.
	*/
	siter?: number;
}

/**
* Class for creating readable streams which generate a stream of pseudorandom numbers drawn from a binomial distribution.
*/
declare class RandomStream extends Readable {
	/**
	* Returns a readable stream for generating a stream of pseudorandom numbers drawn from a binomial distribution.
	*
	* @param n - number of trials
	* @param p - success probability
	* @param options - stream options
	* @throws `n` must be a positive integer
	* @throws `p` must be a probability
	* @throws must provide valid options
	* @throws must provide a valid state
	* @returns stream instance
	*
	* @example
	* var inspectStream = require( '@stdlib/streams-node-inspect-sink' );
	*
	* function log( chunk ) {
	*    console.log( chunk.toString() );
	* }
	*
	* var opts = {
	*     'iter': 10
	* };
	*
	* var stream = new RandomStream( 20, 0.3, opts );
	*
	* stream.pipe( inspectStream( log )  );
	*/
	constructor( n: number, p: number, options?: Options );

	/**
	* Destruction state.
	*/
	private readonly _destroyed: boolean;

	/**
	* Flag indicating whether a stream is operating in object mode.
	*/
	private readonly _objectMode: boolean;

	/**
	* Data separator.
	*/
	private readonly _sep: string;

	/**
	* Total number of iterations.
	*/
	private readonly _iter: number;

	/**
	* Number of iterations after which to emit the underlying PRNG state.
	*/
	private readonly _siter: number;

	/**
	* Iteration counter.
	*/
	private _i: number;

	/**
	* Pseudorandom number generator for generating binomial distributed pseudorandom numbers.
	*/
	private readonly _prng: random.PRNG;

	/**
	* Underlying PRNG.
	*/
	readonly PRNG: random.PRNG;

	/**
	* PRNG seed.
	*/
	readonly seed: random.PRNGSeedMT19937;

	/**
	* PRNG seed length.
	*/
	readonly seedLength: number;

	/**
	* PRNG state.
	*/
	state: random.PRNGStateMT19937;

	/**
	* PRNG state length.
	*/
	readonly stateLength: number;

	/**
	* PRNG state size (in bytes).
	*/
	readonly byteLength: number;

	/**
	* Implements the `_read` method.
	*
	* @param size - number (of bytes) to read
	*/
	_read( size: number ): void;

	/**
	* Gracefully destroys a stream, providing backward compatibility.
	*
	* @param error - error
	*
	* @example
	* var stream = new RandomStream( 20, 0.3 );
	* stream.on( 'error', onError );
	*
	* function onError( err ) {
	*    stream.destroy( err );
	* }
	*/
	destroy( error?: Error ): void;
}

/**
* Interface defining a stream constructor which is both "newable" and "callable".
*/
interface Constructor {
	/**
	* Returns a readable stream for generating a stream of pseudorandom numbers drawn from a binomial distribution.
	*
	* @param n - number of trials
	* @param p - success probability
	* @param options - stream options
	* @throws `n` must be a positive integer
	* @throws `p` must be a probability
	* @throws must provide valid options
	* @throws must provide a valid state
	* @returns stream instance
	*
	* @example
	* var inspectStream = require( '@stdlib/streams-node-inspect-sink' );
	*
	* function log( chunk ) {
	*    console.log( chunk.toString() );
	* }
	*
	* var opts = {
	*     'iter': 10
	* };
	*
	* var stream = new RandomStream( 20, 0.3, opts );
	*
	* stream.pipe( inspectStream( log )  );
	*/
	new( n: number, p: number, options?: Options ): RandomStream; // newable

	/**
	* Returns a readable stream for generating a stream of pseudorandom numbers drawn from a binomial distribution.
	*
	* @param n - number of trials
	* @param p - success probability
	* @param options - stream options
	* @throws `n` must be a positive integer
	* @throws `p` must be a probability
	* @throws must provide valid options
	* @throws must provide a valid state
	* @returns stream instance
	*
	* @example
	* var inspectStream = require( '@stdlib/streams-node-inspect-sink' );
	*
	* function log( chunk ) {
	*    console.log( chunk.toString() );
	* }
	*
	* var opts = {
	*     'iter': 10
	* };
	*
	* var stream = randomStream( 20, 0.3, opts );
	*
	* stream.pipe( inspectStream( log )  );
	*/
	( n: number, p: number, options?: Options ): RandomStream; // callable

	/**
	* Returns a function for creating readable streams which generate pseudorandom numbers drawn from a binomial distribution.
	*
	* @param n - number of trials
	* @param p - success probability
	* @param options - stream options
	* @returns factory function
	*
	* @example
	* var opts = {
	*     'sep': ',',
	*     'objectMode': false,
	*     'encoding': 'utf8',
	*     'highWaterMark': 64
	* };
	*
	* var createStream = RandomStream.factory( 20, 0.3, opts );
	*
	* // Create 10 identically configured streams...
	* var streams = [];
	* var i;
	* for ( i = 0; i < 10; i++ ) {
	*     streams.push( createStream() );
	* }
	*/
	factory( n: number, p: number, options?: Options ): ( ...args: Array<any> ) => RandomStream;

	/**
	* Returns a function for creating readable streams which generate pseudorandom numbers drawn from a binomial distribution.
	*
	* @param options - stream options
	* @returns factory function
	*
	* @example
	* var opts = {
	*     'sep': ',',
	*     'objectMode': false,
	*     'encoding': 'utf8',
	*     'highWaterMark': 64
	* };
	*
	* var createStream = RandomStream.factory( opts );
	*
	* // Create 10 identically configured streams...
	* var streams = [];
	* var i;
	* for ( i = 0; i < 10; i++ ) {
	*     streams.push( createStream( 20, 0.3 ) );
	* }
	*/
	factory( options?: Options ): ( n: number, p: number ) => RandomStream;

	/**
	* Returns an "objectMode" readable stream for generating a stream of pseudorandom numbers drawn from a binomial distribution.
	*
	* @param n - number of trials
	* @param p - success probability
	* @param options - stream options
	* @throws `n` must be a positive integer
	* @throws `p` must be a probability
	* @throws must provide valid options
	* @throws must provide a valid state
	* @returns stream instance
	*
	* @example
	* var inspectStream = require( '@stdlib/streams-node-inspect-sink' );
	*
	* function log( v ) {
	*    console.log( v );
	* }
	*
	* var opts = {
	*     'iter': 10
	* };
	*
	* var stream = RandomStream.objectMode( 20, 0.3, opts );
	*
	* stream.pipe( inspectStream.objectMode( log )  );
	*/
	objectMode( n: number, p: number, options?: Options ): RandomStream;
}

/**
* Returns a readable stream for generating a stream of pseudorandom numbers drawn from a binomial distribution.
*
* @param n - number of trials
* @param p - success probability
* @param options - stream options
* @throws `n` must be a positive integer
* @throws `p` must be a probability
* @throws must provide valid options
* @throws must provide a valid state
* @returns stream instance
*
* @example
* var inspectStream = require( '@stdlib/streams-node-inspect-sink' );
*
* function log( chunk ) {
*    console.log( chunk.toString() );
* }
*
* var opts = {
*     'iter': 10
* };
*
* var stream = randomStream( 20, 0.3, opts );
*
* stream.pipe( inspectStream( log )  );
*
* @example
* var inspectStream = require( '@stdlib/streams-node-inspect-sink' );
*
* function log( chunk ) {
*    console.log( chunk.toString() );
* }
*
* var opts = {
*     'iter': 10
* };
*
* var RandomStream = randomStream;
* var stream = new RandomStream( 20, 0.3, opts );
*
* stream.pipe( inspectStream( log )  );
*
* @example
* var inspectStream = require( '@stdlib/streams-node-inspect-sink' );
*
* function log( v ) {
*    console.log( v );
* }
*
* var opts = {
*     'iter': 10
* };
*
* var stream = randomStream.objectMode( 20, 0.3, opts );
*
* stream.pipe( inspectStream.objectMode( log )  );
*
* @example
* var opts = {
*     'sep': ',',
*     'objectMode': false,
*     'encoding': 'utf8',
*     'highWaterMark': 64
* };
*
* var createStream = randomStream.factory( 20, 0.3, opts );
*
* // Create 10 identically configured streams...
* var streams = [];
* var i;
* for ( i = 0; i < 10; i++ ) {
*     streams.push( createStream() );
* }
*
* @example
* var opts = {
*     'sep': ',',
*     'objectMode': false,
*     'encoding': 'utf8',
*     'highWaterMark': 64
* };
*
* var createStream = randomStream.factory( opts );
*
* // Create 10 identically configured streams...
* var streams = [];
* var i;
* for ( i = 0; i < 10; i++ ) {
*     streams.push( createStream( 20, 0.3 ) );
* }
*/
declare var randomStream: Constructor;


// EXPORTS //

export = randomStream;
