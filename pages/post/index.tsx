import type { NextPage } from 'next';
import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useLazyQuery, gql } from '@apollo/client';
import { client } from 'utils/ApolloClient';
import dayjs from 'dayjs';
import { DevBlog } from 'types/graphqlTypes';
import { BlogItem, BlogTemplate } from 'components';
import Head from 'next/head';
import { observer } from 'mobx-react-lite';

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}


// const navItems = [
//     { name: 'All Posts', tag: '' },
//     { name: 'Pet Simulator X!', tag: 'Pet Simulator X' },
//     { name: 'My Restaurant', tag: 'My Restaurant' },
//     { name: 'Pet Simulator', tag: 'Pet Simulator' },
//     { name: 'Giant Survival', tag: 'Giant Survival' },
//     { name: 'Build and Survive!', tag: 'Build and Survive' },
//     { name: 'Other', tag: 'Other' },
// ];
const FEED_QUERY = gql`
    query DevBlog($searchString: String!, $offset: Int!, $limit: Int!) {
        devBlogs(
            filters: { tag: { startsWith: $searchString } }
            sort: "date:desc"
            pagination: { start: $offset, limit: $limit }
        ) {
            data {
                attributes {
                    mainPageHeaderTitle
                    title
                    description
                    date
                    slug
                    imgLink
                    tag
                }
            }
        }
    }
`;

interface PageData {
    dataProps: DevBlog[];
}

const Blog: NextPage<PageData> = ({ dataProps }) => {
    const setStopFetchingRef = useRef<number>(1);
    const [shouldFetch, setShouldFetch] = useState<boolean>(false);
    const fetchArticles = useRef<boolean>(false);
    const [fetchMore, { data }] = useLazyQuery(FEED_QUERY, {
        variables: {
            searchString: '',
            offset: 0,
            limit: 10,
        },
    });
    const [blogArr, setBlogArr] = useState<typeof dataProps>(dataProps);
    const blogRef = useRef<HTMLDivElement>(null);

    const throttleHeight = useMemo(
        () =>
            throttle(() => {
                // console.log(Math.floor(blogRef.current!.offsetHeight * 0.8) - Math.floor(window.scrollY));
                if (
                    blogRef.current! &&
                    Math.floor(blogRef.current!.offsetHeight * 0.7) - Math.floor(window.scrollY) < 0 &&
                    !shouldFetch &&
                    setStopFetchingRef.current > 0
                ) {
                    fetchArticles.current = true;
                    console.log('fetched');
                    setShouldFetch(p => !p);
                }
            }, 500),
        [shouldFetch]
    );

    const fetchOffset = useRef<number>(10);

    useEffect(() => {
        window.addEventListener('scroll', throttleHeight);

        return () => removeEventListener('scroll', throttleHeight);
    }, [throttleHeight]);

    useEffect(() => {
        // console.log(fetchOffset.current, 'offset');
        if (shouldFetch) {
            fetchMore({
                variables: {
                    searchString: '',
                    offset: fetchOffset.current,
                    limit: 10,
                },
            });
            fetchArticles.current = true;
            fetchOffset.current += 10;
        }
    }, [shouldFetch, fetchMore]);

    useEffect(() => {
        if (data) {
            setStopFetchingRef.current = data.devBlogs.data.length;
            setBlogArr(p => [...p, ...data.devBlogs.data]);
        }
    }, [data]);

    return (
        <div className="bg-pageBg/90 overflow-x-hidden">
            {/* {console.log(state.searchIndex, 'index')} */}
            <Head>
                <title>DEV BLOGS | BIG Games</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content="DEV BLOGS | BIG Games" />
                <meta
                    property="og:description"
                    content="Development blogs and updates for BIG Games and our projects!"
                />
                <meta
                    property="og:image"
                    content="https://static.wixstatic.com/media/81ec46_da31c6dfe511436690214229d3bd20fa~mv2.png/v1/fill/w_845,h_670,al_c/81ec46_da31c6dfe511436690214229d3bd20fa~mv2.png"
                />
            </Head>
            <BlogTemplate>
                <div className="lg:row-start-2 lg:row-end-3 lg:col-start-2 lg:col-end-3" ref={blogRef}>
                    <BlogItem
                        blogHeader={dataProps[0].attributes.mainPageHeaderTitle}
                        headerTitle={dataProps[0].attributes.title}
                        headerDescription={dataProps[0].attributes.description}
                        linkText="Read More"
                        linkHref={`/post/${dataProps[0].attributes.slug}`}
                        blogImgSrc={dataProps[0].attributes.imgLink}
                        blogMain
                        ratioImg={0.75}
                    />
                    <div className="lg:grid lg:grid-cols-3 xl:grid-cols-3 lg:gap-2 lg:gap-y-4 lg:max-w-8xl pb-5">
                        {blogArr &&
                            blogArr.map((el: DevBlog, i: number) => {
                                if (i > 0) {
                                    return (
                                        <Link key={el.attributes.title! + i} href={`/post/${el.attributes.slug}`}>
                                            <a>
                                                <BlogItem
                                                    key={el.attributes.title}
                                                    blogHeader=""
                                                    headerTitle={el.attributes.title}
                                                    headerDescription={el.attributes.description}
                                                    linkText=""
                                                    linkHref=""
                                                    withLink={false}
                                                    blogImgSrc={el.attributes.imgLink}
                                                    blogItem
                                                    date={dayjs(el.attributes.date).format('MMMM DD, YYYY')}
                                                    ratioImg={0.6}
                                                />
                                            </a>
                                        </Link>
                                    );
                                } else return null;
                            })}
                    </div>
                </div>
            </BlogTemplate>
        </div>
    );
};

export default observer(Blog);

export async function getStaticProps() {
    const {
        data: {
            devBlogs: { data },
        },
    } = await client.query({
        query: gql`
            query DevBlog {
                devBlogs(sort: "date:desc") {
                    data {
                        attributes {
                            mainPageHeaderTitle
                            title
                            description
                            date
                            slug
                            imgLink
                            tag
                        }
                    }
                }
            }
        `,
    });
    return {
        props: { dataProps: data },
        revalidate: 100,
    };
}
