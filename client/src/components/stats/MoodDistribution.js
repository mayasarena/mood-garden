import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { moodTextColor, moodTitles } from '../../utils/flowerData';

const colorMapping = {
    vhappy: '#FFA1BD',
    happy: '#FEB055',
    neutral: '#FFF173',
    sad: '#A0D7FF',
    vsad: '#D4A0F4'
};

const MoodDistribution = ({ totalCounts }) => {

    const data = Object.entries(totalCounts).map(([label, value]) => ({ label, value }));
    const totalCount = Object.values(totalCounts).reduce((sum, value) => sum + value, 0);

    const svgRef = useRef(null);

    const getPercent = (count) => {
        if (totalCount === 0) {
            return 0;
        } 

        const percentDecimal = count / totalCount
        const percent = percentDecimal * 100;

        return Math.round(percent);
    }

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const width = 400;
        const height = 400;
        const radius = Math.min(width, height) / 2;

        // Clear previous content
        svg.selectAll('*').remove();

        // Create pie chart
        const pie = d3.pie().value(d => d.value).sort(null);
        const arc = d3.arc().innerRadius(0).outerRadius(radius - 10);

        // Create SVG container
        const g = svg
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        // Append slices
        const slices = g.selectAll('.slice')
            .data(pie(data))
            .enter()
            .append('g')
            .attr('class', 'slice');

        slices.append('path')
            .attr('d', arc)
            .attr('fill', d => colorMapping[d.data.label] || '#ccc') // Use custom colors
            .attr('class', 'slice');
    }, [data]);

    return (
        <div className="flex-1 bg-white p-container rounded-container flex flex-col items-center justify-center">
            <svg ref={svgRef}></svg>

            <div className="flex flex-col gap-4 w-full mt-8 px-10">
                {Object.entries(totalCounts).map(([moodId, count]) => (
                    <div className="flex flex-row justify-between">
                        <span className={`small-header ${moodTextColor[moodId]}`}>{moodTitles[moodId]}</span>
                        <span className="small-header text-textgrey">{getPercent(count)}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoodDistribution;