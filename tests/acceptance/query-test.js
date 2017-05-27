import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

const postId = '[data-test="post-id"]';
const postMessage = '[data-test="post-message"]';
const postTimestamp = '[data-test="post-timestamp"]';
const postAuthor = '[data-test="post-author"]';
const queryWithPathButton = '[data-test="query-with-path-button"]';
const queryWithoutPathButton = '[data-test="query-without-path-button"]';
const loadMoreRecordsButton = '[data-test="load-more-query-records-button"]';

moduleForAcceptance('Acceptance | query');

test('should query records with path', function(assert) {
  assert.expect(4);

  // Act
  visit('/');
  click(queryWithPathButton);

  // Assert
  andThen(() => {
    assert.equal(find(postId).length, 1);
    assert.equal(find(postMessage).length, 1);
    assert.equal(find(postTimestamp).length, 1);
    assert.equal(find(postAuthor).length, 1);
  });
});

test('should query records without path', function(assert) {
  assert.expect(4);

  // Act
  visit('/');
  click(queryWithoutPathButton);

  // Assert
  andThen(() => {
    assert.equal(find(postId).length, 1);
    assert.equal(find(postMessage).length, 1);
    assert.equal(find(postTimestamp).length, 1);
    assert.equal(find(postAuthor).length, 1);
  });
});

test('should load more records with path', function(assert) {
  assert.expect(4);

  // Act
  visit('/');
  click(queryWithPathButton);
  click(loadMoreRecordsButton);

  // Assert
  andThen(() => {
    assert.equal(find(postId).length, 2);
    assert.equal(find(postMessage).length, 2);
    assert.equal(find(postTimestamp).length, 2);
    assert.equal(find(postAuthor).length, 2);
  });
});

test('should load more records without path', function(assert) {
  assert.expect(4);

  // Act
  visit('/');
  click(queryWithoutPathButton);
  click(loadMoreRecordsButton);

  // Assert
  andThen(() => {
    assert.equal(find(postId).length, 2);
    assert.equal(find(postMessage).length, 2);
    assert.equal(find(postTimestamp).length, 2);
    assert.equal(find(postAuthor).length, 2);
  });
});
