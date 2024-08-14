import { VHappyClassicFlower, HappyClassicFlower, NeutralClassicFlower, SadClassicFlower, VSadClassicFlower } from '../components/models/ClassicFlower';
import { VHappyTulip, HappyTulip, NeutralTulip, SadTulip, VSadTulip } from '../components/models/Tulip';

export const flowerData = {
    vhappy: [
        {
            type: 'classic',
            label: 'Very Happy Classic Flower',
            image: '/images/classic/vhappy.png',
            component: VHappyClassicFlower,
            price: 0
        },
        {
            type: 'tulip',
            label: 'Very Happy Tulip',
            image: '/images/tulip/vhappy.png',
            component: VHappyTulip,
            price: 50
        }
    ],
    happy: [
        {
            type: 'classic',
            label: 'Happy Classic Flower',
            image: '/images/classic/happy.png',
            component: HappyClassicFlower,
            price: 0
        },
        {
            type: 'tulip',
            label: 'Happy Tulip',
            image: '/images/tulip/happy.png',
            component: HappyTulip,
            price: 50
        }
    ],
    neutral: [
        {
            type: 'classic',
            label: 'Neutral Classic Flower',
            image: '/images/classic/neutral.png',
            component: NeutralClassicFlower,
            price: 0
        },
        {
            type: 'tulip',
            label: 'Neutral Tulip',
            image: '/images/tulip/neutral.png',
            component: NeutralTulip,
            price: 50
        }
    ],
    sad: [
        {
            type: 'classic',
            label: 'Sad Classic Flower',
            image: '/images/classic/sad.png',
            component: SadClassicFlower,
            price: 0
        },
        {
            type: 'tulip',
            label: 'Sad Tulip',
            image: '/images/tulip/sad.png',
            component: SadTulip,
            price: 50
        }
    ],
    vsad: [
        {
            type: 'classic',
            label: 'Very Sad Classic Flower',
            image: '/images/classic/vsad.png',
            component: VSadClassicFlower,
            price: 0
        },
        {
            type: 'tulip',
            label: 'Very Sad Tulip',
            image: '/images/tulip/vsad.png',
            component: VSadTulip,
            price: 50
        }
    ],
};

export const flowerDataSortedByType = Object.keys(flowerData).reduce((acc, mood) => {
    flowerData[mood].forEach(flower => {
        if (!acc[flower.type]) {
            acc[flower.type] = [];
        }
        acc[flower.type].push({
            ...flower,
            type: mood
        });
    });
    return acc;
}, {});

export const moodTitles = {
    vhappy: 'Very Happy',
    happy: 'Happy',
    neutral: 'Neutral',
    sad: 'Sad',
    vsad: 'Very Sad'
};

// Mood text colors
export const moodTextColor = {
    'vhappy': 'text-accent-pink',
    'happy': 'text-accent-orange',
    'neutral': 'text-accent-yellow-text',
    'sad': 'text-accent-blue',
    'vsad': 'text-accent-purple',
}

export function getFlowerObjectFromId(flowerId) {
    if (!flowerId) return null;

    const [flowerType, moodId] = flowerId.split('-');

    const flowerArray = flowerData[moodId];
    if (!flowerArray) return null;

    const flower = flowerArray.find(f => f.type === flowerType);
    return flower || null;
}

export function getMoodTextColorFromFlowerId(flowerId) {
    if (!flowerId) return null;
    const [, moodId] = flowerId.split('-');
    return moodTextColor[moodId];
}
