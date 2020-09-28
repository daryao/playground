// Following the course https://www.udemy.com/course/2019-javascript-algorithmic-scripting-advanced-level/
// Section 2: Record Collection
// Code follows the instructor example with changes for variable naming, testing, logic improvement, and comments for clarification

var collection = {
    3489: {
        game: 'Always Sometimes Monsters',
        developer: 'Vagabond Dog',
        tags: [
            'Sequel',
            'RPG',
            'Story Rich',
            'Choices Matter'
        ]
    },
    2377: {
        game: 'Cultist Simulator',
        developer: 'Weather Factory',
        tags: [
            'Horror',
            'CRPG',
            'Management',
            'Roguelite'
        ]
    },
    5114: {
        game: 'Tales from the Borderlands',
        developer: 'Telltales',
        tags: [
            'Comedy',
            'Adventure',
            'Story Rich',
            'Choices Matter'
        ]
    },
    8703: {
        game: 'House of Many Doors',
        developer: 'Pixel Trickery',
        tags: [
            'RPG',
            'Story Rich',
            'Choices Matter',
            'Lore-Rich',
        ]
    }
}

var collectionCopy = JSON.parse(JSON.stringify(collection));

function updateCollection(id, property, value) {

    // original
    /*
    if (property == 'tags' && value !== '') {
        if (collection[id][property]) {
            collection[id][property].push(value);
        } else {
            collection[id][property] = [value];
        }
    } else if (value !== '') {
        collection[id][property] = value;
    } else {
        delete collection[id][property];
    }
    */
    
    // improved
    if (value == '') {
        delete collection[id][property];
    } else if (typeof(collection[id][property]) !== 'object') {
        collection[id][property] = value;
    } else {
        collection[id][property].push(value);
    }

    return collection;
}

// Test
console.log(updateCollection(3489, 'game', 'Sometimes Always Monsters'));
console.log(updateCollection(3489, 'tags', 'Series'));
console.log(updateCollection(2377, 'developer', 'Weather Factory'));
console.log(updateCollection(5114, 'developer', 'Telltale Games'));
console.log(updateCollection(8703, 'game', 'A House of Many Doors'));
console.log(updateCollection(8703, 'tags', 'Indie'));