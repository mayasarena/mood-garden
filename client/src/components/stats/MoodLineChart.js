import React, { useMemo, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { getValueFromFlowerId, getWeekDays, getMonthDays } from '../../utils/statsCalculations';

const MoodLineChart = ({ data, viewMode, refDate }) => {
    // Memoize transformed and sorted data
    const sortedData = useMemo(() => {
        if (!data || data.length === 0) {
            console.warn('No data provided or data is empty');
            return [];
        }
        
        let xAxisArray = [];
        let formattedData = [];

        if (viewMode === 'weekly') {
            xAxisArray = getWeekDays(refDate);
            formattedData = xAxisArray.map(date => {
                const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
                const entry = data.find(entry => new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }) === formattedDate);
                const value = entry ? getValueFromFlowerId(entry.flower_id) : 2;
                return { x: formattedDate, y: value };
            });

        } else if (viewMode === 'monthly') {
            xAxisArray = getMonthDays(refDate);
            formattedData = xAxisArray.map(date => {
                const formattedDate = date.toLocaleDateString('en-US', { day: '2-digit' });
                const entry = data.find(entry => new Date(entry.date).toLocaleDateString('en-US', { day: '2-digit' }) === formattedDate);
                const value = entry ? getValueFromFlowerId(entry.flower_id) : 2;
                return { x: formattedDate, y: value };
            });

        } else if (viewMode === 'yearly') {
            const refYear = refDate.getFullYear();
            xAxisArray = Array.from({ length: 12 }, (_, month) => new Date(refYear, month, 1));
            formattedData = xAxisArray.map(date => {
                const monthStart = new Date(refYear, date.getMonth(), 1);
                const monthEnd = new Date(refYear, date.getMonth() + 1, 0);
                const monthEntries = data.filter(entry => {
                    const entryDate = new Date(entry.date);
                    return entryDate >= monthStart && entryDate <= monthEnd;
                });

                if (monthEntries.length === 0) {
                    return { x: monthStart.toLocaleDateString('en-US', { month: 'short' }), y: 2 };
                }

                const values = monthEntries.map(entry => getValueFromFlowerId(entry.flower_id));
                const average = values.reduce((sum, value) => sum + value, 0) / values.length;
                return { x: monthStart.toLocaleDateString('en-US', { month: 'short' }), y: average };
            });
        }

        // Sort the formatted data by date
        console.log('data',formattedData);
        return formattedData.sort((a, b) => new Date(a.x) - new Date(b.x));

    }, [data]);

    const svgRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const renderChart = () => {
            const containerWidth = containerRef.current.clientWidth;
            const margin = { top: 30, right: 0, bottom: 40, left: 70 };
            const width = containerWidth - margin.left - margin.right;
            const height = 500 - margin.top - margin.bottom;

            d3.select(svgRef.current).selectAll('*').remove();

            const svg = d3.select(svgRef.current)
                .attr('width', width)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

            const xScale = d3.scalePoint()
                .domain(sortedData.map(d => d.x))
                .range([0, width-70])
                .padding(0.2);
            
            const xAxis = d3.axisBottom(xScale)
                .tickValues(sortedData.map(d => d.x))  
                .tickSize(15)
                .tickPadding(5);

            const yScale = d3.scaleLinear()
                .domain([0, 4])
                .range([height, 0]);

            const colorScale = d3.scaleLinear()
                .domain([0, 1, 2, 3, 4])
                .range(['#D4A0F4', '#A0D7FF',  '#FFF173', '#FEB055', '#FFA1BD']);

            // Create the path generator.
            const line = d3.line()
                .curve(d3.curveMonotoneX)
                .defined(d => !isNaN(d.y))
                .x(d => xScale(d.x))
                .y(d => yScale(d.y));

            // Define the gradient
            const gradient = svg.append('defs')
                .append('linearGradient')
                .attr('id', 'line-gradient')
                .attr('gradientUnits', 'userSpaceOnUse')
                .attr('x1', 0)
                .attr('y1', height)
                .attr('x2', 0)
                .attr('y2', 0);

            // Define gradient stops with your colors
            const gradientStops = [
                { offset: '0%', color: colorScale(0) },
                { offset: '20%', color: colorScale(0) },
                { offset: '20%', color: colorScale(1) },
                { offset: '40%', color: colorScale(1) },
                { offset: '40%', color: colorScale(2) },
                { offset: '60%', color: colorScale(2) },
                { offset: '60%', color: colorScale(3) },
                { offset: '80%', color: colorScale(3) },
                { offset: '80%', color: colorScale(4) },
                { offset: '100%', color: colorScale(4) }
            ];

            gradient.selectAll('stop')
                .data(gradientStops)
                .enter().append('stop')
                .attr('offset', d => d.offset)
                .attr('stop-color', d => d.color);

            // Add horizontal grid lines
            svg.selectAll('.grid-line')
                .data(yScale.ticks(4))
                .enter()
                .append('line')
                .attr('class', 'grid-line')
                .attr('x1', 0)
                .attr('x2', width)
                .attr('y1', d => yScale(d))
                .attr('y2', d => yScale(d))
                .attr('stroke', d => d === 0 ? '#A7A7A7' : '#f1f1f1') // Change color based on condition
                .attr('stroke-width', d => d === 0 ? 1 : 2);

            // Append the line with gradient
            svg.append('path')
                .datum(sortedData)
                .attr('fill', 'none')
                .attr('stroke', 'url(#line-gradient)')
                .attr('stroke-width', 4)
                .attr('stroke-linejoin', 'round')
                .attr('stroke-linecap', 'round')
                .attr('d', line);

            // Append x ticks
            svg.append('g')
                .attr('class', 'x-axis')
                .attr('transform', `translate(0,${height})`)
                .call(xAxis)
                .selectAll('text')
                .style('font-size', '12px')
                .style('font-weight', 500)
                .style('font-family', 'Roboto, sans-serif')
                .style('text-transform', 'uppercase')
                .style('letter-spacing', '0.1rem')
                .style('fill', '#A7A7A7');

            svg.append('g')
                .attr('class', 'y-axis')
                .call(d3.axisLeft(yScale)
                .tickValues([0, 1, 2, 3, 4])
                .tickSize(0)
                .tickPadding(0));

            svg.selectAll('.x-axis path, .x-axis line')
                .style('stroke', '#A7A7A7'); 
            
            svg.select('.x-axis path').remove();

            //svg.selectAll('.x-axis path, .x-axis line').remove();

            svg.selectAll('.y-axis path, .y-axis line')
                .remove();

            svg.selectAll('.y-axis .tick')
                .select('text')
                .remove();

            // Add image ticks
            const tickImages = ['/images/smileys/vsad.png', '/images/smileys/sad.png', '/images/smileys/neutral.png', '/images/smileys/happy.png', '/images/smileys/vhappy.png'];
            svg.selectAll('.y-axis .tick')
                .append('image')
                .attr('xlink:href', (d, i) => tickImages[i])
                .attr('x', -65)
                .attr('y', -20)
                .attr('width', 40)
                .attr('height', 40);

            svg.append("path")
                .datum(sortedData)
                .attr("fill", "none")
                .attr("stroke", "url(#line-gradient)" )
                .attr("stroke-width", 2);
        };

        // Render chart on component mount and whenever dependencies change
        renderChart();

        // Add event listener for window resize
        window.addEventListener('resize', renderChart);

        // Cleanup the event listener on component unmount
        return () => window.removeEventListener('resize', renderChart);
    }, [data, viewMode, refDate]);

    return (
        <div ref={containerRef} className="bg-white p-container rounded-container">
            {(!data || data.length === 0) ? (
                <div className="text-textgrey text-base italic">
                    No entries!
                </div>
            ) : (
                <div className="h-[540px] flex flex-col justify-between">
                    <svg ref={svgRef}></svg>
                    <span className="small-header text-accent-darkpink text-right">Empty entries default to neutral</span>
                </div>
            )}
        </div>
    );
};

export default MoodLineChart;

